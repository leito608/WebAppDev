<?php
/**
 * Manually maintained lucky-number history.
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
				<?php foreach ( $lekded_data['draws'] as $draw ) : ?>
					<section class="lekded-draw">
						<h2><span data-i18n="lekdedDrawTitle">เลขเด็ดงวดวันที่</span> <?php echo esc_html( $draw['date'] ); ?></h2>
						<div class="lekded-table-wrap">
							<table class="lekded-table">
								<thead>
									<tr>
										<th scope="col" data-i18n="lekdedNumber">เลข</th>
										<th scope="col" data-i18n="lekdedLikelihood">ความเป็นไปได้</th>
									</tr>
								</thead>
								<tbody>
									<?php foreach ( $draw['rows'] as $row ) : ?>
										<tr>
											<td class="lekded-number"><?php echo esc_html( $row['number'] ); ?></td>
											<td class="lekded-score"><?php echo esc_html( $row['score'] ); ?></td>
										</tr>
									<?php endforeach; ?>
								</tbody>
							</table>
						</div>
					</section>
				<?php endforeach; ?>
				<p class="lekded-disclaimer">ข้อมูลนี้จัดทำเพื่อความบันเทิงเท่านั้น ไม่ใช่คำแนะนำหรือการรับประกันผลรางวัล</p>
			<?php endif; ?>
		</div>
	</section>
</main>
<?php
get_footer();
