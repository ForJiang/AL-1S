import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "天童アリス - Tendou Aris",
  description:
    "蔚蓝档案粉丝站：千年科学学园游戏开发部的见习勇者 —— 天童アリス（AL-1S）",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
