---
published: false
sitemap: false
---

# Fable Castle GEO 可发现性、工具中心与双栈模型重构设计

> 状态：用户已批准
>
> 批准日期：2026-07-22
>
> 适用仓库：fable-cc/fable-castle
>
> 生产域名：https://fable-castle.com/
>
> 设计目标：品牌权威为总伞，GEO 与 AI 可见度为第一转化路径

## 1. 决策摘要

本项目把“景一的寓言城堡”从内容仓库式首页，重构为一个证据优先、可被搜索引擎和 AI 系统理解的个人专业品牌站，并以免费 GEO 工具形成从发现到咨询的主转化链路。

核心决定如下：

1. 首页只保留一个首要承诺：让你的专业，被 AI 正确找到与引用。
2. 视觉采用“证据型思想领袖”方向：暖白底、深墨文字、研究报告与编辑部气质，弱化动画和概念堆叠。
3. 新建可索引的工具中心、研究、案例、指南、服务与关于页面。
4. 保留 GitHub Pages 与 Jekyll 作为公开站点；受保护的联网与模型调用由 api.fable-castle.com 上的 Cloudflare Worker 承担。
5. 现有 geo-skills 只作为私有产品边界和需求参考；未经单独批准，不把其代码、提示词、私有规则或完整能力复用到免费工具，现有 Flask API 也不直接暴露到公网。
6. 工具后端采用国内、国际双栈供应商适配层；前台不要求用户理解模型或提交自己的 API Key。
7. 自动 API 基准与消费端 App 观察严格分开，不把模型 API 输出冒充豆包、DeepSeek、Kimi、ChatGPT 等消费端的真实搜索表现。
8. 不再使用“引用概率”“提升百分比”等无法独立验证的营销数字；所有量化结论必须附定义、样本、日期和来源。
9. 本设计是整个重构项目的共同规格。实施拆为五个可独立验收的工作流，分别编写实施计划，避免一次性大改。

## 2. 当前状态与问题证据

### 2.1 技术与内容现状

- 站点使用 Jekyll、just-the-docs 与 GitHub Pages，生产域名由 CNAME 指向 fable-castle.com。
- 本项目明确以 fable-cc/fable-castle 为唯一内容与发布源；旧的 fable-cc/jingyi 仓库不在本次修改范围。首次部署前必须从 Cloudflare 与 GitHub Pages 外部状态再次确认生产域名确实指向本仓库，发现不一致时停止发布并先消除双重所有权。
- 根首页是独立的 index.html，不使用主题布局；首页没有主导航链接，主要内容是深色动画、经营范围和价格卡片。
- 仓库审计快照中约有 930 个 Markdown 文件，其中 02-知识图谱约 655 个；内容规模与当前手工 sitemap 不匹配。
- _config.yml 已启用 jekyll-sitemap，但仓库中的手工 sitemap.xml 覆盖了自动生成结果，当前仅列出 23 个 URL。
- 根 robots.txt 允许 GPTBot、ClaudeBot、PerplexityBot 和 Google-Extended；线上 Cloudflare Managed robots 曾在它之前注入相反规则，形成源站与边缘策略冲突。
- _includes/head_custom.html 集中输出通用 meta 与 JSON-LD，但首页又维护另一套独立 Schema，导致事实和角色容易分叉。
- _config.yml 没有为全部可索引 Markdown 范围统一指定 layout，部分服务、FAQ、方法和关于页可能没有注入共享 head。
- 仓库同时存在 _includes/head_custom.html 与 _includes/head-custom.html，站点验证与 GEO 元数据分散在两个文件。
- course/index.html 与 course/index.md 争用同一个构建目标；服务页若不声明 permalink，扩展名省略链接也可能与实际 .html 输出不一致。
- 现有 SearchAction 指向并不存在的 /search/?q= 端点。
- Open Graph 主图使用 SVG；部分分享平台不能稳定生成预览。

### 2.2 实体与证据问题

当前可见内容同时出现以下冲突：

- 600+、700+、411 篇等不同内容规模。
- 18 个、72 个知识支柱等不同体系口径。
- “知识冶炼者”“一人公司架构师”“AI 搜索优化专家”等多个主角色。
- 2025、2026 等不同创立或更新时间口径。
- 多套服务价格、业务范围和服务名称。
- 多个行业规模、渗透率、引用提升率等精确数字缺少可复核的一手来源。

这些冲突会削弱普通搜索引擎与生成式搜索对同一实体的置信度，也会让服务承诺难以核验。

### 2.3 工具现状

geo-skills 仓库已有审计、改写、关键词扩展、流程编排、跟踪、成本、通知和基准等 Python 能力，Flask API 已包含：

- POST /api/audit
- POST /api/rewrite
- POST /api/expand
- POST /api/flow

但现有 API 缺少面向公开互联网所需的身份校验、Turnstile、细粒度限流、输入上限、SSRF 防护、成本闸门、隐私日志策略和跨供应商适配。README 中还存在未经第三方验证的“引用概率”表。结论是只把它当作需求与边界参考；免费工具独立、限量重做，默认不复用收费产品的代码、提示词、私有规则、完整工作流或误导性指标。

## 3. 目标、成功标准与非目标

### 3.1 目标

- 让搜索引擎与 AI 系统稳定识别“景一”“景一的寓言城堡”“景一式知识冶炼系统”“GEO Skills”之间的关系。
- 让首页、工具页、研究页、案例页和服务页拥有清晰、唯一、可验证的搜索意图。
- 让访客能从免费工具获得真实诊断，再进入相关指南、案例与咨询。
- 同一产品提供中国大陆与国际两条处理路线，并在合同、端点、密钥、隐私和故障切换层面区分国内与国际供应商。
- 建立可复现的 GEO 基线，而不是用不可验证的分数制造确定性。

### 3.2 发布后 30 天成功标准

- 所有目标页面返回 200，只有一个规范 URL，结构化数据无阻断性错误。
- Cloudflare 与源站 robots 策略一致，搜索型 AI 爬虫不会被误拦截。
- sitemap 由构建生成，覆盖全部经审计的可索引页面，不包含重定向、重复或 noindex 页面。
- 首页六个核心栏目均有真实内部链接，主要页面从首页不超过三次点击可达。
- 四个免费工具按设计工作，配额、失败提示和隐私说明准确。
- 国内与国际模型路由完成供应商契约测试，任一供应商故障不会造成跨区域静默切换或重复扣费。
- 建立第 0、7、14、30 天固定问题基线，能够区分“出现”“可点击引用”“事实准确”三项指标。
- 首页主要行动按钮到达审计样例或免费工具，次要行动按钮到达咨询入口。

### 3.3 非目标

第一期明确不做：

- 用户账号、订阅、支付、会员后台和复杂 CRM。
- 对所有约 930 篇文档逐篇重写。
- 自动登录、模拟点击或抓取消费端 AI App。
- 保证排名、保证收录、保证被引用或输出“被引用概率”。
- 把现有 Flask API 直接公开。
- 宣称所有请求全链路存储在中国大陆；Cloudflare Worker 架构不支持这一承诺。
- 在未完成 BytePlus 或海外合同确认前，用火山方舟中国站 Key 服务海外场景。
- 在没有证据时把内容品牌描述为注册公司或官方合作伙伴。
- 完整英文站与多语言内容迁移；第一期界面仍以中文为主，但可切换国际处理路线。

## 4. 品牌、受众与主转化路径

### 4.1 品牌层级

| 层级 | 唯一名称 | 用途 |
|---|---|---|
| 人物实体 | 景一 | 专业主体与服务提供者 |
| 主职业描述 | GEO 与 AI 可见度顾问 | 首页、关于页、服务页的统一主角色 |
| 内容品牌 | 景一的寓言城堡 | 网站、研究与内容资产 |
| 方法 | 景一式知识冶炼系统 | 内容生产与证据组织方法 |
| 专业产品 | GEO Skills | 独立收费工具；公开站只展示经批准的能力说明与咨询入口 |
| 长期主题 | 一人 + AI = 一人公司 | 内容与产品理念，不作为唯一职业名称 |

“知识冶炼者”保留为个人方法描述；“一人公司架构师”不再与主职业并列争夺首页实体中心。

### 4.2 核心受众

1. 已有专业知识但在 AI 搜索中缺乏可见度的创始人、顾问与行业专家。
2. 需要构建可检索内容资产的个人 IP 与小团队。
3. 需要 GEO、知识库或企业 Agent 诊断的组织。
4. 需要开源命令行能力的技术用户。

### 4.3 主路径

访客路径固定为：

免费工具或真实审计样例 → 看见具体问题 → 进入对应指南或案例 → 预约适配沟通。

课程、社群、IP 孵化和企业 Agent 作为服务页中的次级入口，不在首页首屏与 GEO 主路径竞争。

## 5. 信息架构与 URL

### 5.1 顶层导航

| 导航 | 规范路径 | 页面目的 |
|---|---|---|
| 首页 | / | 品牌主张、证据与首要转化 |
| GEO 工具 | /tools/ | 免费体验工具与专业能力说明入口 |
| 研究与数据 | /research/ | 方法、基线、数据与来源 |
| 案例 | /cases/ | 可复核的前后变化与交付样例 |
| 指南 | /guides/ | 问题导向的长期内容 |
| 服务 | /services/ | GEO 为首，其他服务为次 |
| 关于景一 | /about/ | 人物、方法、资历与消歧 |

### 5.2 工具中心

| 工具 | 规范路径 | 执行方式 |
|---|---|---|
| 内容健康检查 | /tools/content-health/ | 浏览器本地 |
| AI 爬虫与 robots 检查 | /tools/crawler-check/ | Worker 安全抓取 |
| GEO 内容改写 | /tools/geo-rewrite/ | Worker + 模型路由 |
| 长尾问题扩展 | /tools/question-expander/ | Worker + 模型路由 |
| GEO Skills 专业能力入口 | /tools/geo-skills/ | 公开文档、能力说明与咨询导流 |

前四个免费工具各有独立可索引页面，包含用途、输入边界、方法解释、示例、限制、FAQ、隐私说明、相关指南和 SoftwareApplication Schema。/tools/geo-skills/ 只是专业能力说明与咨询入口，不在公开站点运行或下载收费工具。

### 5.3 旧 URL 策略

- 已有高价值内容 URL 原样保留，避免批量迁移造成信号损失。
- 保留现有 /about/ 作为关于页规范地址，从 sitemap 移除错误的 /04-关于/；只有访问日志或历史外链证明旧地址曾公开时才增加 301。
- /研究/ 的高价值研究映射到 /research/ 下的稳定英文 slug，旧地址保留 301。
- /services/geo-test 迁移到相应工具页。
- 当前 sitemap 中不存在或错误的 /course.html 等路径，在正确目标上线后才配置 301。
- 新建和重构页面全部显式声明目录型规范 permalink；现有高价值页面先按构建产物盘点实际 URL，再决定保留或重定向，不通过全局 permalink 改动批量改变旧地址。
- /course/ 在迁移期间只保留一个构建来源：课程总览由 course/index.html 负责，course/index.md 的独有内容并入 /services/free-course/ 后退出构建；课程总览纳入视觉工作流后再改为统一 Jekyll 页面。
- jingyi.fable.cc 等旧域名只在目标页面可用、canonical 正确后做域名级 301。
- 重定向不形成链，不把多个不相关页面全部指向首页。

## 6. 首页与视觉设计

### 6.1 视觉方向

采用“证据型思想领袖”：

- 暖白背景、深墨正文、低饱和强调色。
- 版式接近研究简报、编辑部与高端顾问网站。
- 保留适量东方气质，但不依赖玄学符号、粒子动画或视频表达专业度。
- 首页首屏不自动播放视频；现有 canvas 字河与大体积视频从首屏移除。
- 可访问性至少达到 WCAG 2.2 AA 的颜色、键盘与焦点要求。

### 6.2 首页信息顺序

1. 顶部导航。
2. 首屏主标题：“让你的专业，被 AI 正确找到与引用”。
3. 副标题：说明服务对象、解决问题和证据边界。
4. 主按钮“免费检测一篇内容”，次按钮“查看真实审计样例”。
5. 可验证证据条：开源仓库、研究报告、工具方法、更新时间。
6. 四个免费工具入口。
7. 一个完整审计样例，展示事实、问题和建议，不展示虚假引用概率。
8. 景一式知识冶炼系统的三步方法。
9. 案例与研究。
10. GEO 服务入口。
11. 关于与咨询。

### 6.3 性能预算

- 有足够真实流量时，移动端 Core Web Vitals 的 p75 目标为 LCP 不高于 2.5 秒、CLS 不高于 0.1、INP 不高于 200 毫秒；发布前用移动端实验室测试验证 LCP、CLS 与主线程阻塞风险。
- 非工具页首屏自有 JavaScript 压缩后不超过 100 KB。
- 不因装饰性动画阻塞内容、导航或结构化数据。
- OG 主图提供 1200×630 PNG 或 WebP，SVG 可保留为设计源文件但不作为唯一分享图。

## 7. 实体、事实与证据治理

### 7.1 单一数据源

新增以下数据文件：

- _data/entity.yml：人物、品牌、方法、产品、消歧、稳定 ID。
- _data/services.yml：服务名称、对象、交付物、价格展示规则。
- _data/tools.yml：工具名称、路径、免费额度、隐私和限制。
- _data/metrics.yml：公开数字的定义、数值、统计日期和来源。
- _data/crawlers.yml：爬虫名称、用途、官方来源、允许策略和核验日期。

模板、首页和 Schema 只能从这些数据文件读取共享事实，不再手工复制。

### 7.2 数字规则

- 内容数量通过构建脚本按明确目录与文件类型计算。
- 知识支柱数量只有在定义一致、目录可核验时才展示。
- 每个公开数字必须包含统计口径、as_of 日期和 source。
- 无法满足上述条件的数字删除或改写为不带精确数值的描述。
- 服务价格只从 _data/services.yml 输出；未形成标准交付物的服务使用“预约评估”，不显示随意起价。

### 7.3 证据等级

| 等级 | 定义 | 可用于 |
|---|---|---|
| A | 法规、官方文档、原始论文、第一方数据 | 研究结论和产品规则 |
| B | 可复核行业报告、公开数据集 | 带来源的背景判断 |
| C | 本站真实测试，公开方法、样本、日期和限制 | 案例与基线 |
| D | 个人经验或启发式判断 | 明确标注为建议，不作为事实 |

发布前检查会阻止无来源精确数字、虚假“官方合作”、虚假成功率和不可复现引用提升进入生产。

## 8. Canonical、Schema、sitemap 与爬虫

### 8.1 Canonical 与元数据

- 使用 Jekyll absolute_url 或等价过滤器生成 canonical，避免手工拼接产生双斜杠。
- 所有可索引 Markdown 页面显式或通过 defaults 获得受支持的 layout。
- _includes/head_custom.html 作为 just-the-docs 的唯一共享 head 扩展；站点验证标记合并到此处，停用重复的 head-custom.html。
- 每个页面只输出一个 canonical。
- hreflang 只在存在真实互译页面时输出；不把同一中文页声明为英文页。
- 标题、描述、OG URL 与 canonical 使用同一规范地址。
- 文章必须提供 datePublished、dateModified、author、publisher 和 mainEntityOfPage。

### 8.2 Schema 映射

| 页面 | Schema |
|---|---|
| 首页 | Person、WebSite、Service；有真实公开报价时增加 Offer |
| 关于页 | ProfilePage、Person |
| 工具中心 | CollectionPage、ItemList |
| 单个工具 | SoftwareApplication、FAQPage、BreadcrumbList |
| 指南 | Article、BreadcrumbList |
| 研究报告 | Report；有真实数据集时增加 Dataset |
| 案例 | Article |
| 服务 | Service、Offer、Audience |

稳定 ID 使用：

- https://fable-castle.com/#person
- https://fable-castle.com/#website
- https://fable-castle.com/#service

删除不存在搜索端点的 SearchAction。FAQ 数据统一使用 question 与 answer 字段；页面中不可见的 FAQ 不输出 FAQPage，结构化内容必须与页面可见内容一致。没有注册组织证据时不使用 Organization 冒充公司主体，也不输出未经证实的 foundingDate。areaServed 按每项服务的真实覆盖范围从 services.yml 输出，不能用模型可调用地区替代服务覆盖范围。所有插入 JSON-LD 的文本值都经过 Jekyll jsonify 或等价安全序列化。

### 8.3 sitemap

- 删除手工 sitemap.xml，让构建流程生成 sitemap。
- docs/superpowers/ 只保存内部规格与计划，在 Jekyll exclude 中排除，不发布到生产站点。工作流 1 的首个实现提交负责加入目录级 exclude；在此之前，该目录内每份规格与实施计划都必须同时声明 published: false 与 sitemap: false，形成双重保护。
- 通过目录级 defaults 与页面 front matter 排除分发副本、课程逐字稿、生成 HTML 副本、重定向页、测试页和低价值重复页。
- 首页、新建顶层栏目、工具、服务、关于、指南、案例、研究、posts 与 01-方法论默认进入候选清单；02-知识图谱只收录显式标记 indexable: true 且通过内容审计的页面。
- 首次发布目标是约 200 个经审计的规范 URL；实际数量来自构建清单，不把 200 写成硬编码上限。
- CI 校验 sitemap 中每个 URL 均返回 200、canonical 自指、非 noindex、非重定向。
- CI 从构建后的 _site 检查真实路由和 destination collision，不再只扫描源码 Markdown。

### 8.4 robots 与 AI 爬虫

- 关闭 Cloudflare Managed robots 的自动注入，源站文件成为唯一规则来源。
- 通用搜索抓取允许。
- OAI-SearchBot 与 ChatGPT-User 允许访问公开内容。
- GPTBot 默认禁止训练抓取。
- 其他供应商按 _data/crawlers.yml 中的官方用途分别配置；未知用途不靠名称猜测。
- robots、WAF、Bot 管理和源站响应必须做线上一致性测试。
- llms.txt 只作为机器可读导航，不宣传为收录或引用保证；llms-full.txt 从精选规范内容生成并带更新时间。

## 9. 免费工具产品设计

### 9.1 免费边界

| 工具 | 免费额度 | 输入上限 | 是否联网 |
|---|---:|---:|---|
| 内容健康检查 | 不限 | 单篇 20,000 字符 | 否 |
| 爬虫检查 | 滚动 24 小时 3 次 | 1 个公开 URL | 是 |
| GEO 改写 | 滚动 24 小时 1 次 | 2,000 个中文字符 | 是 |
| 问题扩展 | 滚动 24 小时 3 次 | 5 个种子词 | 是 |

服务器工具额度按浏览器签名标识计算，不等同“每位真实用户”；IP 只做补充滥用限流。问题扩展免费结果最多显示 10 个问题。第一期不要求注册，不做付费解锁。

收费工具不属于本期公开发布范围。/tools/geo-skills/ 只展示经过批准的公开说明、适用场景、交付边界和咨询入口；不得上传或嵌入收费工具本体，不得公开其源码、私有仓库、内部提示词、私有 API、密钥、授权文件、客户数据或只有付费客户可获得的操作文档。未来如需上线收费能力，必须另立包含身份、支付、授权、租户隔离和审计要求的独立设计与发布审批。

### 9.2 内容健康检查

全部在浏览器本地执行，正文不上传。检查维度包括：

- 回答是否前置。
- 标题与问题是否对应。
- 实体是否稳定、完整、可消歧。
- 事实是否带来源与时间。
- 结构是否便于提取。
- FAQ 与小标题是否真实服务读者。
- 是否存在无依据精确数字。

输出为“内容健康分”和分项建议，并醒目标注“启发式诊断，不代表任何平台的收录或引用概率”。每个扣分项都能展开查看触发规则。

### 9.3 爬虫检查

检查：

- URL 可访问性与最终状态。
- robots.txt 中常见搜索与 AI 爬虫策略。
- sitemap 可发现性。
- canonical、noindex 与响应头。
- 基础结构化数据。
- 重定向链和 HTTP/HTTPS 一致性。

结果分为事实、风险和建议。不能从 robots 允许推导出“必然收录”。

### 9.4 GEO 改写

- 保留原意，不添加用户未提供的资历、数据、客户或来源。
- 输出改写稿、变更说明、需要补证据的位置和平台限制。
- 不自动发布。
- 输入或输出涉及医疗、法律、金融等高风险建议时，显示明显限制并避免替代专业意见。

### 9.5 问题扩展

- 按信息、比较、决策、风险、实施等意图分类。
- 输出问题、意图、建议证据类型和适合的内容形式。
- “搜索量”“竞争度”“引用潜力”只有真实数据源时才显示；否则使用非量化优先级和解释。

## 10. 技术架构

### 10.1 总体结构

~~~mermaid
flowchart LR
    U[访客浏览器] --> S[GitHub Pages / Jekyll]
    U --> L[本地内容检查器]
    U --> W[api.fable-castle.com / Cloudflare Worker]
    W --> T[Turnstile 校验]
    W --> R[边缘限流与请求验证]
    W --> Q[Durable Objects 原子配额、幂等与预算]
    W --> F[经 Cloudflare Access 保护的 Safe Fetch Service]
    F --> P[公开网站]
    W --> G[模型供应商网关]
    W --> DB[D1 基准元数据与评分]
    W --> E[R2 私有证据对象]
    G --> CN[国内适配器]
    G --> GL[国际适配器]
    CN --> D[DeepSeek]
    CN --> A[豆包 / 火山方舟]
    CN --> MC[Kimi 中国区]
    GL --> O[OpenAI]
    GL --> MG[Kimi 国际区]
    GL --> BP[BytePlus 条件接入]
~~~

### 10.2 前端

- Jekyll 继续负责公开、可索引页面。
- 工具使用渐进增强；静态说明、示例和 FAQ 在 JavaScript 失败时仍可读取。
- 本地检查器使用独立、小型、可测试的 JavaScript 模块。
- API 工具只向 api.fable-castle.com 发送必要字段。

### 10.3 Worker API 与原子状态

公开端点：

- GET /v1/health
- GET /v1/requests/{request_id}
- POST /v1/crawler-check
- POST /v1/rewrite
- POST /v1/questions

监测任务使用受保护的内部端点或计划任务，不公开给匿名访客。

请求状态查询只允许持有原始浏览器签名 cookie 的客户端读取同一主体创建的 request_id，防止通过 UUID 枚举其他请求。

统一请求字段：

- request_id：客户端生成的 UUID。
- provider_route：仅模型端点使用，值为 cn 或 global，表示模型供应商路线而非全链路数据驻留。
- consent_version：模型端点必填，必须与服务端当前路线披露版本一致。
- turnstile_token：需要联网或模型调用时必填。
- input：经过前端长度检查的正文、关键词或 URL。
- options：只接受白名单字段。

统一响应字段：

- request_id
- status
- result
- facts
- recommendations
- sources
- limitations
- provider_route
- provider
- generated_at
- quota

不向前端暴露供应商 Key、内部提示词、完整错误堆栈或原始供应商响应。

Durable Objects 是配额、幂等和预算的唯一权威状态层，Workers KV 只可用于非关键配置缓存。状态分为：

- RECEIVED：请求已验证。
- RESERVED：已原子预留免费额度和最大估算成本。
- PROVIDER_SENT：请求可能已被供应商接收。
- SUCCEEDED：已按实际 usage 结算。
- FAILED_FINAL：确认未成功且不再重试。
- UNKNOWN：客户端或供应商超时，无法确认是否已经产生调用。

幂等键由浏览器签名主体、端点和 request_id 共同组成，并保存输入的 HMAC 摘要。同一 request_id 在七天保留期内无论处于执行中还是终态都不得再次调用供应商：输入摘要相同时返回已存状态；输入摘要不同时返回 IDEMPOTENCY_CONFLICT。标准化结果只为断线恢复临时保存 15 分钟，过期后返回 RESULT_EXPIRED，仍不重新调用供应商；终态元数据和输入摘要保留七天。

每个执行中状态都保存 lease_expires_at，单次执行租约上限 120 秒；只有持有该 request_id 的 Durable Object 才能续租。任何供应商网络调用之前，Durable Object 必须先持久化 PROVIDER_SENT、供应商和可用的供应商请求标识，再发出请求，因此 RESERVED 状态保证尚未调用供应商。Durable Object alarm 与状态查询都会执行恢复：RECEIVED 或 RESERVED 超过租约时转为 FAILED_FINAL 并释放预留；PROVIDER_SENT 超过租约且无法从供应商或 usage 记录确认终态时转为 UNKNOWN。租约内的 PROVIDER_SENT 对外返回处理中，转成 UNKNOWN 后稳定映射为 REQUEST_UNKNOWN，并进入同一对账与最大成本结算流程。

只有供应商明确未接收请求，或其接口提供可验证幂等语义时，才允许自动重试。进入 UNKNOWN 后不自动再次调用供应商，用户免费额度与预算预留都保持锁定。只有账单或 usage 对账能证明没有收费时才同时释放额度与预算；确认收费则按实际值结算；24 小时后仍无法确认时，按最大估算成本结算并把该次免费额度视为已使用，不能自动释放预算。

### 10.4 Safe Fetch Service

Cloudflare Worker 不直接 fetch 用户提交的任意主机。爬虫检查使用一个独立、容器化并部署在 Google Cloud Run 的 Safe Fetch Service，通过 Cloudflare Access 服务令牌和应用层 HMAC 签名鉴权。签名覆盖 request_id、规范化 URL 摘要与时间戳，超过 60 秒的请求拒绝执行。

Cloud Run ingress 设为 internal-and-cloud-load-balancing，关闭默认 run.app URL，只允许经 Google External Application Load Balancer 的自定义域名进入；该域名继续由 Cloudflare Access 保护。即使负载均衡器地址被发现，Safe Fetch Service 仍必须独立校验 HMAC，不能只依赖网络来源。

Safe Fetch Service 必须：

- 使用能自定义 Dial 与 TLS ServerName 的 HTTP 客户端。
- 对 A 和 AAAA 记录只解析一次，拒绝任一私网、loopback、链路本地、保留或元数据地址，并把已验证的公开 IP 固定到实际连接。
- 在应用层显式拒绝 metadata.google.internal、169.254.169.254 及其等价元数据目标，不能把元数据防护只交给 VPC firewall。
- 在 TLS 中保留原始主机名进行 SNI 与证书校验。
- 每次重定向重新执行解析、地址校验和 IP 固定，最多三跳。
- 通过受控 VPC egress 与防火墙再次拒绝其他私网目标和非 80/443 端口；元数据目标仍由应用层显式拒绝。
- 不执行 JavaScript，不发送用户 cookie，不支持认证 URL，不作为通用代理。
- 只返回规范化响应头、最终 URL 和上限 1 MB 的文本内容。

容器使用专用最小权限服务账号，不授予站点数据库、对象存储、模型、部署或业务 Secret 的访问权；如运行时必须读取 HMAC Secret，只允许访问该单一 Secret 的指定版本。服务不接收用户提供的 Metadata-Flavor 等云元数据请求头。

Safe Fetch Service 不是模型服务，也不保存抓取正文。其平台、区域与连接数据处理在隐私页单独披露。

### 10.5 监测证据存储

- D1 保存运行元数据、版本化提示词集、平台、账户类型、地区、模型/API 配置、评分、判分人和证据对象键。
- 私有 R2 bucket 保存原始 API JSON、脱敏截图和来源快照；不允许公共列目录或匿名读取。
- 管理入口由 Cloudflare Access 保护，写入使用 Worker binding，人工只授予最小读取权限。
- 原始证据保留 90 天并通过 R2 lifecycle 自动删除；不含个人数据的汇总评分与公开报告可长期保留。
- 截图发布前裁掉账号、头像、历史对话和其他个人信息；公开报告不复制大段平台回答。

## 11. 国内、国际双栈模型路由

### 11.1 路由原则

- 第一期开出的中文 AI 工具页默认 provider_route=cn；访客可在高级设置中改为 global。
- 工具页显示“模型服务路线”，允许用户在高级设置中切换路线，但不要求选择具体模型。
- provider_route 只约束模型供应商，不表示 Cloudflare Worker、Safe Fetch Service 或整条网络路径位于该地区，页面必须展示这项说明。
- 用户选择 cn 时绝不静默降级到国际供应商；选择 global 时也不静默传到中国区。
- 供应商选择由能力角色、质量门槛、合同范围、可用性与成本配置决定，不在前端写死模型名称。
- 模型 ID 存在配置注册表中，上线前通过供应商 models 或等价接口验证，避免因模型下线导致代码发布。

provider_route 是用户偏好，不是调用授权。服务端适配器注册表至少保存 enabled、contract_status、allowed_request_countries、cross_border_allowed、privacy_version 与 verified_at；Worker 使用 Cloudflare 提供的国家代码作为保守资格判断输入，不保存精确 IP，并在每次调用前同时校验合同状态、请求来源资格、披露版本和供应商开关。前端字段不能绕过这些校验。

提交按钮前必须明确展示本路线可能使用的主供应商与备用供应商、请求先经过 Cloudflare Worker 的数据路径、供应商区域、正文会发送给模型供应商以及可能发生的跨境处理，并记录匹配当前 privacy_version 的 consent_version。豆包中国站默认拒绝非中国大陆来源，除非当前合同或书面确认明确允许；中国大陆来源使用 global 路线前，必须具备经审阅的处理依据和对应版本的明确同意，否则返回 ROUTE_NOT_AVAILABLE。响应返回实际 provider，不能把 API 输出伪装成豆包、DeepSeek、Kimi、ChatGPT 或其他消费端应用的观察结果。

### 11.2 国内供应商

| 供应商 | 角色 | 设计边界 |
|---|---|---|
| DeepSeek | 审计、推理、改写候选 | 使用当前正式模型；旧别名不写死；普通 Chat API 不宣称稳定结构化引用 |
| 豆包 / 火山方舟 | 中文生成与联网搜索候选 | 按保守合规规则把中国站视为仅限中国大陆，除非当前合同或书面确认明确扩大范围；Web Search 必须返回可核验来源事件 |
| Kimi 中国区 | 长文本与改写候选 | 使用 api.moonshot.cn；与国际账号、Key、政策分开；第一期不依赖升级中的 Web Search |

### 11.3 国际供应商

| 供应商 | 角色 | 设计边界 |
|---|---|---|
| OpenAI | 国际生成与联网搜索候选 | 仅用服务端 Secret；搜索来源必须通过契约测试 |
| Kimi 国际区 | 国际长文本与备用生成 | 使用 api.moonshot.ai；账号和 Key 不与中国区混用 |
| BytePlus | 海外豆包体系的条件适配器 | 只有海外合同、区域和账号确认后启用 |

DeepSeek 不是国际路线的默认兜底，因为官方不保证所有司法辖区持续可用。任何跨境服务均受供应商条款、出口管制、网络和当地法规约束。

### 11.4 能力角色

网关以角色而非品牌调用：

- generate_cn
- generate_global
- long_context_cn
- long_context_global
- web_search_cn
- web_search_global

首发路由固定如下，只有通过第 11.5 节契约测试并且生产 Key、合同和预算均可用时才启用：

| 能力角色 | 首发主供应商 | 同路线备用 | 首发状态 |
|---|---|---|---|
| generate_cn | DeepSeek | Kimi 中国区 | 启用 |
| long_context_cn | Kimi 中国区 | DeepSeek | 启用 |
| web_search_cn | 豆包 / 火山方舟 Web Search | 无 | 有来源契约通过后启用 |
| generate_global | OpenAI | Kimi 国际区 | 启用 |
| long_context_global | Kimi 国际区 | OpenAI | 启用 |
| web_search_global | OpenAI 官方 Web Search | 无 | 有来源契约通过后启用 |
| BytePlus 海外豆包 | 无 | 无 | 首发关闭 |
| DeepSeek 国际兜底 | 无 | 无 | 首发关闭 |

搜索角色如果不能获得可核验来源，返回 SEARCH_UNAVAILABLE，不降级成无来源模型回答。某条备用路线未通过契约测试时保持关闭，前台不展示不存在的冗余能力。对外宣传“双栈可用”前，至少 generate_cn 与 generate_global 各有一个生产供应商通过全套验收。

### 11.5 供应商验收门槛

每个适配器在启用前必须通过：

- 20 个中文或英文固定样例的结构、事实保真与指令遵循评审。
- 流式和非流式响应解析。
- 400、401、402/余额、429、500、503 和超时处理。
- JSON 输出与来源字段契约。
- 幂等重试不会重复执行有副作用的动作。
- 供应商名称、区域、条款和隐私链接能在产品说明中准确披露。
- 服务端国家资格、合同状态、跨境开关、privacy_version 与 consent_version 的允许和拒绝夹具。

## 12. GEO 监测设计

### 12.1 两类测量

第一类是“API 能力基准”：

- 使用官方 API。
- 保存模型、参数、日期、提示词、来源 URL 和原始结构化响应。
- 只能代表该 API 与配置。

第二类是“消费端平台观察”：

- 覆盖豆包、DeepSeek、Kimi、腾讯元宝、百度/文心、微信搜一搜、ChatGPT、Perplexity。
- 使用固定问题集、固定账户类型、固定地区和固定日期人工执行。
- 保存截图、可点击来源和事实核对结果。
- 不使用未授权抓取、自动登录或反向工程。

API 结果不得标记为消费端平台结果。

### 12.2 指标

- 出现率：回答中是否出现目标人物、品牌或域名。
- 可点击引用率：回答是否提供能打开并指向本站规范 URL 的来源。
- 事实准确率：角色、品牌、方法和服务事实是否正确。
- 来源页面分布：引用落在哪类页面。
- 固定问题覆盖率：多少目标问题出现正确实体。

“引用潜力”“推荐概率”不作为对外指标。

### 12.3 样本与判分协议

- 固定问题集 v1 包含 12 题：4 个发现类、4 个比较类、4 个决策类。题目发布后在 30 天周期内不修改。
- Day 0 与 Day 30 对每个平台、每道题执行两次独立新会话；Day 7 与 Day 14 对 6 道哨兵题各执行一次。
- 每次运行记录 prompt_set_version、平台、API 或消费端、账户类型、地区、时间、会话是否全新、模型或可见版本和运行状态。
- entity.yml 与 services.yml 在 Day 0 冻结为 truth_set_version；角色、品牌、方法、规范域名和有效服务事实构成真值表。
- 出现率分母是有效回答数，分子是明确出现品牌全称、人物与域名中至少一个目标实体的回答数。
- 可点击引用率分母是有效回答数，分子是至少包含一个可打开、最终落到本站规范 URL 的回答数。
- 事实覆盖率等于正确呈现的必需事实数除以题目要求的必需事实数。
- 断言准确率等于回答中正确断言数除以全部可核对断言数；遗漏不算错误，但会降低事实覆盖率。
- 平台拒答、登录失败和服务错误单独计入可用率，不从原始运行记录中删除，也不混入有效回答分母。
- 一名判分人完成初评；所有错误、歧义和引用归属争议由第二人复核。最终值和修改理由写入 D1。

### 12.4 固定节奏

- Day 0：发布前基线。
- Day 7：抓取与索引变化。
- Day 14：实体与来源变化。
- Day 30：形成首份公开复盘。

所有对外报告都披露样本量、平台、版本或账户类型、地区、时间、方法和限制。

## 13. 安全、滥用与隐私

### 13.1 Turnstile 与配额

- 所有联网和模型端点必须在 Worker 服务端验证 Turnstile token。
- token 只使用一次，并遵守供应商验证时效。
- 免费额度按“浏览器签名标识”计量，不宣称等同真实个人；清除 cookie 可能重置额度，IP 级滥用限流作为补充。
- Worker 生成随机浏览器 ID 并签名，cookie 有效期 30 天，使用 Secure、HttpOnly、SameSite=Lax。
- 该 ID 与 IP 摘要均属于假名化标识，不称为匿名数据。签名 HMAC Secret 至少每 90 天轮换，并在 30 天过渡期同时验证上一把密钥。
- IP 只用于边缘滥用限流，以每日轮换盐生成摘要；应用日志最多保留 24 小时后删除。
- Durable Objects 原子保存配额窗口、request_id 状态和预算预留；KV 不承担计数或幂等。

### 13.2 CORS 与请求限制

- 生产环境 Access-Control-Allow-Origin 只允许 https://fable-castle.com；测试环境使用独立的显式 origin allowlist，不把 localhost 或预览域名带入生产。
- 不使用通配 CORS 与凭据组合。
- 限制 Content-Type、方法、请求体大小和白名单字段。
- GET /v1/health 不返回密钥、版本细节或供应商配置。

### 13.3 SSRF 防护

Worker 只做 URL 语法、协议和长度校验，再把签名请求交给 Safe Fetch Service；用户 URL 不进入 Worker 原生 fetch。Safe Fetch Service 只允许 http 与 https：

- 同时解析全部 A 与 AAAA 记录；任一结果属于 loopback、私网、链路本地、保留或云元数据地址即拒绝。
- 把通过校验的公开 IP 固定到实际 TCP 连接，同时用原始主机名校验证书和 SNI，消除“检查一个地址、连接另一个地址”的 DNS 重绑定窗口。
- 每次重定向重新解析、校验并固定 IP，最多三跳。
- 禁止 URL 中携带用户名、密码和非标准认证信息。
- 不发送用户 cookie 或认证头。
- 单次响应正文上限 1 MB，只解析所需的文本和头信息。
- 总超时 8 秒，连接与读取分别设限。
- 只读取公开 robots、sitemap 和目标 HTML，不做代理下载服务。

### 13.4 模型输入与日志

- 站点不持久化用户提交正文。
- 应用层不主动持久化原始 IP；Cloudflare 等基础设施仍可能按其服务条款处理连接信息，隐私页必须如实披露。
- Worker 生产日志不记录请求正文、完整 URL 查询参数或模型输出。
- 只记录 request_id、路由、耗时、状态、token 用量、假名化配额键和错误分类。
- 页面在提交前明确提示不要输入商业秘密、敏感个人信息、未脱敏客户数据。
- 供应商可能保留或使用输入的政策必须链接披露；未经企业协议不承诺零留存或不训练。

### 13.5 成本与故障闸门

- 每条工具、每个供应商设置日成本和月成本上限。
- 达到阈值后优先关闭 AI 工具，静态站、本地检查器和爬虫事实说明继续可用。
- 只有在适配器能确认供应商未接收请求，或供应商支持原生幂等时，429、可恢复 5xx 和网络错误才使用有上限的指数退避与随机抖动。
- 请求发出后发生无法确认的超时必须进入 UNKNOWN，不自动重试，也不向用户承诺“绝不会产生供应商费用”。
- Durable Object 在调用前预留最大估算成本，成功后按 usage 结算；UNKNOWN 保守锁定预算与免费额度，只有 usage 或账单证明未收费时才释放，确认收费则按实际值结算，24 小时仍无法确认则按最大估算成本结算并把额度视为已使用。

## 14. 错误处理与用户反馈

对外错误使用稳定代码：

| 错误码 | 用户提示 | 是否消耗额度 |
|---|---|---|
| INVALID_INPUT | 输入格式或长度不符合要求 | 否 |
| TURNSTILE_FAILED | 人机验证失败，请重试 | 否 |
| QUOTA_EXCEEDED | 免费额度已用完，显示恢复时间 | 否 |
| FETCH_BLOCKED | 目标地址不允许抓取或无法安全访问 | 否 |
| ROUTE_NOT_AVAILABLE | 当前来源地区、合同或隐私确认不允许所选模型路线 | 否 |
| SEARCH_UNAVAILABLE | 当前搜索来源服务不可用 | 否 |
| IDEMPOTENCY_CONFLICT | request_id 已用于不同输入，请创建新请求 | 否 |
| RESULT_EXPIRED | 原请求结果已过期且不会重新调用；可创建新请求 | 本次不新增；原请求按终态 |
| PROVIDER_BUSY | 模型繁忙，请稍后再试 | 失败请求不计 |
| REQUEST_UNKNOWN | 供应商是否完成暂时无法确认，不会自动重试；可凭 request_id 查询 | 待对账，可能计入 |
| BUDGET_PAUSED | 工具暂时维护，本地工具仍可用 | 否 |
| INTERNAL_ERROR | 请求未完成，提供 request_id | 否 |

供应商内部错误和堆栈不返回浏览器。部分成功必须明确标记缺失项，不能把无来源答案显示为完整成功。

## 15. 测试与验收

### 15.1 静态站与 GEO

- Jekyll 严格构建成功。
- 构建日志没有 destination collision，尤其是 /course/。
- 链接检查无阻断性内部 404。
- 链接检查针对构建后的 HTML，并验证省略扩展名链接确实可达。
- canonical、OG、hreflang 与 Schema 快照测试。
- sitemap 逐 URL 校验状态、canonical、noindex 与重定向。
- robots 源站与线上边缘响应一致。
- OpenAI 搜索抓取与训练抓取策略按设计分离。
- 结构化数据通过 Schema.org 与主流搜索测试工具。
- 可见 FAQ 与 FAQPage 一致。
- docs/superpowers/ 不出现在 _site 与生产 sitemap。

### 15.2 工具前端

- Chrome、Safari、Edge 的桌面与移动视口。
- 键盘操作、焦点、错误提示与屏幕阅读器标签。
- JavaScript 关闭时仍能读取用途、示例、限制和隐私说明。
- 本地内容检查器通过固定规则单元测试，并验证没有网络请求。

### 15.3 Worker 与安全

- 请求 schema、长度、CORS、Turnstile、配额和幂等测试。
- 并发夹具证明相同 request_id 只产生一次供应商调用，配额上限在并发请求下不会超发。
- UNKNOWN 状态不自动重试，状态查询只对原始浏览器签名主体可见。
- 崩溃恢复测试覆盖 RECEIVED、RESERVED 与 PROVIDER_SENT 的租约过期：前两者安全失败并释放，PROVIDER_SENT 保守转为 UNKNOWN、映射为 REQUEST_UNKNOWN 且不重复调用。
- SSRF 测试覆盖 localhost、IPv4/IPv6 私网、混合公私 DNS、受控 DNS 重绑定、重定向绕过、元数据地址和超大响应。
- Safe Fetch Service 测试证明实际连接 IP 与已验证 IP 一致；应用层阻止元数据目标，VPC egress 防火墙阻止其他私网目标，默认 run.app URL 不可访问且只有受保护的负载均衡入口可达。
- 429、5xx、超时、余额不足和错误 Key 的模拟测试。
- 日志扫描确认没有正文、Key 和敏感信息。
- 成本闸门与一键停用测试。

### 15.4 供应商契约

- 国内和国际适配器使用同一组规范化夹具。
- 每个供应商单独测试，不因 OpenAI SDK 兼容而假设字段完全一致。
- Kimi 中国区与国际区的 Key 互不混用。
- 火山方舟中国站请求不进入国际路线。
- 路线选择不能绕过服务端国家资格、合同状态、跨境开关与 consent_version 校验。
- DeepSeek 模型名称通过运行时配置验证，不使用下线旧别名。
- 搜索来源必须包含可打开 URL；缺少来源时失败而不是伪造引用。

### 15.5 监测证据

- D1 迁移、访问控制、truth_set_version 与 prompt_set_version 测试。
- R2 bucket 无公共访问，90 天 lifecycle 已实际配置。
- 固定夹具验证出现率、可点击引用率、事实覆盖率、断言准确率和可用率的分母。
- 同一消费端结果的双人争议复核会保留原值、修改值与原因。
- 截图脱敏和原始证据删除流程演练通过。

### 15.6 发布验收

发布必须同时满足：

- 首页主路径清晰，所有主按钮可达。
- P0 实体冲突和无来源营销数字已处理。
- 工具配额与产品文案一致。
- 旧 URL 重定向没有链和循环。
- API Secret 不存在仓库或前端包。
- 构建产物与公开仓库不包含收费工具的代码、私有提示词、私有规则、授权文件、私有 API 文档或客户数据，/tools/geo-skills/ 只出现批准过的公开说明和咨询入口。
- 生产错误可通过 request_id 定位。
- 回滚演练完成。

## 16. 分阶段发布与回滚

### 16.1 工作流拆分

后续实施计划拆为五个工作流：

1. GEO 基础与实体治理：数据源、canonical、Schema、robots、sitemap、证据检查、重定向清单。
2. 首页与核心信息架构：视觉系统、首页、tools/research/cases/guides/services/about 页面。
3. 工具平台与安全抓取：本地内容检查器、工具页、Worker 基础、Turnstile、Durable Objects、CORS、Safe Fetch Service、爬虫检查接口与转化链路。
4. 双栈模型：供应商网关、国内外适配器、GEO 改写、问题扩展、预算与故障处理。
5. GEO 监测运营：D1/R2 证据层、固定问题集、人工消费端观察、评分、Day 0/7/14/30 报告。

工作流按 1 → 2 → 3 → 4 发布产品能力，工作流 5 在工作流 1 完成后建立 Day 0 准备，并随 3、4 的上线持续运行。代码可以在隔离分支并行准备，但生产依赖必须遵守顺序。

### 16.2 上线顺序

1. 创建发布分支、生产快照和可回滚 tag。
2. 先修复 Cloudflare robots、实体事实和手工 sitemap。
3. 上线新首页与核心静态页面。
4. 上线本地内容健康检查器。
5. 在非公开测试环境完成 Worker、Durable Objects、Safe Fetch Service 与安全测试。
6. 建立 D1/R2 监测证据层并冻结 Day 0 问题集和真值表。
7. 小流量开放爬虫检查。
8. 完成国内、国际供应商契约测试后，小流量开放 AI 改写和问题扩展。
9. 建立 Day 0 基线后再发布公开案例与数据报告。

### 16.3 回滚

- GitHub Pages 保留上一版构建产物与 tag。
- Worker 使用版本化部署，可单独回退。
- 每个 AI 工具有独立 kill switch。
- 静态站与本地工具不依赖模型服务，可在 API 停用时继续运行。
- 301 重定向最后启用；目标异常时可先撤销边缘重定向，不删除旧内容。
- 不使用破坏性 Git 操作覆盖用户历史。

## 17. 运营监测

### 17.1 搜索与实体

- 索引覆盖与排除原因。
- 搜索型 AI 爬虫访问状态。
- 品牌全称与消歧查询表现。
- 目标问题的出现率、可点击引用率与事实准确率。
- 被引用页面及其更新时间。

### 17.2 转化

- 首页到工具页点击率。
- 工具开始率、成功率和完成后阅读指南比例。
- 审计样例到咨询入口点击率。
- 不记录用户正文。

### 17.3 运行质量

- 每路由成功率、p50/p95 延迟。
- 供应商错误率、429、超时和降级次数。
- 单次成功请求成本与日/月累计成本。
- Turnstile 失败率、配额命中率和 SSRF 拦截数。

## 18. 实施前提

进入生产部署前需要具备：

- fable-cc/fable-castle 仓库写入与发布权限。
- fable-castle.com 的 Cloudflare DNS、Managed robots、Worker、Turnstile、Durable Objects、D1、R2、Access 和限流配置权限。
- Google Cloud Run、受控 VPC egress 与防火墙配置权限，用于独立 Safe Fetch Service。
- 启用供应商的独立服务端 API Key。
- Kimi 中国区与国际区分别开户。
- 豆包中国站按保守合规规则只用于中国大陆路线；国际豆包能力在 BytePlus、当前合同或书面确认支持后再启用。
- 隐私说明、服务条款和免费额度文案在生产前完成审阅。

缺少某个模型 Key 不阻塞静态站、实体治理和本地工具发布；对应 AI 路由保持关闭，不使用测试 Key 或个人 Key 冒充生产能力。

## 19. 官方依据

以下文档是本设计的能力与合规依据，实施时应再次核对最新版本：

### Cloudflare

- Custom Domains：https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- Rate Limiting：https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
- Turnstile 服务端验证：https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- Worker Bindings：https://developers.cloudflare.com/workers/runtime-apis/bindings/
- Durable Objects：https://developers.cloudflare.com/durable-objects/
- Workers KV 写入限制：https://developers.cloudflare.com/kv/api/write-key-value-pairs/
- R2 生命周期：https://developers.cloudflare.com/r2/buckets/object-lifecycles/

### Google Cloud

- Cloud Run Direct VPC egress：https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc
- Cloud Run 服务间认证：https://docs.cloud.google.com/run/docs/authenticating/service-to-service
- VPC firewall：https://docs.cloud.google.com/firewall/docs/firewalls
- Cloud Run ingress 与关闭默认 URL：https://docs.cloud.google.com/run/docs/securing/ingress#disable-default-url

### OpenAI

- Publishers and Developers FAQ：https://help.openai.com/en/articles/12627856-publishers-and-developers-faq

### DeepSeek

- API 快速开始：https://api-docs.deepseek.com/
- Chat API：https://api-docs.deepseek.com/api/create-chat-completion/
- Anthropic 兼容边界：https://api-docs.deepseek.com/guides/anthropic_api/
- 限流与隔离：https://api-docs.deepseek.com/quick_start/rate_limit/
- 隐私政策：https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html
- 开放平台条款：https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html

### 豆包与火山方舟

- Responses API 工具调用：https://www.volcengine.com/docs/82379/1958524?lang=zh
- 方舟产品与 API：https://www.volcengine.com/docs/82379/?lang=zh
- 私网与区域示例：https://www.volcengine.com/docs/82379/1339360?lang=zh
- 豆包模型服务协议历史正文，仅用于提示核对当前合同：https://www.volcengine.com/docs/82379/1142195?TimeBefore=1715691620&lang=zh
- BytePlus 区域端点线索：https://api.volcengine.com/api-docs/view?action=GetEndpoint&serviceCode=ark&version=2024-01-01

### Kimi 与 Moonshot

- 中国区 API：https://platform.kimi.com/docs/api/overview
- 国际区 API：https://platform.kimi.ai/docs/api/overview
- 中国区故障与区域说明：https://platform.kimi.com/docs/guide/troubleshooting
- Web Search 状态：https://platform.kimi.com/docs/guide/use-web-search
- 中国区隐私：https://platform.kimi.com/docs/agreement/userprivacy
- 国际区隐私：https://platform.kimi.ai/docs/agreement/userprivacy
- 国际区服务条款：https://platform.kimi.ai/docs/agreement/modeluse

## 20. 设计完成定义

本规格被视为完成的条件：

- 没有未决定的产品范围。
- 国内与国际路由、合同和隐私边界明确。
- API 与消费端监测边界明确。
- 页面、工具、数据流、错误、安全、测试、发布和回滚均有可执行定义。
- 后续实施计划只能细化任务与顺序，不能擅自扩大本设计范围。
