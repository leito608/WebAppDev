<?php
/**
 * Tarot card library, guides, and legal pages.
 *
 * @package Gypsy_Tarot
 */

$type  = gypsy_tarot_lib_type();
$meta  = gypsy_tarot_lib_meta();
$cards = gypsy_tarot_lib_cards();
$lang  = gypsy_tarot_lib_lang();
get_header();
?>
<main id="main-content" class="dream-page info-page lib-page">
<?php if ( 'cards' === $type ) : ?>
	<section class="dream-hero" aria-labelledby="info-title">
		<p class="eyebrow"><?php gypsy_tarot_lib_e( 'cards_eyebrow' ); ?></p>
		<h1 id="info-title"><?php gypsy_tarot_lib_e( 'cards_h1' ); ?></h1>
		<p><?php gypsy_tarot_lib_e( 'cards_hero' ); ?></p>
	</section>
	<section class="dream-lookup">
		<div class="dream-inner lib-content">
			<?php gypsy_tarot_lib_breadcrumb( array( gypsy_tarot_lib_t( 'crumb_cards' ) => '' ) ); ?>
			<p class="lib-lead"><?php gypsy_tarot_lib_html( 'cards_lead_html' ); ?></p>
			<?php foreach ( gypsy_tarot_lib_card_groups() as $group => $label ) : ?>
				<h2 class="lib-group-title"><?php echo esc_html( $label ); ?></h2>
				<ul class="lib-card-grid">
					<?php foreach ( $cards as $card ) : ?>
						<?php if ( $card['group'] !== $group ) { continue; } ?>
						<li>
							<a href="<?php echo esc_url( gypsy_tarot_lib_lang_url( 'tarot-cards/' . $card['slug'] . '/' ) ); ?>">
								<?php echo gypsy_tarot_lib_card_image( $card, 90 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
								<span class="lib-card-name"><?php echo esc_html( $card['name'] ); ?></span>
								<span class="lib-card-th"><?php echo esc_html( $card['th'] ); ?></span>
							</a>
						</li>
					<?php endforeach; ?>
				</ul>
			<?php endforeach; ?>
		</div>
	</section>

<?php elseif ( 'card' === $type ) : ?>
	<?php
	$card = gypsy_tarot_lib_current_card();
	$keys = array_keys( $cards );
	$pos  = array_search( $card['slug'], $keys, true );
	$prev = $pos > 0 ? $cards[ $keys[ $pos - 1 ] ] : null;
	$next = $pos < count( $keys ) - 1 ? $cards[ $keys[ $pos + 1 ] ] : null;
	$same = array_filter( $cards, function ( $other ) use ( $card ) {
		return $other['group'] === $card['group'] && $other['slug'] !== $card['slug'];
	} );
	$same = array_slice( $same, 0, 8 );
	?>
	<section class="dream-hero" aria-labelledby="info-title">
		<p class="eyebrow"><?php gypsy_tarot_lib_e( 'card_eyebrow' ); ?></p>
		<h1 id="info-title"><?php echo esc_html( sprintf( gypsy_tarot_lib_t( 'card_h1' ), $card['title'] ) ); ?></h1>
		<p><?php echo esc_html( $card['keywords'] ); ?></p>
	</section>
	<section class="dream-lookup">
		<div class="dream-inner lib-content">
			<?php
			gypsy_tarot_lib_breadcrumb(
				array(
					gypsy_tarot_lib_t( 'crumb_cards' ) => gypsy_tarot_lib_lang_url( 'tarot-cards/' ),
					$card['name']                       => '',
				)
			);
			?>
			<div class="lib-card-layout">
				<figure class="lib-card-figure"><?php echo gypsy_tarot_lib_card_image( $card, 220, false ); // phpcs:ignore WordPress.Security.EscapeOutput ?></figure>
				<div>
					<section class="info-section"><h2><?php gypsy_tarot_lib_e( 'h_overview' ); ?></h2><p><?php echo esc_html( $card['intro'] ); ?></p></section>
					<section class="info-section"><h2><?php gypsy_tarot_lib_e( 'h_upright' ); ?></h2><p><?php echo esc_html( $card['upright'] ); ?></p></section>
					<section class="info-section"><h2><?php gypsy_tarot_lib_e( 'h_reversed' ); ?></h2><p><?php echo esc_html( $card['reversed'] ); ?></p></section>
				</div>
			</div>
			<section class="info-section"><h2><?php gypsy_tarot_lib_e( 'h_love' ); ?></h2><p><?php echo esc_html( $card['love'] ); ?></p></section>
			<section class="info-section"><h2><?php gypsy_tarot_lib_e( 'h_career' ); ?></h2><p><?php echo esc_html( $card['career'] ); ?></p></section>
			<section class="info-section"><h2><?php gypsy_tarot_lib_e( 'h_money' ); ?></h2><p><?php echo esc_html( $card['money'] ); ?></p></section>
			<section class="info-section"><h2><?php gypsy_tarot_lib_e( 'h_advice' ); ?></h2><p><?php echo esc_html( $card['advice'] ); ?></p></section>
			<section class="info-section lib-cta">
				<p><?php gypsy_tarot_lib_html( 'card_cta_html' ); ?></p>
				<p class="lib-note"><?php gypsy_tarot_lib_html( 'note_html' ); ?></p>
			</section>
			<?php if ( $same ) : ?>
				<section class="info-section"><h2><?php gypsy_tarot_lib_e( 'h_same_group' ); ?></h2>
					<ul class="lib-link-list">
						<?php foreach ( $same as $other ) : ?>
							<li><a href="<?php echo esc_url( gypsy_tarot_lib_lang_url( 'tarot-cards/' . $other['slug'] . '/' ) ); ?>"><?php echo esc_html( $other['title'] ); ?></a></li>
						<?php endforeach; ?>
					</ul>
				</section>
			<?php endif; ?>
			<nav class="lib-pager" aria-label="<?php echo esc_attr( gypsy_tarot_lib_t( 'pager_aria' ) ); ?>">
				<?php if ( $prev ) : ?><a href="<?php echo esc_url( gypsy_tarot_lib_lang_url( 'tarot-cards/' . $prev['slug'] . '/' ) ); ?>">&larr; <?php echo esc_html( $prev['name'] ); ?></a><?php endif; ?>
				<a href="<?php echo esc_url( gypsy_tarot_lib_lang_url( 'tarot-cards/' ) ); ?>"><?php gypsy_tarot_lib_e( 'all_cards' ); ?></a>
				<?php if ( $next ) : ?><a href="<?php echo esc_url( gypsy_tarot_lib_lang_url( 'tarot-cards/' . $next['slug'] . '/' ) ); ?>"><?php echo esc_html( $next['name'] ); ?> &rarr;</a><?php endif; ?>
			</nav>
		</div>
	</section>

<?php elseif ( 'guides' === $type ) : ?>
	<section class="dream-hero" aria-labelledby="info-title">
		<p class="eyebrow"><?php gypsy_tarot_lib_e( 'guides_eyebrow' ); ?></p>
		<h1 id="info-title"><?php gypsy_tarot_lib_e( 'guides_h1' ); ?></h1>
		<p><?php gypsy_tarot_lib_e( 'guides_hero' ); ?></p>
	</section>
	<section class="dream-lookup">
		<div class="dream-inner lib-content">
			<?php gypsy_tarot_lib_breadcrumb( array( gypsy_tarot_lib_t( 'crumb_guides' ) => '' ) ); ?>
			<ul class="lib-guide-list">
				<?php foreach ( gypsy_tarot_lib_guides() as $slug => $guide ) : ?>
					<li>
						<h2><a href="<?php echo esc_url( gypsy_tarot_lib_lang_url( 'tarot-guide/' . $slug . '/' ) ); ?>"><?php echo esc_html( $guide['title'] ); ?></a></h2>
						<p><?php echo esc_html( $guide['excerpt'] ); ?></p>
					</li>
				<?php endforeach; ?>
			</ul>
			<p class="lib-lead"><?php gypsy_tarot_lib_html( 'guides_lead_html' ); ?></p>
		</div>
	</section>

<?php elseif ( 'guide' === $type ) : ?>
	<?php
	$guide = gypsy_tarot_lib_current_guide();
	$more  = array_diff_key( gypsy_tarot_lib_guides(), array( gypsy_tarot_lib_slug() => true ) );
	?>
	<section class="dream-hero" aria-labelledby="info-title">
		<p class="eyebrow"><?php gypsy_tarot_lib_e( 'guides_eyebrow' ); ?></p>
		<h1 id="info-title"><?php echo esc_html( $guide['title'] ); ?></h1>
		<p><?php echo esc_html( $guide['excerpt'] ); ?></p>
	</section>
	<section class="dream-lookup">
		<div class="dream-inner lib-content">
			<?php gypsy_tarot_lib_breadcrumb( array( gypsy_tarot_lib_t( 'crumb_guides' ) => gypsy_tarot_lib_lang_url( 'tarot-guide/' ), gypsy_tarot_lib_t( 'crumb_article' ) => '' ) ); ?>
			<p class="lib-byline"><?php gypsy_tarot_lib_e( 'written_by' ); ?> <a href="<?php echo esc_url( home_url( '/about-us/' ) ); ?>"><?php gypsy_tarot_lib_e( 'team' ); ?></a> · <?php gypsy_tarot_lib_e( 'updated' ); ?> <time datetime="<?php echo esc_attr( $guide['date'] ); ?>"><?php echo esc_html( $guide['date'] ); ?></time></p>
			<?php foreach ( $guide['sections'] as $section ) : ?>
				<section class="info-section">
					<h2><?php echo esc_html( $section[0] ); ?></h2>
					<?php foreach ( $section[1] as $paragraph ) : ?>
						<p><?php echo esc_html( $paragraph ); ?></p>
					<?php endforeach; ?>
				</section>
			<?php endforeach; ?>
			<section class="info-section lib-cta">
				<p><?php gypsy_tarot_lib_html( $guide['card'] ? 'guide_card_html' : 'guide_nocard_html' ); ?></p>
				<p class="lib-note"><?php gypsy_tarot_lib_html( 'note_html' ); ?></p>
			</section>
			<section class="info-section"><h2><?php gypsy_tarot_lib_e( 'h_more' ); ?></h2>
				<ul class="lib-link-list">
					<?php foreach ( $more as $slug => $other ) : ?>
						<li><a href="<?php echo esc_url( gypsy_tarot_lib_lang_url( 'tarot-guide/' . $slug . '/' ) ); ?>"><?php echo esc_html( $other['title'] ); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</section>
		</div>
	</section>

<?php else : ?>
	<section class="dream-hero" aria-labelledby="info-title">
		<p class="eyebrow"><?php echo esc_html( gypsy_tarot_lib_site_name() ); ?></p>
		<h1 id="info-title"><?php echo esc_html( $meta['title'] ); ?></h1>
		<p><?php echo esc_html( $meta['desc'] ); ?></p>
	</section>
	<section class="dream-lookup">
		<div class="dream-inner info-content">
			<?php gypsy_tarot_lib_render_sections( gypsy_tarot_lib_legal_sections( $type ) ); ?>
			<section class="info-section"><p><?php gypsy_tarot_lib_html( 'legal_contact_html' ); ?></p></section>
		</div>
	</section>
<?php endif; ?>
</main>
<?php
get_footer();
