# Tarot Gypsy API (Cloudflare Worker)

Replaces the WordPress REST endpoints in `functions.php`:

| Method | Path | Purpose |
|---|---|---|
| POST | `/reading` | Validates input, calls Groq (model fallback), returns `{ reading }` |
| POST | `/dream` | Body `{ dream, language }`; calls Gemini (`gemini-3.8-flash`, then `gemini-3.6-flash`, then `gemini-2.5-flash`, then `gemini-3.5-flash-lite`, then `gemini-2.5-flash-lite`, moving on after each 429; at least 3 attempts, one per model, so 5 in total) with Google Search grounding. If every Gemini model fails or is rate-limited, it falls back to Groq (`GROQ_API_KEY` + `GROQ_LLM_MODEL1..7`). Returns `{ reading }` |
| GET / POST | `/visitors` | Returns `{ count }`; POST increments |

Paths also work with the `/gypsy-tarot/v1` prefix.

## Setup
```
cd be
npm install
npx wrangler kv namespace create KV   # paste id into wrangler.toml
npx wrangler secret put GROQ_API_KEY
npx wrangler secret put GEMINI_API_KEY
npm run deploy
```
Local: copy `.dev.vars.example` to `.dev.vars`, then `npm run dev`.

Set `ALLOWED_ORIGINS` in `wrangler.toml` to your site origin.
Then point the theme's `restUrl` / `visitorsUrl` (in `functions.php`) at the worker URL
(e.g. `https://tarot-gypsy-api.<account>.workers.dev/reading`).

Note: the KV visitor counter is not atomic; use a Durable Object if exact counts matter.
The Groq key currently in `wp-config.php` was exposed in plain text — rotate it.
