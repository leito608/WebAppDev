(function () {
	"use strict";

	const translations = {
		th: {
			brandName: "มีเรื่องอะไรในใจ มาเปิดไพ่คุยกัน", visitors: "ผู้เข้าชม", navReading: "อ่านไพ่ทาโรต์", navDream: "ทำนายฝัน", navPalm: "ดูลายมือ",
			footerBrand: "ห้องแห่งคำพยากรณ์",
			disclaimer: "ลองอ่านไพ่เพื่อทบทวนตัวเอง คำทำนายไม่อาจแทนคำแนะนำจากผู้เชี่ยวชาญได้",
			dreamTitle: "ทำนายฝัน",
			dreamHeroCopy: "เล่าความฝันของคุณ แล้วรับคำทำนายเป็นอีกมุมหนึ่งในการทบทวนความรู้สึก",
			dreamEyebrow: "บันทึกความฝัน", dreamQuestion: "เมื่อคืนคุณฝันเห็นอะไร?",
			dreamHint: "เล่าความฝันสั้น ๆ เช่น ฝันเห็นงูใหญ่ในบ้าน",
			dreamLabel: "เล่าความฝันของคุณ", dreamPlaceholder: "พิมพ์สิ่งที่ฝันเห็น...", dreamButton: "ทำนายฝัน",
			dreamDisclaimer: "คำทำนายเป็นความเชื่อและแนวทางเพื่อความบันเทิง ความฝันไม่ได้ยืนยันว่าจะเกิดเหตุการณ์ใดขึ้นจริง",
			resultTitle: "คำทำนายฝันของคุณ",
			shareFacebook: "แชร์บน Facebook", copyReading: "คัดลอกคำทำนาย",
			loading: "กำลังค้นหาและเรียบเรียงคำทำนายฝันของคุณ…",
			empty: "พิมพ์ความฝันของคุณก่อนกดทำนาย",
			error: "ตอนนี้ยังทำนายฝันไม่ได้ ลองใหม่อีกครั้งในอีกสักครู่"
		},
		en: {
			brandName: "Something on your mind? Let’s talk it over with the cards.", visitors: "No. of visitors", navReading: "Tarot reading", navDream: "Dream teller", navPalm: "Palm teller",
			footerBrand: "The Oracle Room",
			disclaimer: "A reading is a moment for reflection, not a substitute for professional advice.",
			dreamTitle: "Dream teller",
			dreamHeroCopy: "Tell us about your dream and get an interpretation to reflect on how you feel.",
			dreamEyebrow: "Dream journal", dreamQuestion: "What did you dream about last night?",
			dreamHint: "Describe it briefly, for example: a big snake in my house.",
			dreamLabel: "Describe your dream", dreamPlaceholder: "Type what you dreamed about...", dreamButton: "Tell my dream",
			dreamDisclaimer: "Interpretations are beliefs and guidance for entertainment only. A dream does not confirm that any event will happen.",
			resultTitle: "Your dream reading",
			shareFacebook: "Share on Facebook", copyReading: "Copy reading",
			loading: "Looking up and interpreting your dream…",
			empty: "Describe your dream first.",
			error: "The dream teller is unavailable right now. Please try again shortly."
		}
	};

	const form = document.getElementById("dream-search-form");
	const input = document.getElementById("dream-search-input");
	const submit = document.getElementById("dream-submit");
	const languageButton = document.getElementById("language-toggle");
	const aiResult = document.getElementById("dream-ai-result");
	const aiTitle = document.getElementById("dream-ai-title");
	const aiBody = document.getElementById("dream-ai-body");
	const shareActions = aiResult.querySelector("[data-share-actions]");
	let language = (function () {
		try { return window.localStorage.getItem("gypsyLanguage") === "en" ? "en" : "th"; } catch (error) { return "th"; }
	}());

	function t(key) {
		return translations[language][key];
	}

	function scrollResultIntoViewOnMobile() {
		if (!window.matchMedia("(max-width: 600px)").matches) {
			return;
		}
		window.requestAnimationFrame(function () {
			aiResult.scrollIntoView({
				behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
				block: "start"
			});
		});
	}

	function showResult(paragraphs, busy, debug, shareable) {
		aiTitle.textContent = t("resultTitle");
		aiTitle.hidden = busy;
		aiResult.classList.toggle("is-loading", busy);
		aiBody.replaceChildren();
		if (busy) {
			const wrap = document.createElement("div");
			wrap.className = "dream-ai-loading";
			const spinner = document.createElement("div");
			spinner.className = "dream-spinner";
			spinner.setAttribute("role", "progressbar");
			spinner.setAttribute("aria-label", paragraphs[0]);
			const icon = document.createElement("span");
			icon.setAttribute("aria-hidden", "true");
			icon.textContent = "☾";
			spinner.appendChild(icon);
			const text = document.createElement("p");
			text.className = "dream-loading-text";
			text.textContent = paragraphs[0];
			wrap.appendChild(spinner);
			wrap.appendChild(text);
			aiBody.appendChild(wrap);
		} else {
			paragraphs.forEach(function (paragraph) {
				const element = document.createElement("p");
				element.textContent = paragraph;
				aiBody.appendChild(element);
			});
		}
		if (debug) {
			const note = document.createElement("p");
			note.className = "dream-debug";
			note.textContent = debug;
			aiBody.appendChild(note);
		}
		aiResult.setAttribute("aria-busy", String(busy));
		aiResult.hidden = false;
		shareActions.hidden = busy || !shareable;
	}

	function setLanguage(next) {
		language = next;
		document.documentElement.lang = language;
		try { window.localStorage.setItem("gypsyLanguage", language); } catch (error) {}
		document.querySelectorAll("[data-i18n]").forEach(function (element) {
			const value = translations[language][element.getAttribute("data-i18n")];
			if (value !== undefined) {
				element.textContent = value;
			}
		});
		document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
			element.placeholder = t(element.getAttribute("data-i18n-placeholder"));
		});
		languageButton.textContent = language === "en" ? "ภาษาไทย" : "English";
		languageButton.setAttribute("aria-label", language === "en" ? "Switch to Thai" : "Switch to English");
		aiTitle.textContent = t("resultTitle");
	}

	languageButton.addEventListener("click", function () {
		setLanguage(language === "en" ? "th" : "en");
	});

	form.addEventListener("submit", async function (event) {
		event.preventDefault();
		const dream = input.value.trim();
		if (!dream) {
			showResult([t("empty")], false);
			input.focus();
			return;
		}
		const requestLanguage = language;
		let lastDebug = "";
		submit.disabled = true;
		showResult([t("loading")], true);
		try {
			const response = await fetch(window.gypsyDreamConfig.restUrl, {
				method: "POST",
				credentials: "omit",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ dream: dream, language: requestLanguage })
			});
			const data = await response.json();
			lastDebug = data && data.debug ? String(data.debug) : "";
			if (!response.ok || !data || typeof data.reading !== "string") {
				throw new Error(data && data.message ? data.message : "HTTP " + response.status);
			}
			showResult(data.reading.split(/\n\s*\n/).map(function (paragraph) {
				return paragraph.trim();
			}).filter(Boolean), false, [data.model, data.debug].filter(Boolean).join(" — "), true);
		} catch (error) {
			console.warn(error);
			showResult([t("error")], false, [lastDebug, error && error.message].filter(Boolean).join(" — "));
		} finally {
			submit.disabled = false;
			scrollResultIntoViewOnMobile();
		}
	});

	setLanguage(language);

	(function loadVisitorCount() {
		const countElement = document.getElementById("visitor-count");
		const config = window.gypsyDreamConfig;
		const counted = (function () {
			try { return window.localStorage.getItem("gypsyVisitorCounted") === "1"; } catch (error) { return false; }
		}());
		function viaRest() {
			const url = config.visitorsUrl + (config.visitorsUrl.indexOf("?") === -1 ? "?" : "&") + "t=" + Date.now();
			return fetch(url, { method: counted ? "GET" : "POST", credentials: "omit", cache: "no-store" }).then(function (response) {
				if (!response.ok) { throw new Error("Visitor counter HTTP " + response.status); }
				return response.json();
			});
		}
		function viaAjax() {
			return fetch(config.ajaxUrl, {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: "action=gypsy_tarot_visitors&increment=" + (counted ? "0" : "1"),
				cache: "no-store"
			}).then(function (response) {
				if (!response.ok) { throw new Error("Visitor counter ajax HTTP " + response.status); }
				return response.json();
			});
		}
		viaRest().catch(function () { return viaAjax(); }).then(function (data) {
			if (!data || typeof data.count !== "number") { throw new Error("Visitor counter bad response"); }
			countElement.textContent = data.count.toLocaleString();
			try { window.localStorage.setItem("gypsyVisitorCounted", "1"); } catch (error) {}
		}).catch(function (error) { console.warn(error); });
	}());
}());
