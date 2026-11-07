/* AL-1S · 天童アリス粉丝站 · © 2026 ForJiang · github.com/ForJiang */
import type { Dictionary, RelationshipItem, Row, SkillItem } from "./types";
import type { Lang } from "./config";
import { zhCN } from "./zh-CN";
import { zhTW } from "./zh-TW";
import { ja } from "./ja";
import { en } from "./en";

export const dictionaries: Record<Lang, Dictionary> = {
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  ja,
  en,
};

export type {
  Lang,
  Dictionary,
  Row,
  SkillItem,
  RelationshipItem,
} from "./types";
export * from "./config";
