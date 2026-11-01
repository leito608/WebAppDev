<?php
/**
 * Tarot card library, editorial guides, and legal pages.
 *
 * Routes:
 *   /tarot-cards/            card index
 *   /tarot-cards/{slug}/     one card
 *   /tarot-guide/            guide index
 *   /tarot-guide/{slug}/     one guide
 *   /terms-of-service/       terms
 *   /disclaimer/             disclaimer
 *
 * Every route also exists in English under the /en/ prefix.
 *
 * @package Gypsy_Tarot
 */

require_once get_theme_file_path( '/inc/tarot-data.php' );
require_once get_theme_file_path( '/inc/guides-data.php' );
require_once get_theme_file_path( '/inc/library-i18n.php' );

const GYPSY_TAROT_SITE_NAME = 'ดูแม่นๆ (Doomanman.com)';

function gypsy_tarot_lib_type() {
	return (string) get_query_var( 'gypsy_tarot_lib' );
}

function gypsy_tarot_is_library_page() {
	return in_array( gypsy_tarot_lib_type(), array( 'cards', 'card', 'guides', 'guide', 'terms-of-service', 'disclaimer' ), true );
}

function gypsy_tarot_lib_slug() {
	return (string) get_query_var( 'gypsy_tarot_lib_slug' );
}

function gypsy_tarot_lib_register_routes() {
	add_rewrite_rule( '^tarot-cards/?$', 'index.php?gypsy_tarot_lib=cards', 'top' );
	add_rewrite_rule( '^tarot-cards/([a-z0-9-]+)/?$', 'index.php?gypsy_tarot_lib=card&gypsy_tarot_lib_slug=$matches[1]', 'top' );
	add_rewrite_rule( '^tarot-guide/?$', 'index.php?gypsy_tarot_lib=guides', 'top' );
	add_rewrite_rule( '^tarot-guide/([a-z0-9-]+)/?$', 'index.php?gypsy_tarot_lib=guide&gypsy_tarot_lib_slug=$matches[1]', 'top' );
	add_rewrite_rule( '^(terms-of-service|disclaimer)/?$', 'index.php?gypsy_tarot_lib=$matches[1]', 'top' );
	add_rewrite_rule( '^en/tarot-cards/?$', 'index.php?gypsy_tarot_lib=cards&gypsy_tarot_lang=en', 'top' );
	add_rewrite_rule( '^en/tarot-cards/([a-z0-9-]+)/?$', 'index.php?gypsy_tarot_lib=card&gypsy_tarot_lib_slug=$matches[1]&gypsy_tarot_lang=en', 'top' );
	add_rewrite_rule( '^en/tarot-guide/?$', 'index.php?gypsy_tarot_lib=guides&gypsy_tarot_lang=en', 'top' );
	add_rewrite_rule( '^en/tarot-guide/([a-z0-9-]+)/?$', 'index.php?gypsy_tarot_lib=guide&gypsy_tarot_lib_slug=$matches[1]&gypsy_tarot_lang=en', 'top' );
	add_rewrite_rule( '^en/(terms-of-service|disclaimer)/?$', 'index.php?gypsy_tarot_lib=$matches[1]&gypsy_tarot_lang=en', 'top' );
}
add_action( 'init', 'gypsy_tarot_lib_register_routes' );

function gypsy_tarot_lib_query_vars( $vars ) {
	$vars[] = 'gypsy_tarot_lib';
	$vars[] = 'gypsy_tarot_lib_slug';
	$vars[] = 'gypsy_tarot_lang';
	return $vars;
}
add_filter( 'query_vars', 'gypsy_tarot_lib_query_vars' );

function gypsy_tarot_lib_url( $path = '' ) {
	return home_url( '/' . ltrim( $path, '/' ) );
}

function gypsy_tarot_lib_current_card() {
	$cards = gypsy_tarot_lib_cards();
	return $cards[ gypsy_tarot_lib_slug() ] ?? null;
}

function gypsy_tarot_lib_current_guide() {
	$guides = gypsy_tarot_lib_guides();
	return $guides[ gypsy_tarot_lib_slug() ] ?? null;
}

/**
 * Title, description and canonical path for the current library page.
 */
function gypsy_tarot_lib_meta() {
	$en = 'en' === gypsy_tarot_lib_lang();
	switch ( gypsy_tarot_lib_type() ) {
		case 'cards':
			return array(
				'title' => $en ? 'All 78 Tarot Card Meanings: Upright, Reversed, Love, Career & Money' : 'ความหมายไพ่ทาโรต์ครบ 78 ใบ ตั้งตรง กลับหัว ความรัก การงาน การเงิน',
				'desc'  => $en ? 'Meanings of all 78 tarot cards, Major and Minor Arcana, with upright and reversed interpretations and how each card reads for love, career and money.' : 'รวมความหมายไพ่ทาโรต์ครบทั้ง 78 ใบ ทั้งเมเจอร์และไมเนอร์อาร์คานา แยกตามไพ่ตั้งตรง ไพ่กลับหัว ด้านความรัก การงาน และการเงิน',
				'path'  => 'tarot-cards/',
			);
		case 'card':
			$card = gypsy_tarot_lib_current_card();
			return array(
				'title' => $en ? $card['name'] . ' Tarot Card Meaning: Upright, Reversed, Love, Career & Money' : 'ความหมายไพ่ ' . $card['title'] . ' ตั้งตรง กลับหัว ความรัก การงาน การเงิน',
				'desc'  => $en ? 'What the ' . $card['name'] . ' tarot card means upright and reversed, with interpretations for love, career and money.' : 'ความหมายไพ่ ' . $card['name'] . ' (' . $card['th'] . ') ทั้งตั้งตรงและกลับหัว พร้อมการตีความด้านความรัก การงาน และการเงิน',
				'path'  => 'tarot-cards/' . $card['slug'] . '/',
			);
		case 'guides':
			return array(
				'title' => $en ? 'Learn to Read Tarot: A Beginner’s Guide' : 'เรียนรู้การอ่านไพ่ทาโรต์ คู่มือสำหรับผู้เริ่มต้น',
				'desc'  => $en ? 'Tarot reading tutorials: the 3-card spread, reading reversed cards, Major vs Minor Arcana, with worked interpretation examples.' : 'บทความสอนอ่านไพ่ทาโรต์ วิธีวางไพ่ 3 ใบ การอ่านไพ่กลับหัว ความต่างของเมเจอร์และไมเนอร์อาร์คานา พร้อมตัวอย่างการตีความ',
				'path'  => 'tarot-guide/',
			);
		case 'guide':
			$guide = gypsy_tarot_lib_current_guide();
			return array(
				'title' => $guide['title'],
				'desc'  => $guide['excerpt'],
				'path'  => 'tarot-guide/' . gypsy_tarot_lib_slug() . '/',
			);
		case 'terms-of-service':
			return array(
				'title' => $en ? 'Terms of Service' : 'ข้อกำหนดการใช้งาน',
				'desc'  => $en ? 'Terms and conditions for using Doomanman (Doomanman.com).' : 'ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์ ดูแม่นๆ (Doomanman.com)',
				'path'  => 'terms-of-service/',
			);
		case 'disclaimer':
			return array(
				'title' => $en ? 'Disclaimer' : 'ข้อสงวนสิทธิ์และคำเตือน',
				'desc'  => $en ? 'Readings and predictions on Doomanman are for entertainment and self-reflection only, and are not medical, legal or financial advice.' : 'คำทำนายและการอ่านไพ่ในเว็บไซต์ ดูแม่นๆ มีไว้เพื่อความบันเทิงและการสะท้อนความคิด ไม่ใช่คำแนะนำทางการแพทย์ กฎหมาย หรือการเงิน',
				'path'  => 'disclaimer/',
			);
	}
	return null;
}

function gypsy_tarot_lib_is_valid() {
	switch ( gypsy_tarot_lib_type() ) {
		case 'card':
			return null !== gypsy_tarot_lib_current_card();
		case 'guide':
			return null !== gypsy_tarot_lib_current_guide();
	}
	return gypsy_tarot_is_library_page();
}

function gypsy_tarot_lib_template( $template ) {
	if ( ! gypsy_tarot_is_library_page() ) {
		return $template;
	}
	if ( ! gypsy_tarot_lib_is_valid() ) {
		global $wp_query;
		$wp_query->set_404();
		status_header( 404 );
		nocache_headers();
		return get_theme_file_path( '/index.php' );
	}
	return get_theme_file_path( '/page-library.php' );
}
add_filter( 'template_include', 'gypsy_tarot_lib_template', 20 );

function gypsy_tarot_lib_title( $title ) {
	if ( gypsy_tarot_is_library_page() && gypsy_tarot_lib_is_valid() ) {
		$meta = gypsy_tarot_lib_meta();
		return $meta['title'] . ' | ' . gypsy_tarot_lib_site_short();
	}
	return $title;
}
add_filter( 'pre_get_document_title', 'gypsy_tarot_lib_title', 20 );

function gypsy_tarot_lib_head() {
	if ( ! gypsy_tarot_is_library_page() || ! gypsy_tarot_lib_is_valid() ) {
		return;
	}
	$meta  = gypsy_tarot_lib_meta();
	$url   = gypsy_tarot_lib_lang_url( $meta['path'] );
	$lang  = gypsy_tarot_lib_lang();
	$site  = gypsy_tarot_lib_site_name();
	$image = get_theme_file_uri( '/assets/images/tarot-share.jpg' );
	$type  = 'website';
	$card  = 'card' === gypsy_tarot_lib_type() ? gypsy_tarot_lib_current_card() : null;
	if ( $card ) {
		$image = get_theme_file_uri( '/assets/cards/' . $card['image'] );
	}

	$schema = array(
		'@context'    => 'https://schema.org',
		'@type'       => 'WebPage',
		'name'        => $meta['title'],
		'url'         => $url,
		'description' => $meta['desc'],
		'inLanguage'  => $lang,
		'isPartOf'    => array(
			'@type' => 'WebSite',
			'name'  => $site,
			'url'   => home_url( '/' ),
		),
	);
	if ( 'guide' === gypsy_tarot_lib_type() || $card ) {
		$type                = 'article';
		$guide               = gypsy_tarot_lib_current_guide();
		$schema['@type']     = 'Article';
		$schema['headline']  = $meta['title'];
		$schema['image']     = $image;
		$schema['author']    = array(
			'@type' => 'Organization',
			'name'  => gypsy_tarot_lib_t( 'team' ),
			'url'   => home_url( '/about-us/' ),
		);
		$schema['publisher'] = array(
			'@type' => 'Organization',
			'name'  => $site,
			'url'   => home_url( '/' ),
		);
		if ( $guide ) {
			$schema['datePublished'] = $guide['date'];
			$schema['dateModified']  = $guide['date'];
		}
	}
	?>
	<meta name="description" content="<?php echo esc_attr( $meta['desc'] ); ?>">
	<meta name="robots" content="index,follow,max-image-preview:large">
	<link rel="canonical" href="<?php echo esc_url( $url ); ?>">
	<meta property="og:type" content="<?php echo esc_attr( $type ); ?>">
	<meta property="og:site_name" content="<?php echo esc_attr( $site ); ?>">
	<meta property="og:title" content="<?php echo esc_attr( $meta['title'] ); ?>">
	<meta property="og:description" content="<?php echo esc_attr( $meta['desc'] ); ?>">
	<meta property="og:url" content="<?php echo esc_url( $url ); ?>">
	<meta property="og:image" content="<?php echo esc_url( $image ); ?>">
	<meta property="og:locale" content="<?php echo 'en' === $lang ? 'en_US' : 'th_TH'; ?>">
	<link rel="alternate" hreflang="th" href="<?php echo esc_url( gypsy_tarot_lib_lang_url( $meta['path'], 'th' ) ); ?>">
	<link rel="alternate" hreflang="en" href="<?php echo esc_url( gypsy_tarot_lib_lang_url( $meta['path'], 'en' ) ); ?>">
	<link rel="alternate" hreflang="x-default" href="<?php echo esc_url( gypsy_tarot_lib_lang_url( $meta['path'], 'th' ) ); ?>">
	<meta name="twitter:card" content="summary_large_image">
	<script type="application/ld+json"><?php echo wp_json_encode( $schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ); ?></script>
	<?php
}
add_action( 'wp_head', 'gypsy_tarot_lib_head', 1 );

function gypsy_tarot_lib_card_image( $card, $size = 160, $lazy = true ) {
	return sprintf(
		'<img src="%s" alt="%s" width="%d" height="%d" %s>',
		esc_url( get_theme_file_uri( '/assets/cards/' . $card['image'] ) ),
		esc_attr( sprintf( gypsy_tarot_lib_t( 'alt_card' ), $card['name'] ) ),
		(int) $size,
		(int) round( $size * 1.7 ),
		$lazy ? 'loading="lazy" decoding="async"' : 'decoding="async"'
	);
}

function gypsy_tarot_lib_breadcrumb( $items ) {
	echo '<nav class="lib-breadcrumb" aria-label="breadcrumb"><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html( gypsy_tarot_lib_t( 'home' ) ) . '</a>';
	foreach ( $items as $label => $url ) {
		echo ' / ';
		echo $url ? '<a href="' . esc_url( $url ) . '">' . esc_html( $label ) . '</a>' : '<span>' . esc_html( $label ) . '</span>';
	}
	echo '</nav>';
}

function gypsy_tarot_lib_legal_sections( $type ) {
	if ( 'en' === gypsy_tarot_lib_lang() ) {
		return gypsy_tarot_lib_legal_sections_en( $type );
	}
	if ( 'terms-of-service' === $type ) {
		return array(
			'การยอมรับข้อกำหนด' => 'เมื่อใช้งานเว็บไซต์ ดูแม่นๆ (Doomanman.com) ถือว่าคุณยอมรับข้อกำหนดนี้ หากไม่เห็นด้วย กรุณาหยุดใช้งาน เราอาจแก้ไขข้อกำหนดเป็นครั้งคราว โดยการแก้ไขจะมีผลเมื่อประกาศบนหน้านี้',
			'ลักษณะของบริการ' => 'เว็บไซต์ให้ข้อมูลเกี่ยวกับไพ่ทาโรต์ และเครื่องมืออ่านไพ่ ทำนายฝัน และดูลายมือโดยใช้ AI เพื่อความบันเทิงและการสะท้อนความคิด ผลลัพธ์จากเครื่องมือเป็นการสร้างด้วยระบบอัตโนมัติ อาจไม่ถูกต้องหรือไม่ตรงกับสถานการณ์จริง',
			'การใช้งานที่ยอมรับได้' => 'ห้ามใช้เว็บไซต์เพื่อกิจกรรมที่ผิดกฎหมาย ห้ามพยายามรบกวนหรือโจมตีระบบ ห้ามส่งเนื้อหาที่ละเมิดสิทธิ์ผู้อื่น หรือใช้เครื่องมืออัตโนมัติเรียกใช้บริการเกินปริมาณที่เหมาะสม',
			'ทรัพย์สินทางปัญญา' => 'บทความ ข้อความ และการออกแบบของเว็บไซต์เป็นของผู้ดูแลเว็บไซต์ หากต้องการนำไปเผยแพร่ต่อ กรุณาติดต่อขออนุญาตก่อน ยกเว้นการอ้างอิงสั้น ๆ พร้อมลิงก์กลับมายังหน้าต้นฉบับ',
			'การจำกัดความรับผิด' => 'เราไม่รับประกันความถูกต้อง ความครบถ้วน หรือความเหมาะสมของข้อมูลและคำทำนาย และไม่รับผิดชอบต่อความเสียหายที่เกิดจากการตัดสินใจโดยอ้างอิงเนื้อหาในเว็บไซต์ โปรดอ่านข้อสงวนสิทธิ์ประกอบ',
			'โฆษณาและบุคคลที่สาม' => 'เว็บไซต์อาจแสดงโฆษณาจาก Google AdSense และใช้บริการของผู้ให้บริการ AI เราไม่ควบคุมเนื้อหาหรือนโยบายของบุคคลที่สาม โปรดดูรายละเอียดในนโยบายความเป็นส่วนตัว',
			'การติดต่อ' => 'หากมีคำถามเกี่ยวกับข้อกำหนดนี้ ติดต่อเราได้ที่หน้าติดต่อเรา',
		);
	}
	return array(
		'เพื่อความบันเทิงและการสะท้อนความคิด' => 'การอ่านไพ่ทาโรต์ การทำนายฝัน การดูลายมือ และเนื้อหาในเว็บไซต์นี้มีไว้เพื่อความบันเทิงและเป็นเครื่องมือชวนทบทวนตัวเอง ไม่ใช่คำทำนายที่รับประกันผลใด ๆ',
		'ไม่ใช่คำแนะนำจากผู้เชี่ยวชาญ' => 'เนื้อหาไม่ใช่คำแนะนำทางการแพทย์ จิตวิทยา กฎหมาย หรือการเงิน หากมีปัญหาด้านสุขภาพกายหรือใจ ควรปรึกษาแพทย์หรือผู้เชี่ยวชาญที่ได้รับอนุญาต หากรู้สึกอยากทำร้ายตัวเอง กรุณาติดต่อสายด่วนสุขภาพจิต 1323',
		'เรื่องเงินและการพนัน' => 'ไพ่ ความฝัน หรือตัวเลขใด ๆ ไม่ควรใช้เป็นเหตุผลในการลงทุน กู้ยืม หรือซื้อสลากและการพนัน ตัวเลขที่แสดงเป็นเพียงความบันเทิง ไม่มีความสัมพันธ์กับผลรางวัลจริง',
		'เนื้อหาที่สร้างโดย AI' => 'คำอ่านจากเครื่องมือบางส่วนสร้างโดยระบบ AI อาจมีความผิดพลาดหรือไม่ตรงกับความตั้งใจ ควรใช้วิจารณญาณก่อนนำไปใช้',
		'การตัดสินใจของคุณ' => 'การตัดสินใจเรื่องสำคัญในชีวิตเป็นความรับผิดชอบของคุณ เว็บไซต์และผู้ดูแลไม่รับผิดชอบต่อผลที่เกิดจากการนำเนื้อหาไปใช้',
	);
}

function gypsy_tarot_lib_render_sections( $sections ) {
	foreach ( $sections as $heading => $body ) {
		echo '<section class="info-section"><h2>' . esc_html( $heading ) . '</h2><p>' . esc_html( $body ) . '</p></section>';
	}
}
