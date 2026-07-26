# Cloudflare robots / AI crawler fix checklist

Date: 2026-07-26
Domain: https://fable-castle.com/

## Current live issue

Cloudflare Managed robots.txt is prepended before the repository robots.txt. The live file currently contains Cloudflare-managed `Disallow: /` rules for several AI crawlers before the site's own `Allow: /` rules.

Observed blocked crawlers:

- GPTBot
- ClaudeBot
- Bytespider
- CCBot
- Google-Extended

Observed allowed crawlers:

- OAI-SearchBot
- ChatGPT-User
- PerplexityBot

## Recommended GEO policy

For AI visibility, allow search and answer/retrieval crawlers that can help the site be discovered, cited, or understood.

Recommended:

- Allow: GPTBot
- Allow: ClaudeBot
- Allow: Bytespider
- Allow: OAI-SearchBot
- Allow: ChatGPT-User
- Allow: PerplexityBot
- Optional allow: CCBot
- Optional block: Google-Extended, if the goal is to avoid Google AI training while keeping Googlebot search crawling unaffected

## Cloudflare dashboard steps

1. Log in to Cloudflare.
2. Select the `fable-castle.com` zone.
3. Go to `Security` -> `Bots`.
4. Open `Configure Bot Fight Mode` if shown.
5. Turn off Cloudflare managed robots behavior, named one of:
   - `Instruct bot traffic with robots.txt`
   - `Set your preference to block training in robots.txt`
   - `Managed robots.txt`
6. Go to `AI Crawl Control` -> `Crawlers`.
7. For GPTBot, ClaudeBot and Bytespider, set action to `Allow`.
8. For CCBot, choose based on strategy:
   - Allow if you want broader Common Crawl / model ecosystem discoverability.
   - Block if you do not want dataset-style crawling.
9. Keep Googlebot allowed for normal Google Search. Google-Extended can remain blocked if you do not want Google AI training use.
10. Wait a few minutes for Cloudflare cache/config propagation.

## Verification command

Run from this repository:

```bash
python3 ops/verify-live-robots.py
```

Expected after Cloudflare fix:

- GPTBot: not blocked
- ClaudeBot: not blocked
- Bytespider: not blocked
- OAI-SearchBot: allowed
- ChatGPT-User: allowed
- PerplexityBot: allowed

If Cloudflare Managed content still appears before the repository robots rules with `Disallow: /` for GPTBot or ClaudeBot, the dashboard setting is still active.
