(function () {
	"use strict";

	const majorArcana = [
		["The Fool", "คนโง่", "A fresh beginning invites curiosity and trust.", "A pause may help you avoid a leap without looking.", "การเริ่มต้นใหม่ชวนให้เปิดใจและเชื่อมั่นในเส้นทาง", "หยุดคิดสักนิดก่อนก้าวไปข้างหน้าอย่างไม่ระมัดระวัง"],
		["The Magician", "นักมายากล", "Your skills and resources are ready to be put to use.", "Scattered focus is making your abilities harder to use.", "ทักษะและทรัพยากรที่มีพร้อมให้คุณนำมาใช้", "สมาธิที่กระจัดกระจายอาจทำให้ใช้ความสามารถได้ไม่เต็มที่"],
		["The High Priestess", "มหาปุโรหิตหญิง", "Listen closely to your intuition and what has not yet been said.", "Make room for quiet reflection before acting.", "รับฟังสัญชาตญาณและสิ่งที่ยังไม่ได้เอ่ยออกมา", "ใช้เวลาทบทวนอย่างสงบก่อนลงมือทำ"],
		["The Empress", "จักรพรรดินี", "Care, creativity, and abundance are ready to grow.", "Restore your energy and nurture your own needs.", "ความเอาใจใส่ ความคิดสร้างสรรค์ และความอุดมสมบูรณ์กำลังเติบโต", "เติมพลังและหันมาใส่ใจความต้องการของตัวเอง"],
		["The Emperor", "จักรพรรดิ", "Structure and clear boundaries can bring steadiness.", "Consider where control or rigidity is holding you back.", "โครงสร้างและขอบเขตที่ชัดเจนช่วยสร้างความมั่นคง", "ลองพิจารณาว่าการควบคุมหรือยึดติดเกินไปกำลังฉุดรั้งคุณหรือไม่"],
		["The Hierophant", "มหาปุโรหิต", "Shared wisdom or a trusted tradition can guide you.", "Question whether an old rule still serves your path.", "ภูมิปัญญาที่สืบทอดหรือคำแนะนำที่ไว้ใจได้ช่วยชี้ทาง", "ทบทวนว่ากฎเกณฑ์เดิมยังเหมาะกับเส้นทางของคุณหรือไม่"],
		["The Lovers", "คนรัก", "A meaningful connection or aligned choice is coming into focus.", "Reconnect with your values before making a choice.", "ความสัมพันธ์ที่มีความหมายหรือทางเลือกที่สอดคล้องกำลังชัดเจนขึ้น", "กลับมาทบทวนคุณค่าของตัวเองก่อนตัดสินใจ"],
		["The Chariot", "รถศึก", "Steady determination can carry you through competing forces.", "A slower pace and a clearer direction may be needed.", "ความมุ่งมั่นจะช่วยพาคุณผ่านแรงกดดันที่ขัดแย้งกัน", "อาจต้องชะลอจังหวะและกำหนดทิศทางให้ชัดขึ้น"],
		["Strength", "พลัง", "Gentle courage and patience are stronger than force.", "Treat yourself with compassion as you rebuild confidence.", "ความกล้าหาญอย่างอ่อนโยนและความอดทนทรงพลังยิ่งกว่าการฝืน", "เมตตาต่อตัวเองระหว่างค่อย ๆ สร้างความมั่นใจกลับคืน"],
		["The Hermit", "ฤๅษี", "Time alone can help you find the answer within.", "Reach out when reflection starts to become isolation.", "การอยู่กับตัวเองสักพักอาจช่วยให้พบคำตอบภายในใจ", "ขอความช่วยเหลือเมื่อการทบทวนเริ่มกลายเป็นการแยกตัว"],
		["Wheel of Fortune", "วงล้อแห่งโชคชะตา", "A change in circumstances opens a new possibility.", "Be patient with a cycle still working itself out.", "การเปลี่ยนแปลงเปิดโอกาสใหม่ให้คุณ", "อดทนกับวัฏจักรที่ยังดำเนินไปไม่สิ้นสุด"],
		["Justice", "ความยุติธรรม", "Honesty and thoughtful choices help restore balance.", "Look carefully at the facts and your part in the situation.", "ความซื่อสัตย์และการตัดสินใจอย่างรอบคอบช่วยคืนสมดุล", "พิจารณาข้อเท็จจริงและบทบาทของคุณในสถานการณ์นี้"],
		["The Hanged Man", "ชายแขวนคอ", "A pause or new perspective can reveal another way forward.", "Release resistance and reconsider what you are holding onto.", "การหยุดพักหรือเปลี่ยนมุมมองอาจเผยทางไปต่อ", "ปล่อยวางแรงต้านและทบทวนสิ่งที่คุณกำลังยึดไว้"],
		["Death", "ความตาย", "An ending makes space for a necessary transformation.", "Accepting a change may be easier than prolonging an ending.", "การสิ้นสุดเปิดทางให้การเปลี่ยนแปลงที่จำเป็น", "การยอมรับความเปลี่ยนแปลงอาจดีกว่าการยืดเยื้อสิ่งที่จบลงแล้ว"],
		["Temperance", "ความพอดี", "Patience and balance can bring different pieces together.", "Try a gentler pace and bring extremes back into balance.", "ความอดทนและสมดุลช่วยประสานสิ่งต่าง ๆ เข้าด้วยกัน", "ค่อย ๆ ปรับจังหวะและดึงสิ่งที่สุดโต่งกลับสู่สมดุล"],
		["The Devil", "ปีศาจ", "Notice the attachments and patterns shaping your choices.", "A limiting pattern can loosen when you name it honestly.", "สังเกตความยึดติดและรูปแบบที่กำลังกำหนดทางเลือกของคุณ", "รูปแบบที่จำกัดคุณอาจคลี่คลายเมื่อกล้ายอมรับอย่างตรงไปตรงมา"],
		["The Tower", "หอคอย", "A sudden truth clears away what was built on shaky ground.", "Make space for needed change instead of delaying it.", "ความจริงที่ปรากฏช่วยรื้อสิ่งที่ตั้งอยู่บนพื้นฐานไม่มั่นคง", "เปิดรับการเปลี่ยนแปลงที่จำเป็นแทนการเลื่อนออกไป"],
		["The Star", "ดวงดาว", "Hope and renewal are returning after a difficult stretch.", "Rest and reconnect with the small things that restore hope.", "ความหวังและการเริ่มต้นใหม่กำลังกลับมาหลังช่วงเวลาที่ยากลำบาก", "พักผ่อนและกลับไปหาสิ่งเล็ก ๆ ที่ช่วยเติมความหวัง"],
		["The Moon", "พระจันทร์", "Move gently through uncertainty and listen to your dreams.", "Separate fear from intuition before drawing conclusions.", "ค่อย ๆ ก้าวผ่านความไม่แน่นอนและรับฟังความฝันของคุณ", "แยกความกลัวออกจากสัญชาตญาณก่อนสรุปเรื่องราว"],
		["The Sun", "ดวงอาทิตย์", "Warmth, clarity, and joy are easier to reach now.", "Let yourself receive joy, even if confidence is still growing.", "ความอบอุ่น ความชัดเจน และความสุขอยู่ใกล้แค่เอื้อม", "เปิดใจรับความสุขแม้ความมั่นใจยังค่อย ๆ เติบโต"],
		["Judgement", "การพิพากษา", "An honest reckoning invites you to answer a new calling.", "Release self-judgment and take the next small step.", "การทบทวนอย่างซื่อตรงชวนให้ตอบรับเสียงเรียกครั้งใหม่", "ปล่อยวางการตัดสินตัวเองและเริ่มจากก้าวเล็ก ๆ"],
		["The World", "โลก", "A meaningful chapter is reaching a satisfying completion.", "Notice what is unfinished and what you have already accomplished.", "บทสำคัญในชีวิตกำลังเดินทางสู่บทสรุปที่น่าพอใจ", "สังเกตทั้งสิ่งที่ยังไม่เสร็จและสิ่งที่คุณทำสำเร็จแล้ว"]
	];
	const majorSymbols = ["✧", "☿", "☾", "♛", "♜", "✥", "♡", "♞", "♌", "☉", "☸", "⚖", "⟁", "∞", "⚗", "♄", "ϟ", "✶", "☾", "☼", "✦", "◉"];

	const suits = [
		{
			name: "Wands", thai: "ไม้เท้า", symbol: "♧",
			theme: "creative energy, ambition, and the courage to begin",
			themeTh: "พลังสร้างสรรค์ ความมุ่งมั่น และความกล้าที่จะเริ่มต้น"
		},
		{
			name: "Cups", thai: "ถ้วย", symbol: "♡",
			theme: "feelings, connection, and emotional understanding",
			themeTh: "ความรู้สึก ความสัมพันธ์ และความเข้าใจทางใจ"
		},
		{
			name: "Swords", thai: "ดาบ", symbol: "⚔",
			theme: "clear thinking, honest communication, and decisions",
			themeTh: "ความคิดที่ชัดเจน การสื่อสารอย่างตรงไปตรงมา และการตัดสินใจ"
		},
		{
			name: "Pentacles", thai: "เหรียญ", symbol: "◉",
			theme: "practical effort, security, and everyday resources",
			themeTh: "ความพยายามที่จับต้องได้ ความมั่นคง และทรัพยากรในชีวิตประจำวัน"
		}
	];

	const ranks = [
		["Ace", "หนึ่ง", "a promising new beginning", "a beginning that needs patience", "การเริ่มต้นใหม่ที่เปี่ยมด้วยโอกาส", "การเริ่มต้นที่ต้องอาศัยความอดทน"],
		["Two", "สอง", "a choice or partnership taking shape", "indecision or competing priorities", "ทางเลือกหรือความร่วมมือที่กำลังก่อตัว", "ความลังเลหรือสิ่งสำคัญหลายอย่างที่ขัดแย้งกัน"],
		["Three", "สาม", "progress made through collaboration", "miscommunication or work that needs alignment", "ความก้าวหน้าที่เกิดจากการร่วมมือกัน", "การสื่อสารคลาดเคลื่อนหรืองานที่ต้องปรับให้สอดคล้อง"],
		["Four", "สี่", "a moment to build stability and appreciate what is here", "restlessness or a need to revisit your foundations", "ช่วงเวลาสร้างความมั่นคงและเห็นคุณค่าสิ่งที่มี", "ความกระสับกระส่ายหรือการกลับไปทบทวนพื้นฐาน"],
		["Five", "ห้า", "a challenge that asks for resilience and perspective", "a chance to step away from conflict and recover", "ความท้าทายที่ต้องอาศัยความอดทนและมุมมองที่กว้างขึ้น", "โอกาสถอยออกจากความขัดแย้งและฟื้นฟูใจ"],
		["Six", "หก", "generosity, support, or a welcome transition", "an imbalance in giving or difficulty moving forward", "การแบ่งปัน การสนับสนุน หรือการเปลี่ยนผ่านที่ดี", "การให้ที่ไม่สมดุลหรือความยากลำบากในการก้าวต่อ"],
		["Seven", "เจ็ด", "patience as you assess what is worth your effort", "doubt, impatience, or a need to reconsider your approach", "ความอดทนระหว่างพิจารณาว่าสิ่งใดควรค่าแก่ความพยายาม", "ความสงสัย ความใจร้อน หรือการทบทวนวิธีการอีกครั้ง"],
		["Eight", "แปด", "dedication and momentum built through steady practice", "burnout, scattered effort, or a delayed step", "ความทุ่มเทและความก้าวหน้าจากการฝึกฝนอย่างสม่ำเสมอ", "ความเหนื่อยล้า ความพยายามที่กระจัดกระจาย หรือการก้าวที่ล่าช้า"],
		["Nine", "เก้า", "earned confidence and the strength to persevere", "exhaustion or a need to protect your energy", "ความมั่นใจที่ได้มาด้วยตนเองและพลังใจที่จะสู้ต่อ", "ความเหนื่อยล้าหรือความจำเป็นในการปกป้องพลังใจ"],
		["Ten", "สิบ", "a culmination that brings both responsibility and reward", "an overloaded burden ready to be shared or released", "บทสรุปที่มาพร้อมทั้งความรับผิดชอบและรางวัล", "ภาระที่หนักเกินไปและควรแบ่งปันหรือปล่อยวาง"],
		["Page", "มหาดเล็ก", "curiosity and an invitation to learn by trying", "hesitation or a message not yet fully understood", "ความอยากรู้อยากเห็นและโอกาสเรียนรู้จากการลงมือทำ", "ความลังเลหรือสารที่ยังเข้าใจไม่ครบถ้วน"],
		["Knight", "อัศวิน", "focused movement toward something that matters", "rushing ahead or acting without enough reflection", "การมุ่งหน้าอย่างตั้งใจสู่สิ่งที่มีความหมาย", "การเร่งรีบหรือการลงมือโดยยังไม่ไตร่ตรองให้ดี"],
		["Queen", "ราชินี", "mature understanding, care, and confidence", "neglected needs or an invitation to restore balance", "ความเข้าใจที่สุขุม การดูแลเอาใจใส่ และความมั่นใจ", "ความต้องการที่ถูกละเลยหรือคำชวนให้คืนสู่สมดุล"],
		["King", "ราชา", "wise leadership and steady command of your strengths", "rigidity or a need to lead with more openness", "ภาวะผู้นำที่ชาญฉลาดและใช้จุดแข็งได้อย่างมั่นคง", "ความยึดติดหรือความจำเป็นในการเปิดใจนำผู้อื่นมากขึ้น"]
	];

	const cardData = [];
	majorArcana.forEach(function (card, index) {
		cardData.push({
			name: card[0], thai: card[1], symbol: majorSymbols[index], image: "major-" + String(index).padStart(2, "0") + ".jpeg",
			upright: card[2], reversed: card[3],
			uprightTh: card[4], reversedTh: card[5], major: true
		});
	});

	suits.forEach(function (suit) {
	ranks.forEach(function (rank, rankIndex) {
			cardData.push({
				name: rank[0] + " of " + suit.name,
				thai: suit.thai + " " + rank[1],
				symbol: suit.symbol,
			image: suit.name.toLowerCase() + "-" + String(rankIndex + 1).padStart(2, "0") + ".jpeg",
				upright: rank[2] + ", expressed through " + suit.theme + ".",
				reversed: rank[3] + ", especially around " + suit.theme + ".",
				uprightTh: rank[4] + " โดยเน้นเรื่อง" + suit.themeTh + ".",
				reversedTh: rank[5] + " โดยเฉพาะเรื่อง" + suit.themeTh + ".",
				major: false
			});
		});
	});

	if (cardData.length !== 78) {
		throw new Error("The tarot deck must contain exactly 78 cards.");
	}

	const translations = {
		en: {
			visitors: "No. of visitors",
			navReading: "Your reading", navDream: "Dream teller", navPalm: "Palm teller", dreamLink: "Dream teller", palmLink: "Palm teller", heroEyebrow: "A little guidance, when you need it",
			brandName: "Something on your mind? Let’s talk it over with the cards.", heroLineOne: "Something on your mind? Let’s talk it over with the cards.", heroLineTwo: "",
			heroCopy: "Take a breath. Think about what’s on your mind, and we’ll turn to the cards together.",
			startReading: "Let’s read the cards", heroNote: "A moment for yourself · No account needed",
			introEyebrow: "A three-card reading", introTitle: "Let’s see what the cards have to say.",
			introCopy: "Pick what’s on your mind, then choose three cards that catch your eye. We’ll read them together as past, present, and future.",
			readingEyebrow: "Your reading, at your own pace", readingTitle: "Start with whatever’s on your mind.",
			stepOne: "01 · Pick a focus", topicTitle: "What’s on your mind?",
			topicCopy: "Pick the part of life you’d like to ask about.", topicLove: "Love",
			topicCareer: "Career", topicMoney: "Money", topicGeneral: "General life",
			questionLabel: "What would you like guidance on?",
			questionPlaceholder: "Share a question or a little context (optional).",
			questionPrivacy: "Your question and selected cards are sent to Groq when you reveal the reading.",
			stepTwo: "02 · Pick your cards", drawTitle: "Take a look through the deck.",
			drawCopy: "Give the deck a shuffle to reveal all 78 cards. Then choose any three that stand out to you.",
			shuffleDeck: "Shuffle and show my cards", reshuffleDeck: "Shuffle again",
			drawInitial: "Whenever you’re ready.", drawShuffling: "Shuffling the deck…",
			drawReady: "Your cards are here. Choose three that speak to you.",
			selectProgress: "Nice choice. You’ve picked {number} of 3.",
			drawProgress: "Nice choice. You’ve picked {number} of 3.",
			drawComplete: "You’ve got your three. When you’re ready, reveal your reading.",
			selectComplete: "You’ve got your three. When you’re ready, reveal your reading.",
			deckPrompt: "Take your time. Choose three cards that catch your eye.",
			selectCard: "Choose face-down card {number}",
			selectedCardBack: "Selected card {number}, face down",
			deckLabel: "Choose three cards from the full tarot deck",
			past: "Past", present: "Present", future: "Future", resultTitle: "Your reading",
			stepThree: "03 · Your reading",
			stepThreeTitle: "Ready to see what your cards have to say?",
			stepThreeCopy: "Your cards are waiting. Reveal them when you’re ready.",
			getResult: "Reveal my reading",
			aiWorking: "The cards are being read…",
			aiPending: "Your cards are here. Preparing your interpretation…",
			aiComplete: "",
			aiFallback: "Here’s a reading to start with while the full interpretation is unavailable.",
			aiDebugTitle: "Local AI debug details",
			aiDebugPrivacy: "Contains the API endpoint, request prompt, response, and error details. Visible only on local development.",
			upright: "Upright", reversed: "Reversed", orientation: "Card orientation",
			startAgain: "Would you like another reading?", footerBrand: "The Oracle Room",
			disclaimer: "A reading is a moment for reflection, not a substitute for professional advice.",
			topicOpen: "Thinking about {topic}? Here’s what your cards have to say.",
			synthesis: "Looking back, {past}. Right now, {present}. Looking ahead, {future}.",
			reflection: "See what feels right for you, and leave the rest. The cards can offer a fresh perspective, but you know your life best."
		},
		th: {
			visitors: "จำนวนผู้เข้าชม",
			navReading: "คำทำนายของคุณ", navDream: "ทำนายฝัน", navPalm: "ดูลายมือ", dreamLink: "ทำนายฝัน", palmLink: "ดูลายมือ", heroEyebrow: "ถ้ากำลังหาคำแนะนำ ลองเริ่มจากตรงนี้",
			brandName: "มีเรื่องอะไรในใจ มาเปิดไพ่คุยกัน", heroLineOne: "มีเรื่องอะไรในใจ มาเปิดไพ่คุยกัน", heroLineTwo: "",
			heroCopy: "พักใจสักครู่ ลองนึกถึงเรื่องที่กำลังคิด แล้วมาเปิดไพ่ไปด้วยกัน",
			startReading: "มาเปิดไพ่กัน", heroNote: "ช่วงเวลาสำหรับคุณ · ไม่ต้องสมัครสมาชิก",
			introEyebrow: "คำทำนายไพ่สามใบ", introTitle: "มาดูกันว่าไพ่อยากบอกอะไร",
			introCopy: "นึกถึงเรื่องที่อยู่ในใจ แล้วเลือกไพ่สามใบที่รู้สึกสะดุดตา เราจะอ่านความหมายของอดีต ปัจจุบัน และสิ่งที่กำลังจะมาถึงไปด้วยกัน",
			readingEyebrow: "ค่อย ๆ เปิดไพ่ไปตามจังหวะของคุณ", readingTitle: "เริ่มจากเรื่องที่อยู่ในใจได้เลย",
			stepOne: "01 · เลือกเรื่องที่สนใจ", topicTitle: "ช่วงนี้กำลังคิดเรื่องอะไรอยู่?",
			topicCopy: "เลือกเรื่องที่อยากลองถามไพ่", topicLove: "ความรัก",
			topicCareer: "การงาน", topicMoney: "การเงิน", topicGeneral: "ชีวิตทั่วไป",
			questionLabel: "มีเรื่องไหนที่อยากถามไพ่เป็นพิเศษไหม?",
			questionPlaceholder: "เล่าเรื่องที่อยากขอคำแนะนำได้เลย (ไม่บังคับ)",
			questionPrivacy: "เมื่อกดเปิดคำทำนาย คำถามและไพ่ที่เลือกจะถูกส่งไปยัง Groq เพื่อช่วยอ่านไพ่",
			stepTwo: "02 · เลือกไพ่ที่ถูกใจ", drawTitle: "ลองดูไพ่ในสำรับกัน",
			drawCopy: "สับไพ่เพื่อเปิดไพ่ทั้ง 78 ใบ แล้วเลือกสามใบที่รู้สึกสะดุดตา",
			shuffleDeck: "สับไพ่แล้วเปิดให้ดู", reshuffleDeck: "สับไพ่อีกครั้ง",
			drawInitial: "พร้อมเมื่อไหร่ค่อยเริ่มก็ได้", drawShuffling: "กำลังสับไพ่…",
			drawReady: "ไพ่พร้อมแล้ว เลือกสามใบที่รู้สึกถูกใจได้เลย",
			selectProgress: "เลือกได้ดีเลย คุณเลือกแล้ว {number} จาก 3 ใบ",
			drawProgress: "เลือกได้ดีเลย คุณเลือกแล้ว {number} จาก 3 ใบ",
			drawComplete: "เลือกครบแล้ว พร้อมเมื่อไหร่กดเปิดคำทำนายได้เลย",
			selectComplete: "เลือกครบแล้ว พร้อมเมื่อไหร่กดเปิดคำทำนายได้เลย",
			deckPrompt: "ไม่ต้องรีบ เลือกไพ่สามใบที่สะดุดตาได้เลย",
			selectCard: "เลือกไพ่คว่ำใบที่ {number}",
			selectedCardBack: "ไพ่ใบที่ {number} คว่ำอยู่",
			deckLabel: "เลือกไพ่สามใบจากสำรับทาโรต์ทั้งชุด",
			past: "สิ่งที่ผ่านมา", present: "เรื่องตอนนี้", future: "สิ่งที่รออยู่",
			resultTitle: "ไพ่ทั้งสามใบบอกอะไรคุณบ้าง",
			stepThree: "03 · คำทำนายของคุณ",
			stepThreeTitle: "พร้อมดูหรือยังว่าไพ่ทั้งสามใบบอกอะไร?",
			stepThreeCopy: "ไพ่ของคุณคว่ำรออยู่ กดเปิดได้เมื่อพร้อม",
			getResult: "เปิดคำทำนาย",
			aiWorking: "กำลังอ่านไพ่ของคุณ…",
			aiPending: "ไพ่พร้อมแล้ว กำลังเรียบเรียงคำอ่านให้คุณ…",
			aiComplete: "",
			aiFallback: "ตอนนี้ยังอ่านไพ่แบบเต็มไม่ได้ ลองอ่านคำทำนายพื้นฐานนี้ไปก่อนได้เลย",
			aiDebugTitle: "รายละเอียดสำหรับตรวจสอบ AI ในเครื่อง",
			aiDebugPrivacy: "มี URL ของ API, prompt ที่ส่ง, คำตอบ และรายละเอียดข้อผิดพลาด แสดงเฉพาะตอนพัฒนาในเครื่อง",
			upright: "ไพ่ตั้งตรง", reversed: "ไพ่กลับหัว", orientation: "ทิศทางของไพ่",
			startAgain: "อยากเปิดไพ่ใหม่อีกครั้งไหม?", footerBrand: "ห้องแห่งคำพยากรณ์",
			disclaimer: "ลองอ่านไพ่เพื่อทบทวนตัวเอง คำทำนายไม่อาจแทนคำแนะนำจากผู้เชี่ยวชาญได้",
			topicOpen: "ถ้ากำลังคิดเรื่อง{topic} ลองมาดูกันว่าไพ่อยากบอกอะไร",
			synthesis: "มองย้อนกลับไป {past} ส่วนเรื่องตอนนี้ {present} และเมื่อมองต่อไปข้างหน้า {future}",
			reflection: "เลือกเก็บสิ่งที่รู้สึกตรงใจ ส่วนเรื่องไหนที่ไม่ใช่ก็วางไว้ก่อนได้ คุณรู้จักชีวิตตัวเองดีที่สุด ไพ่แค่ช่วยให้เห็นอีกมุมหนึ่ง"
		}
	};

	const topicNames = {
		en: { love: "love and connection", career: "career and purpose", money: "money and security", general: "your life path" },
		th: { love: "ความรักและความสัมพันธ์", career: "การงานและเป้าหมาย", money: "การเงินและความมั่นคง", general: "เส้นทางชีวิต" }
	};
	const topicGuidance = {
		en: {
			love: "In love, notice how past patterns shape the way you connect today and what kind of closeness you want to nurture.",
			career: "In your work, build on past experience, choose a clear next step, and stay open to where your strengths can lead.",
			money: "With money, take stock of what has shaped your habits, focus on a practical choice now, and keep long-term stability in view.",
			general: "Across your life, notice what has shaped you, what needs attention now, and what you may want to carry forward."
		},
		th: {
			love: "เรื่องความรักชวนให้สังเกตรูปแบบจากอดีตที่ส่งผลต่อความสัมพันธ์ในวันนี้ และความใกล้ชิดแบบใดที่คุณอยากดูแลให้เติบโต",
			career: "เรื่องการงานชวนให้นำประสบการณ์ที่ผ่านมาเป็นพื้นฐาน เลือกก้าวต่อไปให้ชัดเจน และเปิดรับโอกาสที่จุดแข็งของคุณจะพาไป",
			money: "เรื่องการเงินชวนให้ทบทวนนิสัยที่สั่งสมมา เลือกจัดการสิ่งที่ทำได้ในตอนนี้ และคำนึงถึงความมั่นคงในระยะยาว",
			general: "เรื่องราวในชีวิตชวนให้สังเกตสิ่งที่หล่อหลอมคุณ สิ่งที่ต้องใส่ใจในตอนนี้ และสิ่งที่อยากนำติดตัวไปข้างหน้า"
		}
	};
	const positionKeys = ["past", "present", "future"];
	const topicButtons = Array.from(document.querySelectorAll(".topic-button"));
	const drawButton = document.getElementById("draw-button");
	const drawButtonLabel = document.getElementById("draw-button-label");
	const drawStatus = document.getElementById("draw-status");
	const cardPicker = document.getElementById("card-picker");
	const deckGrid = document.getElementById("deck-grid");
	const readingStepThree = document.getElementById("reading-step-three");
	const getResultButton = document.getElementById("get-result");
	const result = document.getElementById("reading-result");
	const questionInput = document.getElementById("reading-question");
	const aiStatus = document.getElementById("ai-status");
	const aiDebug = document.getElementById("ai-debug");
	const aiDebugOutput = document.getElementById("ai-debug-output");
	const readingReflection = document.getElementById("reading-reflection");
	const languageButton = document.getElementById("language-toggle");
	const cardBaseUrl = window.gypsyTarotConfig.cardBaseUrl;
	const deck = cardData.slice();
	let language = (function () {
		try { return window.localStorage.getItem("gypsyLanguage") === "en" ? "en" : "th"; } catch (error) { return "th"; }
	}());
	let topic = "general";
	let drawnCards = [];
	let aiReading = null;
	let aiReadingState = "idle";
	let aiNote = "";
	let aiRequestId = 0;
	let isShuffled = false;
	let isAnimatingShuffle = false;
	let shuffleTimer = null;

	function shuffle(cards) {
		for (let index = cards.length - 1; index > 0; index -= 1) {
			const randomIndex = Math.floor(Math.random() * (index + 1));
			[cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
		}
	}

	function translate(key, replacements) {
		let value = translations[language][key];
		if (replacements) {
			Object.keys(replacements).forEach(function (name) {
				value = value.replace("{" + name + "}", replacements[name]);
			});
		}
		return value;
	}

	function setLanguage(nextLanguage) {
		language = nextLanguage;
		document.documentElement.lang = language === "th" ? "th" : "en";
		try { window.localStorage.setItem("gypsyLanguage", language); } catch (error) {}
		document.querySelectorAll("[data-i18n]").forEach(function (element) {
			const key = element.getAttribute("data-i18n");
			element.textContent = translate(key);
		});
		document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
			element.placeholder = translate(element.getAttribute("data-i18n-placeholder"));
		});
		languageButton.textContent = language === "en" ? "ภาษาไทย" : "English";
		languageButton.setAttribute("aria-label", language === "en" ? "Switch to Thai" : "Switch to English");
		document.querySelector(".topic-list").setAttribute("aria-label", language === "en" ? "Choose a reading topic" : "เลือกหัวข้อการอ่านไพ่");
		topicButtons.forEach(function (button) {
			button.setAttribute("aria-pressed", String(button.dataset.topic === topic));
		});
		deckGrid.setAttribute("aria-label", translate("deckLabel"));
		updateDeckLabels();
		updateDrawControls();
		drawnCards.forEach(function (drawn, index) {
			const name = document.getElementById("slot-" + index).querySelector(".slot-card-name");
			if (name) {
				name.textContent = displayName(drawn.card);
			}
		});
		if (drawnCards.length === 3 && !result.hidden) {
			renderResult();
		}
	}

	function updateAiStatus() {
		const statusKeys = {
			loading: "aiWorking",
			success: "aiComplete",
			fallback: "aiFallback"
		};
		const message = statusKeys[aiReadingState] ? translate(statusKeys[aiReadingState]) : "";
		aiStatus.classList.toggle("is-loading", aiReadingState === "loading");
		if (aiReadingState === "loading") {
			const spinner = document.createElement("span");
			spinner.className = "dream-spinner";
			spinner.setAttribute("aria-hidden", "true");
			const icon = document.createElement("span");
			icon.textContent = "☾";
			spinner.appendChild(icon);
			const text = document.createElement("span");
			text.textContent = message;
			aiStatus.replaceChildren(spinner, text);
		} else {
			aiStatus.textContent = message;
		}
	}

	function renderAiDebug(debugData) {
		if (!window.gypsyTarotConfig.debugEnabled || !aiDebug || !aiDebugOutput) {
			return;
		}
		aiDebugOutput.textContent = JSON.stringify(debugData, null, 2);
		aiDebug.hidden = false;
	}

	function updateDrawControls() {
		if (!isShuffled) {
			drawButtonLabel.textContent = translate("shuffleDeck");
			drawStatus.textContent = translate("drawInitial");
			drawButton.disabled = false;
			return;
		}
		drawButtonLabel.textContent = translate("reshuffleDeck");
		drawButton.disabled = isAnimatingShuffle;
		if (isAnimatingShuffle) {
			drawStatus.textContent = translate("drawShuffling");
			return;
		}
		if (drawnCards.length === 3) {
			drawStatus.textContent = translate("selectComplete");
			return;
		}
		drawStatus.textContent = drawnCards.length === 0
			? translate("drawReady")
			: translate("drawProgress", { number: drawnCards.length });
	}

	function readCard(card, reversed) {
		if (language === "th") {
			return reversed ? card.reversedTh : card.uprightTh;
		}
		return reversed ? card.reversed : card.upright;
	}

	function displayName(card) {
		return language === "th" ? card.thai : card.name;
	}

	function updateDeckLabels() {
		deckGrid.querySelectorAll(".deck-choice").forEach(function (button) {
			const position = Number(button.dataset.cardIndex) + 1;
			button.setAttribute("aria-label", button.classList.contains("is-selected")
				? translate("selectedCardBack", { number: button.dataset.position })
				: translate("selectCard", { number: position }));
		});
	}

	function renderDeck() {
		deckGrid.replaceChildren();
		deck.forEach(function (card, index) {
			const button = document.createElement("button");
			button.className = "deck-choice";
			button.type = "button";
			button.dataset.cardIndex = String(index);
			button.style.setProperty("--card-order", String(index));
			button.style.setProperty("--card-tilt", (Math.random() * 12 - 6).toFixed(1) + "deg");
			button.disabled = true;
			button.setAttribute("aria-pressed", "false");

			const back = document.createElement("span");
			back.className = "deck-choice-back";
			back.setAttribute("aria-hidden", "true");
			back.textContent = "☾";
			button.appendChild(back);
			button.addEventListener("click", function () {
				drawOne(index, button);
			});
			deckGrid.appendChild(button);
		});
		updateDeckLabels();
	}

	function resetSlots() {
		positionKeys.forEach(function (position, index) {
			const slot = document.getElementById("slot-" + index);
			slot.innerHTML = '<span class="slot-number">0' + (index + 1) + '</span><span class="slot-position" data-i18n="' + position + '"></span>';
			slot.classList.remove("has-card");
		});
	}

	function startShuffle() {
		drawnCards = [];
		aiReading = null;
		aiReadingState = "idle";
		aiRequestId += 1;
		isShuffled = true;
		isAnimatingShuffle = true;
		result.hidden = true;
		readingStepThree.hidden = true;
		getResultButton.disabled = true;
		if (shuffleTimer !== null) {
			window.clearTimeout(shuffleTimer);
		}
		resetSlots();
		deck.splice(0, deck.length, ...cardData);
		shuffle(deck);
		cardPicker.hidden = false;
		deckGrid.setAttribute("aria-busy", "true");
		renderDeck();
		updateDrawControls();

		shuffleTimer = window.setTimeout(function () {
			isAnimatingShuffle = false;
			shuffleTimer = null;
			deckGrid.setAttribute("aria-busy", "false");
			deckGrid.querySelectorAll(".deck-choice").forEach(function (button) {
				button.disabled = false;
			});
			updateDrawControls();
		}, 900);
	}

	function drawOne(cardIndex, choiceButton) {
		if (isAnimatingShuffle || !isShuffled || drawnCards.length >= 3 || choiceButton.disabled) {
			return;
		}

		const card = deck[cardIndex];
		const reversed = Math.random() < 0.35;
		drawnCards.push({ card: card, reversed: reversed });
		choiceButton.dataset.position = String(drawnCards.length);
		choiceButton.classList.add("is-selected");
		choiceButton.setAttribute("aria-pressed", "true");
		choiceButton.disabled = true;
		choiceButton.setAttribute("aria-label", translate("selectedCardBack", { number: drawnCards.length }));

		const position = drawnCards.length - 1;
		const slot = document.getElementById("slot-" + position);
		slot.classList.add("has-card");
		const visual = document.createElement("span");
		visual.className = reversed ? "slot-card is-reversed" : "slot-card";
		visual.setAttribute("aria-label", translate("selectedCardBack", { number: position + 1 }));
		const back = document.createElement("span");
		back.className = "slot-card-back";
		back.setAttribute("aria-hidden", "true");
		back.textContent = "☾";
		const face = document.createElement("span");
		face.className = "slot-card-face";
		face.setAttribute("aria-hidden", "true");
		const illustration = document.createElement("img");
		illustration.className = "slot-card-image";
		illustration.src = cardBaseUrl + card.image;
		illustration.alt = "";
		illustration.width = 520;
		illustration.height = 920;
		illustration.decoding = "async";
		const name = document.createElement("span");
		name.className = "slot-card-name";
		name.textContent = displayName(card);
		face.append(illustration, name);
		visual.append(back, face);
		slot.appendChild(visual);

		if (drawnCards.length === 3) {
			deckGrid.querySelectorAll(".deck-choice:not(.is-selected)").forEach(function (button) {
				button.disabled = true;
			});
			readingStepThree.hidden = false;
			getResultButton.disabled = false;
			updateDrawControls();
			readingStepThree.scrollIntoView({ behavior: "smooth", block: "nearest" });
			return;
		}

		updateDrawControls();
	}

	function renderResult() {
		const selectedTopic = topicNames[language][topic];
		document.getElementById("result-intro").textContent = translate("topicOpen", { topic: selectedTopic });
		const cardsElement = document.getElementById("result-cards");
		cardsElement.replaceChildren();

		drawnCards.forEach(function (drawn, index) {
			const article = document.createElement("article");
			article.className = "result-card";
			const position = document.createElement("span");
			position.className = "result-position";
			position.textContent = translate(positionKeys[index]);
			const illustration = document.createElement("img");
			illustration.className = "result-card-image";
			illustration.src = cardBaseUrl + drawn.card.image;
			illustration.alt = displayName(drawn.card);
			illustration.width = 520;
			illustration.height = 920;
			illustration.loading = "lazy";
			illustration.decoding = "async";
			const title = document.createElement("h4");
			title.textContent = displayName(drawn.card);
			const orientation = document.createElement("span");
			orientation.className = "orientation";
			orientation.textContent = translate(drawn.reversed ? "reversed" : "upright");
			const meaning = document.createElement("p");
			meaning.textContent = readCard(drawn.card, drawn.reversed);
			article.append(position, illustration, title, orientation, meaning);
			cardsElement.appendChild(article);
		});

		const builtInReading = topicGuidance[language][topic] + " " + translate("synthesis", {
			past: resultMeaning(drawnCards[0]),
			present: resultMeaning(drawnCards[1]),
			future: resultMeaning(drawnCards[2])
		}) + " " + translate("reflection");
		if (aiReading) {
			renderMarkdown(readingReflection, aiReading);
		} else {
			readingReflection.textContent = aiReadingState === "loading" ? translate("aiPending") : builtInReading;
		}
		updateAiStatus();
		const oldNote = result.querySelector(".reading-note");
		if (oldNote) {
			oldNote.remove();
		}
		if (aiNote && aiReadingState !== "loading") {
			const note = document.createElement("p");
			note.className = "reading-note";
			note.textContent = aiNote;
			readingReflection.insertAdjacentElement("afterend", note);
		}
	}

	function appendInline(parent, text) {
		text.split(/(\*\*[^*]+\*\*)/u).forEach((part) => {
			if (/^\*\*[^*]+\*\*$/u.test(part)) {
				const strong = document.createElement("strong");
				strong.textContent = part.slice(2, -2);
				parent.appendChild(strong);
			} else if (part) {
				parent.appendChild(document.createTextNode(part.replace(/\*([^*]+)\*/gu, "$1")));
			}
		});
	}

	function tableCells(line) {
		return line.trim().replace(/^\||\|$/gu, "").split("|").map((cell) => cell.trim());
	}

	// Safe minimal markdown renderer (DOM nodes only, never innerHTML).
	function renderMarkdown(container, source) {
		const lines = source
			.replace(/\r\n?/gu, "\n")
			.replace(/[ \t]+(-{3,})[ \t]+/gu, "\n$1\n")
			.replace(/[ \t]+(#{1,4}[ \t])/gu, "\n$1")
			.replace(/\|[ \t]+\|(?=[ \t]*[:\-*A-Za-z\u0E00-\u0E7F])/gu, "|\n|")
			.split("\n");
		container.textContent = "";
		let paragraph = null;
		let list = null;
		let table = null;
		const reset = () => { paragraph = null; list = null; table = null; };

		lines.forEach((raw) => {
			const line = raw.trim();
			if (!line) { reset(); return; }
			if (/^-{3,}$/u.test(line)) { reset(); container.appendChild(document.createElement("hr")); return; }
			const heading = line.match(/^(#{1,4})\s+(.*)$/u);
			if (heading) {
				reset();
				const h = document.createElement("h4");
				appendInline(h, heading[2]);
				container.appendChild(h);
				return;
			}
			if (line.startsWith("|")) {
				if (/^\|[\s:|-]+\|?$/u.test(line)) { return; }
				if (!table) {
					paragraph = null; list = null;
					table = document.createElement("table");
					container.appendChild(table);
				}
				const row = document.createElement("tr");
				const isHead = !table.rows.length;
				tableCells(line).forEach((cell) => {
					const td = document.createElement(isHead ? "th" : "td");
					appendInline(td, cell);
					row.appendChild(td);
				});
				table.appendChild(row);
				return;
			}
			const item = line.match(/^(?:[-*•]|\d+[.)])\s+(.*)$/u);
			if (item) {
				paragraph = null; table = null;
				if (!list) {
					list = document.createElement("ul");
					container.appendChild(list);
				}
				const li = document.createElement("li");
				appendInline(li, item[1]);
				list.appendChild(li);
				return;
			}
			list = null; table = null;
			if (!paragraph) {
				paragraph = document.createElement("p");
				container.appendChild(paragraph);
			} else {
				paragraph.appendChild(document.createTextNode(" "));
			}
			appendInline(paragraph, line);
		});
	}

	function resultMeaning(drawn) {
		const meaning = readCard(drawn.card, drawn.reversed).replace(/[.!?。]+$/u, "");
		return language === "en" ? meaning.charAt(0).toLowerCase() + meaning.slice(1) : meaning;
	}

	getResultButton.addEventListener("click", async function () {
		if (drawnCards.length !== 3 || !result.hidden) {
			return;
		}
		document.querySelectorAll(".slot-card").forEach(function (card, index) {
			card.classList.add("is-revealed");
			card.setAttribute("aria-label", displayName(drawnCards[index].card));
		});
		getResultButton.disabled = true;
		cardPicker.hidden = true;
		aiReading = null;
		aiReadingState = "loading";
		aiNote = "";
		const requestId = ++aiRequestId;
		if (aiDebug) {
			aiDebug.hidden = true;
		}
		if (aiDebugOutput) {
			aiDebugOutput.textContent = "";
		}
		renderResult();
		result.hidden = false;
		result.scrollIntoView({ behavior: "smooth", block: "nearest" });

		const clientRequest = {
			question: questionInput.value.trim(),
			language: language,
			topic: topic,
			cards: drawnCards.map(function (drawn) {
				return {
					name: drawn.card.name,
					displayName: displayName(drawn.card),
					reversed: drawn.reversed
				};
			})
		};
		const abortController = new AbortController();
		const requestTimeout = window.setTimeout(function () {
			abortController.abort();
		}, 100000);
		try {
			const response = await fetch(window.gypsyTarotConfig.restUrl, {
				method: "POST",
				credentials: "omit",
				signal: abortController.signal,
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(clientRequest)
			});
			let data;
			try {
				data = await response.json();
				if (data && data.note) {
					aiNote = String(data.note);
				}
			} catch (error) {
				renderAiDebug({
					endpoint: window.gypsyTarotConfig.groqEndpoint,
					endpointUrl: window.gypsyTarotConfig.groqEndpoint,
					queryStatus: "error",
					errorText: error.message,
					requestPrompt: clientRequest,
					wordpressEndpoint: window.gypsyTarotConfig.restUrl,
					clientRequest: clientRequest,
					httpStatus: response.status,
					responseParseError: error.message
				});
				throw new Error("AI reading response was not valid JSON (HTTP " + response.status + ").");
			}
			if (!response.ok) {
				renderAiDebug(data && data.data && data.data.debug ? data.data.debug : {
					endpoint: window.gypsyTarotConfig.groqEndpoint,
					endpointUrl: window.gypsyTarotConfig.groqEndpoint,
					queryStatus: "error",
					errorText: data && data.message ? data.message : "AI reading request failed with status " + response.status,
					requestPrompt: clientRequest,
					wordpressEndpoint: window.gypsyTarotConfig.restUrl,
					clientRequest: clientRequest,
					httpStatus: response.status,
					error: data
				});
				throw new Error("AI reading request failed with status " + response.status);
			}
			if (!data || typeof data.reading !== "string" || !data.reading.trim()) {
				renderAiDebug(data && data.debug ? data.debug : {
					endpoint: window.gypsyTarotConfig.groqEndpoint,
					endpointUrl: window.gypsyTarotConfig.groqEndpoint,
					queryStatus: "error",
					errorText: "The AI API response did not contain an interpretation.",
					requestPrompt: clientRequest,
					wordpressEndpoint: window.gypsyTarotConfig.restUrl,
					clientRequest: clientRequest,
					response: data
				});
				throw new Error("AI reading response did not contain an interpretation.");
			}
			if (data.reading.trim().length < 40) {
				renderAiDebug(Object.assign({}, data.debug || {}, {
					endpoint: window.gypsyTarotConfig.groqEndpoint,
					queryStatus: "error",
					errorText: "The AI API returned an interpretation that was too short to use.",
					requestPrompt: clientRequest,
					responsePrompt: data.reading
				}));
				throw new Error("AI reading response was too short to use.");
			}
			if (requestId !== aiRequestId) {
				return;
			}
			if (data.debug) {
				renderAiDebug(data.debug);
			}
			aiReading = data.reading.trim();
			aiNote = String(data.note || "");
			aiReadingState = "success";
		} catch (error) {
			if (requestId !== aiRequestId) {
				return;
			}
			aiReading = null;
			aiNote = [aiNote, error && error.message].filter(Boolean).join(" — ");
			if (window.gypsyTarotConfig.debugEnabled && aiDebug && aiDebug.hidden) {
				renderAiDebug({
					endpoint: window.gypsyTarotConfig.groqEndpoint,
					endpointUrl: window.gypsyTarotConfig.groqEndpoint,
					queryStatus: "error",
					errorText: error.message,
					requestPrompt: clientRequest,
					wordpressEndpoint: window.gypsyTarotConfig.restUrl,
					clientRequest: clientRequest,
					clientError: error.message
				});
			}
			console.warn("AI reading unavailable; showing the built-in interpretation.", error);
			aiReadingState = "fallback";
		} finally {
			window.clearTimeout(requestTimeout);
		}
		renderResult();
	});

	topicButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			topic = button.dataset.topic;
			topicButtons.forEach(function (item) {
				item.setAttribute("aria-pressed", String(item === button));
			});
		});
	});

	drawButton.addEventListener("click", startShuffle);

	languageButton.addEventListener("click", function () {
		setLanguage(language === "en" ? "th" : "en");
	});

	document.getElementById("start-again").addEventListener("click", function () {
		drawnCards = [];
		aiReading = null;
		aiReadingState = "idle";
		aiRequestId += 1;
		isShuffled = false;
		isAnimatingShuffle = false;
		if (shuffleTimer !== null) {
			window.clearTimeout(shuffleTimer);
			shuffleTimer = null;
		}
		deck.splice(0, deck.length, ...cardData);
		resetSlots();
		cardPicker.hidden = true;
		readingStepThree.hidden = true;
		getResultButton.disabled = true;
		deckGrid.replaceChildren();
		result.hidden = true;
		setLanguage(language);
		updateDrawControls();
		drawButton.scrollIntoView({ behavior: "smooth", block: "center" });
	});

	setLanguage(language);

	(function loadVisitorCount() {
		const countElement = document.getElementById("visitor-count");
		const counted = (function () {
			try { return window.localStorage.getItem("gypsyVisitorCounted") === "1"; } catch (error) { return false; }
		}());
		const configRef = window.gypsyTarotConfig;
		function show(data) {
			if (!data || typeof data.count !== "number") { throw new Error("Visitor counter bad response"); }
			countElement.textContent = data.count.toLocaleString();
			try { window.localStorage.setItem("gypsyVisitorCounted", "1"); } catch (error) {}
		}
		function viaRest() {
			const base = configRef.visitorsUrl;
			const url = base + (base.indexOf("?") === -1 ? "?" : "&") + "t=" + Date.now();
			return fetch(url, { method: counted ? "GET" : "POST", credentials: "omit", cache: "no-store" }).then(function (response) {
				if (!response.ok) { throw new Error("Visitor counter HTTP " + response.status); }
				return response.json();
			});
		}
		function viaAjax() {
			return fetch(configRef.ajaxUrl, {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: "action=gypsy_tarot_visitors&increment=" + (counted ? "0" : "1"),
				cache: "no-store"
			}).then(function (response) {
				if (!response.ok) { throw new Error("Visitor counter ajax HTTP " + response.status); }
				return response.json();
			});
		}
		viaRest().catch(function (error) {
			console.warn(error);
			return viaAjax();
		}).then(show).catch(function (error) { console.warn(error); });
	}());
}());
