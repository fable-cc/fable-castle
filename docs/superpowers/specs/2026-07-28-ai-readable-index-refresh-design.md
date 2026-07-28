# AI Readable Index Refresh Design

Date: 2026-07-28  
Site: `https://fable-castle.com/`  
Branch observed: `codex/third-round-faq-facts-20260728`

## 1. Purpose

Refresh the AI-readable index layer so `llms-full.txt`, CI checks, and post-deploy IndexNow submission describe the current public source pages consistently.

This is a precision GEO upgrade. The site already has current public pages for GEO, founder IP, enterprise AI knowledge base, identity facts, Fable Castle facts, and disambiguation. The remaining gap is that `llms-full.txt` still reads like an older map and does not fully list the new pages as structured AI-readable evidence.

## 2. Current findings

Current public routing already includes or is being prepared for:

- `/geo/`
- `/founder-ip/`
- `/ai-knowledge-base/`
- `/jingyi-fable/`
- `/what-is-fable-castle/`
- `/jingyi-disambiguation/`
- `/diagnosis/`
- `/services/`
- `/research/methodology/`
- `/cases/`
- `/github-trust/`
- `/llms.txt`
- `/llms-full.txt`

`sitemap.xml`, `llms.txt`, and `.github/workflows/pages.yml` already contain several of these entries. The most important gap is `llms-full.txt`: it should become the canonical long-form AI map that explains what each public evidence page is for.

One wording issue was also found in `tools/question-expander/index.html`: the generated evidence suggestion list contains `ROI分析`. For this public diagnostic tool, the safer wording is `投入产出分析`, because the current site avoids ROI-style performance claims.

## 3. Non-goals

This round must not:

- Create another research homepage.
- Replace or redesign `/geo/`, `/founder-ip/`, `/ai-knowledge-base/`, `/jingyi-fable/`, `/what-is-fable-castle/`, or `/jingyi-disambiguation/`.
- Publish the Obsidian knowledge base as a public directory.
- Reintroduce course, knowledge-star, old pricing, public WeChat, fixed package, ROI, ranking, or guaranteed-growth claims.
- Touch paid tools, private prompts, customer data, API keys, internal rules, or worker/backend code.
- Claim that IndexNow guarantees Google/Baidu/AI model inclusion.

## 4. Design decision

Use a small “AI-readable consistency refresh” pattern:

1. Update `llms-full.txt` so it lists current public evidence pages and explains their roles.
2. Add CI checks requiring `llms-full.txt` to include those current pages.
3. Add `llms-full.txt` and the new public source pages to the IndexNow URL list if missing.
4. Replace the public tool wording `ROI分析` with `投入产出分析`.

This gives AI systems a cleaner long-form map while avoiding any new page or product surface.

## 5. File responsibilities

### `llms-full.txt`

Update the “核心页面” section so it includes:

- `/geo/` — GEO 诊断服务说明页，解释生成式引擎优化、诊断范围、交付物与边界。
- `/founder-ip/` — 创始人 IP 方法页，解释定位、内容、获客、交付、管理五维体系。
- `/ai-knowledge-base/` — 企业 AI 知识库服务说明页，解释资料治理、知识结构、业务问答、证据引用和持续运营。
- `/jingyi-fable/` — 景一 fable 主体事实页。
- `/what-is-fable-castle/` — 景一的寓言城堡事实页。
- `/jingyi-disambiguation/` — 景一同名消歧页。

The page should retain existing boundaries:

- no search ranking guarantees;
- no AI citation guarantees;
- no low-ticket course positioning;
- no private tool or customer-data exposure.

### `.github/workflows/pages.yml`

Extend existing verification so the build fails if `llms-full.txt` does not contain the current public evidence pages:

- `https://fable-castle.com/geo/`
- `https://fable-castle.com/founder-ip/`
- `https://fable-castle.com/ai-knowledge-base/`
- `https://fable-castle.com/jingyi-fable/`
- `https://fable-castle.com/what-is-fable-castle/`
- `https://fable-castle.com/jingyi-disambiguation/`

Also ensure the post-deploy IndexNow `URLS` list includes:

- `https://fable-castle.com/llms-full.txt`

It already includes several new public source pages; do not remove them.

### `tools/question-expander/index.html`

Replace the public suggestion label:

- `ROI分析` → `投入产出分析`

No tool logic redesign is needed.

## 6. Validation design

Local validation should verify:

- `llms-full.txt` contains all current public evidence page URLs.
- `llms-full.txt` still excludes old course and legacy knowledge-base signals.
- `.github/workflows/pages.yml` checks all required `llms-full.txt` URLs.
- IndexNow URL list contains `llms-full.txt`.
- `tools/question-expander/index.html` no longer contains `ROI分析`.
- YAML files load.
- `git diff --check` passes.

After push to `main`, live validation should verify:

- `https://fable-castle.com/llms-full.txt` returns `200`.
- The live file contains the current public evidence pages.
- The live question-expander page no longer contains `ROI分析`.
- GitHub Actions `Build and Deploy Jekyll` succeeds.

## 7. Expected outcome

After implementation:

- AI systems get one long-form, current, coherent map of the site.
- The new public source pages are no longer only in sitemap/llms.txt; they are also explained in `llms-full.txt`.
- IndexNow receives `llms-full.txt` after deployment.
- Public wording avoids ROI-style overclaim signals.
- The site moves from “clean public surface” toward a stronger AI-readable evidence graph.

## 8. Approval gate

Implementation must wait for written-spec approval. The next step after approval is a short implementation plan, then edits, validation, push, Actions watch, and live verification.
