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

function apiError(code, message, status, cors, debug) {
	return json({ code, message, data: { status }, ...(debug ? { debug, note: debug } : {}) }, status, cors);
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

	const trail = [];
	const unavailable = () =>
		apiError(
			"gypsy_tarot_ai_unavailable",
			"AI reading is temporarily unavailable. The built-in reading will be shown instead.",
			502,
			cors,
			trail.join(" | "),
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
				trail.push(`${model}: ${(error && error.message) || "request failed"}`);
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
					trail.push(`${model}: degenerate output`);
					console.error("Degenerate output from", model);
					lastFailure = "degenerate";
					break;
				}
				return json({ reading, note: [...trail, `${model}: ok`].join(" | ") }, 200, cors);
			}

			const message = ((body && body.error && body.error.message) || "").toLowerCase();
			const tokenLimit = response.status === 413 || TOKEN_LIMIT_HINTS.some((s) => message.includes(s));
			trail.push(`${model}: HTTP ${response.status}${tokenLimit ? " (token limit)" : ""}`);
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
		trail.join(" | "),
	);
}

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_MODELS = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-2.5-flash", "gemini-3.5-flash-lite", "gemini-2.5-flash-lite"];

async function handleDream(request, env, cors) {
	let payload;
	try {
		payload = await request.json();
	} catch {
		return apiError("gypsy_tarot_invalid_json", "Invalid request body.", 400, cors);
	}
	const { dream, language } = payload || {};
	if (typeof dream !== "string" || !cleanText(dream) || dream.length > 600) {
		return apiError("gypsy_tarot_invalid_dream", "Describe your dream in 600 characters or fewer.", 400, cors);
	}
	if (typeof language !== "string" || !/^[a-z]{2}$/.test(language)) {
		return apiError("gypsy_tarot_invalid_language", "Invalid language.", 400, cors);
	}
	const groqModels = [1, 2, 3, 4, 5, 6, 7].map((n) => env[`GROQ_LLM_MODEL${n}`]).filter(Boolean);
	const groqReady = Boolean(env.GROQ_API_KEY) && groqModels.length > 0;
	if (!env.GEMINI_API_KEY && !groqReady) {
		return apiError("gypsy_tarot_ai_unconfigured", "AI dream teller is not configured.", 503, cors);
	}

	if (env.KV) {
		const key = `dream-rate:${request.headers.get("CF-Connecting-IP") || "unknown"}`;
		const count = parseInt((await env.KV.get(key)) || "0", 10);
		if (count >= parseInt(env.DREAM_RATE_LIMIT || "10", 10)) {
			return apiError("gypsy_tarot_ai_rate_limited", "Please wait a little before requesting another dream reading.", 429, cors);
		}
		await env.KV.put(key, String(count + 1), { expirationTtl: RATE_WINDOW_SECONDS });
	}

	const systemPrompt =
		"You are dream teller, translate the dream.\n" +
		"Get the result from several online sources, match the best result across multiple sources, and explain the dream's meaning.\n" +
		"Then provide three different suggested 3-digit lottery numbers and three different suggested 2-digit lottery numbers derived from the dream's symbols.\n" +
		"Write plain paragraphs separated by blank lines; do not use markdown, tables, bullet lists or headings with symbols. " +
		"Put the three 3-digit numbers and the three 2-digit numbers each in their own final paragraph (numbers separated by commas), labelled in the response language.\n" +
		"Lottery numbers are for entertainment only; say clearly that they are not guaranteed. " +
		`Respond entirely in language code: ${language}.`;
	const requestFor = (useSearch) =>
		JSON.stringify({
			systemInstruction: { parts: [{ text: systemPrompt }] },
			contents: [{ role: "user", parts: [{ text: cleanText(dream) }] }],
			...(useSearch ? { tools: [{ google_search: {} }] } : {}),
			generationConfig: { temperature: 0.5, maxOutputTokens: 2000 },
		});

	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	const trail = [];
	let modelIndex = 0;
	// Allow one attempt per model so the lite model is reached if the others hit their limits.
	const maxAttempts = Math.max(MAX_ATTEMPTS, GEMINI_MODELS.length);
	// Search grounding has a separate quota; if it is rejected, continue without it.
	let useSearch = env.GEMINI_USE_SEARCH !== "false";
	for (let attempt = 1; attempt <= (env.GEMINI_API_KEY ? maxAttempts : 0); attempt++) {
		const model = GEMINI_MODELS[modelIndex];
		let status = 0;
		try {
			const response = await fetch(`${GEMINI_ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
				method: "POST",
				headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
				body: requestFor(useSearch),
				signal: AbortSignal.timeout(45000),
			});
			status = response.status;
			if (response.ok) {
				const body = await response.json();
				const parts = (body.candidates && body.candidates[0] && body.candidates[0].content && body.candidates[0].content.parts) || [];
				const reading = parts
					.filter((part) => typeof part.text === "string" && !part.thought)
					.map((part) => part.text)
					.join("")
					.trim();
				if (reading.length >= 40) return json({ reading, model, debug: [...trail, `${model}: ok`].join(" | ") }, 200, cors);
				trail.push(`${model}: empty`);
				console.error(`Gemini empty reading (${model}, attempt ${attempt}/${maxAttempts})`);
			} else {
				trail.push(`${model}: HTTP ${status}`);
				const detail = (await response.text()).slice(0, 300);
				console.error(`Gemini HTTP ${status} (${model}, search=${useSearch}, attempt ${attempt}/${maxAttempts}) ${detail}`);
			}
		} catch (error) {
			trail.push(`${model}: ${(error && error.message) || "request failed"}`);
			console.error(`Gemini request failed (${model}, attempt ${attempt}/${maxAttempts})`, error && error.message);
		}

		if (status === 429) {
			useSearch = false;
			if (modelIndex < GEMINI_MODELS.length - 1) modelIndex += 1;
		}
		else if (attempt < maxAttempts) await sleep(600 * attempt);
	}

	// Every Gemini model failed or hit its limit: fall back to Groq.
	if (groqReady) {
		for (const model of groqModels) {
			try {
				const response = await fetch(GROQ_ENDPOINT, {
					method: "POST",
					headers: { Authorization: "Bearer " + env.GROQ_API_KEY, "Content-Type": "application/json" },
					body: JSON.stringify({
						model,
						temperature: 0.5,
						max_tokens: 2000,
						messages: [
							{ role: "system", content: systemPrompt },
							{ role: "user", content: cleanText(dream) },
						],
					}),
					signal: AbortSignal.timeout(30000),
				});
				if (response.ok) {
					const body = await response.json();
					const content = body.choices && body.choices[0] && body.choices[0].message && body.choices[0].message.content;
					const reading = typeof content === "string" ? content.trim() : "";
					if (reading.length >= 40) return json({ reading, model, provider: "groq", debug: [...trail, `groq ${model}: ok`].join(" | ") }, 200, cors);
					trail.push(`groq ${model}: empty`);
					console.error(`Groq empty dream reading (${model})`);
				} else {
					trail.push(`groq ${model}: HTTP ${response.status}`);
					console.error(`Groq HTTP ${response.status} (dream, ${model})`);
				}
			} catch (error) {
				trail.push(`groq ${model}: ${(error && error.message) || "request failed"}`);
				console.error(`Groq dream request failed (${model})`, error && error.message);
			}
		}
	}

	return apiError("gypsy_tarot_ai_unavailable", "AI dream teller is temporarily unavailable. Please try again soon.", 502, cors, trail.join(" | "));
}

const PALM_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const PALM_MAX_BASE64 = 2_000_000;

function normalizeImagePayload(image, mimeType) {
	if (typeof image !== "string" || !image) return null;
	let data = image.trim();
	let mime = typeof mimeType === "string" ? mimeType.trim().toLowerCase() : "";
	const dataUrl = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/i.exec(data);
	if (dataUrl) {
		mime = dataUrl[1].toLowerCase();
		data = dataUrl[2];
	}
	data = data.replace(/\s+/g, "");
	if (!PALM_MIME_TYPES.has(mime) || !data || data.length > PALM_MAX_BASE64) return null;
	if (!/^[A-Za-z0-9+/]+=*$/.test(data)) return null;
	return { mimeType: mime, data };
}

async function handlePalm(request, env, cors) {
	let payload;
	try {
		payload = await request.json();
	} catch {
		return apiError("gypsy_tarot_invalid_json", "Invalid request body.", 400, cors);
	}
	const { language } = payload || {};
	const question = typeof (payload && payload.question) === "string" ? payload.question : "";
	const image = normalizeImagePayload(payload && payload.image, payload && payload.mimeType);
	if (!image) {
		return apiError(
			"gypsy_tarot_invalid_palm_image",
			"Upload a clear JPEG, PNG, or WebP photo of a palm (under about 1.5 MB).",
			400,
			cors,
		);
	}
	if (typeof language !== "string" || !["th", "en"].includes(language)) {
		return apiError("gypsy_tarot_invalid_language", "Choose Thai or English for the reading.", 400, cors);
	}
	if (question.length > 600) {
		return apiError("gypsy_tarot_invalid_question", "The question must be 600 characters or fewer.", 400, cors);
	}
	const birthDate = typeof (payload && payload.birthDate) === "string" ? payload.birthDate.trim() : "";
	if (birthDate) {
		const parsed = /^\d{4}-\d{2}-\d{2}$/.test(birthDate) ? new Date(`${birthDate}T00:00:00Z`) : null;
		if (!parsed || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== birthDate || parsed > new Date() || parsed.getUTCFullYear() < 1900) {
			return apiError("gypsy_tarot_invalid_birth_date", "Enter a valid date of birth.", 400, cors);
		}
	}
	const handValue = payload && payload.hand;
	if (handValue !== undefined && handValue !== "" && handValue !== "left" && handValue !== "right") {
		return apiError("gypsy_tarot_invalid_hand", "Choose the left or right hand.", 400, cors);
	}
	const hand = handValue === "left" || handValue === "right" ? handValue : "";
	if (!env.GROQ_API_KEY) {
		return apiError("gypsy_tarot_ai_unconfigured", "AI palm teller is not configured.", 503, cors);
	}

	if (env.KV) {
		const key = `palm-rate:${request.headers.get("CF-Connecting-IP") || "unknown"}`;
		const count = parseInt((await env.KV.get(key)) || "0", 10);
		if (count >= parseInt(env.PALM_RATE_LIMIT || "10", 10)) {
			return apiError("gypsy_tarot_ai_rate_limited", "Please wait a little before requesting another palm reading.", 429, cors);
		}
		await env.KV.put(key, String(count + 1), { expirationTtl: RATE_WINDOW_SECONDS });
	}

	const languageName = language === "th" ? "Thai" : "English";
	const userQuestion = cleanText(question);
	const today = new Date();
	const todayIso = today.toISOString().slice(0, 10);
	let age = null;
	if (birthDate) {
		const [by, bm, bd] = birthDate.split("-").map(Number);
		age = today.getUTCFullYear() - by - (today.getUTCMonth() + 1 < bm || (today.getUTCMonth() + 1 === bm && today.getUTCDate() < bd) ? 1 : 0);
	}
	const systemPrompt =
		"You are an expert, famous palm teller.\n" +
		"Study the uploaded photo of a human palm. If the image is not a palm, or the palm lines are too unclear to read, say so briefly and ask for a clearer photo of an open palm with fingers together, well lit, filling the frame.\n" +
		"Accuracy rules:\n" +
		"- Describe only what is actually visible in the photo (line length, depth, curve, breaks, forks, islands, mounts, hand shape). If a line is faint or not visible, say it is unclear instead of inventing details.\n" +
		"- The user prompt states which hand is shown (left or right). Mention it and, where relevant, note that classic palmistry reads the left hand as innate potential and the right hand as lived experience.\n" +
		"- Today's date and the user's exact current age (when known) are given in the user prompt. Treat them as facts. Never guess, change, or contradict the age; never estimate age from the photo.\n" +
		"- Divide the story into Past (ages before the current age), Present (the current age and the next year or two), and Future (older ages). Give every age range as concrete numbers consistent with the current age, and mention the matching calendar years when the birth year is known. Past ranges must end below the current age; Future ranges must start above it.\n" +
		"- If no date of birth is given, do not state any specific age or year; use life stages instead (childhood, teens, young adulthood, midlife, later life) and briefly invite the user to add a date of birth for more precise timing.\n" +
		"- Tie each claim to a specific palm feature, and link it to the user's question when one is provided. If no question is given, offer a general life reading.\n" +
		"Use classic palmistry themes in plain language: heart line, head line, life line, fate line if visible, hand shape, and notable marks.\n" +
		"Stay reflective and non-alarmist; never claim medical, legal, or guaranteed predictions. This is entertainment and reflection only.\n" +
		"Write plain paragraphs separated by blank lines; do not use markdown, tables, bullet lists, or decorative heading symbols.\n" +
		"Keep the reading under about 500 words and finish every thought.\n" +
		`Respond entirely in ${languageName}. The supplied language code is ${language}.`;
	const birthLine =
		`Today's date: ${todayIso}\n` +
		(hand ? `Hand in the photo: ${hand} hand\n` : "") +
		(birthDate ? `Date of birth (YYYY-MM-DD): ${birthDate}\nBirth year: ${birthDate.slice(0, 4)}\nCurrent age: ${age} years old\n` : "Date of birth: not provided\n");
	const birthPrefix = `${birthLine}\n`;
	const userText = userQuestion
		? `${birthPrefix}User question: ${userQuestion}\n\nPlease read this palm photo and tell the story of past, present, and future with age ranges, focused on my question.`
		: `${birthPrefix}Please read this palm photo and tell the story of past, present, and future with age ranges.`;

	const model = env.GROQ_PALM_MODEL || "qwen/qwen3.8-27b";
	const requestBody = JSON.stringify({
		model,
		temperature: 0.4,
		max_tokens: 2200,
		messages: [
			{ role: "system", content: systemPrompt },
			{
				role: "user",
				content: [
					{ type: "text", text: userText },
					{
						type: "image_url",
						image_url: { url: `data:${image.mimeType};base64,${image.data}` },
					},
				],
			},
		],
	});

	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	const trail = [];
	for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
		try {
			const response = await fetch(GROQ_ENDPOINT, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${env.GROQ_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: requestBody,
				signal: AbortSignal.timeout(30000),
			});

			if (response.ok) {
				const body = await response.json();
				const content = body.choices && body.choices[0] && body.choices[0].message && body.choices[0].message.content;
				const reading = typeof content === "string" ? content.trim() : "";
				if (reading.length >= 40) {
					return json({ reading, model, provider: "groq", debug: [...trail, `${model}: ok`].join(" | ") }, 200, cors);
				}
				trail.push(`${model}: empty`);
				console.error(`Groq empty palm reading (${model}, attempt ${attempt}/${MAX_ATTEMPTS})`);
			} else {
				trail.push(`${model}: HTTP ${response.status}`);
				console.error(`Groq HTTP ${response.status} (palm, ${model}, attempt ${attempt}/${MAX_ATTEMPTS})`);
			}
		} catch (error) {
			trail.push(`${model}: ${(error && error.message) || "request failed"}`);
			console.error(`Groq palm request failed (${model}, attempt ${attempt}/${MAX_ATTEMPTS})`, error && error.message);
		}

		if (attempt < MAX_ATTEMPTS) await sleep(500 * attempt);
	}

	return apiError(
		"gypsy_tarot_ai_unavailable",
		"AI palm teller is temporarily unavailable. Please try again soon.",
		502,
		cors,
		trail.join(" | "),
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
		if (path === "/dream" && request.method === "POST") return handleDream(request, env, cors);
		if (path === "/palm" && request.method === "POST") return handlePalm(request, env, cors);
		if (path === "/visitors" && (request.method === "GET" || request.method === "POST")) {
			return handleVisitors(request, env, cors);
		}
		if (path === "/reading" || path === "/dream" || path === "/palm" || path === "/visitors") {
			return apiError("method_not_allowed", "Method not allowed.", 405, cors);
		}
		return apiError("not_found", "Not found.", 404, cors);
	},
};
