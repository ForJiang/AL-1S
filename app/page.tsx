/* AL-1S · 天童アリス粉丝站 · © 2026 ForJiang · github.com/ForJiang */

/* 根路径直接呈现站点内容（默认简体中文）——不设语言选择页、不做自动跳转；
   换语言用页面右上角的切换器。 */
import { SitePage } from "@/components/site-page";

export default function Root() {
  return <SitePage lang="zh-CN" />;
}
