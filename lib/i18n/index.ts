import { isLang, type Lang } from "./config";
import type { Dictionary } from "./types";
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

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export { isLang };
export type {
  Lang,
  Dictionary,
  Row,
  SkillItem,
  RelationshipItem,
} from "./types";
export * from "./config";
