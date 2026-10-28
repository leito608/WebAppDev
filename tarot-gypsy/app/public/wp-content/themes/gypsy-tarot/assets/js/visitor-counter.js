(function () {
	"use strict";

	const config = window.gypsyVisitorConfig;
	const countElement = document.getElementById("visitor-count");
	if (!config || !config.visitorsUrl || !config.ajaxUrl) {
		console.warn("Visitor counter configuration is unavailable.");
		return;
	}

	const counted = (function () {
		try { return window.localStorage.getItem("gypsyVisitorCounted") === "1"; } catch (error) { return false; }
	}());

	function validateResponse(data) {
		if (!data || typeof data.count !== "number" || !Number.isFinite(data.count) || data.count < 0) {
			throw new Error("Visitor counter returned an invalid response.");
		}
		return data;
	}

	function viaRest() {
		const base = config.visitorsUrl;
		const url = base + (base.indexOf("?") === -1 ? "?" : "&") + "t=" + Date.now();
		return fetch(url, {
			method: counted ? "GET" : "POST",
			credentials: "omit",
			cache: "no-store"
		}).then(function (response) {
			if (!response.ok) {
				throw new Error("Visitor counter HTTP " + response.status);
			}
			return response.json();
		}).then(validateResponse);
	}

	function viaAjax() {
		return fetch(config.ajaxUrl, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: "action=gypsy_tarot_visitors&increment=" + (counted ? "0" : "1"),
			cache: "no-store"
		}).then(function (response) {
			if (!response.ok) {
				throw new Error("Visitor counter AJAX HTTP " + response.status);
			}
			return response.json();
		}).then(validateResponse);
	}

	viaRest().catch(function (error) {
		console.warn(error);
		return viaAjax();
	}).then(function (data) {
		if (countElement) {
			countElement.textContent = data.count.toLocaleString();
		}
		try { window.localStorage.setItem("gypsyVisitorCounted", "1"); } catch (error) {}
	}).catch(function (error) {
		console.warn(error);
	});
}());
