/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 为静态托管，导出纯静态站点
  output: "export",
  // 项目页部署在 /AL-1S 子路径下；本地 dev 不设置
  ...(process.env.NEXT_PUBLIC_BASE_PATH
    ? { basePath: process.env.NEXT_PUBLIC_BASE_PATH }
    : {}),
  images: { unoptimized: true },
};

export default nextConfig;
