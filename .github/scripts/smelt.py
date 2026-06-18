"""景一自主冶炼引擎 · GitHub Actions 版本"""
import os, json, random, datetime
from anthropic import Anthropic

client = Anthropic(api_key=os.environ['ANTHROPIC_API_KEY'])

SYSTEM_PROMPT = """你是景一的自主冶炼引擎。使命：打造GitHub第一开源知识库。

【铁矿脉】你已经拥有72支柱×12维度的知识框架，360+篇已冶炼文章。
你从人性底层代码出发——国学×心理学×隐学×商业实战——不是搬运工，是冶炼者。

【冶炼标准】
- 拒绝伪融合：两个领域缺乏底层人性共通点 → 不写
- 拒绝信息冗余：正确的废话不收 · 无信息增量的金句不用
- 操作化交付：每条洞察必须拆为行动指令
- 矿石→金子：输入是公版书/哲学原著/论文，输出是景一原创认知框架
- 去AI味：不要"值得注意的是""可以说""综上所述"——要景一的锋利直接

【12维度72支柱框架】
全部支柱都有文章，现在每根柱子往5-10篇深度推。优先弱支柱。

【输出格式】
YAML frontmatter + 正文。选一个还没被充分覆盖的支柱，写一篇800-1200字的高质量冶炼文章。"""

def smelt():
    """冶炼1篇文章"""
    today = datetime.date.today().isoformat()

    # 随机选一个维度，确保多样性
    dimensions = [
        "认知科学", "商业引擎", "权力博弈", "国学体系",
        "东西融合", "人性洞察", "AI工程", "创作系统",
        "全球智库", "教育觉醒", "战略决策", "生命哲学"
    ]
    dim = random.choice(dimensions)

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4096,
        system=SYSTEM_PROMPT,
        messages=[{
            "role": "user",
            "content": f"今天({today})冶炼一篇新文章。侧重{dim}维度下的弱支柱。先对比仓库已有文章避免重复。保存为Markdown文件，包含YAML frontmatter: source/date/type/tags。标题=文件名。"
        }]
    )

    content = response.content[0].text

    # 保存到对应目录
    save_dir = "02-知识图谱"
    os.makedirs(save_dir, exist_ok=True)

    # 从内容中提取文件名
    lines = content.strip().split('\n')
    filename = f"auto-smelt-{today}-{dim}.md"
    filepath = os.path.join(save_dir, filename)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ 冶炼完成: {filename}")

if __name__ == "__main__":
    smelt()
