<?php
/**
 * Dream interpretation page.
 *
 * @package Gypsy_Tarot
 */

get_header();
?>
<main id="main-content" class="dream-page">
	<section class="dream-hero" aria-labelledby="dream-title">
		<p class="eyebrow" data-i18n="footerBrand">ห้องแห่งคำพยากรณ์</p>
		<h1 id="dream-title" data-i18n="dreamTitle">ทำนายฝัน</h1>
		<p data-i18n="dreamHeroCopy">เล่าความฝันของคุณ แล้วรับคำทำนายเป็นอีกมุมหนึ่งในการทบทวนความรู้สึก</p>
	</section>

	<section class="dream-lookup" aria-labelledby="dream-lookup-title">
		<div class="dream-inner">
			<div class="reading-heading">
				<p class="eyebrow" data-i18n="dreamEyebrow">บันทึกความฝัน</p>
				<h2 id="dream-lookup-title" data-i18n="dreamQuestion">เมื่อคืนคุณฝันเห็นอะไร?</h2>
				<p class="intro-copy" data-i18n="dreamHint">เล่าความฝันสั้น ๆ เช่น ฝันเห็นงูใหญ่ในบ้าน</p>
			</div>
			<form class="dream-search" id="dream-search-form">
				<label class="sr-only" for="dream-search-input" data-i18n="dreamLabel">เล่าความฝันของคุณ</label>
				<input id="dream-search-input" name="dream" type="text" maxlength="600" data-i18n-placeholder="dreamPlaceholder" placeholder="พิมพ์สิ่งที่ฝันเห็น..." autocomplete="off">
				<button class="primary-button" type="submit" id="dream-submit"><span data-i18n="dreamButton">ทำนายฝัน</span> <span aria-hidden="true">✧</span></button>
			</form>
			<section class="dream-ai-result" id="dream-ai-result" aria-live="polite" aria-busy="false" hidden>
				<h3 class="dream-ai-title" id="dream-ai-title"></h3>
				<div class="dream-ai-body" id="dream-ai-body"></div>
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
			<p class="dream-disclaimer" data-i18n="dreamDisclaimer">คำทำนายเป็นความเชื่อและแนวทางเพื่อความบันเทิง ความฝันไม่ได้ยืนยันว่าจะเกิดเหตุการณ์ใดขึ้นจริง</p>
		</div>
	</section>
</main>
<?php
get_footer();
