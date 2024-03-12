'use client';
/**
 * URLSearchParams 是一个 Web API，它提供用于操作 URL 查询参数的实用工具方法。
 * 您可以使用它来获取 params 字符串，而不是创建复杂的字符串文字 ?page=1&query=a 。
 */
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// useSearchParams : 允许您访问当前 URL 的参数
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  // 在内部 handleSearch, 使用新 searchParams 变量创建一个新 URLSearchParams 实例。
  // 通过去抖动，可以减少发送到数据库的请求数，从而节省资源
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    // 设置页数为1
    params.set('page', '1');
    // set 基于用户输入的参数字符串。如果输入为空，则需要 delete 
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // console.log(params.toString()); // query=xxx
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
