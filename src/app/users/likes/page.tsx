'use client';

/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/common/Layout';
import Pagination from '@/components/common/Pagination';
import SkeletonList from '@/components/common/SkeletonList';
import StoreList from '@/components/store/StoreList';
import { LikeApiResponse, LikeInterface } from '@/interface';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';

export default function MyPage() {
  const searchParams = useSearchParams();

  const page = searchParams?.get('page');

  const { data: likes, isFetching } = useQuery([`likes-${page}`], async () => {
    const { data } = await axios(`/api/likes?page=${page || 0}&limit=10`);
    return data as LikeApiResponse;
  });

  return (
    <Layout>
      <div className="px-4 md:max-w-5xl mx-auto py-8 pb-20">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-semibold leading-7 text-gray-900">
            찜한 가게
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            찜한 가게 리스트
          </p>
          <ul role="list" className="divide-y divide-gray-100">
            {isFetching ? (
              <SkeletonList />
            ) : (
              likes?.data?.map((like: LikeInterface, index) => (
                <StoreList
                  index={index}
                  store={like.store}
                  key={like.store.id}
                />
              ))
            )}
          </ul>
        </div>
        {likes?.totalPage && likes?.totalPage > 0 ? (
          <Pagination
            totalPage={likes?.totalPage}
            page={page}
            pathName="/users/likes"
          />
        ) : null}
      </div>
    </Layout>
  );
}
