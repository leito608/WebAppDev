<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="sr-only" href="#main-content"><?php esc_html_e( 'Skip to content', 'gypsy-tarot' ); ?></a>
<header class="site-header">
	<?php $lib_en = gypsy_tarot_lib_is_en(); ?>
	<?php $is_home_reading_page = is_front_page() && ! gypsy_tarot_is_oracle_page() && ! gypsy_tarot_is_info_page() && ! gypsy_tarot_is_library_page(); ?>
	<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( gypsy_tarot_lib_site_name( $lib_en ? 'en' : 'th' ) ); ?>">
		<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" focusable="false"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="currentColor"/></svg></span>
		<span class="brand-name" data-i18n="brandName"><?php echo esc_html( $lib_en ? gypsy_tarot_lib_t( 'brand_name' ) : 'มีเรื่องอะไรในใจ มาเปิดไพ่คุยกัน' ); ?></span>
	</a>
	<div class="header-tools">
		<span class="visitor-counter"><span data-i18n="visitors"><?php echo esc_html( ( $is_home_reading_page || $lib_en ) ? 'No. of visitors' : 'ผู้เข้าชม' ); ?></span>: <strong id="visitor-count"><?php echo esc_html( number_format_i18n( gypsy_tarot_visitor_count() ) ); ?></strong></span>
		<a class="nav-link" href="<?php echo esc_url( $is_home_reading_page ? '#reading' : home_url( '/#reading' ) ); ?>" data-i18n="navReading"><?php echo esc_html( ( $is_home_reading_page || $lib_en ) ? 'Your reading' : 'อ่านไพ่ทาโรต์' ); ?></a>
		<a class="nav-link" href="<?php echo esc_url( home_url( '/dream-teller/' ) ); ?>" data-i18n="navDream"><?php echo esc_html( gypsy_tarot_lib_t( 'nav_dream', $lib_en ? 'en' : 'th' ) ); ?></a>
		<a class="nav-link" href="<?php echo esc_url( home_url( '/palm-teller/' ) ); ?>" data-i18n="navPalm"><?php echo esc_html( gypsy_tarot_lib_t( 'nav_palm', $lib_en ? 'en' : 'th' ) ); ?></a>
		<a class="nav-link" href="<?php echo esc_url( home_url( '/lekded/' ) ); ?>" data-i18n="navLekded"><?php echo esc_html( gypsy_tarot_lib_t( 'nav_lekded', $lib_en ? 'en' : 'th' ) ); ?></a>
		<?php if ( gypsy_tarot_is_library_page() ) : ?>
		<a class="language-switch" id="language-toggle" href="<?php echo esc_url( gypsy_tarot_lib_alt_url() ); ?>" aria-label="<?php echo esc_attr( gypsy_tarot_lib_t( 'switch_aria' ) ); ?>"><?php echo esc_html( gypsy_tarot_lib_t( 'switch_label' ) ); ?></a>
		<?php else : ?>
		<button class="language-switch" type="button" id="language-toggle" aria-label="Switch language">ภาษาไทย</button>
		<?php endif; ?>
	</div>
</header>
<?php gypsy_tarot_render_ad( 'left' ); ?>
