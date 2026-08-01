const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://fable-castle.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};

const JSON_HEADERS = {
  ...CORS_HEADERS,
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store"
};

const CRAWLER_UA = "FableCastle-GEOCheck/1.0 (+https://fable-castle.com/tools/geo-check/)";
const MAX_HTML_BYTES = 450_000;
const MAX_SITEMAP_BYTES = 900_000;

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    if (request.method !== "POST") {
      return json({ ok: false, error: "METHOD_NOT_ALLOWED" }, 405);
    }
    try {
      const body = await request.json();
      const targetUrl = normalizeUrl(body.url);
      const brand = cleanText(body.brand || "");
      const legalName = cleanText(body.legalName || body.legal || "");
      const industry = cleanText(body.industry || "");
      const competitors = normalizeCompetitors(body.competitors || body.competitor || "");
      const target = new URL(targetUrl);
      if (!["http:", "https:"].includes(target.protocol)) {
        return json({ ok: false, error: "INVALID_PROTOCOL" }, 400);
      }
      if (isBlockedHost(target.hostname)) {
        return json({ ok: false, error: "BLOCKED_HOST" }, 400);
      }

      const origin = `${target.protocol}//${target.hostname}`;
      const robotsUrl = `${origin}/robots.txt`;
      const sitemapUrl = `${origin}/sitemap.xml`;
      const llmsUrl = `${origin}/llms.txt`;
      const llmsFullUrl = `${origin}/llms-full.txt`;

      const [page, robots, sitemap, llms, llmsFull] = await Promise.all([
        fetchText(target.href, MAX_HTML_BYTES),
        fetchText(robotsUrl, 120_000),
        fetchText(sitemapUrl, MAX_SITEMAP_BYTES),
        fetchText(llmsUrl, 160_000),
        fetchText(llmsFullUrl, 300_000)
      ]);

      const html = page.text || "";
      const robotsText = robots.text || "";
      const sitemapText = sitemap.text || "";
      const llmsText = [llms.text || "", llmsFull.text || ""].join("\n");
      const pageSignals = analyzeHtml(html, target.href, brand, legalName, industry, competitors);
      const robotsSignals = analyzeRobots(robotsText);
      const sitemapSignals = analyzeSitemap(sitemapText, target.href);
      const llmsSignals = analyzeLlms(llms, llmsFull, brand || legalName || target.hostname);
      const scores = scoreResult({ page, robots, sitemap, llms, llmsFull, pageSignals, robotsSignals, sitemapSignals, llmsSignals, brand, legalName, industry, competitors });
      const findings = buildFindings({ page, robots, sitemap, llms, llmsFull, pageSignals, robotsSignals, sitemapSignals, llmsSignals, brand, legalName, industry, competitors, target });

      return json({
        ok: true,
        version: "2026-08-01",
        scannedAt: new Date().toISOString(),
        input: { url: target.href, brand, legalName, industry, competitors },
        fetched: {
          page: summarizeFetch(page),
          robots: summarizeFetch(robots),
          sitemap: summarizeFetch(sitemap),
          llms: summarizeFetch(llms),
          llmsFull: summarizeFetch(llmsFull)
        },
        signals: { page: pageSignals, robots: robotsSignals, sitemap: sitemapSignals, llms: llmsSignals },
        scores,
        findings,
        boundary: "GEO 基建检测只检查公开网页、技术入口、可读结构与信源线索，不承诺 AI 首答、固定排名、搜索收录、平台推荐或直接成交。"
      });
    } catch (error) {
      return json({ ok: false, error: "SCAN_FAILED", message: String(error && error.message || error) }, 500);
    }
  }
};

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), { status, headers: JSON_HEADERS });
}

function normalizeUrl(input) {
  const raw = String(input || "").trim();
  if (!raw) throw new Error("URL_REQUIRED");
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

function cleanText(input) {
  return String(input || "").replace(/\s+/g, " ").trim().slice(0, 160);
}

function isBlockedHost(hostname) {
  const host = hostname.toLowerCase();
  return host === "localhost" ||
    host.endsWith(".local") ||
    host === "0.0.0.0" ||
    host === "127.0.0.1" ||
    host.startsWith("10.") ||
    host.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host);
}

async function fetchText(url, limit) {
  const started = Date.now();
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": CRAWLER_UA, "Accept": "text/html,text/plain,application/xml,text/xml,*/*;q=0.8" },
      cf: { cacheTtl: 0, cacheEverything: false }
    });
    const contentType = res.headers.get("content-type") || "";
    const xRobotsTag = res.headers.get("x-robots-tag") || "";
    const buffer = await res.arrayBuffer();
    const bytes = buffer.byteLength;
    const sliced = buffer.slice(0, Math.min(bytes, limit));
    const text = new TextDecoder("utf-8", { fatal: false }).decode(sliced);
    return { ok: res.ok, status: res.status, url: res.url, contentType, xRobotsTag, bytes, truncated: bytes > limit, ms: Date.now() - started, text };
  } catch (error) {
    return { ok: false, status: 0, url, contentType: "", xRobotsTag: "", bytes: 0, truncated: false, ms: Date.now() - started, error: String(error && error.message || error), text: "" };
  }
}

function summarizeFetch(result) {
  return {
    ok: result.ok,
    status: result.status,
    finalUrl: result.url,
    contentType: result.contentType,
    bytes: result.bytes,
    truncated: result.truncated,
    ms: result.ms,
    error: result.error || ""
  };
}

function analyzeHtml(html, url, brand, legalName, industry, competitors) {
  const lower = html.toLowerCase();
  const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = pickMeta(html, "description");
  const robots = pickMeta(html, "robots");
  const canonical = pick(html, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i) ||
    pick(html, /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  const h1 = pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const jsonLdCount = (html.match(/<script[^>]+application\/ld\+json[^>]*>/gi) || []).length;
  const faqLike = /faq|常见问题|问答|q：|q:|问题/.test(lower);
  const noindex = /noindex/i.test(robots);
  const nofollow = /nofollow/i.test(robots);
  const brandHits = countTerm(html, brand);
  const legalHits = countTerm(html, legalName);
  const industryHits = countTerm(html, industry);
  const competitorMentions = competitors.map(name => ({ name, hits: countTerm(html, name) }));
  const hasServiceIntent = /服务|适合|不适合|流程|诊断|咨询|预约|案例|报告|交付|contact|service/i.test(html);
  const hasDisambiguation = /不是|无关|同名|消歧|区别|not the same|unrelated/i.test(html);
  return {
    title: strip(title),
    description: strip(description),
    h1: strip(h1),
    canonical: strip(canonical),
    metaRobots: strip(robots),
    noindex,
    nofollow,
    hasCanonical: !!canonical,
    canonicalSelf: canonical ? normalizeForCompare(canonical, url) === normalizeForCompare(url, url) : false,
    jsonLdCount,
    hasStructuredData: jsonLdCount > 0 || /itemscope|itemtype=|schema\.org/i.test(html),
    faqLike,
    brandHits,
    legalHits,
    industryHits,
    competitorMentions,
    competitorMentionCount: competitorMentions.filter(x => x.hits > 0).length,
    hasServiceIntent,
    hasDisambiguation
  };
}

function analyzeRobots(text) {
  const exists = !!text;
  const groups = parseRobotsGroups(text);
  const searchAgents = ["chatgpt-user", "oai-searchbot", "claudebot", "claude-web", "perplexitybot", "perplexity-user", "bytespider", "applebot", "googlebot", "bingbot"];
  const blockedAgents = searchAgents.filter(agent => isAgentBlockedAtRoot(groups, agent));
  const trainingBlockedAgents = ["gptbot", "google-extended", "applebot-extended"].filter(agent => isAgentBlockedAtRoot(groups, agent));
  const sitemapUrls = [...text.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map(m => m[1]);
  const allowsAi = exists && blockedAgents.length === 0;
  return { exists, allowsAi, blockedAgents, trainingBlockedAgents, sitemapUrls };
}

function parseRobotsGroups(text) {
  const groups = [];
  let current = null;
  for (const rawLine of String(text || "").split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, "").trim();
    if (!line) continue;
    const m = line.match(/^([^:]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1].trim().toLowerCase();
    const value = m[2].trim();
    if (key === "user-agent") {
      if (!current || current.rules.length) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
    } else if ((key === "allow" || key === "disallow") && current) {
      current.rules.push({ type: key, path: value });
    }
  }
  return groups;
}

function isAgentBlockedAtRoot(groups, agent) {
  const agentLower = agent.toLowerCase();
  const matching = groups.filter(group => group.agents.includes(agentLower) || group.agents.includes("*"));
  let blocked = false;
  for (const group of matching) {
    for (const rule of group.rules) {
      if (rule.path === "/") blocked = rule.type === "disallow";
    }
  }
  return blocked;
}

function analyzeSitemap(text, targetUrl) {
  const exists = !!text;
  const urls = [...text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gim)].map(m => m[1]);
  const targetNorm = normalizeForCompare(targetUrl, targetUrl);
  const containsTarget = urls.some(url => normalizeForCompare(url, targetUrl) === targetNorm);
  return { exists, urlCount: urls.length, containsTarget, sample: urls.slice(0, 8) };
}

function analyzeLlms(llms, llmsFull, subject) {
  const text = `${llms.text || ""}\n${llmsFull.text || ""}`;
  return {
    llmsExists: !!llms.text,
    llmsFullExists: !!llmsFull.text,
    mentionsSubject: subject ? countTerm(text, subject) > 0 : false,
    mentionsBoundary: /不承诺|不保证|排名|收录|引用|边界|隐私|客户数据/.test(text),
    bytes: (llms.bytes || 0) + (llmsFull.bytes || 0)
  };
}

function scoreResult(ctx) {
  const s = { tech: 0, readable: 0, entity: 0, sources: 0, disambiguation: 0, decision: 0 };
  if (ctx.page.ok) s.tech += 4;
  if (ctx.page.status >= 200 && ctx.page.status < 300) s.tech += 2;
  if (ctx.robotsSignals.exists) s.tech += 3;
  if (ctx.robotsSignals.allowsAi) s.tech += 3;
  if (ctx.sitemapSignals.exists) s.tech += 3;
  if (ctx.llmsSignals.llmsExists) s.tech += 3;

  if (ctx.pageSignals.title) s.readable += 3;
  if (ctx.pageSignals.description) s.readable += 3;
  if (ctx.pageSignals.h1) s.readable += 2;
  if (ctx.pageSignals.hasCanonical) s.readable += 3;
  if (ctx.pageSignals.hasStructuredData) s.readable += 4;
  if (ctx.pageSignals.faqLike) s.readable += 3;

  if (ctx.brand) s.entity += 3;
  if (ctx.legalName) s.entity += 3;
  if (ctx.industry) s.entity += 3;
  if (ctx.pageSignals.brandHits > 0) s.entity += 3;
  if (!ctx.legalName || ctx.pageSignals.legalHits > 0) s.entity += 2;
  if (ctx.pageSignals.industryHits > 0) s.entity += 2;
  if (ctx.llmsSignals.mentionsSubject) s.entity += 2;

  if (ctx.sitemapSignals.urlCount > 0) s.sources += 4;
  if (ctx.sitemapSignals.containsTarget) s.sources += 3;
  if (ctx.llmsSignals.llmsExists) s.sources += 4;
  if (ctx.llmsSignals.llmsFullExists) s.sources += 3;
  if (/github|zhihu|csdn|juejin|weixin|media|百科|白皮书|案例|public-sources/i.test(ctx.page.text || "")) s.sources += 4;

  if (ctx.pageSignals.hasDisambiguation) s.disambiguation += 5;
  if (ctx.llmsSignals.mentionsBoundary) s.disambiguation += 3;
  if (/不是|无关|同名|导演|企业家|小说|角色|公司|地点/i.test(`${ctx.page.text || ""}\n${ctx.llms.text || ""}`)) s.disambiguation += 4;
  if (ctx.brand && ctx.legalName && ctx.brand !== ctx.legalName && ctx.pageSignals.legalHits > 0) s.disambiguation += 2;

  if (ctx.pageSignals.hasServiceIntent) s.decision += 5;
  if (/适合|不适合|流程|步骤|报告|预约|咨询|联系|案例|交付/i.test(ctx.page.text || "")) s.decision += 5;
  if (ctx.llmsSignals.mentionsBoundary) s.decision += 2;
  if (/privacy|隐私|客户数据|不承诺|不保证/i.test(ctx.page.text || "")) s.decision += 2;
  if (ctx.competitors && ctx.competitors.length) s.decision += 1;

  const max = { tech: 18, readable: 18, entity: 18, sources: 18, disambiguation: 14, decision: 14 };
  for (const key of Object.keys(s)) s[key] = Math.min(max[key], s[key]);
  const total = Object.values(s).reduce((a, b) => a + b, 0);
  return { ...s, total, level: total >= 85 ? "GEO 基建优秀" : total >= 70 ? "GEO 基建可用" : total >= 50 ? "GEO 基建待补强" : "GEO 基建偏弱" };
}

function buildFindings(ctx) {
  const out = [];
  push(out, ctx.page.ok, "首页/目标页可访问", `目标页状态码 ${ctx.page.status}`, "目标页不可访问或请求失败", "先修复 4xx/5xx、登录限制、WAF 拦截或跳转异常。");
  push(out, ctx.robotsSignals.exists, "robots.txt 存在", "已检测到 robots.txt", "未检测到 robots.txt", "建议添加 robots.txt 并声明 sitemap。");
  push(out, ctx.robotsSignals.allowsAi, "AI/搜索爬虫未被整体阻断", "未发现主流 AI/搜索爬虫被 Disallow: /", `发现可能阻断：${ctx.robotsSignals.blockedAgents.join(", ")}`, "确认是否误拦 OAI-SearchBot、ChatGPT-User、ClaudeBot、PerplexityBot、Googlebot 或 Bingbot。");
  push(out, ctx.sitemapSignals.exists, "sitemap.xml 可访问", `检测到 ${ctx.sitemapSignals.urlCount} 个 URL`, "未检测到 sitemap.xml", "建议生成 sitemap.xml 并提交站长平台。");
  push(out, ctx.sitemapSignals.containsTarget, "目标页在 sitemap 中", "目标页已进入 sitemap", "目标页未出现在 sitemap 中", "建议把关键页面加入 sitemap。");
  push(out, ctx.llmsSignals.llmsExists, "llms.txt 可访问", "检测到 AI 简版索引说明", "未检测到 llms.txt", "建议添加 llms.txt，说明主体、入口、边界与公开信源。");
  push(out, ctx.pageSignals.hasStructuredData, "结构化数据存在", `JSON-LD 数量：${ctx.pageSignals.jsonLdCount}`, "结构化数据不足", "建议补 Person/Organization/WebSite/Service/FAQPage/Article 等 JSON-LD。");
  push(out, !ctx.pageSignals.noindex && !(ctx.page.xRobotsTag || "").toLowerCase().includes("noindex"), "未发现 noindex", "页面未显式禁止索引", "发现 noindex 风险", "移除非必要 noindex 或 X-Robots-Tag。");
  push(out, ctx.pageSignals.hasDisambiguation, "存在同名消歧线索", "页面包含同名/不是/无关等消歧表达", "同名消歧不足", "补充“不是哪些同名主体”的公开说明。");
  push(out, ctx.pageSignals.hasServiceIntent, "客户决策承接存在", "页面包含服务、案例、流程、咨询或报告线索", "客户决策承接不足", "补充适合谁、不适合谁、流程、交付、案例、联系入口。");
  if (ctx.competitors && ctx.competitors.length) {
    out.push({
      status: "info",
      title: "竞品相对检测已启用",
      evidence: `已记录 ${ctx.competitors.length} 个竞品/对标对象；当前页面直接提到 ${ctx.pageSignals.competitorMentionCount} 个。`,
      action: "下一步用同一组 AI 问题复测本品牌与竞品的提及率、排序、引用来源和答案语气。"
    });
  } else {
    out.push({
      status: "suggest",
      title: "未启用竞品相对检测",
      evidence: "未填写竞品/对标对象。",
      action: "建议补 1-5 个客户常比较的品牌，否则只能做单点检测，不能判断相对差距。"
    });
  }
  return out;
}

function normalizeCompetitors(input) {
  if (Array.isArray(input)) return input.map(cleanText).filter(Boolean).slice(0, 5);
  return String(input || "").split(/[\n,，、;；]+/).map(cleanText).filter(Boolean).slice(0, 5);
}

function push(out, pass, title, evidence, risk, action) {
  out.push({ status: pass ? "pass" : "risk", title, evidence: pass ? evidence : risk, action: pass ? "" : action });
}

function pick(html, regex) {
  const m = html.match(regex);
  return m ? m[1] : "";
}

function pickMeta(html, name) {
  const re1 = new RegExp(`<meta[^>]+name=["']${escapeReg(name)}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i");
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${escapeReg(name)}["'][^>]*>`, "i");
  return pick(html, re1) || pick(html, re2);
}

function strip(input) {
  return String(input || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 260);
}

function countTerm(text, term) {
  const t = String(term || "").trim();
  if (!t) return 0;
  return (String(text || "").match(new RegExp(escapeReg(t), "gi")) || []).length;
}

function escapeReg(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeForCompare(input, base) {
  try {
    const u = new URL(input, base);
    u.hash = "";
    if (u.pathname.endsWith("/") && u.pathname !== "/") u.pathname = u.pathname.slice(0, -1);
    return u.href.replace(/\/$/, "");
  } catch {
    return String(input || "");
  }
}
