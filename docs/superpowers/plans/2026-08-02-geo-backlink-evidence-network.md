# 景一 fable GEO 外链证据网络 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立可核验、口径一致、可持续复测的景一 fable 外链证据网络。

**Architecture:** 官网是主体事实源，GitHub 是可验证技术证据，CSDN/知乎/公众号分别承担技术、消歧和案例叙事。每条外链记录 HTTP、平台状态、索引与 AI 复测结果，避免把发布等同于收录或引用。

**Tech Stack:** Jekyll 静态站、HTML/JSON-LD、Markdown、Git/GitHub、HTTP 验证脚本。

---

### Task 1: 修正官网公开信源状态

**Files:**
- Modify: `public-sources/index.html`

- [ ] 在第三方信源表增加核验状态和核验日期。
- [ ] 把 CSDN `163398130` 标记为待恢复，把知乎 403 标记为平台限制。
- [ ] 增加“发布不等于收录或引用”的状态说明。
- [ ] 解析 JSON-LD 并检查核心内部链接。

### Task 2: 补强 GitHub 身份锚点

**Files:**
- Modify: `../fable-cc/README.md`
- Modify: `README.md`

- [ ] 在 Profile README 增加四个公开核验入口。
- [ ] 在主站 README 增加外部信源状态与日期。
- [ ] 检查旧 GitHub Pages 域名和旧身份口径不进入新增区域。
- [ ] 分仓库提交并推送可发布修改。

### Task 3: 创建桌面外链发布包

**Files:**
- Create: `/Users/jingyi/Desktop/景一GEO工作总文件夹/04-销售发布与话术/景一GEO外链建设执行包-2026-08-02/00-从这里开始.md`
- Create: `/Users/jingyi/Desktop/景一GEO工作总文件夹/04-销售发布与话术/景一GEO外链建设执行包-2026-08-02/01-统一身份与链接口径.md`
- Create: `/Users/jingyi/Desktop/景一GEO工作总文件夹/04-销售发布与话术/景一GEO外链建设执行包-2026-08-02/02-CSDN版-官网为何仍会被AI误解.md`
- Create: `/Users/jingyi/Desktop/景一GEO工作总文件夹/04-销售发布与话术/景一GEO外链建设执行包-2026-08-02/03-知乎版-景一fable与同名主体如何区分.md`
- Create: `/Users/jingyi/Desktop/景一GEO工作总文件夹/04-销售发布与话术/景一GEO外链建设执行包-2026-08-02/04-公众号版-我用自己的网站做GEO公开实验.md`
- Create: `/Users/jingyi/Desktop/景一GEO工作总文件夹/04-销售发布与话术/景一GEO外链建设执行包-2026-08-02/05-发布记录与7天30天复测表.md`

- [ ] 每篇使用不同标题、开篇和主要论证角度。
- [ ] 每篇链接官网、主体页、公开信源页、消歧页或检测页中的必要组合。
- [ ] 所有结论区分已观察、合理推断和待复测。
- [ ] 禁止承诺排名、收录、AI 首答、推荐、引用或成交。

### Task 4: 验证、提交和上线复核

**Files:**
- Test: `public-sources/index.html`
- Test: GitHub README files
- Test: desktop publication package

- [ ] 运行 HTML/JSON-LD、链接、敏感口径和重复度检查。
- [ ] 提交 fable-castle 与 fable-cc 变更。
- [ ] 推送到远端主分支或当前授权发布目标。
- [ ] 验证 GitHub Actions 和线上核心 URL。
- [ ] 在复测表中写入本次基线，后续平台发布项保持“待发布/待复测”。

