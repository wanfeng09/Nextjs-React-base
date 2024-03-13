/**
 * 通过添加到 Inter 元素中 <body> ，字体将应用于整个应用程序。
 * 在这里，您还添加了 Tailwind antialiased 类，该类使字体平滑。
 * 没有必要使用这个类，但它增加了一个很好的触感。
 * 导航到浏览器，打开开发工具并选择 body 元素。
 * 您应该看到 Inter 并且 Inter_Fallback 现在已应用在样式下
 */
import '@/app/ui/global.css';
// 导入字体
import { inter } from '@/app/ui/fonts';
// 元数据
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: {
    template: '%s | Hui',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body>{children}</body> */}
      {/* 使用字体 */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
