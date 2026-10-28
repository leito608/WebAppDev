# ดูแม่นๆ (Doomanman.com)

A no-account, bilingual tarot-reading experience built as an installable WordPress theme. ดูแม่นๆ (Doomanman.com) pairs a midnight-purple, gold-accented visual identity and celestial motifs with an interactive three-card past / present / future spread using a standard 78-card tarot deck.

## User stories

1. **As a visitor,** I want to start a reading from the homepage so I can explore the experience without registering or paying.
2. **As a visitor,** I want to focus on love, career, money, or general life so the reading reflects the question on my mind.
3. **As a visitor,** I want to shuffle and see all 78 illustrated cards, then pick the three that catch my eye so my past, present, and future spread feels personal.
4. **As a visitor,** I want each drawn card to show whether it is upright or reversed and explain its meaning in context so I can understand the result.
5. **As a Thai- or English-speaking visitor,** I want to switch the interface and card meanings between Thai and English so I can read comfortably in either language.
6. **As a mobile visitor,** I want the reading flow and results to adapt to a small screen and respect reduced-motion preferences so the experience stays usable.
7. **As a visitor,** I want a complete reading with a reflective summary and a way to begin again so I can revisit the cards.
8. **As a visitor,** I want to add my own question and receive an AI interpretation of my three cards so the reading speaks to what is on my mind.
9. **As a visitor,** I want the built-in interpretation to remain available if AI is unavailable so I can still complete my reading.
10. **As a visitor,** I want to describe a dream and receive an interpretation with 3- and 2-digit lottery numbers, in my chosen language (Thai/English).
11. **As a visitor,** I want to upload a photo of my palm and receive an AI palm reading in my chosen language (Thai/English).
12. **As a visitor,** I want Thai/English privacy, about, and contact pages so I can understand the service and reach its owner.
13. **As a visitor,** I want to view the latest manually maintained lucky-number scores and their explanations in a table.

## Install

1. In WordPress, go to **Appearance → Themes** and activate **ดูแม่นๆ (Doomanman.com)**.
2. Set this homepage as the site's static front page under **Settings → Reading** if the site does not already use the latest posts as its home page.
3. Configure the Groq API key and model IDs on the server (see **AI configuration** below).
4. Open the site and choose **Start your reading**. No payment setup or visitor account is needed.

## Social sharing previews

The homepage, dream teller, and palm teller use `assets/images/tarot-share.jpg` (1200 × 630) for Open Graph and Twitter preview images. The image URL must be publicly reachable over HTTPS for social crawlers. After deploying a theme update, use Meta's Sharing Debugger to refresh Facebook's cached preview.

## Dream interpretation

The `/dream-teller/` page lets visitors describe a dream and sends it to the Cloudflare Worker `/dream` route (Gemini). The page shares the Thai/English toggle with the home page via `localStorage` (`gypsyLanguage`). The interpretations are reflective and for entertainment; they do not predict guaranteed events or replace professional advice.

## Palm reading

The `/palm-teller/` page lets visitors optionally ask a question and upload a palm photo (JPEG, PNG, or WebP). The browser resizes the image client-side, then sends it to the Cloudflare Worker `/palm` route (Groq vision). The reading covers past, present, and future with age ranges and focuses on the visitor’s question. If `GYPSY_TAROT_API_BASE` is not set, the theme falls back to the WordPress REST route `/gypsy-tarot/v1/palm`, which also uses Groq vision. Configure `GROQ_API_KEY` and a vision-capable `GROQ_PALM_MODEL` (defaults to `qwen/qwen3.8-27b`). Readings are reflective and for entertainment only; they are not medical advice.

## Lucky numbers

The `/lekded/` page reads its topic and up to five table rows from `lekded.txt` in the theme directory. To update the page, edit that text file using this format:

```text
topic: งวด 1 พฤศจิกายน 2569
อันดับ|ตัวเลข|คะแนนรวม|รายละเอียดที่มาของคะแนน
1|40|300|รายละเอียดคะแนน
```

Add up to five data rows after the header. The table is informational and does not guarantee lottery results.

## Visitor counter

The shared header loads the visitor count from the configured `/visitors` API on every theme page. A browser is counted once using `localStorage`; the API count is displayed when it responds, with the WordPress AJAX counter as a fallback.

## Privacy, about, and contact pages

The `/privacy-policy/`, `/about-us/`, and `/contact-us/` pages share the site's Thai/English language preference. The privacy policy explains that submitted questions, dream descriptions, palm photos, and readings are not saved in a site account or database, while disclosing AI-provider processing, temporary rate-limit identifiers, browser storage, and hosting logs. Contact is available through LINE ID `maroon608`.

## AI configuration

The optional Groq integration sends the visitor's question, chosen topic, and three selected cards to Groq when they reveal the reading. Card names are sent in English with their Past / Present / Future positions and upright / reversed orientations; the response language follows the selected site language. The API key stays on the server and is never sent to the browser. If the AI service is unavailable, the app displays its built-in interpretation instead.

The system prompt guides the AI to provide a coherent, question-specific and safety-conscious reading, following the Expert Tarot Reader instructions supplied with the project. The results show a short loading message while the AI response is being prepared. If the request times out, fails, returns invalid JSON, has an unsuccessful HTTP status, or contains a missing or too-short interpretation, the app falls back to its built-in reading.

For a local site, the theme reads only the `GROQ_API_KEY` and `GROQ_LLM_MODEL1` through `GROQ_LLM_MODEL7` assignments from the `.envrc` file one directory above the WordPress document root. It parses those specific assignments; it never executes `.envrc` as shell code.

For a host that does not provide environment variables, define server-side constants in `wp-config.php` before the “That's all, stop editing” line:

```php
define( 'GYPSY_TAROT_GROQ_API_KEY', 'your-server-side-api-key' );
define( 'GYPSY_TAROT_GROQ_LLM_MODEL1', 'your-first-model-id' );
define( 'GYPSY_TAROT_GROQ_LLM_MODEL2', 'your-second-model-id' );
// Continue with GYPSY_TAROT_GROQ_LLM_MODEL3 through MODEL7 as needed.
define( 'GYPSY_TAROT_GROQ_PALM_MODEL', 'qwen/qwen3.8-27b' );
```

Use private configuration values; never add real keys to the theme, upload archive, or a public repository. The app tries model 1 first and advances only after a token/context-limit error. Other API failures use the built-in reading. Requests are limited to five per IP address per hour.

The theme self-hosts the Kanit typeface under its SIL Open Font License and serves all 78 public-domain card illustrations locally.

## Local AI diagnostics

On a WordPress installation whose environment type is `local` and whose site host is `localhost`, `.local`, or `.test`, the reading result includes a collapsed diagnostics panel after an AI request. It shows the Groq endpoint, the exact prompts and model settings sent, and the response from each Groq attempt (including HTTP failures). The API key and authorization headers are never included. Diagnostics are not returned or rendered on hosted environments.

The diagnostics can contain the visitor's question and AI response. Use this panel only with local test data, and avoid sharing screenshots or copied output that contain private information.

## Card artwork

The theme includes the complete 78-card Rider-Waite-Smith deck, scanned from the original 1909 cards illustrated by Pamela Colman Smith. The scans are marked public domain on [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?search=intitle%3ARWS1909&title=Special:MediaSearch&type=image). Card images are served locally from `assets/cards/`; a reading does not load card images from a third-party host. Artist credit: Pamela Colman Smith (1878–1951). Wikimedia Commons image records list the scan source and public-domain status.
