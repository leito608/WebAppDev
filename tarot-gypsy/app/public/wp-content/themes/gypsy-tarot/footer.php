<?php gypsy_tarot_render_ad( 'bottom' ); ?>
<?php $lib_en = function_exists( 'gypsy_tarot_lib_is_en' ) && gypsy_tarot_lib_is_en(); $lg = $lib_en ? 'en' : 'th'; ?>
<footer class="site-footer">
	<div class="footer-brand" data-i18n="footerBrand"><?php echo esc_html( gypsy_tarot_lib_site_name( $lg ) ); ?></div>
	<p data-i18n="disclaimer"><?php echo esc_html( gypsy_tarot_lib_t( 'footer_disclaimer', 'en' ) ); ?></p>
	<nav class="footer-links" aria-label="Site information">
		<a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>" data-i18n="footerPrivacy"><?php echo esc_html( gypsy_tarot_lib_t( 'f_privacy', $lg ) ); ?></a>
		<a href="<?php echo esc_url( home_url( '/about-us/' ) ); ?>" data-i18n="footerAbout"><?php echo esc_html( gypsy_tarot_lib_t( 'f_about', $lg ) ); ?></a>
		<a href="<?php echo esc_url( home_url( '/contact-us/' ) ); ?>" data-i18n="footerContact"><?php echo esc_html( gypsy_tarot_lib_t( 'f_contact', $lg ) ); ?></a>
		<a href="<?php echo esc_url( gypsy_tarot_lib_lang_url( 'terms-of-service/', $lg ) ); ?>"><?php echo esc_html( gypsy_tarot_lib_t( 'f_terms', $lg ) ); ?></a>
		<a href="<?php echo esc_url( gypsy_tarot_lib_lang_url( 'disclaimer/', $lg ) ); ?>"><?php echo esc_html( gypsy_tarot_lib_t( 'f_disclaimer', $lg ) ); ?></a>
		<a href="<?php echo esc_url( gypsy_tarot_lib_lang_url( 'tarot-cards/', $lg ) ); ?>"><?php echo esc_html( gypsy_tarot_lib_t( 'nav_cards', $lg ) ); ?></a>
		<a href="<?php echo esc_url( gypsy_tarot_lib_lang_url( 'tarot-guide/', $lg ) ); ?>"><?php echo esc_html( gypsy_tarot_lib_t( 'nav_guides', $lg ) ); ?></a>
	</nav>
	<span class="site-version">v<?php echo esc_html( wp_get_theme()->get( 'Version' ) ); ?></span>
</footer>
<?php wp_footer(); ?>
</body>
</html>
