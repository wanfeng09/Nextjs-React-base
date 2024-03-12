'use server';
// 可以将文件中的所有导出函数标记为服务器函数
// 在服务器组件中编写服务器操作

// 使用类型验证库
import { z } from 'zod';
// 使用数据库
import { sql } from '@vercel/postgres';
// 清除缓存并触发对服务器的新请求
import { revalidatePath } from 'next/cache';
// 重定向
import { redirect } from 'next/navigation';
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(), // 强制（更改）从字符串转换为数字，同时验证其类型
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
// 在文件中 actions.ts ，创建一个新的异步函数，该函数接受 formData
export async function createInvoice(formData: FormData) {
  // 获取所需字段
  // const rawFormData = {
  //   customerId: formData.get('customerId'),
  //   amount: formData.get('amount'),
  //   status: formData.get('status'),
  // };
  // 处理多字段
  // const rawFormData = Object.fromEntries(formData.entries())
  // 终端打印（服务渲染）
  // console.log(rawFormData);
  // console.log(typeof rawFormData.amount); // string ts正确是number

  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  // 格式为“YYYY-MM-DD”的新日期
  const date = new Date().toISOString().split('T')[0];
  console.log(customerId, amount, status);
  console.log(typeof amount); // number
  console.log(date); // 2024-03-12

  // 新增数据
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  // redirect 只有在成功时 try 才能访问
  // 更新数据库后，将重新验证 /dashboard/invoices 路径，并从服务器获取新数据。
  revalidatePath('/dashboard/invoices');
  // 重定向回页面 /dashboard/invoices
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
export async function deleteInvoice(id: string) {
    throw new Error('Failed to Delete Invoice');
}
