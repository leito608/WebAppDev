<?php
/**
 * Fallback template for non-homepage content.
 *
 * @package Gypsy_Tarot
 */

get_header();
?>
<main id="main-content" class="reading-section">
	<div class="reading-inner">
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<article <?php post_class(); ?>>
					<h1><?php the_title(); ?></h1>
					<?php the_content(); ?>
				</article>
			<?php endwhile; ?>
		<?php else : ?>
			<h1><?php esc_html_e( 'Nothing found', 'gypsy-tarot' ); ?></h1>
		<?php endif; ?>
	</div>
</main>
<?php
get_footer();
