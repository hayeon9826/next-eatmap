'use client';

import React, { useCallback, useEffect, useRef } from 'react';

import Layout from '@/components/common/Layout';
import { StoreApiResponse, StoreInterface } from '@/interface';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Loader from '@/components/common/Loader';
import SearchFilter from '@/components/store/SearchFilter';
import { searchState } from '@/atom';
import { useRecoilValue } from 'recoil';
import StoreList from '@/components/store/StoreList';

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
                <StoreList index={index} store={store} key={store.id} />
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
