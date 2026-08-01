# GEO Check API

这个 Worker 是 `https://fable-castle.com/tools/geo-check/` 的满血版后端。

它做真实网页抓取和证据化检测：

- 目标页 HTTP 状态、最终 URL、响应头
- robots.txt 是否存在、是否阻断主流 AI/搜索爬虫
- sitemap.xml 是否存在、目标页是否在 sitemap 中
- llms.txt / llms-full.txt 是否存在
- title、description、H1、canonical、meta robots
- JSON-LD / Schema 结构化数据
- 品牌名、营业执照主体、行业关键词是否出现在页面或 llms 文件中
- 竞品/对标对象是否进入相对检测样本
- 同名消歧、客户决策承接、服务边界信号

边界：

- 不承诺 AI 首答、固定排名、搜索收录、平台推荐或直接成交。
- 不保存客户输入、网页正文或检测结果。
- 不检测需要登录、内网、localhost、私有 IP 或 WAF 强拦页面。
- 竞品检测不是自动替客户判断胜负；它记录相对检测样本，后续仍需要同题复测 AI 答案。

## 部署

```bash
cd workers/geo-check-api
npx wrangler deploy
```

部署后把路由绑定到：

```text
https://api.fable-castle.com/geo-check
```

前端页面已经预留该 API 地址；如果 API 未部署，页面会自动降级为本地估算版。
