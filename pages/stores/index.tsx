import React, { useCallback, useEffect, useRef, useState } from 'react';

import Layout from '@/components/Layout';
import Image from 'next/image';
import { StoreApiResponse, StoreInterface } from '@/interface';
import axios from 'axios';
import Link from 'next/link';
import { useInfiniteQuery } from 'react-query';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Loader from '@/components/Loader';
import SearchFilter from '@/components/SearchFilter';
import { searchState } from '@/atom';
import { useRecoilValue } from 'recoil';

export default function ShopIndex() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const listEnd = useIntersectionObserver(listRef, {});
  const searchValue = useRecoilValue(searchState);
  const isEndPage = !!listEnd?.isIntersecting;

  const params = {
    q: searchValue?.q,
    district: searchValue?.district,
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['stores', params],
    async ({ pageParam = 0 }) => {
      const { data } = await axios('/api/stores', {
        params: {
          limit: 10,
          page: pageParam,
          ...params,
        },
      });

      return data as StoreApiResponse;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      getNextPageParam: (lastPage: any) =>
        lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
    }
  );

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isEndPage && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, hasNextPage, isEndPage]);

  return (
    <Layout>
      <div className="px-4 md:max-w-5xl mx-auto py-8">
        <SearchFilter />
        <ul role="list" className="divide-y divide-gray-100">
          {stores?.pages?.map((page, i) => (
            <React.Fragment key={i}>
              {page.data.map((store: StoreInterface, index) => (
                <li className="flex justify-between gap-x-6 py-5" key={index}>
                  <div className="flex gap-x-4">
                    <Image
                      src={
                        store?.category
                          ? `/images/markers/${store?.category}.png`
                          : '/images/markers/default.png'
                      }
                      width={48}
                      height={48}
                      alt="아이콘 이미지"
                    />
                    <Link href={`/stores/${store.id}`}>
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {store?.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {store?.storeType}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {store?.address}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {store?.phone} | {store?.foodCertifyName} |
                      {store?.category}
                    </p>
                  </div>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
        {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
        <div className="w-full touch-none h-10 mb-10" ref={listRef} />
      </div>
    </Layout>
  );
}
