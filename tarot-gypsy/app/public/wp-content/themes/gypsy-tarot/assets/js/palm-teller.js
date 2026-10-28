(function () {
	"use strict";

	const MAX_EDGE = 1280;
	const JPEG_QUALITY = 0.82;
	const MAX_SOURCE_BYTES = 12 * 1024 * 1024;

	const translations = {
		th: {
			brandName: "มีเรื่องอะไรในใจ มาเปิดไพ่คุยกัน", visitors: "ผู้เข้าชม",
			navReading: "อ่านไพ่ทาโรต์", navDream: "ทำนายฝัน", navPalm: "ดูลายมือ", navLekded: "เลขเด็ด",
			footerBrand: "ดูแม่นๆ (Doomanman.com)",
			footerPrivacy: "นโยบายความเป็นส่วนตัว", footerAbout: "เกี่ยวกับเรา", footerContact: "ติดต่อเรา",
			disclaimer: "ลองอ่านไพ่เพื่อทบทวนตัวเอง คำทำนายไม่อาจแทนคำแนะนำจากผู้เชี่ยวชาญได้",
			palmTitle: "ดูลายมือฟรี",
			palmHeroCopy: "อัปโหลดรูปฝ่ามือเพื่ออ่านลายมือฟรีด้วย AI ใช้เป็นแนวทางเพื่อความบันเทิงและทบทวนตัวเอง",
			palmEyebrow: "อ่านลายมือ", palmQuestion: "ส่งรูปฝ่ามือของคุณ",
			palmHint: "ถ่ายฝ่ามือให้ชัด แสงพอ นิ้วชิดกัน และให้ฝ่ามือเต็มกรอบภาพ",
			palmSeoEyebrow: "ดูลายมือฟรี", palmSeoTitle: "อ่านลายมือจากรูปฝ่ามือของคุณ",
			palmSeoCopy: "อัปโหลดภาพฝ่ามือที่ชัดเจนเพื่อรับคำอ่านลายมือด้วย AI โดยไม่ต้องสมัครสมาชิก ผลการอ่านเป็นแนวทางเพื่อความบันเทิงและทบทวนตัวเอง ไม่ใช่คำทำนายที่รับประกันผลหรือคำแนะนำจากผู้เชี่ยวชาญ",
			palmDropTitle: "เลือกหรือวางรูปฝ่ามือ",
			palmDropMeta: "รองรับ JPEG, PNG, WebP",
			palmQuestionLabel: "มีเรื่องอะไรอยากถามจากลายมือ?",
			palmQuestionPlaceholder: "เล่าคำถามหรือเรื่องที่อยากรู้ได้เลย (ไม่บังคับ)",
			palmBirthLabel: "วันเกิดของคุณ เป็น ค.ศ. (ไม่บังคับ) (ตัวอย่าง: 31/12/1990)",
			palmHandLabel: "มือที่ถ่าย", palmHandRight: "มือขวา", palmHandLeft: "มือซ้าย",
			palmButton: "ดูลายมือ",
			palmDisclaimer: "คำทำนายลายมือเป็นความเชื่อและแนวทางเพื่อความบันเทิง ไม่ใช่คำทำนายที่รับประกันผล และไม่ใช่คำแนะนำทางการแพทย์หรือวิชาชีพ",
			resultTitle: "คำทำนายลายมือของคุณ",
			shareFacebook: "แชร์บน Facebook", copyReading: "คัดลอกคำทำนาย",
			loading: "กำลังอ่านลายมือจากรูปของคุณ…",
			empty: "เลือกรูปฝ่ามือก่อนกดดูลายมือ",
			badType: "รองรับเฉพาะไฟล์รูป JPEG, PNG หรือ WebP",
			tooLarge: "ไฟล์ใหญ่เกินไป ลองเลือกรูปที่เล็กกว่า 12 MB",
			badBirth: "รูปแบบวันเกิดไม่ถูกต้อง กรุณากรอกเป็น วว/ดด/ปปปป (ค.ศ.) เช่น 31/12/1990",
			error: "ตอนนี้ยังดูลายมือไม่ได้ ลองใหม่อีกครั้งในอีกสักครู่"
		},
		en: {
			brandName: "Something on your mind? Let’s talk it over with the cards.", visitors: "No. of visitors",
			navReading: "Tarot reading", navDream: "Dream teller", navPalm: "Palm teller", navLekded: "Lucky numbers",
			footerBrand: "ดูแม่นๆ (Doomanman.com)",
			footerPrivacy: "Privacy Policy", footerAbout: "About Us", footerContact: "Contact Us",
			disclaimer: "A reading is a moment for reflection, not a substitute for professional advice.",
			palmTitle: "Free palm reading",
			palmHeroCopy: "Upload a palm photo for a free AI palm reading, for entertainment and personal reflection.",
			palmEyebrow: "Palm reading", palmQuestion: "Share a photo of your palm",
			palmHint: "Use a clear, well-lit photo of an open palm with fingers together, filling the frame.",
			palmSeoEyebrow: "Free palm reading", palmSeoTitle: "Read your palm from a photo",
			palmSeoCopy: "Upload a clear palm photo for an AI-assisted reading without creating an account. Readings are for entertainment and reflection, not guaranteed predictions or professional advice.",
			palmDropTitle: "Choose or drop a palm photo",
			palmDropMeta: "JPEG, PNG, or WebP",
			palmQuestionLabel: "What would you like to ask from your palm?",
			palmQuestionPlaceholder: "Share a question or a little context (optional).",
			palmBirthLabel: "Your date of birth, in CE/AD years (optional) (example: 31/12/1990)",
			palmHandLabel: "Which hand is in the photo?", palmHandRight: "Right hand", palmHandLeft: "Left hand",
			palmButton: "Read my palm",
			palmDisclaimer: "Palm readings are beliefs and guidance for entertainment only. They are not guaranteed predictions and are not medical or professional advice.",
			resultTitle: "Your palm reading",
			shareFacebook: "Share on Facebook", copyReading: "Copy reading",
			loading: "Reading the lines in your palm photo…",
			empty: "Choose a palm photo first.",
			badType: "Please use a JPEG, PNG, or WebP image.",
			tooLarge: "That file is too large. Please choose an image under 12 MB.",
			badBirth: "Invalid date of birth. Please use DD/MM/YYYY in CE/AD years, for example 31/12/1990.",
			error: "The palm teller is unavailable right now. Please try again shortly."
		}
	};

	const form = document.getElementById("palm-form");
	const input = document.getElementById("palm-image-input");
	const questionInput = document.getElementById("palm-question-input");
	const birthInput = document.getElementById("palm-birth-input");
	const calendarButton = document.getElementById("palm-calendar-button");
	const calendarNative = document.getElementById("palm-calendar-native");
	const dropzone = document.getElementById("palm-dropzone");
	const preview = document.getElementById("palm-preview");
	const submit = document.getElementById("palm-submit");
	const languageButton = document.getElementById("language-toggle");
	const aiResult = document.getElementById("palm-ai-result");
	const aiTitle = document.getElementById("palm-ai-title");
	const aiBody = document.getElementById("palm-ai-body");
	const shareActions = aiResult.querySelector("[data-share-actions]");
	let language = (function () {
		try { return window.localStorage.getItem("gypsyLanguage") === "en" ? "en" : "th"; } catch (error) { return "th"; }
	}());
	let pendingImage = null;

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

	// Accepts DD/MM/YYYY (also - or . separators, or YYYY-MM-DD). Buddhist-era years are converted. Returns ISO date, "" when empty, or null when invalid.
	function parseBirthDate(value) {
		const text = (value || "").trim();
		if (!text) { return ""; }
		let match = /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/.exec(text);
		let day, month, year;
		if (match) {
			day = Number(match[1]); month = Number(match[2]); year = Number(match[3]);
		} else if ((match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text))) {
			year = Number(match[1]); month = Number(match[2]); day = Number(match[3]);
		} else {
			return null;
		}
		if (year > 2400) { year -= 543; }
		const date = new Date(Date.UTC(year, month - 1, day));
		if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day || year < 1900 || date > new Date()) {
			return null;
		}
		return date.toISOString().slice(0, 10);
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

	function clearPending() {
		pendingImage = null;
		submit.disabled = true;
		preview.hidden = true;
		preview.removeAttribute("src");
		dropzone.classList.remove("has-image");
	}

	function loadImageElement(file) {
		return new Promise(function (resolve, reject) {
			const url = URL.createObjectURL(file);
			const image = new Image();
			image.onload = function () {
				URL.revokeObjectURL(url);
				resolve(image);
			};
			image.onerror = function () {
				URL.revokeObjectURL(url);
				reject(new Error("image_load_failed"));
			};
			image.src = url;
		});
	}

	function canvasToJpegBase64(canvas) {
		return new Promise(function (resolve, reject) {
			canvas.toBlob(function (blob) {
				if (!blob) {
					reject(new Error("encode_failed"));
					return;
				}
				const reader = new FileReader();
				reader.onload = function () {
					const result = String(reader.result || "");
					const comma = result.indexOf(",");
					resolve(comma >= 0 ? result.slice(comma + 1) : result);
				};
				reader.onerror = function () { reject(new Error("read_failed")); };
				reader.readAsDataURL(blob);
			}, "image/jpeg", JPEG_QUALITY);
		});
	}

	async function prepareImage(file) {
		if (!file || !/^image\/(jpeg|png|webp)$/i.test(file.type)) {
			throw new Error("badType");
		}
		if (file.size > MAX_SOURCE_BYTES) {
			throw new Error("tooLarge");
		}
		const image = await loadImageElement(file);
		const scale = Math.min(1, MAX_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
		const width = Math.max(1, Math.round(image.naturalWidth * scale));
		const height = Math.max(1, Math.round(image.naturalHeight * scale));
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const context = canvas.getContext("2d");
		context.drawImage(image, 0, 0, width, height);
		const data = await canvasToJpegBase64(canvas);
		return {
			mimeType: "image/jpeg",
			data: data,
			previewUrl: canvas.toDataURL("image/jpeg", JPEG_QUALITY)
		};
	}

	async function acceptFile(file) {
		try {
			const prepared = await prepareImage(file);
			pendingImage = { mimeType: prepared.mimeType, data: prepared.data };
			preview.src = prepared.previewUrl;
			preview.hidden = false;
			dropzone.classList.add("has-image");
			submit.disabled = false;
		} catch (error) {
			clearPending();
			const key = error && error.message === "tooLarge" ? "tooLarge" : error && error.message === "badType" ? "badType" : "badType";
			showResult([t(key)], false);
		}
	}

	// Inserts "/" automatically while typing; keeps slashes the user types themselves.
	function formatBirthInput(raw, deleting) {
		const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw.trim());
		if (iso) { return iso[3] + "/" + iso[2] + "/" + iso[1]; }
		const cleaned = raw.replace(/[.\-]/g, "/").replace(/[^\d/]/g, "").replace(/\/{2,}/g, "/").replace(/^\//, "");
		const parts = cleaned.split("/").slice(0, 3);
		for (let i = 0; i < 2; i++) {
			if (parts[i] && parts[i].length > 2) {
				parts.splice(i + 1, 0, parts[i].slice(2));
				parts[i] = parts[i].slice(0, 2);
			}
		}
		const fields = parts.slice(0, 3);
		if (fields[2]) { fields[2] = fields[2].slice(0, 4); }
		let out = fields.join("/");
		if (!deleting && fields.length < 3 && fields[fields.length - 1].length === 2) { out += "/"; }
		return out;
	}

	birthInput.addEventListener("input", function (event) {
		const deleting = Boolean(event.inputType && event.inputType.indexOf("delete") === 0);
		const formatted = formatBirthInput(birthInput.value, deleting);
		if (formatted !== birthInput.value) { birthInput.value = formatted; }
	});

	calendarNative.max = new Date().toISOString().slice(0, 10);
	calendarButton.addEventListener("click", function () {
		const current = parseBirthDate(birthInput.value);
		calendarNative.value = current || "";
		if (typeof calendarNative.showPicker === "function") {
			try { calendarNative.showPicker(); return; } catch (error) {}
		}
		calendarNative.focus();
	});
	calendarNative.addEventListener("change", function () {
		const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(calendarNative.value);
		if (match) { birthInput.value = match[3] + "/" + match[2] + "/" + match[1]; }
	});

	languageButton.addEventListener("click", function () {
		setLanguage(language === "en" ? "th" : "en");
	});

	input.addEventListener("change", function () {
		const file = input.files && input.files[0];
		if (file) {
			acceptFile(file);
		}
	});

	["dragenter", "dragover"].forEach(function (eventName) {
		dropzone.addEventListener(eventName, function (event) {
			event.preventDefault();
			dropzone.classList.add("is-dragging");
		});
	});
	["dragleave", "drop"].forEach(function (eventName) {
		dropzone.addEventListener(eventName, function (event) {
			event.preventDefault();
			dropzone.classList.remove("is-dragging");
		});
	});
	dropzone.addEventListener("drop", function (event) {
		const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
		if (file) {
			acceptFile(file);
		}
	});

	form.addEventListener("submit", async function (event) {
		event.preventDefault();
		if (!pendingImage) {
			showResult([t("empty")], false);
			input.focus();
			return;
		}
		const birthDate = parseBirthDate(birthInput.value);
		if (birthDate === null) {
			showResult([t("badBirth")], false);
			birthInput.focus();
			return;
		}
		const requestLanguage = language;
		let lastDebug = "";
		submit.disabled = true;
		showResult([t("loading")], true);
		try {
			const response = await fetch(window.gypsyPalmConfig.restUrl, {
				method: "POST",
				credentials: "omit",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					image: pendingImage.data,
					mimeType: pendingImage.mimeType,
					language: requestLanguage,
					question: (questionInput.value || "").trim(),
					birthDate: birthDate,
					hand: (form.querySelector('input[name="hand"]:checked') || {}).value || ""
				})
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
			submit.disabled = !pendingImage;
			scrollResultIntoViewOnMobile();
		}
	});

	setLanguage(language);
}());
