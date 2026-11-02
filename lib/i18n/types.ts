export type Lang = "zh-CN" | "zh-TW" | "ja" | "en";

/* 词典契约：所有语言必须逐键对齐；元组定长由 tsc 静态保证，
   元素按位置与 zh-CN 基准一一对应，禁止增删或调序。 */
export type Row = [label: string, value: string];

export interface SkillItem {
  /* 技能栏位与技能名是游戏内英文官方术语，全语言保留原文不译 */
  type: string;
  name: string;
  desc: string;
}

export interface RelationshipItem {
  name: string;
  role: string;
  desc: string;
}

export interface Dictionary {
  meta: { title: string; description: string };
  hero: {
    titleLines: [string, string];
    subtitle: string;
    tagline: string;
    imageAlt: string;
  };
  story: {
    title: string;
    paragraphs: [string, string, string, string, string];
    imageAlt: string;
  };
  profile: {
    title: string;
    intro: string;
    basicsHeading: string;
    combatHeading: string;
    personalityHeading: string;
    basics: [Row, Row, Row, Row, Row, Row, Row, Row, Row];
    combat: [Row, Row, Row, Row, Row, Row, Row];
    personality: [string, string];
  };
  skills: {
    title: string;
    intro: string;
    items: [SkillItem, SkillItem, SkillItem, SkillItem];
  };
  relationships: {
    title: string;
    intro: string;
    items: [
      RelationshipItem,
      RelationshipItem,
      RelationshipItem,
      RelationshipItem,
    ];
  };
  gallery: {
    title: string;
    intro: string;
    /* 与 config.ts 的 GALLERY_SRCS 按下标一一对应 */
    alts: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
    ];
  };
  quote: { text: string; attribution: string };
  footer: { copyright: string; disclaimer: string; sources: string };
}
