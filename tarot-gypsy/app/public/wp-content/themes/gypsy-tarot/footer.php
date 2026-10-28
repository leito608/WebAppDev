<?php gypsy_tarot_render_ad( 'bottom' ); ?>
<footer class="site-footer">
	<div class="footer-brand" data-i18n="footerBrand">ดูแม่นๆ (Doomanman.com)</div>
	<p data-i18n="disclaimer">Tarot is a tool for reflection and entertainment, not a substitute for professional advice.</p>
	<nav class="footer-links" aria-label="Site information">
		<a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>" data-i18n="footerPrivacy">นโยบายความเป็นส่วนตัว</a>
		<a href="<?php echo esc_url( home_url( '/about-us/' ) ); ?>" data-i18n="footerAbout">เกี่ยวกับเรา</a>
		<a href="<?php echo esc_url( home_url( '/contact-us/' ) ); ?>" data-i18n="footerContact">ติดต่อเรา</a>
	</nav>
	<span class="site-version">v<?php echo esc_html( wp_get_theme()->get( 'Version' ) ); ?></span>
</footer>
<?php wp_footer(); ?>
</body>
</html>
