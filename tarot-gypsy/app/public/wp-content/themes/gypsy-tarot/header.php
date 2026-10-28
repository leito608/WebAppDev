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
	<?php $is_home_reading_page = is_front_page() && ! gypsy_tarot_is_oracle_page() && ! gypsy_tarot_is_info_page(); ?>
	<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( 'ดูแม่นๆ (Doomanman.com)' ); ?>">
		<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" focusable="false"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="currentColor"/></svg></span>
		<span class="brand-name" data-i18n="brandName">มีเรื่องอะไรในใจ มาเปิดไพ่คุยกัน</span>
	</a>
	<div class="header-tools">
		<span class="visitor-counter"><span data-i18n="visitors"><?php echo esc_html( $is_home_reading_page ? 'No. of visitors' : 'ผู้เข้าชม' ); ?></span>: <strong id="visitor-count"><?php echo esc_html( number_format_i18n( gypsy_tarot_visitor_count() ) ); ?></strong></span>
		<a class="nav-link" href="<?php echo esc_url( $is_home_reading_page ? '#reading' : home_url( '/#reading' ) ); ?>" data-i18n="navReading"><?php echo esc_html( $is_home_reading_page ? 'Your reading' : 'อ่านไพ่ทาโรต์' ); ?></a>
		<a class="nav-link" href="<?php echo esc_url( home_url( '/dream-teller/' ) ); ?>" data-i18n="navDream">ทำนายฝัน</a>
		<a class="nav-link" href="<?php echo esc_url( home_url( '/palm-teller/' ) ); ?>" data-i18n="navPalm">ดูลายมือ</a>
		<a class="nav-link" href="<?php echo esc_url( home_url( '/lekded/' ) ); ?>" data-i18n="navLekded">เลขเด็ด</a>
		<button class="language-switch" type="button" id="language-toggle" aria-label="Switch language">ภาษาไทย</button>
	</div>
</header>
<?php gypsy_tarot_render_ad( 'left' ); ?>
