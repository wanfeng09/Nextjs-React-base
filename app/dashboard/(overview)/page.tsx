/**
 * Page 是一个异步组件。这允许您用于 await 获取数据。
 * 还有 3 个接收数据的组件： <Card> 、 <RevenueChart> 和 <LatestInvoices> 。
 * 它们目前被注释掉，以防止应用程序出错。
 * 
 */
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';

// 获取数据
// 移除fetchRevenue
// import { fetchRevenue,fetchLatestInvoices,fetchCardData  } from '@/app/lib/data';
// import { fetchCardData  } from '@/app/lib/data';

import { Suspense } from 'react';
import { RevenueChartSkeleton,LatestInvoicesSkeleton,CardsSkeleton } from '@/app/ui/skeletons';

import CardWrapper from '@/app/ui/dashboard/cards';
 
export default async function Page() {
    // delete this line
    // const revenue = await fetchRevenue();
    // const latestInvoices = await fetchLatestInvoices();
    // const {totalPaidInvoices,totalPendingInvoices,numberOfInvoices,numberOfCustomers} = await fetchCardData()
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}