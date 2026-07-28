# Legacy Service Pages Retirement Design

Date: 2026-07-28  
Site: `https://fable-castle.com/`  
Repo: `fable-cc/fable-castle`

## 1. Purpose

Retire the remaining legacy service subpages that still expose old package pricing, course-like positioning, unverifiable market claims, or direct low-quality conversion signals.

This is a signal-cleanup upgrade, not a new service launch. The goal is to keep old URLs reachable while preventing search engines, AI systems, and visitors from interpreting the current site as a low-ticket course, fixed-price package, or guaranteed-ranking service.

## 2. Current findings

Live checks found these pages still return `200` and contain stale service language:

- `/services/geo.html`
- `/services/agent.html`
- `/services/training.html`
- `/services/geo-en.html`
- `/services/geo-test.html`

Previously cleaned pages already follow the safer pattern:

- `/services/enterprise.html`
- `/services/geo-global.html`

Old course and knowledge-base routes are not the immediate problem in this round. Live checks show:

- `/course/` returns `404`
- `/02-知识图谱/` returns `404`

The repository still contains excluded source folders such as `01-方法论/` and `02-知识图谱/`, but `_config.yml` and `robots.txt` already exclude or disallow them. This round does not delete or reorganize the Obsidian-derived source material.

## 3. Non-goals

This round must not:

- Build the new GEO public research page.
- Publish the Obsidian knowledge base as a public knowledge portal.
- Delete legacy URLs.
- Restore low-ticket course entry points.
- Add or expose paid tools, private prompts, customer data, rules, API keys, or internal workflows.
- Claim a guaranteed AI citation, search ranking, indexation result, traffic lift, revenue lift, or fixed score improvement.
- Rewrite the whole service architecture.

## 4. Design decision

Use a “soft retirement” pattern for each remaining legacy page.

Each page keeps its existing URL, but the visible content becomes a concise historical-service notice:

1. This page is a historical service page.
2. The current public entry is now the AI Visibility and IP Asset Diagnosis.
3. The old offering has been merged into a diagnosis-first service system.
4. No fixed packages, fixed public prices, or ranking/result guarantees are presented.
5. Visitors are routed to current trusted pages.

This avoids unnecessary 404s while removing outdated business signals.

## 5. Target pages and responsibilities

### `services/geo.md`

Role after change: historical Chinese GEO service page.

It should explain that enterprise GEO now starts with diagnosis of brand entity, evidence chain, crawlability, search visibility, and AI answer behavior. It must route to `/diagnosis/`, `/services/`, `/research/methodology/`, and `/cases/`.

### `services/agent.md`

Role after change: historical Agent service page.

It should explain that Agent work is no longer sold as a standalone fixed package on this public site. It belongs under the broader knowledge-asset and AI visibility diagnosis path. It must mention isolation of internal docs, prompts, keys, and customer data.

### `services/training.md`

Role after change: historical training service page.

It should explain that founder IP, training, and knowledge-delivery work now enters through the same five-asset diagnosis model. It must remove market-size hype, old public pricing, and direct personal-contact conversion copy.

### `services/geo-en.md`

Role after change: historical English GEO service page.

It should become a short English page: “This legacy page has been retired; current engagement starts with AI Visibility and IP Asset Diagnosis.” It should avoid market-size, ROI, CAC, or guaranteed platform language.

### `services/geo-test.md`

Role after change: historical self-test page.

It should route users to the current `/diagnosis/` self-assessment and `/tools/` instead of maintaining a separate old scoring system.

## 6. Copy constraints

The updated legacy pages must not contain:

- `¥4,980`
- `¥19,800`
- `¥29,800`
- `¥49,800`
- `¥79,800`
- `¥198,000`
- `¥999/年`
- `S-9595A`
- `知识星球`
- `AI搜索渗透率`
- `全球GEO市场`
- `ROI`
- `排名提升`
- `保证`
- `全覆盖`
- `首单`

Allowed wording:

- “历史服务页”
- “当前服务入口已统一收口到 AI 可见度与 IP 资产诊断”
- “不承诺搜索排名、收录结果、AI 引用概率或固定增长结果”
- “先诊断，再决定是否进入顾问、内容证据治理、知识库治理或年度监测”

## 7. Navigation and sitemap policy

No new top-level navigation entries are added.

`/services/` remains the current service hub. The legacy subpages should not be added to `sitemap.xml`. Existing sitemap policy remains: recommend the current service overview, diagnosis, research methodology, cases, tools, and AI-readable files.

## 8. CI and verification design

Extend `.github/workflows/pages.yml` so the Jekyll build fails if the retired legacy pages reintroduce stale signals.

The check should inspect built pages:

- `./_site/services/geo.html`
- `./_site/services/agent.html`
- `./_site/services/training.html`
- `./_site/services/geo-en.html`
- `./_site/services/geo-test.html`

The check should fail on the banned strings listed in section 6.

Local validation should include:

- YAML load for `_config.yml` and workflows.
- `git diff --check`.
- Content scan over source service pages.
- Existing internal link contract.
- Optional remote deployment verification after push.

## 9. Expected outcome

After implementation:

- The public site has one clearer service story: diagnosis first, then service routing.
- Legacy URLs remain reachable but no longer pollute GEO or sales positioning.
- AI systems are less likely to cite stale fixed-price packages or course/training copy.
- The Obsidian source library remains a private/source-side asset, not a public dump.
- The later GEO research page can be added on cleaner ground.

## 10. Approval gate

Implementation must wait for written-spec approval. The next step after approval is a detailed implementation plan, then page edits, CI edits, local checks, push, Actions watch, and live verification.
