<?php
/**
 * Palm reading page.
 *
 * @package Gypsy_Tarot
 */

get_header();
?>
<main id="main-content" class="dream-page palm-page">
	<section class="dream-hero" aria-labelledby="palm-title">
		<p class="eyebrow" data-i18n="footerBrand">ดูแม่นๆ (Doomanman.com)</p>
		<h1 id="palm-title" data-i18n="palmTitle">ดูลายมือฟรี</h1>
		<p data-i18n="palmHeroCopy">อัปโหลดรูปฝ่ามือเพื่ออ่านลายมือฟรีด้วย AI ใช้เป็นแนวทางเพื่อความบันเทิงและทบทวนตัวเอง</p>
	</section>

	<section class="dream-lookup" aria-labelledby="palm-lookup-title">
		<div class="dream-inner">
			<div class="reading-heading">
				<p class="eyebrow" data-i18n="palmEyebrow">อ่านลายมือ</p>
				<h2 id="palm-lookup-title" data-i18n="palmQuestion">ส่งรูปฝ่ามือของคุณ</h2>
				<p class="intro-copy" data-i18n="palmHint">ถ่ายฝ่ามือให้ชัด แสงพอ นิ้วชิดกัน และให้ฝ่ามือเต็มกรอบภาพ</p>
			</div>
			<form class="palm-form" id="palm-form">
				<label class="palm-question-label" for="palm-question-input" data-i18n="palmQuestionLabel">มีเรื่องอะไรอยากถามจากลายมือ?</label>
				<textarea class="palm-question-input" id="palm-question-input" name="question" rows="3" maxlength="600" data-i18n-placeholder="palmQuestionPlaceholder" placeholder="เล่าคำถามหรือเรื่องที่อยากรู้ได้เลย (ไม่บังคับ)"></textarea>
				<label class="palm-question-label" for="palm-birth-input" data-i18n="palmBirthLabel">วันเกิดของคุณ เป็น ค.ศ. (ไม่บังคับ) (ตัวอย่าง: 31/12/1990)</label>
				<div class="palm-birth-row">
					<input class="palm-question-input palm-birth-input" id="palm-birth-input" name="birthDate" type="text" inputmode="numeric" maxlength="10" placeholder="DD/MM/YYYY (31/12/1990)" autocomplete="bday">
					<button class="palm-calendar-button" type="button" id="palm-calendar-button" aria-label="เลือกวันที่จากปฏิทิน">📅</button>
					<input class="palm-calendar-native" id="palm-calendar-native" type="date" min="1900-01-01" tabindex="-1" aria-hidden="true">
				</div>
				<fieldset class="palm-hand-group">
					<legend class="palm-question-label" data-i18n="palmHandLabel">มือที่ถ่าย</legend>
					<label class="palm-hand-option"><input type="radio" name="hand" value="right" checked> <span data-i18n="palmHandRight">มือขวา</span></label>
					<label class="palm-hand-option"><input type="radio" name="hand" value="left"> <span data-i18n="palmHandLeft">มือซ้าย</span></label>
				</fieldset>
				<label class="palm-dropzone" for="palm-image-input" id="palm-dropzone">
					<input id="palm-image-input" name="palm" type="file" accept="image/jpeg,image/png,image/webp,image/*">
					<span class="palm-dropzone-copy">
						<span class="palm-dropzone-title" data-i18n="palmDropTitle">เลือกหรือวางรูปฝ่ามือ</span>
						<span class="palm-dropzone-meta" data-i18n="palmDropMeta">รองรับ JPEG, PNG, WebP</span>
					</span>
					<img class="palm-preview" id="palm-preview" alt="" hidden>
				</label>
				<button class="primary-button" type="submit" id="palm-submit" disabled>
					<span data-i18n="palmButton">ดูลายมือ</span>
					<span aria-hidden="true">✧</span>
				</button>
			</form>
			<section class="dream-ai-result" id="palm-ai-result" aria-live="polite" aria-busy="false" hidden>
				<h3 class="dream-ai-title" id="palm-ai-title"></h3>
				<div class="dream-ai-body" id="palm-ai-body"></div>
				<div class="share-result-actions" data-share-actions hidden>
					<button class="share-result-button share-facebook-button" type="button" data-share-facebook>
						<span data-i18n="shareFacebook">แชร์บน Facebook</span>
						<span aria-hidden="true">↗</span>
					</button>
					<button class="share-result-button share-copy-button" type="button" data-copy-reading>
						<span data-i18n="copyReading">คัดลอกคำทำนาย</span>
					</button>
					<p class="share-result-status" data-share-status aria-live="polite"></p>
				</div>
			</section>
			<p class="dream-disclaimer" data-i18n="palmDisclaimer">คำทำนายลายมือเป็นความเชื่อและแนวทางเพื่อความบันเทิง ไม่ใช่คำทำนายที่รับประกันผล และไม่ใช่คำแนะนำทางการแพทย์หรือวิชาชีพ</p>
		</div>
	</section>
	<section class="intro" aria-labelledby="palm-seo-title">
		<p class="eyebrow" data-i18n="palmSeoEyebrow">ดูลายมือฟรี</p>
		<h2 id="palm-seo-title" data-i18n="palmSeoTitle">อ่านลายมือจากรูปฝ่ามือของคุณ</h2>
		<p class="intro-copy" data-i18n="palmSeoCopy">อัปโหลดภาพฝ่ามือที่ชัดเจนเพื่อรับคำอ่านลายมือด้วย AI โดยไม่ต้องสมัครสมาชิก ผลการอ่านเป็นแนวทางเพื่อความบันเทิงและทบทวนตัวเอง ไม่ใช่คำทำนายที่รับประกันผลหรือคำแนะนำจากผู้เชี่ยวชาญ</p>
	</section>
</main>
<?php
get_footer();
