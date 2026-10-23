<?php
/**
 * Privacy, about, and contact pages.
 *
 * @package Gypsy_Tarot
 */

$info_page = get_query_var( 'gypsy_tarot_info_page' );
get_header();
?>
<main id="main-content" class="dream-page info-page">
	<section class="dream-hero" aria-labelledby="info-title">
		<p class="eyebrow" data-i18n="infoEyebrow">ดูแม่นๆ (Doomanman.com)</p>
		<?php if ( 'privacy-policy' === $info_page ) : ?>
			<h1 id="info-title" data-i18n="privacyTitle">นโยบายความเป็นส่วนตัว</h1>
			<p data-i18n="privacyIntro">เราเคารพความเป็นส่วนตัวของคุณ และไม่เก็บข้อมูลที่คุณส่งมาเพื่ออ่านไพ่</p>
		<?php elseif ( 'about-us' === $info_page ) : ?>
			<h1 id="info-title" data-i18n="aboutTitle">เกี่ยวกับเรา</h1>
			<p data-i18n="aboutIntro">พื้นที่เล็ก ๆ สำหรับการทบทวนตัวเองผ่านไพ่ทาโรต์ ความฝัน และลายมือ</p>
		<?php else : ?>
			<h1 id="info-title" data-i18n="contactTitle">ติดต่อเรา</h1>
			<p data-i18n="contactIntro">มีคำถามหรือข้อเสนอแนะ ส่งข้อความหาเราได้ทาง LINE</p>
		<?php endif; ?>
	</section>

	<section class="dream-lookup" aria-label="Page information">
		<div class="dream-inner info-content">
			<?php if ( 'privacy-policy' === $info_page ) : ?>
				<section class="info-section">
					<h2 data-i18n="privacyDataTitle">ข้อมูลที่เราได้รับ</h2>
					<p data-i18n="privacyDataBody">เราไม่ต้องสมัครสมาชิกและไม่เก็บคำถาม ไพ่ที่เลือก คำบรรยายความฝัน รูปฝ่ามือ หรือคำทำนายไว้ในบัญชีหรือฐานข้อมูลของเว็บไซต์</p>
				</section>
				<section class="info-section">
					<h2 data-i18n="privacyProcessingTitle">การประมวลผลคำทำนาย</h2>
					<p data-i18n="privacyProcessingBody">เมื่อขอคำทำนาย ระบบจะส่งเฉพาะข้อความหรือรูปภาพที่จำเป็นไปยังผู้ให้บริการ AI (Groq หรือ Google Gemini ตามฟีเจอร์ที่ใช้) เพื่อสร้างผลลัพธ์ ผู้ให้บริการเหล่านั้นประมวลผลข้อมูลตามนโยบายของตนเอง โปรดอย่าส่งข้อมูลที่ละเอียดอ่อนหรือข้อมูลที่ไม่ต้องการเปิดเผย</p>
				</section>
				<section class="info-section">
					<h2 data-i18n="privacyTechnicalTitle">ข้อมูลทางเทคนิค</h2>
					<p data-i18n="privacyTechnicalBody">เราเก็บเพียงจำนวนผู้เข้าชมรวม และอาจใช้ตัวระบุเครือข่ายชั่วคราวเพื่อจำกัดการใช้งานที่ผิดปกติ ซึ่งจะหมดอายุภายในประมาณหนึ่งชั่วโมง ภาษาที่เลือกและสถานะการนับผู้เข้าชมอาจบันทึกไว้ในพื้นที่จัดเก็บของเบราว์เซอร์คุณ บริการโฮสติ้งอาจมีบันทึกการเชื่อมต่อตามการตั้งค่าและนโยบายของผู้ให้บริการ</p>
				</section>
				<section class="info-section">
					<h2 data-i18n="privacyContactTitle">ติดต่อเรื่องความเป็นส่วนตัว</h2>
					<p><span data-i18n="privacyContactBody">หากมีคำถามเกี่ยวกับนโยบายนี้ ติดต่อเราได้ที่</span> <a href="https://line.me/ti/p/~maroon608" data-i18n="contactLine">LINE ID: maroon608</a></p>
				</section>
			<?php elseif ( 'about-us' === $info_page ) : ?>
				<section class="info-section">
					<h2 data-i18n="aboutPurposeTitle">พื้นที่สำหรับการทบทวนใจ</h2>
					<p data-i18n="aboutPurposeBody">ดูแม่นๆ (Doomanman.com) เป็นพื้นที่ออนไลน์ที่ชวนให้คุณหยุดพักและมองเรื่องราวในชีวิตผ่านไพ่ทาโรต์ การทำนายฝัน และการดูลายมือ คำอ่านมีไว้เพื่อการสะท้อนความคิดและความบันเทิง ไม่ใช่คำทำนายที่รับประกันผลหรือคำแนะนำจากผู้เชี่ยวชาญ</p>
				</section>
				<section class="info-section">
					<h2 data-i18n="aboutPrivacyTitle">ความเป็นส่วนตัวสำคัญกับเรา</h2>
					<p><span data-i18n="aboutPrivacyBody">ใช้บริการได้โดยไม่ต้องสร้างบัญชี เราไม่เก็บคำถามหรือข้อมูลที่ส่งมาเพื่อสร้างคำทำนายไว้หลังประมวลผล ดูรายละเอียดได้ที่</span> <a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>" data-i18n="aboutPrivacyLink">นโยบายความเป็นส่วนตัว</a></p>
				</section>
			<?php else : ?>
				<section class="info-section">
					<h2 data-i18n="contactHeading">คุยกับเรา</h2>
					<p data-i18n="contactBody">หากต้องการสอบถาม แจ้งปัญหา หรือส่งข้อเสนอแนะ ติดต่อเราได้ทาง LINE</p>
					<p class="contact-line"><a href="https://line.me/ti/p/~maroon608" data-i18n="contactLine">LINE ID: maroon608</a></p>
				</section>
			<?php endif; ?>
		</div>
	</section>
</main>
<?php
get_footer();
