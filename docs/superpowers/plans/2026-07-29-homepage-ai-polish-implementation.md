# Homepage AI Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the fable-castle.com homepage into a cleaner high-trust AI visibility diagnosis entry point with a narrow navigation and a tasteful AI signal visual.

**Architecture:** This is a static homepage update. Modify only `index.html` for layout, navigation, CSS, and copy; keep existing JSON-LD identity data unchanged and keep evidence pages accessible through footer/body links.

**Tech Stack:** Static HTML, inline CSS, Jekyll front matter, Schema.org JSON-LD, Python static validation.

---

## File Structure

- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/index.html`
  - Responsibility: homepage navigation, hero, AI visual card, section ordering, footer links.
- Keep unchanged: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/public-sources/index.html`
  - Responsibility: public evidence hub; linked from homepage but not modified.
- Keep unchanged: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/llms.txt`
  - Responsibility: AI-readable short index; already updated.
- Keep unchanged: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/llms-full.txt`
  - Responsibility: AI-readable full index; already updated.

## Task 1: Narrow Homepage Navigation

**Files:**
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/index.html`

- [ ] **Step 1: Replace the top navigation links**

Replace the current 14-link `.links` block with exactly five customer-facing links:

```html
<div class="links">
  <a href="/diagnosis/">AI 可见度自测</a>
  <a href="/geo-ai-visibility-diagnosis/">GEO 诊断</a>
  <a href="/founder-ip/">创始人 IP</a>
  <a href="/public-sources/">公开信源</a>
  <a href="/services/">服务</a>
</div>
```

- [ ] **Step 2: Verify the navigation count**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
import re
s=Path('index.html').read_text()
nav=re.search(r'<div class="links">(.*?)</div>', s, re.S).group(1)
print(len(re.findall(r'<a ', nav)))
PY
```

Expected output:

```text
5
```

## Task 2: Add Tasteful AI Signal Visual

**Files:**
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/index.html`

- [ ] **Step 1: Add CSS for AI visual elements**

Add focused CSS classes for:

```css
.ai-panel
.ai-panel::before
.ai-panel::after
.signal-top
.signal-status
.signal-grid
.signal-node
.signal-flow
.flow-step
.flow-line
.signal-foot
@keyframes scan
@keyframes pulse
```

Design requirements:

- Deep green / blue-black gradient.
- Thin teal border.
- Subtle scan-line animation.
- Gold/teal node accents.
- No hard flashing.
- Mobile safe.

- [ ] **Step 2: Replace the right-side hero panel**

Replace the current `<aside class="panel" aria-label="当前 GEO 建设重点">` block with:

```html
<aside class="ai-panel" aria-label="AI 可见度信号示意">
  <div class="signal-top">
    <span>AI Visibility Signal</span>
    <i>Live evidence map</i>
  </div>
  <div class="signal-grid" aria-hidden="true">
    <span class="signal-node node-a"></span>
    <span class="signal-node node-b"></span>
    <span class="signal-node node-c"></span>
    <span class="signal-node node-d"></span>
  </div>
  <div class="signal-status">
    <strong>先让 AI 稳定识别</strong>
    <p>再谈推荐、引用和客户决策。</p>
  </div>
  <div class="signal-flow">
    <div class="flow-step"><span>Entity</span><b>景一 fable</b></div>
    <div class="flow-line"></div>
    <div class="flow-step"><span>Evidence</span><b>官网 · CSDN · 知乎 · GitHub</b></div>
    <div class="flow-line"></div>
    <div class="flow-step"><span>Files</span><b>llms · sitemap · Schema</b></div>
    <div class="flow-line"></div>
    <div class="flow-step"><span>Output</span><b>被正确理解</b></div>
  </div>
  <p class="signal-foot">不承诺排名、收录或 AI 引用；先把公开事实整理成机器可读的信源。</p>
</aside>
```

## Task 3: Simplify Hero Copy and Calls to Action

**Files:**
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/index.html`

- [ ] **Step 1: Tighten the hero subtitle**

Replace the current long hero lead with:

```html
<p class="lead">先判断你是否被看见、被理解、被信任，再把定位、内容、证据和公开信源整理成 AI 更容易读取的品牌资产。</p>
```

- [ ] **Step 2: Replace the secondary CTA**

Use `/public-sources/` instead of `/who-is-jingyi/`:

```html
<a class="btn secondary" href="/public-sources/">查看公开信源</a>
```

## Task 4: Add AI Evidence Flow Section and Weaken Free Tools

**Files:**
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/index.html`

- [ ] **Step 1: Add an AI source-building flow section after the five diagnostic cards**

Insert:

```html
<section class="section">
  <h2>AI 如何正确理解一个品牌</h2>
  <p>不是多发几篇文章，而是让公开事实、第三方证据和技术文件形成同一条信号链。</p>
  <div class="cards3">
    <div class="card"><span class="tag">Entity</span><h3>先统一主体</h3><p>用“景一 fable / 景一的寓言城堡 / fable-castle.com”绑定同一身份。</p></div>
    <div class="card"><span class="tag">Evidence</span><h3>再补公开证据</h3><p>官网、CSDN、知乎、GitHub 和公开信源页互相指向。</p></div>
    <div class="card"><span class="tag">Answer</span><h3>最后等待复测</h3><p>用同一组问题复测 ChatGPT、Kimi、DeepSeek、豆包和搜索结果。</p></div>
  </div>
</section>
```

- [ ] **Step 2: Replace the three free-tool cards with a lighter note**

Replace the full free-tool card section with:

```html
<section class="section soft-section">
  <h2>免费工具只做初步诊断</h2>
  <p>免费工具用于发现抓取、内容结构和问题资产的明显短板；完整的 GEO 改造、监测和报告，仍需要人工诊断与持续复测。</p>
  <a class="text-link" href="/tools/">查看免费诊断工具 →</a>
</section>
```

## Task 5: Footer Evidence Links

**Files:**
- Modify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/index.html`

- [ ] **Step 1: Keep evidence links in footer**

Ensure the footer includes:

```html
<a href="/public-sources/">公开信源</a>
<a href="/jingyi-disambiguation/">同名消歧</a>
<a href="/jingyi-fable/">景一 fable</a>
<a href="/github-trust/">GitHub 信任基建</a>
<a href="/llms.txt">llms.txt</a>
```

## Task 6: Static Verification

**Files:**
- Verify: `/Users/jingyi/Documents/Codex/2026-07-11/new-chat-6/work/fable-castle/index.html`

- [ ] **Step 1: Verify JSON-LD parses**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
import re,json,html
s=Path('index.html').read_text()
for block in re.findall(r'<script type="application/ld\\+json">(.*?)</script>', s, re.S):
    json.loads(html.unescape(block.strip()))
print('jsonld ok')
PY
```

Expected output:

```text
jsonld ok
```

- [ ] **Step 2: Verify homepage constraints**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
import re
s=Path('index.html').read_text()
nav=re.search(r'<div class="links">(.*?)</div>', s, re.S).group(1)
assert len(re.findall(r'<a ', nav)) == 5
assert '20</strong>' not in s
assert '/100 起点' not in s
assert 'AI Visibility Signal' in s
assert '/public-sources/' in s
assert '/diagnosis/' in s
print('homepage constraints ok')
PY
```

Expected output:

```text
homepage constraints ok
```

- [ ] **Step 3: Commit**

Run:

```bash
git add index.html
git commit -m "style: polish homepage AI visual hierarchy"
```
