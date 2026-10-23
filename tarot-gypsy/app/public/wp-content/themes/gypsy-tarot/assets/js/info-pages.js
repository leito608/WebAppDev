(function () {
	"use strict";

	const translations = {
		th: {
			brandName: "มีเรื่องอะไรในใจ มาเปิดไพ่คุยกัน",
			visitors: "ผู้เข้าชม",
			navReading: "อ่านไพ่ทาโรต์",
			navDream: "ทำนายฝัน",
			navPalm: "ดูลายมือ",
			footerBrand: "ดูแม่นๆ (Doomanman.com)",
			disclaimer: "ลองอ่านไพ่เพื่อทบทวนตัวเอง คำทำนายไม่อาจแทนคำแนะนำจากผู้เชี่ยวชาญได้",
			footerPrivacy: "นโยบายความเป็นส่วนตัว",
			footerAbout: "เกี่ยวกับเรา",
			footerContact: "ติดต่อเรา",
			infoEyebrow: "ดูแม่นๆ (Doomanman.com)",
			privacyTitle: "นโยบายความเป็นส่วนตัว",
			privacyIntro: "เราเคารพความเป็นส่วนตัวของคุณ และไม่เก็บข้อมูลที่คุณส่งมาเพื่ออ่านไพ่ไว้บนเว็บไซต์หลังประมวลผล",
			privacyDataTitle: "ข้อมูลที่เราได้รับ",
			privacyDataBody: "เราไม่ต้องสมัครสมาชิกและไม่เก็บคำถาม ไพ่ที่เลือก คำบรรยายความฝัน รูปฝ่ามือ หรือคำทำนายไว้ในบัญชีหรือฐานข้อมูลของเว็บไซต์",
			privacyProcessingTitle: "การประมวลผลคำทำนาย",
			privacyProcessingBody: "เมื่อขอคำทำนาย ระบบจะส่งเฉพาะข้อความหรือรูปภาพที่จำเป็นไปยังผู้ให้บริการ AI (Groq หรือ Google Gemini ตามฟีเจอร์ที่ใช้) เพื่อสร้างผลลัพธ์ ผู้ให้บริการเหล่านั้นประมวลผลข้อมูลตามนโยบายของตนเอง โปรดอย่าส่งข้อมูลที่ละเอียดอ่อนหรือข้อมูลที่ไม่ต้องการเปิดเผย",
			privacyTechnicalTitle: "ข้อมูลทางเทคนิค",
			privacyTechnicalBody: "เราเก็บเพียงจำนวนผู้เข้าชมรวม และอาจใช้ตัวระบุเครือข่ายชั่วคราวเพื่อจำกัดการใช้งานที่ผิดปกติ ซึ่งจะหมดอายุภายในประมาณหนึ่งชั่วโมง ภาษาที่เลือกและสถานะการนับผู้เข้าชมอาจบันทึกไว้ในพื้นที่จัดเก็บของเบราว์เซอร์คุณ บริการโฮสติ้งอาจมีบันทึกการเชื่อมต่อตามการตั้งค่าและนโยบายของผู้ให้บริการ",
			privacyContactTitle: "ติดต่อเรื่องความเป็นส่วนตัว",
			privacyContactBody: "หากมีคำถามเกี่ยวกับนโยบายนี้ ติดต่อเราได้ที่",
			aboutTitle: "เกี่ยวกับเรา",
			aboutIntro: "พื้นที่เล็ก ๆ สำหรับการทบทวนตัวเองผ่านไพ่ทาโรต์ ความฝัน และลายมือ",
			aboutPurposeTitle: "พื้นที่สำหรับการทบทวนใจ",
			aboutPurposeBody: "ดูแม่นๆ (Doomanman.com) เป็นพื้นที่ออนไลน์ที่ชวนให้คุณหยุดพักและมองเรื่องราวในชีวิตผ่านไพ่ทาโรต์ การทำนายฝัน และการดูลายมือ คำอ่านมีไว้เพื่อการสะท้อนความคิดและความบันเทิง ไม่ใช่คำทำนายที่รับประกันผลหรือคำแนะนำจากผู้เชี่ยวชาญ",
			aboutPrivacyTitle: "ความเป็นส่วนตัวสำคัญกับเรา",
			aboutPrivacyBody: "ใช้บริการได้โดยไม่ต้องสร้างบัญชี เราไม่เก็บคำถามหรือข้อมูลที่ส่งมาเพื่อสร้างคำทำนายไว้บนเว็บไซต์หลังประมวลผล ดูรายละเอียดได้ที่",
			aboutPrivacyLink: "นโยบายความเป็นส่วนตัว",
			contactTitle: "ติดต่อเรา",
			contactIntro: "มีคำถามหรือข้อเสนอแนะ ส่งข้อความหาเราได้ทาง LINE",
			contactHeading: "คุยกับเรา",
			contactBody: "หากต้องการสอบถาม แจ้งปัญหา หรือส่งข้อเสนอแนะ ติดต่อเราได้ทาง LINE",
			contactLine: "LINE ID: maroon608"
		},
		en: {
			brandName: "Something on your mind? Let’s talk it over with the cards.",
			visitors: "No. of visitors",
			navReading: "Tarot reading",
			navDream: "Dream teller",
			navPalm: "Palm teller",
			footerBrand: "ดูแม่นๆ (Doomanman.com)",
			disclaimer: "A reading is a moment for reflection, not a substitute for professional advice.",
			footerPrivacy: "Privacy Policy",
			footerAbout: "About Us",
			footerContact: "Contact Us",
			infoEyebrow: "ดูแม่นๆ (Doomanman.com)",
			privacyTitle: "Privacy Policy",
			privacyIntro: "We respect your privacy and do not retain the information you submit for a reading on this site after processing.",
			privacyDataTitle: "Information we receive",
			privacyDataBody: "You do not need an account. We do not save your questions, selected cards, dream descriptions, palm photos, or readings in a website account or database.",
			privacyProcessingTitle: "How readings are processed",
			privacyProcessingBody: "When you request a reading, only the text or images needed to create it are sent to our AI providers (Groq or Google Gemini, depending on the feature). Those providers process the information under their own policies. Please do not submit sensitive information or anything you do not want to share.",
			privacyTechnicalTitle: "Technical information",
			privacyTechnicalBody: "We keep only an aggregate visitor count and may use a temporary network identifier to limit unusual activity; this expires after about one hour. Your language preference and visitor-count status may be stored in your browser. Our hosting provider may keep connection logs under its own settings and policies.",
			privacyContactTitle: "Privacy questions",
			privacyContactBody: "If you have questions about this policy, contact us on",
			aboutTitle: "About Us",
			aboutIntro: "A little space for reflection through tarot, dreams, and palm readings.",
			aboutPurposeTitle: "A space for reflection",
			aboutPurposeBody: "ดูแม่นๆ (Doomanman.com) is an online space to pause and reflect on life through tarot, dream interpretations, and palm readings. Readings are for reflection and entertainment, not guaranteed predictions or professional advice.",
			aboutPrivacyTitle: "Your privacy matters",
			aboutPrivacyBody: "You can use the service without creating an account. We do not keep the questions or information you submit to create a reading on our site after processing. Read more in our",
			aboutPrivacyLink: "Privacy Policy",
			contactTitle: "Contact Us",
			contactIntro: "Have a question or suggestion? Send us a message on LINE.",
			contactHeading: "Get in touch",
			contactBody: "For questions, issues, or suggestions, contact us on LINE.",
			contactLine: "LINE ID: maroon608"
		}
	};

	const languageButton = document.getElementById("language-toggle");
	let language = (function () {
		try { return window.localStorage.getItem("gypsyLanguage") === "en" ? "en" : "th"; } catch (error) { return "th"; }
	}());

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
		languageButton.textContent = language === "en" ? "ภาษาไทย" : "English";
		languageButton.setAttribute("aria-label", language === "en" ? "Switch to Thai" : "Switch to English");

		const titleKey = document.querySelector("#info-title").getAttribute("data-i18n");
		document.title = translations[language][titleKey] + " — ดูแม่นๆ (Doomanman.com)";
	}

	languageButton.addEventListener("click", function () {
		setLanguage(language === "en" ? "th" : "en");
	});

	setLanguage(language);
}());
