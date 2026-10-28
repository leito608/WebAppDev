<?php
/**
 * Manually maintained lucky-number table.
 *
 * @package Gypsy_Tarot
 */

$lekded_data = gypsy_tarot_get_lekded_data();
get_header();
?>
<main id="main-content" class="dream-page lekded-page">
	<section class="dream-hero" aria-labelledby="info-title">
		<p class="eyebrow">ดูแม่นๆ (Doomanman.com)</p>
		<h1 id="info-title" data-i18n="lekdedTitle">เลขเด็ด</h1>
		<p>ตัวเลขและคะแนนประกอบการพิจารณา อัปเดตจากข้อมูลที่จัดทำไว้</p>
	</section>

	<section class="dream-lookup" aria-label="เลขเด็ด">
		<div class="dream-inner info-content lekded-content">
			<?php if ( is_wp_error( $lekded_data ) ) : ?>
				<p class="lekded-error" role="alert"><?php echo esc_html( $lekded_data->get_error_message() ); ?></p>
			<?php else : ?>
				<h2>Top 5 ตัวเลข</h2>
				<p class="lekded-topic"><?php echo esc_html( $lekded_data['topic'] ); ?></p>
				<div class="lekded-table-wrap">
					<table class="lekded-table">
						<thead>
							<tr>
								<th scope="col">อันดับ</th>
								<th scope="col">ตัวเลข</th>
								<th scope="col">คะแนนรวม</th>
								<th scope="col">รายละเอียดที่มาของคะแนน</th>
							</tr>
						</thead>
						<tbody>
							<?php foreach ( $lekded_data['rows'] as $row ) : ?>
								<tr>
									<td><?php echo esc_html( $row[0] ); ?></td>
									<td class="lekded-number"><?php echo esc_html( $row[1] ); ?></td>
									<td><?php echo esc_html( $row[2] ); ?></td>
									<td><?php echo esc_html( $row[3] ); ?></td>
								</tr>
							<?php endforeach; ?>
						</tbody>
					</table>
				</div>
				<p class="lekded-disclaimer">ข้อมูลนี้จัดทำเพื่อความบันเทิงเท่านั้น ไม่ใช่คำแนะนำหรือการรับประกันผลรางวัล</p>
			<?php endif; ?>
		</div>
	</section>
</main>
<?php
get_footer();
