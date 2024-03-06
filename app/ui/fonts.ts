/**
 * 在您的 /app/ui 文件夹中，创建一个名为 fonts.ts .您将使用此文件来保留将在整个应用程序中使用的字体。
 * 从 next/font/google 模块导入 Inter 字体，指定要加载的子集(主字体)
 */

import { Inter,Lusitana } from 'next/font/google';
 
export const inter = Inter({ subsets: ['latin'] }); 
// 添加辅助字体Lusitana 
export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
});