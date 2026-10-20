import { SYSTEM_PROMPT } from "./prompt.js";

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const POSITIONS = ["Past", "Present", "Future"];
const TOPICS = {
	love: "love and relationships",
	career: "career and work",
	money: "money and financial security",
	general: "general life direction",
};
const MAX_ATTEMPTS = 3;
const RATE_WINDOW_SECONDS = 3600;
const VISITOR_KEY = "visitor_count";

function corsHeaders(request, env) {
	const allowed = (env.ALLOWED_ORIGINS || "*").split(",").map((o) => o.trim());
	const origin = request.headers.get("Origin") || "";
	const allow = allowed.includes("*") ? "*" : allowed.includes(origin) ? origin : allowed[0];
	return {
		"Access-Control-Allow-Origin": allow,
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Max-Age": "86400",
		Vary: "Origin",
	};
}

function json(body, status, cors, extra = {}) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...cors, ...extra },
	});
}

function apiError(code, message, status, cors) {
	return json({ code, message, data: { status } }, status, cors);
}

function cleanText(value) {
	return String(value).replace(/<[^>]*>/g, "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
}

function isDegenerate(text) {
	return text.length < 200 || (text.length > 120 && new Set(text.split(/\s+/)).size / text.split(/\s+/).length < 0.1);
}

async function checkRateLimit(request, env) {
	if (!env.KV) return true;
	const ip = request.headers.get("CF-Connecting-IP") || "unknown";
	const key = `rate:${ip}`;
	const count = parseInt((await env.KV.get(key)) || "0", 10);
	const limit = parseInt(env.AI_RATE_LIMIT || "5", 10);
	if (count >= limit) return false;
	await env.KV.put(key, String(count + 1), { expirationTtl: RATE_WINDOW_SECONDS });
	return true;
}

async function handleReading(request, env, cors) {
	let payload;
	try {
		payload = await request.json();
	} catch {
		return apiError("gypsy_tarot_invalid_json", "Invalid request body.", 400, cors);
	}
	const { question, language, topic, cards } = payload || {};

	if (typeof question !== "string" || question.length > 2400) {
		return apiError("gypsy_tarot_invalid_question", "The question must be 600 characters or fewer.", 400, cors);
	}
	if (!["th", "en"].includes(language)) {
		return apiError("gypsy_tarot_invalid_language", "Choose Thai or English for the reading.", 400, cors);
	}
	if (typeof topic !== "string" || !Object.hasOwn(TOPICS, topic)) {
		return apiError("gypsy_tarot_invalid_topic", "Choose a valid reading topic.", 400, cors);
	}
	if (!Array.isArray(cards) || cards.length !== 3) {
		return apiError("gypsy_tarot_invalid_cards", "A reading needs exactly three selected cards.", 400, cors);
	}

	const readingCards = [];
	for (let i = 0; i < cards.length; i++) {
		const card = cards[i];
		if (!card || typeof card.name !== "string") {
			return apiError("gypsy_tarot_invalid_card", "One of the selected cards is invalid.", 400, cors);
		}
		const name = cleanText(card.name);
		if (!name || name.length > 240) {
			return apiError("gypsy_tarot_invalid_card_name", "One of the selected card names is invalid.", 400, cors);
		}
		readingCards.push({ name, position: POSITIONS[i], orientation: card.reversed ? "reversed" : "upright" });
	}

	const models = [1, 2, 3, 4, 5, 6, 7].map((n) => env[`GROQ_LLM_MODEL${n}`]).filter(Boolean);
	if (!env.GROQ_API_KEY || models.length === 0) {
		return apiError(
			"gypsy_tarot_ai_unconfigured",
			"AI reading is not configured. The built-in reading will be shown instead.",
			503,
			cors,
		);
	}

	if (!(await checkRateLimit(request, env))) {
		return apiError(
			"gypsy_tarot_ai_rate_limited",
			"Please wait a little before requesting another AI reading.",
			429,
			cors,
		);
	}

	const languageName = language === "th" ? "Thai" : "English";
	const systemPrompt =
		`${SYSTEM_PROMPT}\n\nRespond entirely in ${languageName}. The supplied language code is ${language}. ` +
		"Interpret the supplied three-card Past, Present, Future spread. Use ONLY the supplied cards. " +
		"Write plain paragraphs under short headings; do not use tables. " +
		"Keep the whole reading under about 450 words and always finish every section.";
	const userPrompt = JSON.stringify({
		question: cleanText(question),
		cards: readingCards,
		additional_questions: [],
		language,
		focus_area: TOPICS[topic],
		spread_name: "Three-card Past, Present, Future",
	});

	const unavailable = () =>
		apiError(
			"gypsy_tarot_ai_unavailable",
			"AI reading is temporarily unavailable. The built-in reading will be shown instead.",
			502,
			cors,
		);

	const TOKEN_LIMIT_HINTS = ["token limit", "maximum context", "context length", "context_length_exceeded", "too many tokens", "maximum number of tokens", "tokens exceed", "request too large"];
	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	let lastFailure = null;

	// Token-limit or degenerate output: move to the next model. Any other error: retry the same model, up to MAX_ATTEMPTS.
	for (const model of models) {
		for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
			let response;
			try {
				response = await fetch(GROQ_ENDPOINT, {
					method: "POST",
					headers: { Authorization: `Bearer ${env.GROQ_API_KEY}`, "Content-Type": "application/json" },
					body: JSON.stringify({
						model,
						temperature: 0.4,
						max_tokens: 4000,
						messages: [
							{ role: "system", content: systemPrompt },
							{ role: "user", content: userPrompt },
						],
					}),
					signal: AbortSignal.timeout(30000),
				});
			} catch (error) {
				console.error(`Groq request failed (${model}, attempt ${attempt}/${MAX_ATTEMPTS})`, error && error.message);
				lastFailure = "transport";
				if (attempt < MAX_ATTEMPTS) await sleep(500 * attempt);
				continue;
			}

			const raw = await response.text();
			let body = null;
			try {
				body = JSON.parse(raw);
			} catch {}

			const content = body && body.choices && body.choices[0] && body.choices[0].message && body.choices[0].message.content;
			if (response.ok && typeof content === "string") {
				const reading = content.trim();
				if (isDegenerate(reading)) {
					console.error("Degenerate output from", model);
					lastFailure = "degenerate";
					break;
				}
				return json({ reading }, 200, cors);
			}

			const message = ((body && body.error && body.error.message) || "").toLowerCase();
			const tokenLimit = response.status === 413 || TOKEN_LIMIT_HINTS.some((s) => message.includes(s));
			console.error(`Groq HTTP ${response.status} (${model}, attempt ${attempt}/${MAX_ATTEMPTS})`, tokenLimit ? "(token limit)" : "");
			if (tokenLimit) {
				lastFailure = "token_limit";
				break;
			}
			lastFailure = "error";
			if (attempt < MAX_ATTEMPTS) await sleep(500 * attempt);
		}
		if (lastFailure === "error" || lastFailure === "transport") return unavailable();
	}

	if (lastFailure !== "token_limit") return unavailable();
	return apiError(
		"gypsy_tarot_ai_token_limit",
		"The AI models could not process this reading. The built-in reading will be shown instead.",
		502,
		cors,
	);
}

async function handleVisitors(request, env, cors) {
	if (!env.KV) return apiError("gypsy_tarot_visitors_unconfigured", "Visitor counter is not configured.", 503, cors);
	let count = parseInt((await env.KV.get(VISITOR_KEY)) || "0", 10);
	if (request.method === "POST") {
		count += 1;
		await env.KV.put(VISITOR_KEY, String(count));
	}
	return json({ count }, 200, cors);
}

export default {
	async fetch(request, env) {
		const cors = corsHeaders(request, env);
		if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

		const { pathname } = new URL(request.url);
		const path = pathname.replace(/^\/(wp-json\/)?gypsy-tarot\/v1/, "").replace(/\/+$/, "") || "/";

		if (path === "/reading" && request.method === "POST") return handleReading(request, env, cors);
		if (path === "/visitors" && (request.method === "GET" || request.method === "POST")) {
			return handleVisitors(request, env, cors);
		}
		if (path === "/reading" || path === "/visitors") return apiError("method_not_allowed", "Method not allowed.", 405, cors);
		return apiError("not_found", "Not found.", 404, cors);
	},
};
