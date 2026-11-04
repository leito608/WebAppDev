<?php
/**
 * English meanings for the Minor Arcana rank and suit components.
 *
 * @package Gypsy_Tarot
 */

/**
 * English rank meanings shared by every suit. Index 0 = Ace ... 13 = King.
 *
 * @return array<int, array<string, string>>
 */
function gypsy_tarot_rank_data_en() {
	return array(
		array(
			'key' => 'new beginnings and fresh opportunity',
			'up' => 'A new opportunity or fresh energy has appeared; it is a seed that needs tending.',
			'rev' => 'An opportunity may have been missed, or you may not be ready; the seed is still waiting for its time.',
			'love' => 'The beginning of a new feeling or relationship.',
			'career' => 'A new project or professional opportunity is opening up.',
			'money' => 'A new source of income or the first step in a financial plan.',
		),
		array(
			'key' => 'choice and balance between two sides',
			'up' => 'Weigh two options or perspectives with care and balance.',
			'rev' => 'Indecision or imbalance may be making it hard to choose.',
			'love' => 'Cooperation and understanding between two people.',
			'career' => 'Set priorities when two responsibilities compete for your attention.',
			'money' => 'Find a balance between income and expenses.',
		),
		array(
			'key' => 'growth through collaboration',
			'up' => 'Work is beginning to show results through collaboration.',
			'rev' => 'Communication may be strained, or teamwork may not be coming together.',
			'love' => 'A growing relationship supported by the people around you.',
			'career' => 'Teamwork and collaboration are producing visible results.',
			'money' => 'Income or investments gained through working with others.',
		),
		array(
			'key' => 'stability and a needed pause',
			'up' => 'A time to build solid foundations and protect what you have.',
			'rev' => 'You may be too settled or reluctant to embrace change.',
			'love' => 'A stable relationship that may need fresh energy to keep it from feeling stale.',
			'career' => 'Create a dependable structure for your work.',
			'money' => 'Save carefully and preserve what you have.',
		),
		array(
			'key' => 'challenge and conflict',
			'up' => 'Friction is testing your patience and your perspective.',
			'rev' => 'Conflict may be easing, or you may be choosing to step away.',
			'love' => 'Disagreement or insecurity needs an honest conversation.',
			'career' => 'Competition or obstacles call for patience and persistence.',
			'money' => 'Financial uncertainty calls for extra caution.',
		),
		array(
			'key' => 'giving, receiving, and a positive transition',
			'up' => 'Support or a welcome transition is on its way.',
			'rev' => 'Giving and receiving may be out of balance, or the past may still be hard to leave behind.',
			'love' => 'Generosity and mutual support in a relationship.',
			'career' => 'You may receive support or move into a better position.',
			'money' => 'Giving or receiving financial help.',
		),
		array(
			'key' => 'assessment and patience',
			'up' => 'Pause and consider whether your effort is worth the investment.',
			'rev' => 'Doubt or impatience may be draining your energy.',
			'love' => 'Consider whether this relationship truly meets your emotional needs.',
			'career' => 'A long-term strategy will serve you better than guesswork.',
			'money' => 'Review the potential return before investing further.',
		),
		array(
			'key' => 'effort and steady progress',
			'up' => 'Practice and persistence are building steady momentum.',
			'rev' => 'You may be exhausted, stuck, or spreading yourself across too many things.',
			'love' => 'A relationship grows through consistent care and attention.',
			'career' => 'Ongoing practice and focused work are bringing progress.',
			'money' => 'Income grows through steady, consistent work.',
		),
		array(
			'key' => 'perseverance near the finish line',
			'up' => 'You are nearing your goal, with confidence earned from experience.',
			'rev' => 'Accumulated fatigue or anxiety may surface just before the finish line.',
			'love' => 'Contentment rooted in inner confidence and healthy boundaries.',
			'career' => 'Your work is nearing completion; conserve your energy to see it through.',
			'money' => 'Financial peace of mind reflects the planning you have already done.',
		),
		array(
			'key' => 'the end of a cycle and its responsibilities',
			'up' => 'A cycle is nearing completion, bringing both results and responsibilities.',
			'rev' => 'You may be overwhelmed by responsibilities, or a cycle may be ending on a difficult note.',
			'love' => 'A relationship is coming into its own or reaching a decision point.',
			'career' => 'Success is bringing a heavier workload and greater responsibility.',
			'money' => 'Long-term rewards are becoming clear, but they need careful management.',
		),
		array(
			'key' => 'a curious learner and new information',
			'up' => 'Curiosity opens the door to news or a new lesson.',
			'rev' => 'Uncertainty, unclear messages, or a lack of commitment may be holding you back.',
			'love' => 'Good news or an unhurried willingness to open your heart.',
			'career' => 'A chance to learn or begin a small, intriguing project.',
			'money' => 'New financial knowledge or a modest source of extra income.',
		),
		array(
			'key' => 'determined movement toward a goal',
			'up' => 'Give your full effort to an important goal.',
			'rev' => 'Impatience or impulsiveness may push you forward without enough thought.',
			'love' => 'A clear expression of interest or someone approaching with sincere intent.',
			'career' => 'Move ahead quickly, while taking care not to overlook important details.',
			'money' => 'A quick decision calls for a second look at the details.',
		),
		array(
			'key' => 'understanding and mature care',
			'up' => 'Deep understanding and care guided by maturity.',
			'rev' => 'You may be neglecting your own needs or feeling emotionally out of balance.',
			'love' => 'Steady warmth and understanding.',
			'career' => 'Supportive leadership and careful attention to detail.',
			'money' => 'Thoughtful management of your resources.',
		),
		array(
			'key' => 'a skilled and steady leader',
			'up' => 'Confident, capable leadership in an area you know well.',
			'rev' => 'Rigidity, overuse of authority, or a lack of decisiveness may be an issue.',
			'love' => 'Commitment and stability in a relationship.',
			'career' => 'Strategic leadership of an organization or team.',
			'money' => 'Disciplined management of money over the long term.',
		),
	);
}

/**
 * English suit meanings.
 *
 * @return array<string, array<string, string>>
 */
function gypsy_tarot_suit_data_en() {
	return array(
		'wands' => array(
			'element' => 'the element of fire',
			'domain' => 'drive, ambition, and creative energy',
			'lens' => 'in the area of inspiration and action',
			'love' => 'passion and excitement in relationships',
			'career' => 'career goals and the momentum behind projects',
			'money' => 'investing in your abilities and your own ventures',
		),
		'cups' => array(
			'element' => 'the element of water',
			'domain' => 'emotions, relationships, and intuition',
			'lens' => 'in the area of feelings and emotional bonds',
			'love' => 'deep feelings and heartfelt connection',
			'career' => 'relationships with colleagues and fulfillment at work',
			'money' => 'your feelings about money and emotionally driven spending',
		),
		'swords' => array(
			'element' => 'the element of air',
			'domain' => 'thought, communication, and decision-making',
			'lens' => 'in the area of thought and communication',
			'love' => 'communication and mutual understanding between partners',
			'career' => 'decisions, negotiation, and analysis',
			'money' => 'careful calculation and financial decision-making',
		),
		'pentacles' => array(
			'element' => 'the element of earth',
			'domain' => 'work, money, and tangible things',
			'lens' => 'in the area of work and resources',
			'love' => 'stability and readiness to build a life together',
			'career' => 'expertise, consistency, and tangible results',
			'money' => 'saving, investing, and financial security',
		),
	);
}
