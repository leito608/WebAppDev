(function () {
	"use strict";

	const translations = {
		th: {
			brandName: "มีเรื่องอะไรในใจ มาเปิดไพ่คุยกัน", visitors: "ผู้เข้าชม", navReading: "อ่านไพ่ทาโรต์", navDream: "ทำนายฝัน", navPalm: "ดูลายมือ", navLekded: "เลขเด็ด",
			footerBrand: "ดูแม่นๆ (Doomanman.com)",
			footerPrivacy: "นโยบายความเป็นส่วนตัว", footerAbout: "เกี่ยวกับเรา", footerContact: "ติดต่อเรา",
			disclaimer: "ลองอ่านไพ่เพื่อทบทวนตัวเอง คำทำนายไม่อาจแทนคำแนะนำจากผู้เชี่ยวชาญได้",
			dreamTitle: "ทำนายฝัน เลขเด็ด",
			dreamHeroCopy: "ทำนายฝันฟรี พร้อมอ่านความหมายและแนวทางเลขเด็ด 3 ตัว 2 ตัว เพื่อความบันเทิง",
			dreamEyebrow: "บันทึกความฝัน", dreamQuestion: "เมื่อคืนคุณฝันเห็นอะไร?",
			dreamHint: "เล่าความฝันสั้น ๆ เช่น ฝันเห็นงูใหญ่ในบ้าน",
			dreamSeoEyebrow: "ทำนายฝันฟรี", dreamSeoTitle: "อ่านความฝันและเลขเด็ดเพื่อความบันเทิง",
			dreamSeoCopy: "พิมพ์รายละเอียดความฝันเพื่ออ่านความหมายในอีกมุมหนึ่ง ระบบอาจแนะนำเลข 3 ตัวและ 2 ตัวประกอบคำทำนาย เลขเหล่านี้เป็นเพียงแนวทางเพื่อความบันเทิง ไม่ใช่การรับประกันผล",
			dreamExamplesEyebrow: "ตัวอย่างเพื่อประกอบการอ่าน", dreamExamplesTitle: "ตัวอย่างคำทำนายฝัน",
			dreamExamplesIntro: "ตัวอย่างต่อไปนี้เป็นเนื้อหาประกอบที่จัดทำไว้ ไม่ใช่ผลทำนายเฉพาะบุคคลหรือการรับประกันเหตุการณ์และตัวเลข",
			dreamExampleOnePrompt: "ตัวอย่างความฝัน: ฝันเห็นงูเลื้อยเข้ามาในบ้าน",
			dreamExampleOneTitle: "อาจมีการเปลี่ยนแปลงครั้งใหม่เข้ามาในชีวิต",
			dreamExampleOneCopy: "ความฝันนี้อาจสื่อถึงการเปลี่ยนแปลงที่กำลังจะเกิดขึ้น ไม่ว่าจะเป็นเรื่องงาน ความรัก หรือคนใหม่ ๆ ที่เข้ามาในชีวิต ลองสังเกตสิ่งรอบตัวและเปิดใจรับโอกาสใหม่ ๆ ที่กำลังจะมาถึง",
			dreamExampleTwoPrompt: "ตัวอย่างความฝัน: ฝันเห็นน้ำใสไหลผ่าน",
			dreamExampleTwoTitle: "ถึงเวลาปล่อยวางและเริ่มต้นสิ่งดี ๆ",
			dreamExampleTwoCopy: "น้ำใสที่ไหลผ่านอาจสื่อถึงความสบายใจและการเปลี่ยนแปลงไปในทางที่ดี หากช่วงนี้มีเรื่องให้กังวล ลองค่อย ๆ ปล่อยวางสิ่งที่ควบคุมไม่ได้ แล้วเปิดโอกาสให้ตัวเองได้เริ่มต้นใหม่อีกครั้ง",
			dreamExampleThreePrompt: "ตัวอย่างความฝัน: ฝันว่าฟันหลุด",
			dreamExampleThreeTitle: "ลองหันมาใส่ใจความรู้สึกของตัวเอง",
			dreamExampleThreeCopy: "ความฝันนี้อาจสะท้อนถึงความเครียด ความกังวล หรือความไม่มั่นใจบางอย่างในชีวิต หากช่วงนี้รู้สึกเหนื่อยใจ ลองหาเวลาพักผ่อนและพูดคุยกับคนที่ไว้ใจ อย่าเก็บทุกเรื่องมาคิดคนเดียว",
			dreamExampleNumbers: "เลขนำโชคเพื่อความบันเทิง",
			dreamLabel: "เล่าความฝันของคุณ", dreamPlaceholder: "พิมพ์สิ่งที่ฝันเห็น...", dreamButton: "ทำนายฝัน",
			dreamDisclaimer: "คำทำนายเป็นความเชื่อและแนวทางเพื่อความบันเทิง ความฝันไม่ได้ยืนยันว่าจะเกิดเหตุการณ์ใดขึ้นจริง",
			resultTitle: "คำทำนายฝันของคุณ",
			shareFacebook: "แชร์บน Facebook", copyReading: "คัดลอกคำทำนาย",
			loading: "กำลังค้นหาและเรียบเรียงคำทำนายฝันของคุณ…",
			empty: "พิมพ์ความฝันของคุณก่อนกดทำนาย",
			error: "ตอนนี้ยังทำนายฝันไม่ได้ ลองใหม่อีกครั้งในอีกสักครู่"
		},
		en: {
			brandName: "Something on your mind? Let’s talk it over with the cards.", visitors: "No. of visitors", navReading: "Tarot reading", navDream: "Dream teller", navPalm: "Palm teller", navLekded: "Lucky numbers",
			footerBrand: "ดูแม่นๆ (Doomanman.com)",
			footerPrivacy: "Privacy Policy", footerAbout: "About Us", footerContact: "Contact Us",
			disclaimer: "A reading is a moment for reflection, not a substitute for professional advice.",
			dreamTitle: "Dream interpretation",
			dreamHeroCopy: "Get a free dream interpretation with suggested three- and two-digit numbers for entertainment.",
			dreamEyebrow: "Dream journal", dreamQuestion: "What did you dream about last night?",
			dreamHint: "Describe it briefly, for example: a big snake in my house.",
			dreamSeoEyebrow: "Free dream interpretation", dreamSeoTitle: "Dream meanings and suggested numbers for entertainment",
			dreamSeoCopy: "Describe your dream to explore a possible interpretation. The reading may include suggested three- and two-digit numbers for entertainment only; outcomes are not guaranteed.",
			dreamExamplesEyebrow: "Illustrative examples", dreamExamplesTitle: "Sample dream interpretations",
			dreamExamplesIntro: "These prepared examples are for illustration only. They are not personalized readings or guarantees about events or numbers.",
			dreamExampleOnePrompt: "Example dream: A snake slithers into your house",
			dreamExampleOneTitle: "A new change may be entering your life",
			dreamExampleOneCopy: "This dream may point to a change ahead, whether in work, love, or someone new entering your life. Notice what is happening around you and stay open to new opportunities.",
			dreamExampleTwoPrompt: "Example dream: Clear water flows by",
			dreamExampleTwoTitle: "It may be time to let go and begin something good",
			dreamExampleTwoCopy: "Flowing clear water may suggest peace of mind and positive change. If something has been worrying you, consider letting go of what you cannot control and giving yourself a chance to start again.",
			dreamExampleThreePrompt: "Example dream: Your teeth fall out",
			dreamExampleThreeTitle: "Take a moment to care for your own feelings",
			dreamExampleThreeCopy: "This dream may reflect stress, worry, or uncertainty in your life. If you have been feeling tired, make time to rest and talk with someone you trust instead of carrying everything alone.",
			dreamExampleNumbers: "Lucky numbers for entertainment",
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
}());
