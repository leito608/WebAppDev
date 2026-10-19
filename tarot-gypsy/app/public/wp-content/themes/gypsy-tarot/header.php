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
		<span class="brand-mark" aria-hidden="true">✳</span>
		<span class="brand-name"><?php bloginfo( 'name' ); ?></span>
	</a>
	<div class="header-tools">
		<a class="nav-link" href="#reading" data-i18n="navReading">Your reading</a>
		<button class="language-switch" type="button" id="language-toggle" aria-label="Switch language">ภาษาไทย</button>
	</div>
</header>
