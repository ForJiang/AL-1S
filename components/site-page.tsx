"use client";

/* AL-1S · 天童アリス粉丝站 · © 2026 ForJiang · github.com/ForJiang */
import { useEffect, useState } from "react";
import GlyphSwell from "@/components/ui/glyph-swell";
import ImgReveal from "@/components/img-reveal";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import { LangSwitcher } from "@/components/lang-switcher";
import {
  GALLERY_ITEMS,
  STORY_DIMS,
  STORY_IMG,
  dictionaries,
  img,
} from "@/lib/i18n";
import type { Lang, Row } from "@/lib/i18n";

/* Hero 背景的 glyph 配色：浅蓝灰底、蓝墨、深蓝波峰 */
const HERO_COLORS: [string, string, string] = ["#eef1f6", "#2563eb", "#1e3a8a"];

function InfoList({ items, lang }: { items: Row[]; lang: Lang }) {
  return (
    <ul>
      {items.map(([k, v]) => (
        <li
          key={k}
          className="border-b border-black/5 py-3 text-gray-600 last:border-none"
        >
          <TextBlockAnimation
            as="span"
            key={`${lang}-${k}`}
            blockColor="#2563eb"
            duration={0.5}
          >
            <strong className="mr-4 font-semibold text-black">{k}</strong>
            {v}
          </TextBlockAnimation>
        </li>
      ))}
    </ul>
  );
}

function SectionTitle({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) {
  return (
    <TextBlockAnimation
      as="h2"
      key={lang}
      lines={[String(children)]}
      blockColor="#2563eb"
      stagger={0.06}
      className="mb-8 text-4xl font-black tracking-tight sm:text-5xl"
    />
  );
}

/* 站点主体：四语言在同一个网页内原地切换（不跳转），默认简体中文 */
export function SitePage() {
  const [lang, setLang] = useState<Lang>("zh-CN");
  const d = dictionaries[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = d.meta.title;
  }, [lang, d]);

  return (
    <main>
      {/* 全页背景：GlyphSwell 固定铺满视口；半透明分区透出波浪。
          组件宿主自带 relative，外面包一层 fixed div 承担定位。 */}
      <div className="fixed inset-0 -z-10">
        <GlyphSwell colors={HERO_COLORS} className="h-full w-full" />
      </div>

      <LangSwitcher current={lang} onSwitch={setLang} />

      {/* Hero：纯文字（主图在下方角色画廊），标题加载即播块状揭示 */}
      <section className="flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-[1400px] px-8">
          <TextBlockAnimation
            as="h1"
            key={lang}
            lines={d.hero.titleLines}
            animateOnScroll={false}
            delay={0.2}
            duration={0.8}
            blockColor="#2563eb"
            className="mb-6 text-6xl font-black leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl"
          />
          <TextBlockAnimation
            as="p"
            key={`sub-${lang}`}
            animateOnScroll={false}
            delay={0.9}
            blockColor="#2563eb"
            className="mb-4 text-xl font-light text-gray-600 sm:text-2xl"
          >
            {d.hero.subtitle}
          </TextBlockAnimation>
          <TextBlockAnimation
            as="p"
            key={`tag-${lang}`}
            animateOnScroll={false}
            delay={1.1}
            blockColor="#2563eb"
            className="text-sm font-semibold uppercase tracking-[2px] text-blue-600"
          >
            {d.hero.tagline}
          </TextBlockAnimation>
        </div>
      </section>

      {/* 背景故事 */}
      <section className="bg-white/75 py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle lang={lang}>{d.story.title}</SectionTitle>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-8 text-lg leading-loose">
              {d.story.paragraphs.map((p, i) => (
                <TextBlockAnimation
                  as="p"
                  key={`${lang}-story-${i}`}
                  blockColor="#2563eb"
                  duration={0.7}
                >
                  {p}
                </TextBlockAnimation>
              ))}
            </div>
            <ImgReveal className="hidden lg:block">
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
            </ImgReveal>
          </div>
        </div>
      </section>

      {/* 角色档案 */}
      <section className="bg-white/55 py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle lang={lang}>{d.profile.title}</SectionTitle>
          <TextBlockAnimation
            as="p"
            key={`intro-${lang}`}
            blockColor="#2563eb"
            className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600"
          >
            {d.profile.intro}
          </TextBlockAnimation>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <TextBlockAnimation
                as="h3"
                key={`${lang}-bh`}
                lines={[d.profile.basicsHeading]}
                blockColor="#2563eb"
                className="mb-6 text-xl font-bold"
              />
              <InfoList items={d.profile.basics} lang={lang} />
            </div>
            <div>
              <TextBlockAnimation
                as="h3"
                key={`${lang}-ch`}
                lines={[d.profile.combatHeading]}
                blockColor="#2563eb"
                className="mb-6 text-xl font-bold"
              />
              <InfoList items={d.profile.combat} lang={lang} />
            </div>
            <div>
              <TextBlockAnimation
                as="h3"
                key={`${lang}-ph`}
                lines={[d.profile.personalityHeading]}
                blockColor="#2563eb"
                className="mb-6 text-xl font-bold"
              />
              <div className="space-y-4 text-gray-600">
                {d.profile.personality.map((p, i) => (
                  <TextBlockAnimation
                    as="p"
                    key={`${lang}-pers-${i}`}
                    blockColor="#2563eb"
                    duration={0.7}
                  >
                    {p}
                  </TextBlockAnimation>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 技能系统 */}
      <section className="bg-white/75 py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle lang={lang}>{d.skills.title}</SectionTitle>
          <TextBlockAnimation
            as="p"
            key={`skintro-${lang}`}
            blockColor="#2563eb"
            className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600"
          >
            {d.skills.intro}
          </TextBlockAnimation>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {d.skills.items.map((s) => (
              <div
                key={s.name}
                className="rounded-lg bg-gray-100 p-12 transition-transform duration-300 hover:-translate-y-2"
              >
                <TextBlockAnimation
                  as="div"
                  key={`${lang}-${s.name}`}
                  blockColor="#2563eb"
                  duration={0.7}
                >
                  <div className="mb-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
                    {s.type}
                  </div>
                  <h4 className="mb-4 text-2xl font-bold">{s.name}</h4>
                  <p className="leading-relaxed text-gray-600">{s.desc}</p>
                </TextBlockAnimation>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 人物关系 */}
      <section className="bg-white/55 py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle lang={lang}>{d.relationships.title}</SectionTitle>
          <TextBlockAnimation
            as="p"
            key={`reintro-${lang}`}
            blockColor="#2563eb"
            className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600"
          >
            {d.relationships.intro}
          </TextBlockAnimation>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {d.relationships.items.map((r) => (
              <div
                key={r.name}
                className="rounded-lg border-l-4 border-blue-600 bg-white p-8"
              >
                <TextBlockAnimation
                  as="div"
                  key={`${lang}-${r.name}`}
                  blockColor="#2563eb"
                  duration={0.7}
                >
                  <h4 className="text-xl font-bold">{r.name}</h4>
                  <div className="mb-4 mt-1 text-sm font-semibold text-blue-600">
                    {r.role}
                  </div>
                  <p className="leading-relaxed text-gray-600">{r.desc}</p>
                </TextBlockAnimation>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 角色画廊 */}
      <section className="bg-white/75 py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <SectionTitle lang={lang}>{d.gallery.title}</SectionTitle>
          <TextBlockAnimation
            as="p"
            key={`galintro-${lang}`}
            blockColor="#2563eb"
            className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600"
          >
            {d.gallery.intro}
          </TextBlockAnimation>
          <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2">
            {GALLERY_ITEMS.map((item, i) => (
              <ImgReveal key={item.src} className="overflow-hidden rounded-lg">
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
              </ImgReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 引用 */}
      <section className="bg-black/85 py-24 text-center text-white">
        <div className="mx-auto max-w-[900px] px-8">
          <TextBlockAnimation
            as="p"
            key={lang}
            lines={[d.quote.text]}
            blockColor="#eef1f6"
            duration={0.8}
            className="text-3xl font-light leading-snug tracking-tight sm:text-5xl"
          />
          <TextBlockAnimation
            as="p"
            key={`attr-${lang}`}
            blockColor="#eef1f6"
            className="mt-8 text-sm font-semibold uppercase tracking-[2px] text-white/60"
          >
            {d.quote.attribution}
          </TextBlockAnimation>
        </div>
      </section>

      {/* 页脚：保持静态，不加揭示动画 */}
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
