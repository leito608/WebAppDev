# Tarot Gypsy API (Cloudflare Worker)

Replaces the WordPress REST endpoints in `functions.php`:

| Method | Path | Purpose |
|---|---|---|
| POST | `/reading` | Validates input, calls Groq (model fallback), returns `{ reading }` |
| GET / POST | `/visitors` | Returns `{ count }`; POST increments |

Paths also work with the `/gypsy-tarot/v1` prefix.

## Setup
```
cd be
npm install
npx wrangler kv namespace create KV   # paste id into wrangler.toml
npx wrangler secret put GROQ_API_KEY
npm run deploy
```
Local: copy `.dev.vars.example` to `.dev.vars`, then `npm run dev`.

Set `ALLOWED_ORIGINS` in `wrangler.toml` to your site origin.
Then point the theme's `restUrl` / `visitorsUrl` (in `functions.php`) at the worker URL
(e.g. `https://tarot-gypsy-api.<account>.workers.dev/reading`).

Note: the KV visitor counter is not atomic; use a Durable Object if exact counts matter.
The Groq key currently in `wp-config.php` was exposed in plain text — rotate it.
