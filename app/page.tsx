import GlyphSwell from "@/components/ui/glyph-swell";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const img = (name: string) => `${base}/images/${name}`;

/* Hero 背景的 glyph 配色：浅蓝灰底、蓝墨、深蓝波峰 */
const HERO_COLORS: [string, string, string] = ["#eef1f6", "#2563eb", "#1e3a8a"];

const PROFILE_BASICS: Array<[string, string]> = [
  ["全名", "天童アリス（天童爱丽丝）"],
  ["英文名", "Tendou Aris"],
  ["代号", "AL-1S"],
  ["学校", "千年科学学园"],
  ["社团", "游戏开发部"],
  ["年龄", "不明"],
  ["生日", "3月25日"],
  ["身高", "152cm"],
  ["爱好", "游戏（尤其是RPG）"],
];

const PROFILE_COMBAT: Array<[string, string]> = [
  ["职业", "Striker（前卫）"],
  ["定位", "Attacker/Back（攻击/后排）"],
  ["武器", "AR（突击步枪）"],
  ["攻击类型", "Mystic（神秘）"],
  ["防御类型", "Special（特殊装甲）"],
  ["稀有度", "⭐⭐⭐（三星）"],
  ["战斗风格", "爆发输出"],
];

const SKILLS: Array<{ type: string; name: string; desc: string }> = [
  {
    type: "EX Skill",
    name: "Full Burst Time",
    desc: "爱丽丝的必杀技，能够对敌人造成大量神秘属性伤害。在游戏术语的引导下，她将全部力量集中于一点，如同RPG游戏中的终极技能。",
  },
  {
    type: "Normal Skill",
    name: "Continuous Attack",
    desc: "持续性的攻击技能，能够对单一目标造成多段伤害。这个技能体现了她作为突击步枪使用者的战斗风格。",
  },
  {
    type: "Passive Skill",
    name: "Experience Points",
    desc: "被动技能，随着战斗的进行逐渐提升自身能力。就像游戏中的经验值系统，她在战斗中不断成长变强。",
  },
  {
    type: "Sub Skill",
    name: "Critical Hit",
    desc: "提升暴击率和暴击伤害的辅助技能。这个技能让她的攻击更具威胁性，能够在关键时刻造成决定性打击。",
  },
];

const RELATIONSHIPS: Array<{ name: string; role: string; desc: string }> = [
  {
    name: "桃井、绿、柚子",
    role: "游戏开发部伙伴",
    desc: "她们三人发现了休眠中的爱丽丝，为她取名，并将她带入游戏开发部成为第四位成员。当爱丽丝体内的AI试图接管时，她们进入了她的精神空间，告诉她可以自己选择职业，而她选择了成为勇者。",
  },
  {
    name: "Key（凯）",
    role: "体内的另一个AI",
    desc: "主线故事中称为Key的AI，是爱丽丝体内的另一个意识。在第二卷第二章中，当Key试图接管爱丽丝的身体时，爱丽丝拒绝了她，宣称自己是勇者而非无名神的公主。后来在EX卷中，应爱丽丝的请求，Key获得了自己的身体。",
  },
  {
    name: "Rio（里绪）",
    role: "研讨会会长",
    desc: "研讨会的会长，她识别出爱丽丝是意图毁灭世界的武器，并试图摧毁她的光环。后来，她应爱丽丝的请求帮助带回了Key。",
  },
  {
    name: "老师（Sensei）",
    role: "值得信赖的同伴",
    desc: "当爱丽丝在遗迹中被发现时，老师正与游戏开发部在一起。爱丽丝将老师视为队伍成员，并希望老师能继续和她一起冒险。她将与老师一起拯救世界的功劳归于老师。",
  },
];

const GALLERY: Array<{ src: string; alt: string }> = [
  { src: "aris-1.png", alt: "爱丽丝 - 立绘" },
  { src: "aris-2.jpg", alt: "爱丽丝 - 纪念大厅" },
  { src: "aris-3.png", alt: "爱丽丝 - 肖像" },
  { src: "aris-4.png", alt: "爱丽丝 - 大厅插图" },
];

function InfoList({ items }: { items: Array<[string, string]> }) {
  return (
    <ul>
      {items.map(([k, v]) => (
        <li
          key={k}
          className="border-b border-black/5 py-3 text-gray-600 last:border-none"
        >
          <strong className="mr-4 font-semibold text-black">{k}</strong>
          {v}
        </li>
      ))}
    </ul>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 text-4xl font-black tracking-tight sm:text-5xl">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <main>
      {/* Hero：GlyphSwell 字符波浪背景 */}
      <section className="h-screen">
        <GlyphSwell colors={HERO_COLORS} className="h-full w-full">
          <div className="mx-auto grid h-full max-w-[1400px] grid-cols-1 items-center gap-12 px-8 lg:grid-cols-2 lg:gap-24">
            <div>
              <h1 className="mb-6 text-6xl font-black leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
                天童
                <br />
                アリス
              </h1>
              <p className="mb-4 text-xl font-light text-gray-600 sm:text-2xl">
                Tendou Aris
              </p>
              <p className="text-sm font-semibold uppercase tracking-[2px] text-blue-600">
                Apprentice Hero · AL-1S
              </p>
            </div>
            <div className="relative hidden h-[700px] max-h-[80vh] overflow-hidden rounded-lg bg-gray-100 lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img("aris-main.png")}
                alt="天童アリス"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </GlyphSwell>
      </section>

      {/* 背景故事 */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle>背景故事</SectionTitle>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-8 text-lg leading-loose">
              <p>
                天童アリス，被发现于废墟深处的神秘少女。当游戏开发部的三位成员——桃井、绿和柚子探索废弃工厂下的遗迹时，她正处于休眠状态。被唤醒后，她成为了游戏开发部的第四位成员。
              </p>
              <p>
                关于她的一切都是未知的，包括她的年龄、来历和真实身份。然而，主线故事第二卷后来揭示，她实际上是
                AL-1S，一个由无名祭司建造的人形兵器，原本的目的是毁灭世界。
              </p>
              <p>
                爱丽丝通过玩复古游戏学会了说话，她的台词大多借用自这些游戏。她将日常生活描述为任务、升级和组队游玩。她称自己为&ldquo;见习勇者&rdquo;，与她的伙伴们一起前进的勇者。
              </p>
              <p>
                尽管她的身体里曾存在另一个AI——Key（凯），在故事的第二卷第二章中，当Key试图接管她的身体时，爱丽丝拒绝了Key，宣称自己是勇者而非无名神的公主。
              </p>
              <p>
                现在，她与游戏开发部的伙伴们一起，享受着游戏的乐趣，已经成为了一名重度游戏爱好者。虽然她的对话有些磕磕绊绊，但这正是因为她的大部分台词都来自于复古游戏。
              </p>
            </div>
            <div className="sticky top-24 hidden aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img("aris-1.png")}
                alt="爱丽丝"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 角色档案 */}
      <section className="bg-gray-100 py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle>角色档案</SectionTitle>
          <p className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600">
            千年科学学园游戏开发部的核心成员，拥有出色的游戏开发和编程能力。
            性格认真负责，对朋友十分忠诚，在游戏开发方面展现出超凡的天赋。
          </p>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-6 text-xl font-bold">基本信息</h3>
              <InfoList items={PROFILE_BASICS} />
            </div>
            <div>
              <h3 className="mb-6 text-xl font-bold">战斗能力</h3>
              <InfoList items={PROFILE_COMBAT} />
            </div>
            <div>
              <h3 className="mb-6 text-xl font-bold">性格特征</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  爱丽丝的说话方式独特而有趣，她的台词大多来自于复古游戏，因此对话常常显得有些磕磕绊绊和不自然。她将现实生活视为一场冒险游戏，用游戏术语来描述日常事件。
                </p>
                <p>
                  她自称为&ldquo;见习勇者&rdquo;，认为自己正在与伙伴们一起进行着伟大的冒险。尽管她的真实身份是作为武器而被创造的，但她选择了成为勇者，而非毁灭者。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 技能系统 */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle>技能系统</SectionTitle>
          <p className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600">
            作为一名前卫攻击手，爱丽丝拥有强大的输出能力和独特的技能组合。
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {SKILLS.map((s) => (
              <div
                key={s.name}
                className="rounded-lg bg-gray-100 p-12 transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="mb-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
                  {s.type}
                </div>
                <h4 className="mb-4 text-2xl font-bold">{s.name}</h4>
                <p className="leading-relaxed text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 人物关系 */}
      <section className="bg-gray-100 py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle>人物关系</SectionTitle>
          <p className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600">
            在基沃托斯的冒险中，爱丽丝与众多角色建立了深厚的羁绊。
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {RELATIONSHIPS.map((r) => (
              <div
                key={r.name}
                className="rounded-lg border-l-4 border-blue-600 bg-white p-8"
              >
                <h4 className="text-xl font-bold">{r.name}</h4>
                <div className="mb-4 mt-1 text-sm font-semibold text-blue-600">
                  {r.role}
                </div>
                <p className="leading-relaxed text-gray-600">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 角色画廊 */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle>角色画廊</SectionTitle>
          <p className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600">
            来自官方的精美角色插画与立绘作品集。
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {GALLERY.map((g) => (
              <div
                key={g.src}
                className="aspect-[4/5] overflow-hidden rounded-lg bg-gray-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img(g.src)}
                  alt={g.alt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 引用 */}
      <section className="bg-black py-24 text-center text-white">
        <div className="mx-auto max-w-[900px] px-8">
          <p className="text-3xl font-light leading-snug tracking-tight sm:text-5xl">
            &ldquo;我是见习勇者，与伙伴们一起前进的勇者。&rdquo;
          </p>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[2px] text-white/60">
            天童アリス · AL-1S
          </p>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-100 py-16 text-center">
        <p className="text-sm text-gray-600">
          © 2026 Blue Archive Fan Site | 天童アリス (Tendou Aris)
        </p>
        <p className="mt-2 text-sm text-gray-600 opacity-60">
          本站为粉丝网站，所有角色版权归 NEXON Games 所有
        </p>
        <p className="mt-4 text-xs text-gray-600 opacity-50">
          资料来源: Blue Archive Wiki, Kivo Wiki, Moegirl
        </p>
      </footer>
    </main>
  );
}
