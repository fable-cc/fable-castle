# fable-castle Polish Fixpack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the public site's known 404 links, privacy-copy contradictions, sitemap omissions, brand-name drift, and legacy workflow red lights.

**Architecture:** This is a low-risk static-site polish pack. It adds one static privacy page, patches existing tool pages and metadata, updates `sitemap.xml`, and changes workflow triggers/check URLs without touching paid tools, private prompts, secrets, Cloudflare settings, or old service-page business content.

**Tech Stack:** Jekyll static files, plain HTML/CSS, XML sitemap, GitHub Actions YAML, Python link/content validation, Ruby YAML validation.

---

## File Structure

- Create: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/privacy/index.html`
  - Responsibility: Public privacy page for static diagnostic tools.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/tools/crawler-check/index.html`
  - Responsibility: Fix privacy wording, guide links, and full brand name.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/tools/question-expander/index.html`
  - Responsibility: Fix local-only privacy wording, guide links, and full brand name.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/tools/geo-rewrite/index.html`
  - Responsibility: Fix contradictory privacy wording, guide links, and full brand name.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/tools/content-health/index.html`
  - Responsibility: Full brand-name cleanup.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/tools/geo-skills/index.html`
  - Responsibility: Full brand-name cleanup.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/research/index.html`
  - Responsibility: Full brand-name cleanup.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/research/methodology/index.html`
  - Responsibility: Full brand-name cleanup.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/services/index.html`
  - Responsibility: Full brand-name cleanup in remaining OG/footer text.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/about/index.html`
  - Responsibility: Full brand-name cleanup in remaining footer/body short-name text where appropriate.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/sitemap.xml`
  - Responsibility: Add missing core tool/AI-readable pages and preserve old-directory exclusions.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/.github/workflows/pages.yml`
  - Responsibility: Verify privacy page, sitemap coverage, and fixed copy.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/.github/workflows/pages-check.yml`
  - Responsibility: Check current production domain instead of old GitHub Pages URL.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/.github/workflows/stats-update.yml`
  - Responsibility: Disable scheduled trigger; keep manual trigger.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/.github/workflows/daily-smelt.yml`
  - Responsibility: Disable scheduled trigger; keep manual trigger.

---

### Task 1: Add the privacy page

**Files:**
- Create: `privacy/index.html`

- [ ] **Step 1: Create `privacy/index.html`**

Use `apply_patch` to add a complete static page with front matter and these exact essentials:

```html
---
sitemap: true
---

<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>隐私说明 · 景一的寓言城堡</title>
<meta name="description" content="景一的寓言城堡公开诊断工具的隐私说明：本地处理、浏览器请求、无账号系统、无客户数据存储。">
<link rel="canonical" href="https://fable-castle.com/privacy/">
<meta property="og:type" content="website">
<meta property="og:title" content="隐私说明 · 景一的寓言城堡">
<meta property="og:description" content="公开诊断工具的隐私说明：本地处理、浏览器请求、无账号系统、无客户数据存储。">
<meta property="og:url" content="https://fable-castle.com/privacy/">
<meta property="og:site_name" content="景一的寓言城堡">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;background:#fbfaf7;color:#171717;line-height:1.8;margin:0}
a{color:#245c88;text-decoration:none}.nav{max-width:860px;margin:0 auto;padding:16px 24px;display:flex;justify-content:space-between;border-bottom:1px solid #ded8cc}.brand{font-weight:800;color:#171717}.wrap{max-width:760px;margin:0 auto;padding:46px 24px 80px}h1{font-size:32px;line-height:1.2;margin-bottom:10px}.lead{color:#5f615f;margin-bottom:28px}.card{background:#fff;border:1px solid #ded8cc;border-radius:10px;padding:22px;margin:14px 0}h2{font-size:20px;margin-bottom:8px}.card p,.card li{font-size:14px;color:#5f615f}.card ul{padding-left:18px}.footer{text-align:center;border-top:1px solid #ded8cc;padding:28px;color:#999;font-size:13px}
</style>
</head>
<body>
<nav class="nav"><a class="brand" href="/">景一的寓言城堡</a><a href="/diagnosis/">AI 可见度诊断</a></nav>
<main class="wrap">
<h1>隐私说明</h1>
<p class="lead">本页说明景一的寓言城堡公开诊断工具如何处理输入内容。当前公开工具用于初步诊断，不是客户交付系统。</p>
<section class="card"><h2>本地处理工具</h2><p>内容健康检查、长尾问题扩展、GEO 改写建议当前在浏览器本地运行，不调用模型或搜索 API，不把输入内容上传到本站服务器。</p></section>
<section class="card"><h2>浏览器请求工具</h2><p>AI 爬虫检查会尝试从您的浏览器直接请求目标站的 robots.txt。该请求不经过本站服务端代理；如果目标站 CORS 策略阻止请求，页面会提示您手动检查。</p></section>
<section class="card"><h2>不会收集的内容</h2><ul><li>不要求登录账号。</li><li>不保存输入正文、种子词、URL、检测结果或改写建议。</li><li>不接收客户私有资料、密钥、付费工具规则或内部提示词。</li></ul></section>
<section class="card"><h2>第三方基础设施</h2><p>本站通过 GitHub Pages 与 Cloudflare 提供静态页面访问。它们可能按各自规则记录基础访问日志，例如 IP、User-Agent、请求路径和时间。</p></section>
<section class="card"><h2>商业诊断与客户交付</h2><p>如果进入人工诊断或付费交付，数据处理范围会在具体合作前另行说明。公开工具页面的隐私说明不代表未来后端产品或客户系统的完整隐私政策。</p></section>
<section class="card"><h2>联系方式</h2><p>如需删除、澄清或更新与您有关的公开信息，请通过 GitHub 账号 <a href="https://github.com/fable-cc">fable-cc</a> 或本站服务入口联系。</p></section>
</main>
<footer class="footer">景一的寓言城堡 · <a href="/llms.txt">llms.txt</a> · © 2026</footer>
</body>
</html>
```

- [ ] **Step 2: Validate the privacy page content**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
t = Path("privacy/index.html").read_text()
for item in ["隐私说明 · 景一的寓言城堡", "浏览器本地运行", "不经过本站服务端代理", "https://fable-castle.com/privacy/"]:
    assert item in t, item
print("PASS privacy page")
PY
```

Expected: `PASS privacy page`

- [ ] **Step 3: Commit Task 1**

Run:

```bash
git add privacy/index.html
git commit -m "docs: add public tool privacy page"
```

Expected: one commit containing only `privacy/index.html`.

---

### Task 2: Fix tool links, privacy copy, and brand names

**Files:**
- Modify: `tools/crawler-check/index.html`
- Modify: `tools/question-expander/index.html`
- Modify: `tools/geo-rewrite/index.html`
- Modify: `tools/content-health/index.html`
- Modify: `tools/geo-skills/index.html`
- Modify: `research/index.html`
- Modify: `research/methodology/index.html`
- Modify: `services/index.html`
- Modify: `about/index.html`

- [ ] **Step 1: Patch brand short names**

Replace metadata/navigation short-name occurrences in the listed files:

```text
<title>AI 爬虫检查 · 寓言城堡</title> -> <title>AI 爬虫检查 · 景一的寓言城堡</title>
<title>内容健康检查 · 寓言城堡</title> -> <title>内容健康检查 · 景一的寓言城堡</title>
<title>长尾问题扩展 · 寓言城堡</title> -> <title>长尾问题扩展 · 景一的寓言城堡</title>
<title>GEO 改写建议 · 寓言城堡</title> -> <title>GEO 改写建议 · 景一的寓言城堡</title>
<title>GEO Skills 专业能力 · 寓言城堡</title> -> <title>GEO Skills 专业能力 · 景一的寓言城堡</title>
<title>研究与数据 · 寓言城堡</title> -> <title>研究与数据 · 景一的寓言城堡</title>
<title>研究方法 · 寓言城堡</title> -> <title>研究方法 · 景一的寓言城堡</title>
content="... · 寓言城堡" -> content="... · 景一的寓言城堡"
content="寓言城堡" in `og:site_name` -> content="景一的寓言城堡"
class="logo">寓言城堡</a> -> class="logo">景一的寓言城堡</a>
footer text `寓言城堡 ·` -> `景一的寓言城堡 ·`
```

Use explicit `apply_patch` hunks or a carefully reviewed mechanical replace on only these files.

- [ ] **Step 2: Patch tool privacy copy**

Set the three tool privacy sections to these exact meanings:

For `tools/geo-rewrite/index.html`, replace the privacy paragraph with:

```html
<p>您粘贴的内容仅在当前浏览器本地分析，不上传到本站服务器，不调用模型，也不会被我们存储、分析或复用。页面关闭或刷新后，本次输入和分析结果不会保留。详见<a href="/privacy/">隐私说明</a>。</p>
```

For `tools/question-expander/index.html`, replace the privacy paragraph with:

```html
<p>您输入的种子词仅在当前浏览器本地用于生成问题建议。本工具当前版本不调用模型或搜索 API，不上传种子词，不存储、分析或复用输入记录。详见<a href="/privacy/">隐私说明</a>。</p>
```

For `tools/crawler-check/index.html`, replace the privacy paragraph with:

```html
<p>本工具会从您的浏览器直接向目标站尝试请求 robots.txt，用于辅助判断抓取策略；该请求不经过本站服务端代理。我们不会存储您提交的 URL、响应内容或检测结果。详见<a href="/privacy/">隐私说明</a>。</p>
```

- [ ] **Step 3: Patch 404 guide links**

Replace nonexistent guide links with current existing URLs:

```text
/guides/ai-crawler-checklist/ -> /guides/
/guides/robots-txt-for-ai/ -> /posts/2026-07-22-geo-practical-guide.html
/guides/content-health-check/ -> /tools/content-health/
/guides/geo-rewrite-best-practices/ -> /posts/2026-07-22-geo-practical-guide.html
/guides/long-tail-question-strategy/ -> /posts/2026-07-22-ai-search-knowledge-management.html
/guides/search-intent-mapping/ -> /guides/
```

- [ ] **Step 4: Validate Task 2**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
files = [
 "tools/crawler-check/index.html",
 "tools/question-expander/index.html",
 "tools/geo-rewrite/index.html",
 "tools/content-health/index.html",
 "tools/geo-skills/index.html",
 "research/index.html",
 "research/methodology/index.html",
 "services/index.html",
 "about/index.html",
]
joined = "\n".join(Path(f).read_text() for f in files)
for bad in [
 "/guides/ai-crawler-checklist/",
 "/guides/robots-txt-for-ai/",
 "/guides/content-health-check/",
 "/guides/geo-rewrite-best-practices/",
 "/guides/long-tail-question-strategy/",
 "/guides/search-intent-mapping/",
 "发送至服务端",
 "24 小时内自动清除",
 "联网搜索请求",
 "搜索结果数据不保留",
 '<meta property="og:site_name" content="寓言城堡">',
 'class="logo">寓言城堡</a>',
]:
    assert bad not in joined, bad
for good in ["不经过本站服务端代理", "不调用模型或搜索 API", "仅在当前浏览器本地分析", "景一的寓言城堡"]:
    assert good in joined, good
print("PASS tool polish")
PY
```

Expected: `PASS tool polish`

- [ ] **Step 5: Commit Task 2**

Run:

```bash
git add tools/crawler-check/index.html tools/question-expander/index.html tools/geo-rewrite/index.html tools/content-health/index.html tools/geo-skills/index.html research/index.html research/methodology/index.html services/index.html about/index.html
git commit -m "docs: fix public tool links and privacy copy"
```

Expected: one commit containing only the listed public pages.

---

### Task 3: Update sitemap and CI checks

**Files:**
- Modify: `sitemap.xml`
- Modify: `.github/workflows/pages.yml`

- [ ] **Step 1: Add missing sitemap URLs**

In `sitemap.xml`, add these URLs after the existing `/tools/` entry:

```xml
  <url><loc>https://fable-castle.com/tools/content-health/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://fable-castle.com/tools/crawler-check/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://fable-castle.com/tools/question-expander/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://fable-castle.com/tools/geo-rewrite/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://fable-castle.com/tools/geo-skills/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
```

Add these URLs near their related entries:

```xml
  <url><loc>https://fable-castle.com/research/methodology/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://fable-castle.com/privacy/</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
  <url><loc>https://fable-castle.com/llms.txt</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://fable-castle.com/llms-full.txt</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
```

- [ ] **Step 2: Extend `pages.yml` verification**

Inside `.github/workflows/pages.yml`, add:

```bash
          test -f ./_site/privacy/index.html
          grep -q 'https://fable-castle.com/tools/content-health/' ./_site/sitemap.xml
          grep -q 'https://fable-castle.com/tools/crawler-check/' ./_site/sitemap.xml
          grep -q 'https://fable-castle.com/tools/question-expander/' ./_site/sitemap.xml
          grep -q 'https://fable-castle.com/tools/geo-rewrite/' ./_site/sitemap.xml
          grep -q 'https://fable-castle.com/tools/geo-skills/' ./_site/sitemap.xml
          grep -q 'https://fable-castle.com/research/methodology/' ./_site/sitemap.xml
          grep -q 'https://fable-castle.com/privacy/' ./_site/sitemap.xml
          grep -q 'https://fable-castle.com/llms.txt' ./_site/sitemap.xml
          grep -q 'https://fable-castle.com/llms-full.txt' ./_site/sitemap.xml
          ! grep -q '/guides/ai-crawler-checklist/\\|/guides/robots-txt-for-ai/\\|/guides/content-health-check/\\|/guides/geo-rewrite-best-practices/\\|/guides/long-tail-question-strategy/\\|/guides/search-intent-mapping/' ./_site/tools/crawler-check/index.html ./_site/tools/question-expander/index.html ./_site/tools/geo-rewrite/index.html
          ! grep -q '发送至服务端\\|24 小时内自动清除\\|联网搜索请求\\|搜索结果数据不保留' ./_site/tools/question-expander/index.html ./_site/tools/geo-rewrite/index.html
```

- [ ] **Step 3: Validate Task 3**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
s = Path("sitemap.xml").read_text()
for path in ["/tools/content-health/","/tools/crawler-check/","/tools/question-expander/","/tools/geo-rewrite/","/tools/geo-skills/","/research/methodology/","/privacy/","/llms.txt","/llms-full.txt"]:
    assert "https://fable-castle.com"+path in s, path
for path in ["/course/","/课程/","/02-知识图谱/","/01-方法论/"]:
    assert path not in s, path
w = Path(".github/workflows/pages.yml").read_text()
for item in ["test -f ./_site/privacy/index.html", "https://fable-castle.com/llms-full.txt", "发送至服务端"]:
    assert item in w, item
print("PASS sitemap and CI")
PY
```

Expected: `PASS sitemap and CI`

- [ ] **Step 4: Commit Task 3**

Run:

```bash
git add sitemap.xml .github/workflows/pages.yml
git commit -m "ci: verify sitemap and public tool polish"
```

Expected: one commit containing sitemap and workflow verification updates.

---

### Task 4: Clean legacy workflows

**Files:**
- Modify: `.github/workflows/pages-check.yml`
- Modify: `.github/workflows/stats-update.yml`
- Modify: `.github/workflows/daily-smelt.yml`

- [ ] **Step 1: Disable scheduled legacy knowledge workflows**

In both `stats-update.yml` and `daily-smelt.yml`, remove the `schedule:` blocks under `on:` and leave:

```yaml
on:
  workflow_dispatch:
```

Do not delete the workflow files.

- [ ] **Step 2: Update Pages check URL**

Replace the body of `.github/workflows/pages-check.yml` with a current-domain check:

```yaml
# 每次推送后验证当前生产站点可访问
name: Pages 构建检查

on:
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - name: 等待 workflow 部署
        run: sleep 45
      - name: 检查正式域名核心页面
        run: |
          for path in / /diagnosis/ /cases/ /privacy/; do
            STATUS=$(curl -L -s -o /dev/null -w "%{http_code}" "https://fable-castle.com${path}")
            if [ "$STATUS" != "200" ]; then
              echo "❌ https://fable-castle.com${path} returned ${STATUS}"
              exit 1
            fi
            echo "✅ https://fable-castle.com${path} returned 200"
          done
```

- [ ] **Step 3: Validate Task 4**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
for f in [".github/workflows/stats-update.yml", ".github/workflows/daily-smelt.yml"]:
    t = Path(f).read_text()
    assert "workflow_dispatch:" in t, f
    assert "schedule:" not in t, f
    assert "cron:" not in t, f
t = Path(".github/workflows/pages-check.yml").read_text()
assert "https://fable-castle.com${path}" in t
assert "fable-cc.github.io/fable-castle" not in t
print("PASS legacy workflow cleanup")
PY
```

Expected: `PASS legacy workflow cleanup`

- [ ] **Step 4: Commit Task 4**

Run:

```bash
git add .github/workflows/pages-check.yml .github/workflows/stats-update.yml .github/workflows/daily-smelt.yml
git commit -m "ci: clean legacy site workflows"
```

Expected: one commit containing only workflow changes.

---

### Task 5: Final local, push, and live verification

**Files:**
- No additional file changes expected.

- [ ] **Step 1: Run final local checks**

Run:

```bash
ruby -ryaml -e 'YAML.load_file("_config.yml"); puts "YAML OK"'
git diff --check
python3 - <<'PY'
from pathlib import Path
files = [
    "index.html","tools/index.html","tools/content-health/index.html","tools/crawler-check/index.html",
    "tools/question-expander/index.html","tools/geo-rewrite/index.html","tools/geo-skills/index.html",
    "cases/index.html","services/index.html","research/index.html","guides/index.html","about/index.html",
    "who-is-jingyi/index.html","github-trust/index.html","privacy/index.html"
]
import html.parser, urllib.parse
class P(html.parser.HTMLParser):
    def __init__(self): super().__init__(); self.hrefs=[]
    def handle_starttag(self, tag, attrs):
        if tag == "a":
            h = dict(attrs).get("href")
            if h: self.hrefs.append(h)
existing = {
    "/","/diagnosis/","/tools/","/tools/content-health/","/tools/crawler-check/","/tools/question-expander/",
    "/tools/geo-rewrite/","/tools/geo-skills/","/cases/","/services/","/research/","/research/methodology/",
    "/guides/","/about/","/who-is-jingyi/","/github-trust/","/privacy/","/llms.txt",
    "/posts/2026-07-22-geo-practical-guide.html","/posts/2026-07-22-ai-search-knowledge-management.html",
    "/posts/geo-intro-ai-search-era-your-content-on-trial","/posts/chinese-geo-comprehensive-guide-2026",
    "/posts/seo-vs-geo-whats-the-difference-2026","/posts/geo-how-to-get-recommended-by-ai-search",
    "/posts/why-ai-search-never-cites-my-articles","/posts/how-to-build-ai-searchable-knowledge-base"
}
missing = []
for f in files:
    p = P(); p.feed(Path(f).read_text())
    for href in p.hrefs:
        if href.startswith("/") and not href.startswith("//"):
            path = urllib.parse.urlsplit(href).path
            if path not in existing:
                missing.append((f, path))
assert not missing, missing
print("PASS local internal link contract")
PY
```

Expected:

```text
YAML OK
PASS local internal link contract
```

`git diff --check` should print no errors.

- [ ] **Step 2: Push**

Run:

```bash
git push origin main
```

Expected: push succeeds.

- [ ] **Step 3: Watch deployment**

Run:

```bash
gh run list --repo fable-cc/fable-castle --limit 5 --json databaseId,headSha,status,conclusion,displayTitle,workflowName,event
gh run watch <new Build and Deploy Jekyll run id> --repo fable-cc/fable-castle --exit-status
```

Expected: `Build and Deploy Jekyll` succeeds.

- [ ] **Step 4: Live verify**

Run:

```bash
python3 - <<'PY'
import urllib.request, html.parser, urllib.parse
paths = ["/privacy/","/tools/geo-rewrite/","/tools/question-expander/","/tools/crawler-check/","/sitemap.xml"]
for p in paths:
    req = urllib.request.Request("https://fable-castle.com"+p, headers={"User-Agent":"Mozilla/5.0 Codex polish verifier"})
    with urllib.request.urlopen(req, timeout=20) as r:
        text = r.read().decode("utf-8","replace")
        print(r.status, p, len(text))
        if p == "/tools/geo-rewrite/":
            print("geo rewrite privacy fixed", "发送至服务端" not in text and "24 小时内自动清除" not in text)
        if p == "/tools/question-expander/":
            print("question expander privacy fixed", "联网搜索请求" not in text and "搜索结果数据不保留" not in text)
        if p == "/sitemap.xml":
            for item in ["/tools/content-health/","/tools/crawler-check/","/tools/question-expander/","/tools/geo-rewrite/","/tools/geo-skills/","/research/methodology/","/privacy/","/llms.txt","/llms-full.txt"]:
                print("sitemap", item, item in text)
PY
```

Expected: every status is `200`, privacy fixes are `True`, and every sitemap check is `True`.

