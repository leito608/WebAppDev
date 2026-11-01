<?php
/**
 * Language support (Thai + English) for the tarot library pages.
 *
 * English pages live under /en/ (e.g. /en/tarot-cards/the-tower/) so each
 * language has its own crawlable URL.
 *
 * @package Gypsy_Tarot
 */

require_once get_theme_file_path( '/inc/tarot-data-en-major.php' );
require_once get_theme_file_path( '/inc/tarot-data-en-minor.php' );
require_once get_theme_file_path( '/inc/guides-data-en-1.php' );
require_once get_theme_file_path( '/inc/guides-data-en-2.php' );

function gypsy_tarot_lib_lang() {
	return 'en' === get_query_var( 'gypsy_tarot_lang' ) ? 'en' : 'th';
}

function gypsy_tarot_lib_is_en() {
	return gypsy_tarot_is_library_page() && 'en' === gypsy_tarot_lib_lang();
}

/**
 * Path prefix for the active language ('' for Thai, 'en/' for English).
 */
function gypsy_tarot_lib_prefix( $lang = null ) {
	$lang = $lang ?: gypsy_tarot_lib_lang();
	return 'en' === $lang ? 'en/' : '';
}

function gypsy_tarot_lib_lang_url( $path, $lang = null ) {
	return home_url( '/' . gypsy_tarot_lib_prefix( $lang ) . ltrim( $path, '/' ) );
}

function gypsy_tarot_lib_site_name( $lang = null ) {
	return 'en' === ( $lang ?: gypsy_tarot_lib_lang() ) ? 'Doomanman (Doomanman.com)' : 'ดูแม่นๆ (Doomanman.com)';
}

function gypsy_tarot_lib_site_short( $lang = null ) {
	return 'en' === ( $lang ?: gypsy_tarot_lib_lang() ) ? 'Doomanman' : 'ดูแม่นๆ';
}

function gypsy_tarot_lib_html_lang( $output ) {
	if ( gypsy_tarot_lib_is_en() ) {
		return 'lang="en-US"';
	}
	return $output;
}
add_filter( 'language_attributes', 'gypsy_tarot_lib_html_lang', 20 );

/**
 * Translated UI strings. Keys ending in _html may contain links and are
 * passed through wp_kses_post() by gypsy_tarot_lib_t().
 */
function gypsy_tarot_lib_strings( $lang ) {
	static $all = null;
	if ( null === $all ) {
		$all = array(
			'th' => array(
				'home'             => 'หน้าแรก',
				'crumb_cards'      => 'ความหมายไพ่',
				'crumb_guides'     => 'คู่มือ',
				'crumb_article'    => 'บทความ',
				'switch_label'     => 'English',
				'switch_aria'      => 'Read this page in English',
				'cards_eyebrow'    => 'Tarot Library',
				'cards_h1'         => 'ความหมายไพ่ทาโรต์ครบ 78 ใบ',
				'cards_hero'       => 'รวมความหมายไพ่ทั้งสำรับ แยกตามไพ่ตั้งตรง ไพ่กลับหัว และการตีความด้านความรัก การงาน การเงิน เขียนเพื่อใช้เป็นแนวทางทบทวนตัวเอง ไม่ใช่คำทำนายที่รับประกันผล',
				'cards_lead_html'  => 'ไพ่ทาโรต์มาตรฐานมี 78 ใบ ประกอบด้วยเมเจอร์อาร์คานา 22 ใบที่เล่าเรื่องจุดเปลี่ยนสำคัญ และไมเนอร์อาร์คานา 56 ใบใน 4 ชุด ที่เล่าเรื่องราวในชีวิตประจำวัน ถ้าเพิ่งเริ่มเรียน แนะนำให้อ่าน <a href="{major}">ความต่างของเมเจอร์และไมเนอร์</a> ก่อน หรือลอง <a href="{read}">เปิดไพ่ 3 ใบฟรี</a>',
				'card_eyebrow'     => 'ความหมายไพ่ทาโรต์',
				'card_h1'          => 'ไพ่ %s',
				'h_overview'       => 'ภาพรวมของไพ่',
				'h_upright'        => 'ความหมายเมื่อไพ่ตั้งตรง',
				'h_reversed'       => 'ความหมายเมื่อไพ่กลับหัว',
				'h_love'           => 'ด้านความรัก',
				'h_career'         => 'ด้านการงาน',
				'h_money'          => 'ด้านการเงิน',
				'h_advice'         => 'ข้อคิดสำหรับวันนี้',
				'card_cta_html'    => 'อยากรู้ว่าไพ่ใบนี้สื่อถึงอะไรในเรื่องของคุณ ลอง <a href="{read}">เปิดไพ่ 3 ใบฟรี</a> หรืออ่านวิธีตีความได้ที่ <a href="{guides}">คู่มือการอ่านไพ่</a>',
				'note_html'        => 'เนื้อหานี้ใช้เพื่อความบันเทิงและการสะท้อนความคิด อ่านเพิ่มเติมที่ <a href="{disclaimer}">ข้อสงวนสิทธิ์</a>',
				'h_same_group'     => 'ไพ่ในกลุ่มเดียวกัน',
				'pager_aria'       => 'ไพ่ก่อนหน้าและถัดไป',
				'all_cards'        => 'ไพ่ทั้งหมด',
				'guides_eyebrow'   => 'Tarot Guide',
				'guides_h1'        => 'เรียนรู้การอ่านไพ่ทาโรต์',
				'guides_hero'      => 'บทความสำหรับผู้เริ่มต้น เขียนโดยทีมบรรณาธิการ พร้อมตัวอย่างการตีความที่นำไปฝึกได้จริง',
				'guides_lead_html' => 'ดูความหมายไพ่ทั้งหมดได้ที่ <a href="{cards}">ความหมายไพ่ 78 ใบ</a>',
				'written_by'       => 'เรียบเรียงโดย',
				'team'             => 'ทีมบรรณาธิการดูแม่นๆ',
				'updated'          => 'อัปเดตล่าสุด',
				'guide_card_html'  => 'ดูรายละเอียดไพ่ใบนี้ได้ที่ <a href="{card}">หน้าความหมายไพ่</a> หรือ <a href="{read}">ลองเปิดไพ่ 3 ใบฟรี</a>',
				'guide_nocard_html' => 'ลองฝึกจริงด้วย <a href="{read}">การเปิดไพ่ 3 ใบฟรี</a> หรือค้นหาความหมายที่ <a href="{cards}">หน้าความหมายไพ่ 78 ใบ</a>',
				'h_more'           => 'บทความอื่น ๆ',
				'legal_contact_html' => 'ติดต่อเราได้ที่ <a href="{contact}">หน้าติดต่อเรา</a> · อัปเดตล่าสุด 30 ตุลาคม 2569',
				'alt_card'         => 'ไพ่ %s',
				'nav_read'         => 'อ่านไพ่ทาโรต์',
				'nav_cards'        => 'ความหมายไพ่',
				'nav_guides'       => 'เรียนรู้ทาโรต์',
				'nav_dream'        => 'ทำนายฝัน',
				'nav_palm'         => 'ดูลายมือ',
				'nav_lekded'       => 'เลขเด็ด',
				'visitors'         => 'ผู้เข้าชม',
				'brand_name'       => 'มีเรื่องอะไรในใจ มาเปิดไพ่คุยกัน',
				'footer_disclaimer' => 'ไพ่ทาโรต์เป็นเครื่องมือสำหรับการสะท้อนความคิดและความบันเทิง ไม่ใช่คำแนะนำจากผู้เชี่ยวชาญ',
				'f_privacy'        => 'นโยบายความเป็นส่วนตัว',
				'f_about'          => 'เกี่ยวกับเรา',
				'f_contact'        => 'ติดต่อเรา',
				'f_terms'          => 'ข้อกำหนดการใช้งาน',
				'f_disclaimer'     => 'ข้อสงวนสิทธิ์',
			),
			'en' => array(
				'home'             => 'Home',
				'crumb_cards'      => 'Card meanings',
				'crumb_guides'     => 'Guides',
				'crumb_article'    => 'Article',
				'switch_label'     => 'ภาษาไทย',
				'switch_aria'      => 'อ่านหน้านี้เป็นภาษาไทย',
				'cards_eyebrow'    => 'Tarot Library',
				'cards_h1'         => 'All 78 Tarot Card Meanings',
				'cards_hero'       => 'The full deck explained: upright and reversed meanings, plus how each card reads for love, career and money. Written as a guide for self-reflection, not a guaranteed prediction.',
				'cards_lead_html'  => 'A standard tarot deck has 78 cards: 22 Major Arcana cards that tell the story of life’s big turning points, and 56 Minor Arcana cards in four suits that cover everyday experience. If you are new to tarot, start with <a href="{major}">the difference between Major and Minor Arcana</a>, or try a <a href="{read}">free 3-card reading</a>.',
				'card_eyebrow'     => 'Tarot Card Meaning',
				'card_h1'          => '%s Tarot Card',
				'h_overview'       => 'Overview',
				'h_upright'        => 'Upright meaning',
				'h_reversed'       => 'Reversed meaning',
				'h_love'           => 'In love',
				'h_career'         => 'In career',
				'h_money'          => 'In money',
				'h_advice'         => 'Reflection for today',
				'card_cta_html'    => 'Curious what this card says about your own situation? Try a <a href="{read}">free 3-card reading</a>, or learn how to interpret cards in our <a href="{guides}">tarot guides</a>.',
				'note_html'        => 'This content is for entertainment and self-reflection. Read our <a href="{disclaimer}">disclaimer</a> for details.',
				'h_same_group'     => 'More cards in this group',
				'pager_aria'       => 'Previous and next card',
				'all_cards'        => 'All cards',
				'guides_eyebrow'   => 'Tarot Guide',
				'guides_h1'        => 'Learn to Read Tarot',
				'guides_hero'      => 'Beginner-friendly articles from our editorial team, with worked interpretation examples you can practice with.',
				'guides_lead_html' => 'Looking for a specific card? Browse all <a href="{cards}">78 tarot card meanings</a>.',
				'written_by'       => 'Written by',
				'team'             => 'The Doomanman editorial team',
				'updated'          => 'Last updated',
				'guide_card_html'  => 'See the full <a href="{card}">card meaning page</a>, or <a href="{read}">try a free 3-card reading</a>.',
				'guide_nocard_html' => 'Put it into practice with a <a href="{read}">free 3-card reading</a>, or look up any card in the <a href="{cards}">78-card meanings library</a>.',
				'h_more'           => 'More articles',
				'legal_contact_html' => 'Contact us through the <a href="{contact}">contact page</a> · Last updated 30 October 2026',
				'alt_card'         => '%s tarot card',
				'nav_read'         => 'Your reading',
				'nav_cards'        => 'Card meanings',
				'nav_guides'       => 'Learn tarot',
				'nav_dream'        => 'Dream meanings',
				'nav_palm'         => 'Palm reading',
				'nav_lekded'       => 'Lucky numbers',
				'visitors'         => 'No. of visitors',
				'brand_name'       => 'What’s on your mind? Let’s draw a card.',
				'footer_disclaimer' => 'Tarot is a tool for reflection and entertainment, not a substitute for professional advice.',
				'f_privacy'        => 'Privacy Policy',
				'f_about'          => 'About Us',
				'f_contact'        => 'Contact Us',
				'f_terms'          => 'Terms of Service',
				'f_disclaimer'     => 'Disclaimer',
			),
		);
	}
	return $all[ $lang ] ?? $all['th'];
}

/**
 * Translate a UI string for the current page language.
 */
function gypsy_tarot_lib_t( $key, $lang = null ) {
	$lang    = $lang ?: gypsy_tarot_lib_lang();
	$strings = gypsy_tarot_lib_strings( $lang );
	$text    = $strings[ $key ] ?? ( gypsy_tarot_lib_strings( 'th' )[ $key ] ?? $key );
	if ( false === strpos( $text, '{' ) ) {
		return $text;
	}
	$guide = gypsy_tarot_lib_current_guide();
	$tokens = array(
		'{read}'       => home_url( '/#reading' ),
		'{cards}'      => gypsy_tarot_lib_lang_url( 'tarot-cards/', $lang ),
		'{guides}'     => gypsy_tarot_lib_lang_url( 'tarot-guide/', $lang ),
		'{major}'      => gypsy_tarot_lib_lang_url( 'tarot-guide/major-vs-minor-arcana/', $lang ),
		'{disclaimer}' => gypsy_tarot_lib_lang_url( 'disclaimer/', $lang ),
		'{contact}'    => home_url( '/contact-us/' ),
		'{card}'       => $guide && ! empty( $guide['card'] ) ? gypsy_tarot_lib_lang_url( 'tarot-cards/' . $guide['card'] . '/', $lang ) : '',
	);
	return strtr( $text, $tokens );
}

/**
 * Absolute URL of the current library page in the other language.
 */
function gypsy_tarot_lib_alt_url() {
	$meta = gypsy_tarot_lib_meta();
	if ( ! $meta ) {
		return home_url( '/' );
	}
	$alt = 'en' === gypsy_tarot_lib_lang() ? 'th' : 'en';
	return gypsy_tarot_lib_lang_url( $meta['path'], $alt );
}

function gypsy_tarot_lib_e( $key ) {
	echo esc_html( gypsy_tarot_lib_t( $key ) );
}

function gypsy_tarot_lib_html( $key ) {
	echo wp_kses_post( gypsy_tarot_lib_t( $key ) );
}

/**
 * English cards: Thai structure (slug, group, image, name) with English text.
 */
function gypsy_tarot_get_cards_en() {
	static $cards = null;
	if ( null !== $cards ) {
		return $cards;
	}

	$sentence = function ( $text ) {
		return rtrim( trim( $text ), '.' ) . '.';
	};

	$cards = array();
	$major = gypsy_tarot_major_arcana_data_en();
	foreach ( gypsy_tarot_get_cards() as $slug => $card ) {
		if ( 'major' === $card['group'] ) {
			$text = $major[ $card['num'] ] ?? array();
			$cards[ $slug ] = array_merge(
				$card,
				$text,
				array(
					'th'    => '',
					'title' => $card['name'],
				)
			);
		}
	}

	$ranks = gypsy_tarot_rank_data_en();
	$suits = gypsy_tarot_suit_data_en();
	$th    = gypsy_tarot_get_cards();
	foreach ( $th as $slug => $card ) {
		if ( 'major' === $card['group'] ) {
			continue;
		}
		$rank  = $ranks[ $card['num'] - 1 ];
		$suit  = $suits[ $card['group'] ];
		$court = $card['num'] > 10;
		$thai_suit = gypsy_tarot_suit_data()[ $card['group'] ];

		$cards[ $slug ] = array_merge(
			$card,
			array(
				'th'       => '',
				'title'    => $card['name'],
				'keywords' => ucfirst( $rank['key'] ) . ' ' . $suit['lens'],
				'intro'    => sprintf(
					'The %1$s belongs to the suit of %2$s, linked to %3$s and concerned with %4$s. This card speaks of %5$s %6$s.',
					$card['name'],
					$thai_suit['name'],
					$suit['element'],
					$suit['domain'],
					$rank['key'],
					$suit['lens']
				),
				'upright'  => $sentence( $rank['up'] ) . ' In this suit, it plays out ' . $suit['lens'] . '. ' . ( $court ? 'Court cards often stand for a person or role in the situation, as well as a personality you may need to bring to it.' : 'Look at how this shows up in your everyday life.' ),
				'reversed' => $sentence( $rank['rev'] ) . ' Here, that plays out ' . $suit['lens'] . '. Notice whether the obstacle comes from within or from outside circumstances.',
				'love'     => rtrim( $sentence( $rank['love'] ), '.' ) . ', with an emphasis on ' . rtrim( $suit['love'], '.' ) . '.',
				'career'   => rtrim( $sentence( $rank['career'] ), '.' ) . ', with an emphasis on ' . rtrim( $suit['career'], '.' ) . '.',
				'money'    => rtrim( $sentence( $rank['money'] ), '.' ) . ', with an emphasis on ' . rtrim( $suit['money'], '.' ) . '.',
				'advice'   => 'Ask yourself where you can see ' . $rank['key'] . ' in your life right now, ' . $suit['lens'] . '.',
			)
		);
	}

	// Keep the original deck order (majors, then suits).
	$ordered = array();
	foreach ( array_keys( $th ) as $slug ) {
		$ordered[ $slug ] = $cards[ $slug ];
	}
	$cards = $ordered;
	return $cards;
}

function gypsy_tarot_lib_cards() {
	return 'en' === gypsy_tarot_lib_lang() ? gypsy_tarot_get_cards_en() : gypsy_tarot_get_cards();
}

function gypsy_tarot_lib_card_groups() {
	if ( 'en' !== gypsy_tarot_lib_lang() ) {
		return gypsy_tarot_card_groups();
	}
	$labels = array(
		'major'     => 'Major Arcana',
		'wands'     => 'Suit of Wands (Fire)',
		'cups'      => 'Suit of Cups (Water)',
		'swords'    => 'Suit of Swords (Air)',
		'pentacles' => 'Suit of Pentacles (Earth)',
	);
	return $labels;
}

function gypsy_tarot_guides_en() {
	return array_merge( gypsy_tarot_guides_en_1(), gypsy_tarot_guides_en_2() );
}

function gypsy_tarot_lib_guides() {
	if ( 'en' !== gypsy_tarot_lib_lang() ) {
		return gypsy_tarot_guides();
	}
	// Preserve the Thai ordering for the English list.
	$en = gypsy_tarot_guides_en();
	$out = array();
	foreach ( array_keys( gypsy_tarot_guides() ) as $slug ) {
		if ( isset( $en[ $slug ] ) ) {
			$out[ $slug ] = $en[ $slug ];
		}
	}
	return $out;
}

function gypsy_tarot_lib_legal_sections_en( $type ) {
	if ( 'terms-of-service' === $type ) {
		return array(
			'Acceptance of the terms' => 'By using Doomanman (Doomanman.com) you agree to these terms. If you do not agree, please stop using the site. We may update the terms from time to time; changes take effect once posted on this page.',
			'What the service is' => 'The site offers information about tarot cards, along with AI-assisted tools for tarot readings, dream interpretation and palm reading, for entertainment and self-reflection. Results are generated automatically and may be inaccurate or may not fit your real situation.',
			'Acceptable use' => 'Do not use the site for anything unlawful, attempt to disrupt or attack the service, submit content that infringes the rights of others, or use automated tools to call the service at unreasonable volumes.',
			'Intellectual property' => 'The articles, text and design of this site belong to its operator. If you would like to republish any of it, please ask for permission first, except for short quotations with a link back to the original page.',
			'Limitation of liability' => 'We do not guarantee the accuracy, completeness or suitability of any information or reading, and we are not responsible for damages arising from decisions made in reliance on the content of this site. Please read the disclaimer as well.',
			'Advertising and third parties' => 'The site may display ads from Google AdSense and uses AI service providers. We do not control the content or policies of third parties. See the privacy policy for details.',
			'Contact' => 'If you have questions about these terms, reach us through the contact page.',
		);
	}
	return array(
		'For entertainment and self-reflection' => 'Tarot readings, dream interpretations, palm readings and other content on this site are for entertainment and as prompts for reflecting on yourself. They are not predictions and nothing here is guaranteed.',
		'Not professional advice' => 'Nothing on this site is medical, psychological, legal or financial advice. If you have a physical or mental health concern, please consult a licensed professional. If you feel like harming yourself, please contact a local crisis line (in Thailand, the mental health hotline is 1323).',
		'Money and gambling' => 'Cards, dreams or numbers should never be the reason you invest, borrow money, or buy lottery tickets or gamble. Any numbers shown are for fun only and have no relationship to real draw results.',
		'AI-generated content' => 'Some readings from our tools are generated by AI systems. They may contain mistakes or miss your intent, so please use your own judgment before acting on them.',
		'Your own decisions' => 'Important life decisions are your responsibility. The site and its operators are not responsible for outcomes that result from using this content.',
	);
}
