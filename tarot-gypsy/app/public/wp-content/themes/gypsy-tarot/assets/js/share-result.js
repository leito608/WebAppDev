(function () {
	"use strict";

	const messages = {
		en: {
			copied: "Reading copied. Paste it into Facebook, Instagram, or another app.",
			chooseFacebook: "Choose Facebook in the share menu to create your post.",
			facebookCopied: "Reading copied. Paste it into Facebook's post box before sharing.",
			facebookCopyFailed: "Facebook opened, but the reading could not be copied. Use Copy reading, then paste it into the post.",
			failed: "Could not share or copy the reading. Please try again."
		},
		th: {
			copied: "คัดลอกคำทำนายแล้ว นำไปวางเพื่อแชร์ใน Facebook, Instagram หรือแอปอื่นได้เลย",
			chooseFacebook: "เลือก Facebook จากเมนูแชร์เพื่อสร้างโพสต์",
			facebookCopied: "คัดลอกคำทำนายแล้ว วางข้อความในช่องโพสต์ Facebook ก่อนกดแชร์",
			facebookCopyFailed: "เปิด Facebook แล้ว แต่คัดลอกคำทำนายไม่สำเร็จ กรุณากดคัดลอกคำทำนายแล้วนำไปวางในโพสต์",
			failed: "แชร์หรือคัดลอกคำทำนายไม่สำเร็จ กรุณาลองอีกครั้ง"
		}
	};

	function getReadingText(result) {
		const content = result.cloneNode(true);
		content.querySelectorAll(".share-result-actions, .reading-note, .dream-debug, .ai-debug").forEach(function (element) {
			element.remove();
		});
		const text = content.innerText || content.textContent || "";
		return text.replace(/\n{3,}/g, "\n\n").trim();
	}

	function getShareText(result) {
		return [getReadingText(result), window.location.href].filter(Boolean).join("\n\n");
	}

	function isMobileDevice() {
		const userAgent = navigator.userAgent || "";
		const isIPadOS = /Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1;
		return Boolean(
			(navigator.userAgentData && navigator.userAgentData.mobile) ||
			/Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(userAgent) ||
			isIPadOS
		);
	}

	async function copyText(text) {
		if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
			try {
				await navigator.clipboard.writeText(text);
				return;
			} catch (error) {
				console.warn("Clipboard API could not copy the reading; trying the compatibility fallback.", error);
			}
		}

		const textarea = document.createElement("textarea");
		textarea.value = text;
		textarea.setAttribute("readonly", "");
		textarea.style.position = "fixed";
		textarea.style.opacity = "0";
		document.body.appendChild(textarea);
		let copied = false;
		try {
			textarea.select();
			copied = document.execCommand("copy");
		} finally {
			textarea.remove();
		}
		if (!copied) {
			throw new Error("The browser could not copy the reading to the clipboard");
		}
	}

	document.addEventListener("click", async function (event) {
		const target = event.target instanceof Element ? event.target : null;
		const button = target && target.closest("[data-share-facebook], [data-copy-reading]");
		if (!button || button.disabled) {
			return;
		}
		const result = button.closest(".result, .dream-ai-result");
		const status = result && result.querySelector("[data-share-status]");
		if (!result || !status) {
			return;
		}

		const language = document.documentElement.lang === "th" ? "th" : "en";
		status.textContent = "";
		button.disabled = true;

		if (button.hasAttribute("data-share-facebook")) {
			if (isMobileDevice() && typeof navigator.share === "function") {
				status.textContent = messages[language].chooseFacebook;
				try {
					await navigator.share({
						title: document.title,
						text: getReadingText(result),
						url: window.location.href
					});
				} catch (error) {
					if (error && error.name === "AbortError") {
						status.textContent = "";
					} else {
						console.warn("Unable to open the device share menu.", error);
						status.textContent = messages[language].failed;
					}
				} finally {
					button.disabled = false;
				}
				return;
			}

			const shareUrl = new URL("https://www.facebook.com/sharer/sharer.php");
			shareUrl.searchParams.set("u", window.location.href);
			shareUrl.searchParams.set("quote", getReadingText(result));
			const copyPromise = copyText(getReadingText(result));
			window.open(shareUrl.toString(), "_blank", "noopener,noreferrer");
			try {
				await copyPromise;
				status.textContent = messages[language].facebookCopied;
			} catch (error) {
				console.warn("Unable to copy the reading for Facebook.", error);
				status.textContent = messages[language].facebookCopyFailed;
			} finally {
				button.disabled = false;
			}
			return;
		}

		try {
			await copyText(getShareText(result));
			status.textContent = messages[language].copied;
		} catch (error) {
			console.warn("Unable to copy the reading.", error);
			status.textContent = messages[language].failed;
		} finally {
			button.disabled = false;
		}
	});
}());
