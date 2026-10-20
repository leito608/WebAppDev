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
	<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
		<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" focusable="false"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="currentColor"/></svg></span>
		<span class="brand-name" data-i18n="brandName">มีเรื่องอะไรในใจ มาเปิดไพ่คุยกัน</span>
	</a>
	<div class="header-tools">
		<span class="visitor-counter"><span data-i18n="visitors"><?php echo esc_html( is_front_page() && ! gypsy_tarot_is_dream_teller() ? 'No. of visitors' : 'ผู้เข้าชม' ); ?></span>: <strong id="visitor-count"><?php echo esc_html( number_format_i18n( gypsy_tarot_visitor_count() ) ); ?></strong></span>
		<a class="nav-link" href="<?php echo esc_url( is_front_page() && ! gypsy_tarot_is_dream_teller() ? '#reading' : home_url( '/#reading' ) ); ?>" data-i18n="navReading"><?php echo esc_html( is_front_page() && ! gypsy_tarot_is_dream_teller() ? 'Your reading' : 'อ่านไพ่ทาโรต์' ); ?></a>
		<a class="nav-link" href="<?php echo esc_url( home_url( '/dream-teller/' ) ); ?>" data-i18n="navDream">ทำนายฝัน</a>
		<button class="language-switch" type="button" id="language-toggle" aria-label="Switch language">ภาษาไทย</button>
	</div>
</header>
