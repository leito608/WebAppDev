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
		<p class="eyebrow" data-i18n="footerBrand">ดูแม่นๆ (Doomanman.com)</p>
		<h1 id="dream-title" data-i18n="dreamTitle">ทำนายฝัน เลขเด็ด</h1>
		<p data-i18n="dreamHeroCopy">ทำนายฝันฟรี พร้อมอ่านความหมายและแนวทางเลขเด็ด 3 ตัว 2 ตัว เพื่อความบันเทิง</p>
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
	<section class="intro" aria-labelledby="dream-seo-title">
		<p class="eyebrow" data-i18n="dreamSeoEyebrow">ทำนายฝันฟรี</p>
		<h2 id="dream-seo-title" data-i18n="dreamSeoTitle">อ่านความฝันและเลขเด็ดเพื่อความบันเทิง</h2>
		<p class="intro-copy" data-i18n="dreamSeoCopy">พิมพ์รายละเอียดความฝันเพื่ออ่านความหมายในอีกมุมหนึ่ง ระบบอาจแนะนำเลข 3 ตัวและ 2 ตัวประกอบคำทำนาย เลขเหล่านี้เป็นเพียงแนวทางเพื่อความบันเทิง ไม่ใช่การรับประกันผล</p>
	</section>
	<section class="reading-examples" aria-labelledby="dream-examples-title">
		<div class="examples-inner">
			<div class="examples-heading">
				<p class="eyebrow" data-i18n="dreamExamplesEyebrow">ตัวอย่างเพื่อประกอบการอ่าน</p>
				<h2 id="dream-examples-title" data-i18n="dreamExamplesTitle">ตัวอย่างคำทำนายฝัน</h2>
				<p class="intro-copy" data-i18n="dreamExamplesIntro">ตัวอย่างต่อไปนี้เป็นเนื้อหาประกอบที่จัดทำไว้ ไม่ใช่ผลทำนายเฉพาะบุคคลหรือการรับประกันเหตุการณ์และตัวเลข</p>
			</div>
			<div class="example-grid">
				<article class="example-card">
					<p class="example-prompt" data-i18n="dreamExampleOnePrompt">ตัวอย่างความฝัน: ฝันเห็นงูเลื้อยเข้ามาในบ้าน</p>
					<h3 data-i18n="dreamExampleOneTitle">อาจมีการเปลี่ยนแปลงครั้งใหม่เข้ามาในชีวิต</h3>
					<p data-i18n="dreamExampleOneCopy">ความฝันนี้อาจสื่อถึงการเปลี่ยนแปลงที่กำลังจะเกิดขึ้น ไม่ว่าจะเป็นเรื่องงาน ความรัก หรือคนใหม่ ๆ ที่เข้ามาในชีวิต ลองสังเกตสิ่งรอบตัวและเปิดใจรับโอกาสใหม่ ๆ ที่กำลังจะมาถึง</p>
					<p class="example-numbers"><span data-i18n="dreamExampleNumbers">เลขนำโชคเพื่อความบันเทิง</span>: <strong>24</strong> · <strong>48</strong> · <strong>248</strong></p>
				</article>
				<article class="example-card">
					<p class="example-prompt" data-i18n="dreamExampleTwoPrompt">ตัวอย่างความฝัน: ฝันเห็นน้ำใสไหลผ่าน</p>
					<h3 data-i18n="dreamExampleTwoTitle">ถึงเวลาปล่อยวางและเริ่มต้นสิ่งดี ๆ</h3>
					<p data-i18n="dreamExampleTwoCopy">น้ำใสที่ไหลผ่านอาจสื่อถึงความสบายใจและการเปลี่ยนแปลงไปในทางที่ดี หากช่วงนี้มีเรื่องให้กังวล ลองค่อย ๆ ปล่อยวางสิ่งที่ควบคุมไม่ได้ แล้วเปิดโอกาสให้ตัวเองได้เริ่มต้นใหม่อีกครั้ง</p>
					<p class="example-numbers"><span data-i18n="dreamExampleNumbers">เลขนำโชคเพื่อความบันเทิง</span>: <strong>16</strong> · <strong>31</strong> · <strong>316</strong></p>
				</article>
				<article class="example-card">
					<p class="example-prompt" data-i18n="dreamExampleThreePrompt">ตัวอย่างความฝัน: ฝันว่าฟันหลุด</p>
					<h3 data-i18n="dreamExampleThreeTitle">ลองหันมาใส่ใจความรู้สึกของตัวเอง</h3>
					<p data-i18n="dreamExampleThreeCopy">ความฝันนี้อาจสะท้อนถึงความเครียด ความกังวล หรือความไม่มั่นใจบางอย่างในชีวิต หากช่วงนี้รู้สึกเหนื่อยใจ ลองหาเวลาพักผ่อนและพูดคุยกับคนที่ไว้ใจ อย่าเก็บทุกเรื่องมาคิดคนเดียว</p>
					<p class="example-numbers"><span data-i18n="dreamExampleNumbers">เลขนำโชคเพื่อความบันเทิง</span>: <strong>07</strong> · <strong>50</strong> · <strong>507</strong></p>
				</article>
			</div>
		</div>
	</section>
</main>
<?php
get_footer();
