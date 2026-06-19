const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "景一";
pres.title = "IP定位·完整课程";
const G = "C9A96E", D = "1A1A2E", W = "FFFFFF", L = "E8D5B7", GR = "8B8B90", b = { color: D };

let s = pres.addSlide(); s.background = b;
s.addText("IP定位·完整课程", { x:0.8, y:1.2, w:8.4, h:1.2, fontSize:44, fontFace:"Arial Black", color:G, bold:true });
s.addText("四大模块 · 自定节奏 · 买完就学", { x:0.8, y:2.5, w:8.4, h:0.6, fontSize:22, color:L });
s.addText("定位→内容→流量→变现", { x:0.8, y:3.3, w:8.4, h:0.5, fontSize:16, color:GR });
s.addShape(pres.shapes.RECTANGLE, { x:0.8, y:4.0, w:2, h:0.004, fill:{color:G} });
s.addText("github.com/fable-cc/fable-castle", { x:6, y:4.5, w:4, h:0.4, fontSize:10, color:GR, align:"right" });

s = pres.addSlide(); s.background = b;
s.addText("你是不是这样？", { x:0.8, y:0.5, w:8.4, h:0.7, fontSize:32, color:W, bold:true });
s.addText([
  { text:"想做IP但不知道从哪里开始", options:{ bullet:true, breakLine:true, fontSize:18, color:GR } },
  { text:"写了一堆内容，没人看", options:{ bullet:true, breakLine:true, fontSize:18, color:GR } },
  { text:"定位换了三次，越换越迷茫", options:{ bullet:true, breakLine:true, fontSize:18, color:GR } },
  { text:"看别人赚钱，不知道怎么变现", options:{ bullet:true, breakLine:true, fontSize:18, color:GR } },
  { text:"觉得自己不够格，一直不敢开始", options:{ bullet:true, fontSize:18, color:GR } }
], { x:0.8, y:1.5, w:8, h:3 });
s.addText("不是你的问题——是你缺一个能跟着做的系统。", { x:0.8, y:4.5, w:8.4, h:0.5, fontSize:16, color:G });

s = pres.addSlide(); s.background = b;
s.addText("为什么是景一", { x:0.8, y:0.4, w:8.4, h:0.7, fontSize:32, color:W, bold:true });
s.addText([
  { text:"600篇文章+72支柱+47本公版书在GitHub开源可查", options:{ bold:true, breakLine:true, fontSize:18, color:G } },
  { text:"从第1篇到第600篇，每一步都看得到", options:{ breakLine:true, fontSize:15, color:GR } },
  { text:"", options:{ breakLine:true, fontSize:8 } },
  { text:"不是教你——是你看我做了，你跟着做", options:{ bold:true, breakLine:true, fontSize:18, color:G } },
  { text:"从0粉丝到付费客户——全链路公开", options:{ breakLine:true, fontSize:15, color:GR } },
  { text:"", options:{ breakLine:true, fontSize:8 } },
  { text:"GitHub是我的专业身份证。你不需要相信我——你自己验证。", options:{ fontSize:16, color:L } }
], { x:0.8, y:1.5, w:8.4, h:3.5 });

s = pres.addSlide(); s.background = b;
s.addText("四大模块 · 16节课", { x:0.8, y:0.4, w:8.4, h:0.7, fontSize:32, color:W, bold:true });
s.addText("自定节奏 · 永久回看 · 所有练习模板", { x:0.8, y:1.1, w:8.4, h:0.4, fontSize:16, color:GR });
s.addText([
  { text:"模块一：定位——找到你的认知差", options:{ bold:true, breakLine:true, fontSize:17, color:G } },
  { text:"认知差挖掘 · 三层定位 · 人群画像 · 供需比扫描", options:{ breakLine:true, fontSize:14, color:GR } },
  { text:"", options:{ breakLine:true, fontSize:6 } },
  { text:"模块二：内容——从0到每天一条", options:{ bold:true, breakLine:true, fontSize:17, color:G } },
  { text:"选题工厂 · 内容结构 · 去AI味写作 · 一篇变四种形态", options:{ breakLine:true, fontSize:14, color:GR } },
  { text:"", options:{ breakLine:true, fontSize:6 } },
  { text:"模块三：流量——让人找到你", options:{ bold:true, breakLine:true, fontSize:17, color:G } },
  { text:"知乎获客 · 小红书种草 · 抖音起号 · 私域引流", options:{ breakLine:true, fontSize:14, color:GR } },
  { text:"", options:{ breakLine:true, fontSize:6 } },
  { text:"模块四：变现——从39.9到4999", options:{ bold:true, breakLine:true, fontSize:17, color:G } },
  { text:"三级定价漏斗 · 成交文案 · 朋友圈模板 · 长期系统", options:{ fontSize:14, color:GR } },
], { x:0.8, y:1.8, w:8.4, h:3.5 });

const mods = [
  { t:"模块一：定位", items:["1. 认知差挖掘——你身上有金矿,你不知道","2. 三层定位法——功能层/身份层/使命层","3. 人群定位——不卖穷人,筛选就是成交","4. 差异化定位——供需比决定你的人生难度"]},
  { t:"模块二：内容", items:["1. 选题工厂——72支柱x5角度=360个选题","2. 内容结构——核心论点+三个支撑+金句","3. 去AI味写作——加故事+加数字+删废话","4. 内容复利——一篇变四种形态","5. 短视频文案公式——钩子x痛点x解法x金句x行动"]},
  { t:"模块三：流量", items:["1. 知乎获客——回答问题的正确姿势","2. 小红书种草——图文笔记的高转化模板","3. 抖音起号——前7条短视频脚本+拍摄计划","4. 私域引流——公域到微信的四个触达点"]},
  { t:"模块四：变现", items:["1. 三级定价漏斗——39.9→999→4999","2. 成交文案——不是推销,让他自己想买","3. 朋友圈成交模板——3条文案直接可用","4. 长期系统——90天执行日历"]}
];
mods.forEach(mod => {
  let s2 = pres.addSlide(); s2.background = b;
  s2.addText(mod.t, { x:0.8, y:0.4, w:6, h:0.6, fontSize:28, color:G, bold:true });
  s2.addText(mod.items.map((item,i) => ({ text:item, options:{ breakLine:true, fontSize:16, color:i===mod.items.length-1?G:L } })), { x:0.8, y:1.5, w:8.4, h:3.8 });
});

s = pres.addSlide(); s.background = b;
s.addText("定价", { x:0.8, y:0.3, w:8.4, h:0.6, fontSize:28, color:W, bold:true });
const mk = (x, lab, price, desc, hl) => {
  s.addShape(pres.shapes.RECTANGLE, { x, y:1.3, w:3, h:3.5, fill:{color: hl?"2A2A1A":"252540"} });
  if(hl) s.addShape(pres.shapes.RECTANGLE, { x, y:1.3, w:3, h:0.004, fill:{color:G} });
  s.addText(lab, { x:x+0.2, y:1.5, w:2.6, h:0.4, fontSize:16, color:hl?G:GR });
  s.addText(price, { x:x+0.2, y:1.9, w:2.6, h:0.6, fontSize:38, color:G, bold:true });
  s.addText(desc, { x:x+0.2, y:2.6, w:2.6, h:1.2, fontSize:12, color:GR });
};
mk(0.3, "引流课", "39.9", "3天IP定位诊断\n认知差+三层定位\n+四个致命错误", false);
mk(3.5, "完整课程", "999", "四大模块·16节课\n永久回看·练习模板\n自定节奏·买完就学", true);
mk(6.7, "一对一", "4,999", "90分钟深度诊断\n+定制方案\n+30天跟进", false);
s.addText("39.9只是一杯咖啡钱。999省掉你半年踩坑时间。不满意退款。", { x:0.5, y:5.0, w:9, h:0.4, fontSize:11, color:GR });

s = pres.addSlide(); s.background = b;
s.addText("学完你有什么", { x:0.8, y:0.4, w:8.4, h:0.6, fontSize:28, color:W, bold:true });
s.addText([
  { text:"一个精准的IP定位", options:{ bold:true, breakLine:true, fontSize:18, color:G } },
  { text:"三层定位+人群画像+供需比报告", options:{ breakLine:true, fontSize:14, color:GR } },
  { text:"", options:{ breakLine:true, fontSize:6 } },
  { text:"一套完整的内容系统", options:{ bold:true, breakLine:true, fontSize:18, color:G } },
  { text:"30个选题+7条短视频脚本+4平台分发模板", options:{ breakLine:true, fontSize:14, color:GR } },
  { text:"", options:{ breakLine:true, fontSize:6 } },
  { text:"一个正在运转的流量引擎", options:{ bold:true, breakLine:true, fontSize:18, color:G } },
  { text:"知乎/小红书/抖音三平台内容日历", options:{ breakLine:true, fontSize:14, color:GR } },
  { text:"", options:{ breakLine:true, fontSize:6 } },
  { text:"一条清晰的变现路径", options:{ bold:true, breakLine:true, fontSize:18, color:G } },
  { text:"三级定价漏斗+成交文案+90天执行计划", options:{ breakLine:true, fontSize:14, color:GR } },
  { text:"", options:{ breakLine:true, fontSize:6 } },
  { text:"所有练习模板——你只需要填空", options:{ fontSize:16, color:G } }
], { x:0.8, y:1.3, w:8.4, h:3.5 });

s = pres.addSlide(); s.background = b;
s.addText("买完就学。", { x:0.8, y:1.5, w:8.4, h:1, fontSize:44, color:G, bold:true });
s.addText("微信: S-9595A", { x:0.8, y:3.0, w:5, h:0.5, fontSize:24, color:G, bold:true });
s.addText("GitHub: fable-cc/fable-castle", { x:0.8, y:3.6, w:5, h:0.4, fontSize:14, color:GR });
s.addText("600篇文章 · 72支柱 · 全部开源可验证", { x:0.8, y:4.3, w:8.4, h:0.4, fontSize:12, color:GR });

pres.writeFile({ fileName: "IP定位完整课程.pptx" });
console.log("Done");
