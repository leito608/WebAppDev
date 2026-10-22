<?php
/**
 * The tarot reading homepage.
 *
 * @package Gypsy_Tarot
 */

get_header();
?>
<main id="main-content">
	<section class="hero" aria-labelledby="hero-title">
		<div class="hero-inner">
			<p class="eyebrow" data-i18n="heroEyebrow">A little guidance, when you need it</p>
			<h1 id="hero-title"><span data-i18n="heroLineOne">มีเรื่องอะไรในใจ มาเปิดไพ่คุยกัน</span></h1>
			<p class="hero-copy" data-i18n="heroCopy">Take a breath. Think about what’s on your mind, and we’ll turn to the cards together.</p>
			<a class="primary-button" href="#reading">
				<span data-i18n="startReading">Let’s read the cards</span>
				<span aria-hidden="true">↗</span>
			</a>
			<div class="hero-links">
				<a class="dream-link" href="<?php echo esc_url( home_url( '/dream-teller/' ) ); ?>"><span data-i18n="dreamLink">ทำนายฝัน</span> <span aria-hidden="true">✧</span></a>
				<a class="dream-link" href="<?php echo esc_url( home_url( '/palm-teller/' ) ); ?>"><span data-i18n="palmLink">ดูลายมือ</span> <span aria-hidden="true">✧</span></a>
			</div>
			<p class="hero-note" data-i18n="heroNote">A moment for yourself · No account needed</p>
		</div>
		<div class="hero-art" aria-hidden="true">
			<span class="hero-sparkle sparkle-one">✦</span>
			<span class="hero-sparkle sparkle-two">✧</span>
			<span class="hero-sparkle sparkle-three">✧</span>
			<div class="hero-card hero-card-back">
				<img class="hero-card-image" src="<?php echo esc_url( get_theme_file_uri( '/assets/cards/major-18.jpeg' ) ); ?>" alt="" width="520" height="920" fetchpriority="high">
			</div>
			<div class="hero-card">
				<img class="hero-card-image" src="<?php echo esc_url( get_theme_file_uri( '/assets/cards/major-17.jpeg' ) ); ?>" alt="" width="520" height="920" fetchpriority="high">
			</div>
		</div>
	</section>

	<section class="intro" aria-labelledby="intro-title">
		<p class="eyebrow" data-i18n="introEyebrow">A three-card reading</p>
		<h2 id="intro-title" data-i18n="introTitle">Let’s see what the cards have to say.</h2>
		<p class="intro-copy" data-i18n="introCopy">Pick what’s on your mind, then choose three cards that catch your eye. We’ll read them together as past, present, and future.</p>
	</section>

	<section class="reading-section" id="reading" aria-labelledby="reading-title">
		<div class="reading-inner">
			<div class="reading-heading">
				<p class="eyebrow" data-i18n="readingEyebrow">Your reading, at your own pace</p>
				<h2 id="reading-title" data-i18n="readingTitle">Start with whatever’s on your mind.</h2>
			</div>

			<div class="step">
				<div class="step-label" data-i18n="stepOne">01 · Pick a focus</div>
				<div class="step-content">
					<h3 data-i18n="topicTitle">What’s on your mind?</h3>
					<p class="step-copy" data-i18n="topicCopy">Pick the part of life you’d like to ask about.</p>
					<div class="topic-list" role="group" aria-label="Choose a reading topic">
						<button class="topic-button" type="button" data-topic="love" aria-pressed="false" data-i18n="topicLove">Love</button>
						<button class="topic-button" type="button" data-topic="career" aria-pressed="false" data-i18n="topicCareer">Career</button>
						<button class="topic-button" type="button" data-topic="money" aria-pressed="false" data-i18n="topicMoney">Money</button>
						<button class="topic-button" type="button" data-topic="general" aria-pressed="true" data-i18n="topicGeneral">General life</button>
					</div>
					<label class="question-label" for="reading-question" data-i18n="questionLabel">What would you like guidance on?</label>
					<textarea class="question-input" id="reading-question" rows="3" maxlength="600" data-i18n-placeholder="questionPlaceholder" placeholder="Share a question or a little context (optional)."></textarea>
					<p class="question-note" data-i18n="questionPrivacy">Your question and selected cards are sent to Groq when you reveal the reading.</p>
				</div>
			</div>

			<div class="step">
				<div class="step-label" data-i18n="stepTwo">02 · Pick your cards</div>
				<div class="step-content">
					<h3 data-i18n="drawTitle">Take a look through the deck.</h3>
					<p class="step-copy" data-i18n="drawCopy">Give the deck a shuffle to reveal all 78 cards. Then choose any three that stand out to you.</p>
					<div class="draw-controls">
						<button class="primary-button draw-button" type="button" id="draw-button">
							<span id="draw-button-label" data-i18n="shuffleDeck">Shuffle and show my cards</span>
							<span aria-hidden="true">✧</span>
						</button>
						<span class="draw-status" id="draw-status" role="status" aria-live="polite" data-i18n="drawInitial">Whenever you’re ready.</span>
					</div>
				</div>
			</div>

			<div class="card-picker" id="card-picker" hidden>
				<p class="deck-prompt" id="deck-prompt" data-i18n="deckPrompt">Take your time. Pick three cards that draw you in.</p>
				<div class="card-slots" aria-label="Your three cards">
					<div class="card-slot" id="slot-0"><span class="slot-number">01</span><span class="slot-position" data-i18n="past">สิ่งที่ผ่านมา</span></div>
					<div class="card-slot" id="slot-1"><span class="slot-number">02</span><span class="slot-position" data-i18n="present">เรื่องตอนนี้</span></div>
					<div class="card-slot" id="slot-2"><span class="slot-number">03</span><span class="slot-position" data-i18n="future">สิ่งที่รออยู่</span></div>
				</div>
				<div class="deck-grid" id="deck-grid" role="group" aria-label="Choose three cards" aria-busy="true"></div>
			</div>

			<section class="reading-step-three" id="reading-step-three" aria-labelledby="step-three-title" hidden>
				<div class="step step-three-heading">
					<div class="step-label" data-i18n="stepThree">03 · Your reading</div>
					<div class="step-content">
						<h3 id="step-three-title" data-i18n="stepThreeTitle">Ready to see what your cards have to say?</h3>
						<p class="step-copy" data-i18n="stepThreeCopy">Your cards are waiting. Reveal them when you’re ready.</p>
						<button class="primary-button reveal-button" type="button" id="get-result" disabled>
							<span data-i18n="getResult">Reveal my reading</span>
							<span aria-hidden="true">✧</span>
						</button>
					</div>
				</div>
				<section class="result" id="reading-result" aria-labelledby="result-title" aria-live="polite" hidden>
					<h3 class="result-title" id="result-title" data-i18n="resultTitle">Here’s what your cards are saying</h3>
					<p class="result-intro" id="result-intro"></p>
					<p class="ai-status" id="ai-status" role="status" aria-live="polite"></p>
					<?php if ( gypsy_tarot_is_local_debug() ) : ?>
						<details class="ai-debug" id="ai-debug" hidden>
							<summary data-i18n="aiDebugTitle">Local AI debug details</summary>
							<p data-i18n="aiDebugPrivacy">Contains the API endpoint, request prompt, response, and error details. Visible only on local development.</p>
							<pre id="ai-debug-output"></pre>
						</details>
					<?php endif; ?>
					<div class="result-cards" id="result-cards"></div>
					<div class="reading-reflection" id="reading-reflection"></div>
					<button class="primary-button again-button" type="button" id="start-again">
						<span data-i18n="startAgain">Would you like another reading?</span>
						<span aria-hidden="true">↻</span>
					</button>
				</section>
			</section>
		</div>
	</section>
</main>
<?php
get_footer();
