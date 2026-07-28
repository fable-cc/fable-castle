# fable-castle 收边修复包设计

日期：2026-07-28
状态：待用户书面规格确认后实施
范围：`fable-castle.com` 当前公开 GEO/AI 可见度诊断站

## 1. 背景

当前主站已经完成核心重构：主入口收束到 `/diagnosis/`，案例页升级为自站 GEO 修复记录，`llms-full.txt`、`sitemap.xml`、`robots.txt` 与 GitHub Pages workflow 已完成主线修复。

本次不做大改版，只做“收边修复包”：修复真实 404、统一隐私口径、补齐 sitemap、统一品牌短名、清理旧 workflow 红灯。目标是把专业站从“主体可用”推进到“细节干净”。

## 2. 目标

- 内部链接不再指向已知 404。
- 工具页隐私说明不再自相矛盾。
- sitemap 覆盖所有核心获客与 AI 可读页面。
- 核心公开页统一使用“景一的寓言城堡”，减少主体消歧噪音。
- GitHub Actions 不再被旧知识库统计、旧 Pages 检查持续刷红。
- 不触碰付费工具本体、私有提示词、密钥、客户数据或 Cloudflare 设置。

## 3. 本次修复项

### 3.1 修复 404 内部链接

已确认存在的 404：

- `/privacy/`
- `/guides/ai-crawler-checklist/`
- `/guides/robots-txt-for-ai/`
- `/guides/content-health-check/`
- `/guides/geo-rewrite-best-practices/`
- `/guides/long-tail-question-strategy/`
- `/guides/search-intent-mapping/`

处理设计：

1. 新增 `/privacy/` 页面，因为工具页确实需要隐私说明。
2. 工具页底部 6 个不存在的指南链接，不在本轮新建 6 篇文章；先统一改到现有 `/guides/` 或已有相关文章，避免制造薄内容页面。
3. 后续如果要做内容矩阵，再单独写 6 篇指南。

### 3.2 统一工具隐私口径

明确口径：

- `/tools/content-health/`：浏览器本地处理，不上传服务器。
- `/tools/question-expander/`：当前版本为浏览器本地生成，不调用模型或搜索 API。
- `/tools/geo-rewrite/`：当前版本为浏览器本地分析，不上传服务器，不调用模型。
- `/tools/crawler-check/`：浏览器会尝试直接请求目标站 `robots.txt`；请求从用户浏览器发出，不经过本站服务端代理。遇到 CORS 阻拦时显示手动检查提示。

必须修复：

- `/tools/geo-rewrite/` 底部“发送至服务端、24 小时清除”的旧文案，改为本地执行口径。
- `/tools/question-expander/` 底部“联网搜索请求、搜索结果数据不保留”的旧文案，改为本地生成口径。
- `/tools/crawler-check/` 隐私说明保留“一次性 HTTP 请求”，但必须说明请求来自用户浏览器，不经过本站服务端。

### 3.3 补齐 sitemap

将以下核心页面加入 `sitemap.xml`：

- `/tools/content-health/`
- `/tools/crawler-check/`
- `/tools/question-expander/`
- `/tools/geo-rewrite/`
- `/tools/geo-skills/`
- `/research/methodology/`
- `/llms.txt`
- `/llms-full.txt`

原则：

- 工具细页是获客入口，应该进入 sitemap。
- `llms.txt` 与 `llms-full.txt` 是 AI 可读事实源，应该进入 sitemap。
- 旧课程、旧知识库、旧方法论仍不进入 sitemap。

### 3.4 统一核心公开页品牌短名

核心公开页中的导航 logo、footer、`og:site_name`、title 里，优先使用：

`景一的寓言城堡`

允许在正文里解释“寓言城堡”是短名，但公开元信息和导航入口尽量使用完整名，帮助同名消歧。

本轮覆盖：

- `/research/`
- `/research/methodology/`
- `/tools/content-health/`
- `/tools/crawler-check/`
- `/tools/question-expander/`
- `/tools/geo-rewrite/`
- `/tools/geo-skills/`
- `/services/`
- `/about/`

### 3.5 清理旧 workflow 红灯

当前旧 workflow 问题：

- `.github/workflows/stats-update.yml` 仍围绕旧知识库统计运行。
- `.github/workflows/daily-smelt.yml` 仍围绕旧知识库管家运行。
- `.github/workflows/pages-check.yml` 检查旧 URL `https://fable-cc.github.io/fable-castle/`，与当前自定义域和 workflow 部署不一致。

处理设计：

1. 停用 `stats-update.yml` 的定时触发，只保留手动触发，避免旧统计继续刷红。
2. 停用 `daily-smelt.yml` 的定时触发，只保留手动触发。
3. 将 `pages-check.yml` 改为检查当前正式域名 `https://fable-castle.com/`，并检查 `/diagnosis/` 与 `/cases/`。

不删除 workflow 文件，避免历史自动化完全丢失。

### 3.6 旧服务子页

本轮不大改旧服务子页内容。

原因：

- `/services/geo-global.html`、`/services/enterprise.html` 等涉及业务线、价格、企业服务表达，需要单独决策。
- 本轮只做收边，不重写服务体系。

本轮只确保：

- 它们不进入 sitemap。
- 主导航不指向它们。
- 如果后续要处理，再单独做“旧服务子页降级/重定向/重写”规格。

## 4. 不做范围

本次不做：

- 重写旧服务子页。
- 新建 6 篇指南文章。
- 改 Cloudflare 设置。
- 接入表单、后端 API、Turnstile 或数据库。
- 改收费工具逻辑。
- 删除旧素材库。

## 5. 验收标准

实施后必须通过：

1. 核心页面内部链接扫描不再出现上述 7 个 404。
2. `/privacy/` 线上返回 200。
3. `/tools/geo-rewrite/` 不再出现“发送至服务端”“24 小时内自动清除”。
4. `/tools/question-expander/` 不再出现“联网搜索请求”“搜索结果数据不保留”。
5. `sitemap.xml` 包含 5 个工具细页、`/research/methodology/`、`/llms.txt`、`/llms-full.txt`。
6. `sitemap.xml` 不包含 `/course/`、`/课程/`、`/02-知识图谱/`、`/01-方法论/`。
7. 核心公开页元信息和导航尽量统一为“景一的寓言城堡”。
8. GitHub Actions 正式部署 workflow 成功。
9. `pages-check.yml` 不再检查旧 GitHub Pages URL。
10. 本地 `git status` 干净，远端同步。

## 6. 风险与处理

### 风险：一次性新建太多薄内容指南

处理：本轮不新建 6 篇指南，先把链接改到已有 `/guides/` 或现有文章。

### 风险：隐私口径写得过满

处理：只写当前静态页面真实行为；不承诺未来版本。

### 风险：旧 workflow 被删除后不好找

处理：只停用定时触发，不删除文件。

### 风险：旧服务子页仍有激进话术

处理：本轮记录为下一阶段问题，不混入本次低风险修复。

## 7. 实施顺序

1. 新增 `/privacy/` 页面。
2. 修工具页 404 指南链接和隐私口径。
3. 更新 sitemap。
4. 统一核心页品牌短名。
5. 调整旧 workflow 触发和 Pages 检查 URL。
6. 增加或更新 CI 验收项。
7. 本地静态扫描。
8. 提交、推送、等 Actions。
9. 线上复验。

