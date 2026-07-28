# Legacy Service Pages Retirement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Soft-retire five remaining legacy service subpages so old pricing, package, training, and guarantee-like signals no longer pollute the current diagnosis-first website.

**Architecture:** Replace five legacy Markdown service pages with concise historical-service notices that keep URLs reachable and route users to current trusted pages. Extend the existing GitHub Pages verification workflow so stale service claims cannot be reintroduced. Preserve the concurrently added public source pages (`/geo/`, `/founder-ip/`, `/ai-knowledge-base/`) and do not add a new research page in this round.

**Tech Stack:** Jekyll static site, Markdown pages, HTML build output, GitHub Actions YAML, Python/Ruby validation, Git.

---

## File Structure

- Modify: `services/geo.md`
  - Responsibility: Retire old Chinese enterprise GEO package page and route to diagnosis-first service.
- Modify: `services/agent.md`
  - Responsibility: Retire old standalone Agent package page and route to knowledge-asset / AI visibility diagnosis.
- Modify: `services/training.md`
  - Responsibility: Retire old training / 国学商道 service page and route founder IP / training work to five-asset diagnosis.
- Modify: `services/geo-en.md`
  - Responsibility: Retire old English GEO sales page and route English readers to current diagnosis-first pages.
- Modify: `services/geo-test.md`
  - Responsibility: Retire old self-test page and route users to current `/diagnosis/` and `/tools/`.
- Modify: `.github/workflows/pages.yml`
  - Responsibility: Add CI checks for the five retired built pages and preserve the current checks for `/geo/`, `/founder-ip/`, and `/ai-knowledge-base/`.

---

### Task 1: Replace the Chinese GEO legacy page

**Files:**
- Modify: `services/geo.md`

- [ ] **Step 1: Replace `services/geo.md` with the retired-page copy**

Use `apply_patch` to replace the entire file with:

```markdown
---
title: 企业 GEO 服务说明
sitemap: false
---

# 企业 GEO 服务说明

本页是历史服务页，当前企业 GEO 服务已统一收口到「AI 可见度与 IP 资产诊断」后的定制方案。

旧版页面曾按固定套餐介绍 GEO 服务。当前公开站不再展示固定价格、固定文章数量或固定搜索结果位置承诺。GEO 项目需要先诊断品牌主体、公开证据链、技术可抓取性、搜索可见度和 AI 回答准确度，再决定是否进入顾问、内容证据治理、知识库治理或年度监测。

企业 GEO 诊断通常先确认：

- 品牌、产品、创始人和服务是否有清楚的公开主体页；
- 官网、GitHub、媒体、行业平台、知乎、掘金等公开信源是否一致；
- ChatGPT、Kimi、DeepSeek、豆包、Perplexity 等 AI 系统是否能正确解释业务；
- 搜索引擎是否能抓取核心页面、sitemap、robots.txt 和 AI 可读说明文件；
- 哪些内容可以公开，哪些客户资料、内部提示词、密钥和付费规则必须隔离。

当前入口：

[预约 AI 可见度与 IP 资产诊断](/diagnosis/)

相关页面：

- [服务总览](/services/)
- [GEO 诊断说明](/geo/)
- [研究方法](/research/methodology/)
- [fable-castle.com 自站 GEO 修复案例](/cases/)

边界说明：本站不承诺搜索排名、收录结果、AI 引用概率或固定增长结果。公开页面只说明诊断方法、证据治理、技术可抓取性修复和持续监测路径。
```

- [ ] **Step 2: Validate `services/geo.md` source copy**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
t = Path("services/geo.md").read_text()
for good in ["历史服务页", "AI 可见度与 IP 资产诊断", "/diagnosis/", "/geo/", "不承诺搜索排名、收录结果、AI 引用概率或固定增长结果"]:
    assert good in t, good
for bad in ["¥4,980", "¥19,800", "¥49,800", "GEO诊断 + 10篇优化文章", "排名提升", "保证"]:
    assert bad not in t, bad
print("PASS services/geo.md")
PY
```

Expected: `PASS services/geo.md`

- [ ] **Step 3: Commit Task 1**

Run:

```bash
git add services/geo.md
git commit -m "docs: retire legacy geo service page"
```

Expected: one commit containing only `services/geo.md`.

---

### Task 2: Replace the Agent and training legacy pages

**Files:**
- Modify: `services/agent.md`
- Modify: `services/training.md`

- [ ] **Step 1: Replace `services/agent.md`**

Use `apply_patch` to replace the entire file with:

```markdown
---
title: 企业 Agent 服务说明
sitemap: false
---

# 企业 Agent 服务说明

本页是历史服务页，当前 Agent 相关工作已并入「AI 可见度与 IP 资产诊断」后的知识资产治理方案。

旧版页面曾把 Agent 搭建作为独立固定套餐展示。当前公开站不再按固定档位销售 Agent，也不在公开页面展示固定价格或固定交付数量。企业 Agent 是否适合建设，需要先判断企业知识是否已经结构化、可追溯、可更新，并且能否与外部 GEO 可见度形成闭环。

Agent 与知识资产诊断通常先确认：

- 企业资料是否分散、重复、过期或口径不一致；
- 销售话术、客服问答、交付 SOP、案例复盘是否可以被整理成标准知识库；
- 内部文档、客户数据、提示词、密钥和付费规则是否已经隔离；
- AI 回答是否能引用可追溯资料，而不是凭空生成；
- 企业是否需要内部效率工具、外部公开信源，或两者同时建设。

当前入口：

[预约 AI 可见度与 IP 资产诊断](/diagnosis/)

相关页面：

- [企业 AI 知识库说明](/ai-knowledge-base/)
- [服务总览](/services/)
- [GitHub 信任基建](/github-trust/)
- [隐私说明](/privacy/)

边界说明：本站不在公开页面暴露客户资料、内部提示词、密钥、付费工具规则或未授权案例。公开说明只用于介绍诊断入口和服务边界。
```

- [ ] **Step 2: Replace `services/training.md`**

Use `apply_patch` to replace the entire file with:

```markdown
---
title: 创始人 IP 与训练服务说明
sitemap: false
---

# 创始人 IP 与训练服务说明

本页是历史服务页，当前创始人 IP、培训和知识交付工作已统一进入「AI 可见度与 IP 资产诊断」后的定制路径。

旧版页面曾以培训市场、公开定价和课程化表达介绍服务。当前公开站不再把低客单课程或固定训练营作为主入口。创始人 IP 相关项目先通过五类资产诊断判断问题位置，再决定是否进入定位、内容、获客、交付、管理或 GEO 可见度治理。

创始人 IP 与训练诊断通常先确认：

- 定位资产：你是谁、服务谁、解决什么问题、凭什么可信；
- 内容资产：观点、案例、方法论、短视频、文章和直播是否形成系统；
- 信任资产：客户反馈、案例、公开证据、权威背书是否可核验；
- 搜索资产：官网、知乎、掘金、GitHub、百度、微信等公开信源是否一致；
- AI 可见度资产：ChatGPT、Kimi、DeepSeek、豆包、Perplexity 等是否能正确理解和推荐。

当前入口：

[预约 AI 可见度与 IP 资产诊断](/diagnosis/)

相关页面：

- [创始人 IP 方法](/founder-ip/)
- [服务总览](/services/)
- [景一是谁？](/who-is-jingyi/)
- [fable-castle.com 自站 GEO 修复案例](/cases/)

边界说明：本站不承诺搜索排名、收录结果、AI 引用概率、固定增长结果或固定成交结果。训练、陪跑和顾问服务必须基于诊断结果分流。
```

- [ ] **Step 3: Validate Agent and training source copy**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
files = ["services/agent.md", "services/training.md"]
joined = "\n".join(Path(f).read_text() for f in files)
for good in ["历史服务页", "AI 可见度与 IP 资产诊断", "/diagnosis/", "/ai-knowledge-base/", "/founder-ip/"]:
    assert good in joined, good
for bad in ["¥29,800", "¥79,800", "¥198,000", "¥999/年", "S-9595A", "知识星球", "年入2亿", "估值10亿", "单月变现30万"]:
    assert bad not in joined, bad
print("PASS agent and training pages")
PY
```

Expected: `PASS agent and training pages`

- [ ] **Step 4: Commit Task 2**

Run:

```bash
git add services/agent.md services/training.md
git commit -m "docs: retire legacy agent and training pages"
```

Expected: one commit containing only `services/agent.md` and `services/training.md`.

---

### Task 3: Replace the English GEO and old self-test pages

**Files:**
- Modify: `services/geo-en.md`
- Modify: `services/geo-test.md`

- [ ] **Step 1: Replace `services/geo-en.md`**

Use `apply_patch` to replace the entire file with:

```markdown
---
title: Enterprise GEO Service Notice
sitemap: false
---

# Enterprise GEO Service Notice

This is a legacy service page. Current GEO work for English or international contexts now starts with AI Visibility and IP Asset Diagnosis.

The old page described GEO as a fixed accelerator offer. The current public site does not publish fixed packages, public fixed prices, ranking promises, citation promises, traffic promises, ROI claims, or guaranteed platform outcomes.

Current diagnosis-first work usually reviews:

- whether the brand entity is clear and consistent;
- whether public evidence sources are crawlable and trustworthy;
- whether AI systems can accurately explain the company, founder, product, and cases;
- whether English and Chinese source pages describe the same entity without contradiction;
- which materials can be public and which internal documents, prompts, keys, and customer data must stay isolated.

Current entry:

[Start with AI Visibility and IP Asset Diagnosis](/diagnosis/)

Related pages:

- [GEO diagnosis overview](/geo/)
- [Services overview](/services/)
- [Research methodology](/research/methodology/)
- [GitHub trust infrastructure](/github-trust/)

Boundary: this site does not promise search rankings, indexation, AI citations, fixed visibility scores, traffic growth, or revenue growth. It documents diagnosis, evidence governance, crawlability repair, and ongoing monitoring methods.
```

- [ ] **Step 2: Replace `services/geo-test.md`**

Use `apply_patch` to replace the entire file with:

```markdown
---
title: GEO 可见度自测说明
sitemap: false
---

# GEO 可见度自测说明

本页是历史自测页，当前自测入口已统一迁移到「创始人 AI 可见度自测」和公开诊断工具区。

旧版页面用单独清单判断企业在 AI 搜索里的可见度。当前网站改为五类资产诊断：定位资产、内容资产、信任资产、搜索资产和 AI 可见度资产。这样更适合同时判断创始人 IP、企业知识资产和 GEO 可见度。

当前入口：

- [创始人 AI 可见度自测](/diagnosis/)
- [免费诊断工具](/tools/)
- [AI 爬虫检查](/tools/crawler-check/)
- [内容健康检查](/tools/content-health/)
- [长尾问题扩展](/tools/question-expander/)

如果你已经有历史 GEO 诊断数据，请先整理为：

- 查询日期；
- 使用平台；
- 查询问题；
- 原始回答；
- 是否提及目标主体；
- 是否有可点击信源；
- 回答是否准确；
- 样本限制。

边界说明：自测结果只能作为诊断线索，不代表搜索排名、收录结果、AI 引用概率或固定增长结果。
```

- [ ] **Step 3: Validate English GEO and self-test source copy**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
files = ["services/geo-en.md", "services/geo-test.md"]
joined = "\n".join(Path(f).read_text() for f in files)
for good in ["legacy service page", "AI Visibility and IP Asset Diagnosis", "历史自测页", "/diagnosis/", "/tools/"]:
    assert good in joined, good
for bad in ["AI search penetration", "Global GEO market", "ROI", "CAC", "62.4%", "$582B", "排名", "哪家好"]:
    assert bad not in joined, bad
print("PASS geo-en and geo-test pages")
PY
```

Expected: `PASS geo-en and geo-test pages`

- [ ] **Step 4: Commit Task 3**

Run:

```bash
git add services/geo-en.md services/geo-test.md
git commit -m "docs: retire legacy geo english and self-test pages"
```

Expected: one commit containing only `services/geo-en.md` and `services/geo-test.md`.

---

### Task 4: Add CI guardrails for retired service pages

**Files:**
- Modify: `.github/workflows/pages.yml`

- [ ] **Step 1: Add retired service page checks to `pages.yml`**

In `.github/workflows/pages.yml`, inside the existing `Verify key GEO pages` shell block, after this existing line:

```bash
          ! grep -q '¥39,800\|¥99,800\|¥198,000\|首单体验价\|排名提升\|全球AI平台全覆盖\|✗ 无' ./_site/services/enterprise.html ./_site/services/geo-global.html
```

add these lines:

```bash
          test -f ./_site/services/geo.html
          test -f ./_site/services/agent.html
          test -f ./_site/services/training.html
          test -f ./_site/services/geo-en.html
          test -f ./_site/services/geo-test.html
          grep -q '/diagnosis/' ./_site/services/geo.html
          grep -q '/diagnosis/' ./_site/services/agent.html
          grep -q '/diagnosis/' ./_site/services/training.html
          grep -q '/diagnosis/' ./_site/services/geo-en.html
          grep -q '/diagnosis/' ./_site/services/geo-test.html
          ! grep -q '¥4,980\|¥19,800\|¥29,800\|¥49,800\|¥79,800\|¥198,000\|¥999/年\|S-9595A\|知识星球\|AI搜索渗透率\|全球GEO市场\|ROI\|排名提升\|保证\|全覆盖\|首单' ./_site/services/geo.html ./_site/services/agent.html ./_site/services/training.html ./_site/services/geo-en.html ./_site/services/geo-test.html
```

Do not remove existing checks for:

```bash
          test -f ./_site/geo/index.html
          test -f ./_site/founder-ip/index.html
          test -f ./_site/ai-knowledge-base/index.html
          grep -q 'https://fable-castle.com/geo/' ./_site/sitemap.xml
          grep -q 'https://fable-castle.com/founder-ip/' ./_site/sitemap.xml
          grep -q 'https://fable-castle.com/ai-knowledge-base/' ./_site/sitemap.xml
```

- [ ] **Step 2: Validate workflow source**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
w = Path(".github/workflows/pages.yml").read_text()
for good in [
    "./_site/services/geo.html",
    "./_site/services/agent.html",
    "./_site/services/training.html",
    "./_site/services/geo-en.html",
    "./_site/services/geo-test.html",
    "¥4,980",
    "AI搜索渗透率",
    "https://fable-castle.com/geo/",
    "https://fable-castle.com/founder-ip/",
    "https://fable-castle.com/ai-knowledge-base/",
]:
    assert good in w, good
print("PASS workflow retired service checks")
PY
```

Expected: `PASS workflow retired service checks`

- [ ] **Step 3: Commit Task 4**

Run:

```bash
git add .github/workflows/pages.yml
git commit -m "ci: guard retired service pages"
```

Expected: one commit containing only `.github/workflows/pages.yml`.

---

### Task 5: Final local validation, push, and live verification

**Files:**
- No additional file changes expected.

- [ ] **Step 1: Run source-level final checks**

Run:

```bash
ruby -ryaml -e 'YAML.load_file("_config.yml"); Dir[".github/workflows/*.yml"].each { |f| YAML.load_file(f) }; puts "YAML OK"'
git diff --check
python3 - <<'PY'
from pathlib import Path
files = ["services/geo.md", "services/agent.md", "services/training.md", "services/geo-en.md", "services/geo-test.md"]
joined = "\n".join(Path(f).read_text() for f in files)
for good in ["历史服务页", "/diagnosis/", "AI Visibility and IP Asset Diagnosis"]:
    assert good in joined, good
for bad in ["¥4,980", "¥19,800", "¥29,800", "¥49,800", "¥79,800", "¥198,000", "¥999/年", "S-9595A", "知识星球", "AI搜索渗透率", "全球GEO市场", "ROI", "排名提升", "保证", "全覆盖", "首单"]:
    assert bad not in joined, bad
print("PASS retired service source contract")
PY
python3 - <<'PY'
from pathlib import Path
s = Path("sitemap.xml").read_text()
for path in ["/geo/","/founder-ip/","/ai-knowledge-base/","/services/"]:
    assert "https://fable-castle.com" + path in s, path
for path in ["/services/geo.html","/services/agent.html","/services/training.html","/services/geo-en.html","/services/geo-test.html"]:
    assert "https://fable-castle.com" + path not in s, path
print("PASS sitemap legacy service policy")
PY
```

Expected:

```text
YAML OK
PASS retired service source contract
PASS sitemap legacy service policy
```

- [ ] **Step 2: Run branch-aware internal link contract**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
import html.parser, urllib.parse

files = [
    "index.html",
    "geo/index.html",
    "founder-ip/index.html",
    "ai-knowledge-base/index.html",
    "tools/index.html",
    "tools/content-health/index.html",
    "tools/crawler-check/index.html",
    "tools/question-expander/index.html",
    "tools/geo-rewrite/index.html",
    "tools/geo-skills/index.html",
    "cases/index.html",
    "services/index.html",
    "research/index.html",
    "guides/index.html",
    "about/index.html",
    "who-is-jingyi/index.html",
    "github-trust/index.html",
    "privacy/index.html",
]

existing = {
    "/",
    "/diagnosis/",
    "/geo/",
    "/founder-ip/",
    "/ai-knowledge-base/",
    "/tools/",
    "/tools/content-health/",
    "/tools/crawler-check/",
    "/tools/question-expander/",
    "/tools/geo-rewrite/",
    "/tools/geo-skills/",
    "/cases/",
    "/services/",
    "/research/",
    "/research/methodology/",
    "/guides/",
    "/about/",
    "/who-is-jingyi/",
    "/github-trust/",
    "/privacy/",
    "/llms.txt",
    "/posts/2026-07-22-geo-practical-guide.html",
    "/posts/2026-07-22-ai-search-knowledge-management.html",
    "/posts/geo-intro-ai-search-era-your-content-on-trial",
    "/posts/chinese-geo-comprehensive-guide-2026",
    "/posts/seo-vs-geo-whats-the-difference-2026",
    "/posts/geo-how-to-get-recommended-by-ai-search",
    "/posts/why-ai-search-never-cites-my-articles",
    "/posts/how-to-build-ai-searchable-knowledge-base",
}

class Parser(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
    def handle_starttag(self, tag, attrs):
        if tag == "a":
            href = dict(attrs).get("href")
            if href:
                self.hrefs.append(href)

missing = []
for f in files:
    p = Parser()
    p.feed(Path(f).read_text())
    for href in p.hrefs:
        if href.startswith("/") and not href.startswith("//"):
            path = urllib.parse.urlsplit(href).path
            if path not in existing:
                missing.append((f, path))
assert not missing, missing
print("PASS branch internal link contract")
PY
```

Expected: `PASS branch internal link contract`

- [ ] **Step 3: Push the current branch**

Run:

```bash
git status --short --branch
git push origin codex/public-source-pages-20260728
```

Expected: push succeeds without switching branches.

- [ ] **Step 4: If the branch is merged/deployed, live verify**

Only run this after the branch is deployed to `https://fable-castle.com/`:

```bash
python3 - <<'PY'
import urllib.request

paths = ["/services/geo.html", "/services/agent.html", "/services/training.html", "/services/geo-en.html", "/services/geo-test.html"]
bad_terms = ["¥4,980", "¥19,800", "¥29,800", "¥49,800", "¥79,800", "¥198,000", "¥999/年", "S-9595A", "知识星球", "AI搜索渗透率", "全球GEO市场", "ROI", "排名提升", "保证", "全覆盖", "首单"]

for path in paths:
    req = urllib.request.Request("https://fable-castle.com" + path, headers={"User-Agent":"Mozilla/5.0 Codex legacy service verifier"})
    with urllib.request.urlopen(req, timeout=20) as r:
        text = r.read().decode("utf-8", "replace")
        print(r.status, path, len(text), "diagnosis=", "/diagnosis/" in text)
        for bad in bad_terms:
            assert bad not in text, (path, bad)
print("PASS live retired service pages")
PY
```

Expected: every page returns `200`, contains `/diagnosis/`, and prints `PASS live retired service pages`.

If the branch is not deployed yet, report the local validation status and the pushed branch name instead of claiming live completion.
