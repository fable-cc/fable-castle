# fable-castle Self GEO Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/cases/` with a credible self-case page showing how `fable-castle.com` was repaired into a clearer GEO and founder AI visibility site.

**Architecture:** This is a static Jekyll/GitHub Pages update. The main implementation rewrites `cases/index.html` as a self-contained HTML page with front matter, JSON-LD, report-style sections, and CTAs to `/diagnosis/` and `/services/`. The workflow then adds CI assertions so future builds fail if the case page loses required evidence or reintroduces risky claims.

**Tech Stack:** Jekyll static page, plain HTML/CSS, Schema.org JSON-LD, GitHub Actions shell checks, Ruby YAML validation, Python static string validation.

---

## File Structure

- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/cases/index.html`
  - Responsibility: Render the self GEO repair case page and replace the current generic sample cases.
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/.github/workflows/pages.yml`
  - Responsibility: Verify the built `/cases/` page contains the new evidence-led case and does not contain disallowed claims or low-ticket remnants.

---

### Task 1: Rewrite the case page

**Files:**
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/cases/index.html`

- [ ] **Step 1: Replace the existing generic sample case page**

Use `apply_patch` to delete the existing content of `cases/index.html` and replace it with a complete static page containing:

```html
---
sitemap: true
---

<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>案例：fable-castle.com 的 GEO 修复记录 · 景一的寓言城堡</title>
<meta name="description" content="景一的寓言城堡自站 GEO 修复案例：从旧入口噪音、主体混淆和抓取策略不清，到可抓取、可理解、可验证的创始人 AI 可见度诊断站。">
<link rel="canonical" href="https://fable-castle.com/cases/">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='28' font-size='28'>🏰</text></svg>">
<meta property="og:type" content="article">
<meta property="og:title" content="案例：fable-castle.com 的 GEO 修复记录">
<meta property="og:description" content="一次公开站点如何被整理成可抓取、可理解、可验证、可持续监测的 GEO 修复记录。">
<meta property="og:url" content="https://fable-castle.com/cases/">
<meta property="og:site_name" content="景一的寓言城堡">
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@graph":[
    {
      "@type":"CollectionPage",
      "@id":"https://fable-castle.com/cases/#page",
      "name":"案例：fable-castle.com 的 GEO 修复记录",
      "url":"https://fable-castle.com/cases/",
      "isPartOf":{"@id":"https://fable-castle.com/#website"},
      "about":{"@id":"https://fable-castle.com/#person"}
    },
    {
      "@type":"CreativeWork",
      "@id":"https://fable-castle.com/cases/#self-geo-case",
      "headline":"fable-castle.com 从 AI 不易识别到可被验证的 GEO 修复记录",
      "url":"https://fable-castle.com/cases/",
      "datePublished":"2026-07-28",
      "author":{"@id":"https://fable-castle.com/#person"},
      "publisher":{"@id":"https://fable-castle.com/#person"},
      "about":["GEO","AI 可见度","创始人 IP","搜索资产","品牌证据治理"]
    },
    {
      "@type":"Person",
      "@id":"https://fable-castle.com/#person",
      "name":"景一",
      "alternateName":["景一 fable","Jingyi fable","fable-cc","景一的寓言城堡"],
      "description":"GEO 与创始人 AI 可见度顾问",
      "url":"https://fable-castle.com/",
      "jobTitle":"GEO 与创始人 AI 可见度顾问",
      "knowsAbout":["GEO","AI Agent","知识管理","个人IP","搜索引擎优化","内容策略"]
    }
  ]
}
</script>
<style>
:root{--bg:#fbfaf7;--paper:#fff;--ink:#171717;--muted:#5f615f;--soft:#f4efe7;--line:#ded8cc;--blue:#245c88;--green:#3d7459;--gold:#9a6a20;--red:#a7472b;--radius:10px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;background:var(--bg);color:var(--ink);font-size:16px;line-height:1.75}
a{color:var(--blue);text-decoration:none}
a:hover{text-decoration:underline}
.nav{max-width:1080px;margin:0 auto;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line)}
.brand{font-weight:800;color:var(--ink);letter-spacing:.02em}
.links{display:flex;gap:18px;flex-wrap:wrap}
.links a,.links span{font-size:14px;color:var(--muted)}
.links .current{color:var(--ink);font-weight:800}
.wrap{max-width:1080px;margin:0 auto;padding:52px 24px 86px}
.hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(320px,.9fr);gap:34px;align-items:start}
.kicker{font-size:13px;color:var(--gold);font-weight:900;margin-bottom:12px}
h1{font-size:42px;line-height:1.16;letter-spacing:-.02em;margin-bottom:16px}
.lead{font-size:18px;color:var(--muted);max-width:760px;margin-bottom:22px}
.actions{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}
.btn{display:inline-flex;align-items:center;justify-content:center;border-radius:var(--radius);padding:12px 18px;font-weight:800;font-size:14px;border:1px solid var(--line)}
.primary{background:var(--blue);border-color:var(--blue);color:#fff}
.secondary{background:#fff;color:var(--ink)}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
.tag{font-size:12px;border:1px solid var(--line);border-radius:999px;padding:4px 10px;background:#fff;color:var(--muted);font-weight:700}
.panel,.card,.evidence,.cta{background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);padding:22px}
.panel h2{font-size:17px;margin-bottom:10px}
.panel p,.panel li,.card p,.card li,.evidence li{font-size:14px;color:var(--muted)}
.panel ul,.card ul,.evidence ul{padding-left:18px}
.scoreline{display:grid;gap:10px;margin-top:12px}
.scoreline div{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid var(--soft);padding-bottom:8px;font-size:14px}
.scoreline strong{color:var(--ink)}
.section{margin-top:58px}
.section h2{font-size:25px;margin-bottom:10px}
.section>p{color:var(--muted);max-width:780px;margin-bottom:20px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.card h3{font-size:16px;margin-bottom:8px}
.card .label{font-size:12px;color:var(--gold);font-weight:900;margin-bottom:6px}
table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden}
th,td{border-bottom:1px solid var(--line);padding:12px 14px;text-align:left;vertical-align:top;font-size:14px}
th{background:var(--soft);font-weight:800;color:var(--ink)}
td{color:var(--muted)}
.timeline{display:grid;gap:12px}
.step{display:grid;grid-template-columns:42px 1fr;gap:14px;align-items:start;background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:16px}
.num{width:34px;height:34px;border-radius:50%;background:#e7f0f6;color:var(--blue);display:flex;align-items:center;justify-content:center;font-weight:900}
.step h3{font-size:16px;margin-bottom:4px}
.step p{font-size:14px;color:var(--muted)}
.evidence{border-left:4px solid var(--green)}
.boundary{border-left:4px solid var(--gold);background:#fff9ea;padding:16px 18px;border-radius:0 var(--radius) var(--radius) 0;color:#725515;font-size:14px}
.cta{margin-top:48px;text-align:center;background:#f7fbff}
.cta h2{font-size:24px;margin-bottom:10px}
.cta p{color:var(--muted);max-width:720px;margin:0 auto 18px}
.footer{border-top:1px solid var(--line);padding:28px 24px;text-align:center;color:var(--muted);font-size:13px}
.footer a{color:var(--muted)}
@media(max-width:860px){.hero,.grid,.grid2{grid-template-columns:1fr}h1{font-size:31px}.nav{align-items:flex-start;gap:12px;flex-direction:column}.links{gap:12px}.wrap{padding-top:38px}}
</style>
</head>
<body>
<nav class="nav">
  <a class="brand" href="/">景一的寓言城堡</a>
  <div class="links">
    <a href="/tools/">工具</a>
    <a href="/research/">研究</a>
    <span class="current">案例</span>
    <a href="/services/">服务</a>
    <a href="/about/">关于</a>
  </div>
</nav>

<main class="wrap">
  <section class="hero">
    <div>
      <div class="kicker">自站案例 · GEO 修复 · 可复核证据</div>
      <h1>案例：fable-castle.com 的 GEO 修复记录</h1>
      <p class="lead">这不是“保证 AI 推荐”的案例，而是一次公开站点如何被整理成可抓取、可理解、可验证、可持续监测的 GEO 修复记录。</p>
      <div class="actions">
        <a class="btn primary" href="/diagnosis/">预约 AI 可见度诊断</a>
        <a class="btn secondary" href="/github-trust/">查看 GitHub 证据链</a>
      </div>
      <div class="tags">
        <span class="tag">自站案例</span>
        <span class="tag">GEO 修复</span>
        <span class="tag">AI 可见度</span>
        <span class="tag">可复核证据</span>
      </div>
    </div>
    <aside class="panel">
      <h2>案例边界</h2>
      <p>本页记录的是站点基础设施、公开叙事与证据链修复，不承诺搜索排名、收录结果或 AI 引用概率。</p>
      <div class="scoreline">
        <div><strong>主体</strong><span>景一 fable / fable-cc</span></div>
        <div><strong>站点</strong><span>fable-castle.com</span></div>
        <div><strong>主入口</strong><span>/diagnosis/</span></div>
        <div><strong>证据提交</strong><span>8ef4521</span></div>
      </div>
    </aside>
  </section>

  <section class="section">
    <h2>修复前：问题不是“没有内容”，而是 AI 很难判断什么最重要</h2>
    <p>站点里有大量知识资产、课程素材、工具说明和服务页面。资产本身有价值，但对搜索引擎和 AI 来说，主入口、主体身份、服务边界和证据路径不够收束。</p>
    <div class="grid">
      <article class="card"><div class="label">主叙事分散</div><h3>旧内容和服务混在一起</h3><p>课程、知识库、方法论、工具和服务同时出现，容易让外界误读为泛内容站。</p></article>
      <article class="card"><div class="label">主体识别不稳</div><h3>需要更强消歧</h3><p>“景一”需要持续绑定“景一 fable / fable-cc / 景一的寓言城堡”，避免与同名主体混淆。</p></article>
      <article class="card"><div class="label">旧入口噪音</div><h3>低客单线索稀释定位</h3><p>旧课程、旧知识库和课程目录容易稀释高客单 GEO 顾问服务定位。</p></article>
      <article class="card"><div class="label">AI 文件过期</div><h3>llms-full.txt 叙事滞后</h3><p>旧版 AI 索引文件曾包含旧业务线、价格和知识星球等过期信息。</p></article>
      <article class="card"><div class="label">抓取策略不清</div><h3>Cloudflare 与 robots 需要统一</h3><p>AI bot policy、robots.txt、sitemap.xml 和页面 canonical 需要形成同一套口径。</p></article>
      <article class="card"><div class="label">证据页不足</div><h3>案例缺少真实修复链路</h3><p>原案例页是泛样板，不能充分证明“我自己也按这套方法修过”。</p></article>
    </div>
  </section>

  <section class="section">
    <h2>五维诊断：把模糊问题拆成可修复对象</h2>
    <table>
      <tr><th>维度</th><th>修复前问题</th><th>修复动作</th></tr>
      <tr><td>定位资产</td><td>主页与旧入口容易让外界误读为课程/知识库站</td><td>统一为 GEO 与创始人 AI 可见度诊断站</td></tr>
      <tr><td>内容资产</td><td>内容多，但主线不够收束</td><td>保留指南、研究、工具、案例，旧素材退出正式构建</td></tr>
      <tr><td>信任资产</td><td>GitHub 仓库多，但层级不清</td><td>建立 GitHub 信任页，公开仓库按 A/B/C/D 分层</td></tr>
      <tr><td>搜索资产</td><td>Sitemap 曾主动推荐旧入口</td><td>将 sitemap.xml 收束到当前核心页面</td></tr>
      <tr><td>AI 可见度资产</td><td>llms-full.txt 过期，AI 爬虫策略不统一</td><td>重写 AI 索引说明，调整 robots.txt 与 Cloudflare 策略</td></tr>
    </table>
  </section>

  <section class="section">
    <h2>执行动作：从入口、证据、索引到防回流</h2>
    <div class="timeline">
      <div class="step"><div class="num">1</div><div><h3>统一主入口</h3><p>主页和导航明确指向创始人 AI 可见度与 IP 资产诊断：/diagnosis/。</p></div></div>
      <div class="step"><div class="num">2</div><div><h3>清理低客单入口</h3><p>服务页不再出现旧免费课或低价课主入口，服务梯度改为诊断、审计、知识库与年度监测。</p></div></div>
      <div class="step"><div class="num">3</div><div><h3>修复身份命名</h3><p>公开页面统一使用“景一 / 景一 fable / fable-cc / 景一的寓言城堡”。</p></div></div>
      <div class="step"><div class="num">4</div><div><h3>建立 GitHub 信任页</h3><p>将公开仓库按 A/B/C/D 分层，说明哪些是核心资产，哪些只是历史或辅助实验。</p></div></div>
      <div class="step"><div class="num">5</div><div><h3>重写 llms-full.txt</h3><p>AI 完整索引说明只保留当前权威叙事、服务边界、核心 URL 和不应误读项。</p></div></div>
      <div class="step"><div class="num">6</div><div><h3>收束 sitemap.xml</h3><p>旧课程、旧知识库、旧方法论不再作为核心 URL 被主动推荐给搜索引擎。</p></div></div>
      <div class="step"><div class="num">7</div><div><h3>增强 robots.txt</h3><p>允许搜索/问答爬虫访问核心公开页面，同时对旧路径降噪。</p></div></div>
      <div class="step"><div class="num">8</div><div><h3>增加 CI 防回流</h3><p>如果旧入口重新进入构建结果，或 AI 索引文件再次出现旧叙事，GitHub Actions 会失败。</p></div></div>
    </div>
  </section>

  <section class="section">
    <h2>可复核证据：只写已经验证的事实</h2>
    <div class="grid2">
      <div class="evidence">
        <h3>GitHub 提交</h3>
        <ul>
          <li><code>8ef4521 docs: narrow public GEO site authority graph</code></li>
          <li>动作：降噪、重写 AI 索引、服务页修正、CI 防回流。</li>
        </ul>
      </div>
      <div class="evidence">
        <h3>线上验证</h3>
        <ul>
          <li><code>/llms-full.txt</code> 已出现当前权威标题。</li>
          <li><code>/sitemap.xml</code> 不再包含旧课程/旧知识库入口。</li>
          <li><code>/services/</code> 不再含旧免费课与低价课残留。</li>
          <li><code>/course/</code> 与 <code>/02-知识图谱/</code> 返回 404。</li>
        </ul>
      </div>
      <div class="evidence">
        <h3>构建验证</h3>
        <ul>
          <li>GitHub Actions 构建与部署通过。</li>
          <li>CI 检查核心 GEO 页面、canonical、JSON-LD、llms、robots 与 sitemap。</li>
        </ul>
      </div>
      <div class="evidence">
        <h3>技术边界</h3>
        <ul>
          <li>本地构建失败原因是本机 Bundler 版本过旧。</li>
          <li>线上构建使用 GitHub Actions 的 Ruby 4.0 环境完成。</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <h2>修复结果：从“素材很多”变成“入口清楚、证据清楚、边界清楚”</h2>
    <div class="grid2">
      <article class="card"><h3>对客户更清楚</h3><p>访问者不需要在课程、工具、知识库和咨询之间猜主线。默认路径变成：先诊断，再按短板进入服务。</p></article>
      <article class="card"><h3>对 AI 更清楚</h3><p>AI 看到的权威文件更一致：llms.txt、llms-full.txt、sitemap.xml、robots.txt 指向同一个主体和服务边界。</p></article>
      <article class="card"><h3>对搜索更清楚</h3><p>sitemap 不再主动推荐旧课程、旧知识库和旧方法论入口，减少无关页面对当前业务的干扰。</p></article>
      <article class="card"><h3>对后续维护更清楚</h3><p>CI 增加防回流检查，避免未来改动把已经清理掉的旧入口重新发布出去。</p></article>
    </div>
    <p class="boundary">边界说明：这次修复不等于搜索排名、收录或 AI 引用的承诺。它证明的是基础设施更清晰、证据链更可复核、AI 更容易理解本站当前身份和服务范围。</p>
  </section>

  <section class="section">
    <h2>下一步：从站内可信，走向站外可信</h2>
    <div class="grid">
      <article class="card"><h3>外部权威信源</h3><p>继续建设掘金、知乎、CSDN、公众号和第三方介绍页，让“景一 fable”在站外也有一致证据。</p></article>
      <article class="card"><h3>消费端 AI 复测</h3><p>用固定问题集复测 ChatGPT、Perplexity、Kimi、DeepSeek、豆包等平台，记录日期、问题、回答和限制。</p></article>
      <article class="card"><h3>真实客户案例</h3><p>取得授权后再发布客户案例，保留基线、样本、执行动作、证据截图和不可控边界。</p></article>
    </div>
  </section>

  <section class="cta">
    <h2>你的官网也可能不是“没内容”，而是 AI 看不懂重点。</h2>
    <p>如果你的官网、个人 IP 或专家品牌也有“搜得到但说不清、AI 知道但不敢引用、内容多但证据散”的问题，可以先做一次创始人 AI 可见度与 IP 资产诊断。</p>
    <div class="actions" style="justify-content:center">
      <a class="btn primary" href="/diagnosis/">开始 AI 可见度诊断</a>
      <a class="btn secondary" href="/services/">查看服务边界</a>
    </div>
  </section>
</main>

<footer class="footer">景一的寓言城堡 · <a href="/who-is-jingyi/">景一身份消歧</a> · <a href="/llms.txt">llms.txt</a> · © 2026</footer>
</body>
</html>
```

- [ ] **Step 2: Run static validation for the rewritten page**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
p = Path("cases/index.html")
t = p.read_text()
required = [
    "案例：fable-castle.com 的 GEO 修复记录",
    "fable-castle.com",
    "8ef4521",
    "llms-full.txt",
    "sitemap.xml",
    "robots.txt",
    "GitHub Actions",
    "/diagnosis/",
    "不承诺搜索排名、收录结果或 AI 引用概率",
]
for item in required:
    assert item in t, f"missing required text: {item}"
for item in ["免费课程", "¥39", "100分", "排名提升"]:
    assert item not in t, f"forbidden text found: {item}"
print("PASS cases content contract")
PY
```

Expected:

```text
PASS cases content contract
```

- [ ] **Step 3: Commit the page rewrite**

Run:

```bash
git add cases/index.html
git commit -m "docs: publish self GEO repair case study"
```

Expected: a commit is created with only `cases/index.html`.

---

### Task 2: Add CI checks for the case page

**Files:**
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/.github/workflows/pages.yml`

- [ ] **Step 1: Extend the existing `Verify key GEO pages` workflow block**

Inside the shell block after the existing `grep -q '景一' ./_site/services/index.html` line, add:

```bash
          grep -q '案例：fable-castle.com 的 GEO 修复记录' ./_site/cases/index.html
          grep -q '8ef4521' ./_site/cases/index.html
          grep -q 'llms-full.txt' ./_site/cases/index.html
          grep -q 'sitemap.xml' ./_site/cases/index.html
          grep -q 'robots.txt' ./_site/cases/index.html
          grep -q 'GitHub Actions' ./_site/cases/index.html
          grep -q '/diagnosis/' ./_site/cases/index.html
          ! grep -q '免费课程\|¥39\|100分\|排名提升' ./_site/cases/index.html
```

- [ ] **Step 2: Run local workflow text validation**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
t = Path(".github/workflows/pages.yml").read_text()
required = [
    "grep -q '案例：fable-castle.com 的 GEO 修复记录' ./_site/cases/index.html",
    "grep -q '8ef4521' ./_site/cases/index.html",
    "grep -q 'llms-full.txt' ./_site/cases/index.html",
    "grep -q 'sitemap.xml' ./_site/cases/index.html",
    "grep -q 'robots.txt' ./_site/cases/index.html",
    "grep -q 'GitHub Actions' ./_site/cases/index.html",
    "grep -q '/diagnosis/' ./_site/cases/index.html",
    "! grep -q '免费课程\\|¥39\\|100分\\|排名提升' ./_site/cases/index.html",
]
for item in required:
    assert item in t, f"missing workflow assertion: {item}"
print("PASS workflow case checks")
PY
```

Expected:

```text
PASS workflow case checks
```

- [ ] **Step 3: Run syntax and whitespace checks**

Run:

```bash
ruby -ryaml -e 'YAML.load_file("_config.yml"); puts "YAML OK"'
git diff --check
```

Expected:

```text
YAML OK
```

`git diff --check` should print no errors.

- [ ] **Step 4: Commit the CI update**

Run:

```bash
git add .github/workflows/pages.yml
git commit -m "ci: verify self GEO case study content"
```

Expected: a commit is created with only `.github/workflows/pages.yml`.

---

### Task 3: Push and live verification

**Files:**
- No local file changes expected.

- [ ] **Step 1: Push the branch**

Run:

```bash
git push origin main
```

Expected: push succeeds. If GitHub reports bypassed PR rule warnings, treat them as informational if the push succeeds.

- [ ] **Step 2: Watch GitHub Actions**

Run:

```bash
gh run list --repo fable-cc/fable-castle --limit 3 --json databaseId,headSha,status,conclusion,displayTitle,workflowName
gh run watch <new-build-and-deploy-run-id> --repo fable-cc/fable-castle --exit-status
```

Expected: the `Build and Deploy Jekyll` workflow completes successfully.

- [ ] **Step 3: Verify the live page**

Run:

```bash
python3 - <<'PY'
import urllib.request
url = "https://fable-castle.com/cases/"
req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0 Codex GEO verifier"})
with urllib.request.urlopen(req, timeout=20) as r:
    text = r.read().decode("utf-8", "replace")
    print("status", r.status)
    print("length", len(text))
    for item in [
        "案例：fable-castle.com 的 GEO 修复记录",
        "8ef4521",
        "llms-full.txt",
        "开始 AI 可见度诊断",
    ]:
        print(item, item in text)
    for item in ["免费课程", "¥39", "100分", "排名提升"]:
        print("forbidden_absent", item, item not in text)
PY
```

Expected:

```text
status 200
案例：fable-castle.com 的 GEO 修复记录 True
8ef4521 True
llms-full.txt True
开始 AI 可见度诊断 True
forbidden_absent 免费课程 True
forbidden_absent ¥39 True
forbidden_absent 100分 True
forbidden_absent 排名提升 True
```

