/* AL-1S · 天童アリス粉丝站 · © 2026 ForJiang · github.com/ForJiang */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GlyphSwell from "@/components/ui/glyph-swell";
import {
  GALLERY_ITEMS,
  HERO_DIMS,
  HERO_IMG,
  LANGS,
  STORY_DIMS,
  STORY_IMG,
  getDictionary,
  img,
  isLang,
  langPath,
} from "@/lib/i18n";
import type { Lang, Row } from "@/lib/i18n";

/* Hero 背景的 glyph 配色：浅蓝灰底、蓝墨、深蓝波峰 */
const HERO_COLORS: [string, string, string] = ["#eef1f6", "#2563eb", "#1e3a8a"];

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map(({ lang }) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { meta } = getDictionary(lang);
  return { title: meta.title, description: meta.description };
}

function InfoList({ items }: { items: Row[] }) {
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

function LangSwitcher({ current }: { current: Lang }) {
  return (
    <nav className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full bg-white/80 p-1 shadow-sm backdrop-blur sm:top-6 sm:right-6">
      {LANGS.map(({ lang, label }) =>
        lang === current ? (
          <span
            key={lang}
            aria-current="true"
            className="rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white sm:text-sm"
          >
            {label}
          </span>
        ) : (
          <a
            key={lang}
            href={langPath(lang)}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-black sm:text-sm"
          >
            {label}
          </a>
        ),
      )}
    </nav>
  );
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDictionary(lang);

  return (
    <main>
      {/* 全页背景：GlyphSwell 固定铺满视口，波浪延续整个页面；半透明分区透出波浪。
          组件宿主自带 relative，外面包一层 fixed div 承担定位。 */}
      <div className="fixed inset-0 -z-10">
        <GlyphSwell colors={HERO_COLORS} className="h-full w-full" />
      </div>

      {/* 根布局的 html lang 固定为 zh-CN，这里按当前语言就地修正（解析期执行，先于绘制） */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(lang)};`,
        }}
      />
      <LangSwitcher current={lang} />

      {/* Hero：内容直接坐在全页波浪背景上 */}
      <section className="h-screen">
        <div className="mx-auto grid h-full max-w-[1400px] grid-cols-1 items-center gap-12 px-8 lg:grid-cols-2 lg:gap-24">
          <div>
            <h1 className="mb-6 text-6xl font-black leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
              {d.hero.titleLines[0]}
              <br />
              {d.hero.titleLines[1]}
            </h1>
            <p className="mb-4 text-xl font-light text-gray-600 sm:text-2xl">
              {d.hero.subtitle}
            </p>
            <p className="text-sm font-semibold uppercase tracking-[2px] text-blue-600">
              {d.hero.tagline}
            </p>
          </div>
          <div className="relative hidden h-[700px] max-h-[80vh] rounded-lg bg-gray-100 lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(HERO_IMG)}
              width={HERO_DIMS.w}
              height={HERO_DIMS.h}
              alt={d.hero.imageAlt}
              fetchPriority="high"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* 背景故事 */}
      <section className="bg-white/75 py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle>{d.story.title}</SectionTitle>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-8 text-lg leading-loose">
              {d.story.paragraphs.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
            </div>
            <div className="hidden lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img(STORY_IMG)}
                width={STORY_DIMS.w}
                height={STORY_DIMS.h}
                alt={d.story.imageAlt}
                loading="lazy"
                decoding="async"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 角色档案 */}
      <section className="bg-white/55 py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle>{d.profile.title}</SectionTitle>
          <p className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600">
            {d.profile.intro}
          </p>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-6 text-xl font-bold">
                {d.profile.basicsHeading}
              </h3>
              <InfoList items={d.profile.basics} />
            </div>
            <div>
              <h3 className="mb-6 text-xl font-bold">
                {d.profile.combatHeading}
              </h3>
              <InfoList items={d.profile.combat} />
            </div>
            <div>
              <h3 className="mb-6 text-xl font-bold">
                {d.profile.personalityHeading}
              </h3>
              <div className="space-y-4 text-gray-600">
                {d.profile.personality.map((p) => (
                  <p key={p.slice(0, 12)}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 技能系统 */}
      <section className="bg-white/75 py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle>{d.skills.title}</SectionTitle>
          <p className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600">
            {d.skills.intro}
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {d.skills.items.map((s) => (
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
      <section className="bg-white/55 py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle>{d.relationships.title}</SectionTitle>
          <p className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600">
            {d.relationships.intro}
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {d.relationships.items.map((r) => (
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
      <section className="bg-white/75 py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle>{d.gallery.title}</SectionTitle>
          <p className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600">
            {d.gallery.intro}
          </p>
          <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={item.src} className="overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img(item.src)}
                  width={item.w}
                  height={item.h}
                  alt={d.gallery.alts[i]}
                  loading="lazy"
                  decoding="async"
                  className="w-full transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 引用 */}
      <section className="bg-black/85 py-24 text-center text-white">
        <div className="mx-auto max-w-[900px] px-8">
          <p className="text-3xl font-light leading-snug tracking-tight sm:text-5xl">
            {d.quote.text}
          </p>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[2px] text-white/60">
            {d.quote.attribution}
          </p>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-white/70 py-16 text-center">
        <p className="text-sm text-gray-600">{d.footer.copyright}</p>
        <p className="mt-2 text-sm text-gray-600 opacity-60">
          {d.footer.disclaimer}
        </p>
        <p className="mt-4 text-xs text-gray-600 opacity-50">
          {d.footer.sources}
        </p>
        <p className="mt-3 text-xs text-gray-600 opacity-50">
          {d.footer.credit}
        </p>
      </footer>
    </main>
  );
}
