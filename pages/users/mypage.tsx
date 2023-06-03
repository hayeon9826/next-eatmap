/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import SkeletonList from '@/components/SkeletonList';
import StoreList from '@/components/StoreList';
import { LikeApiResponse, LikeInterface } from '@/interface';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export default function MyPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { page = '0' }: any = router.query;

  const { data: likes, isFetching } = useQuery([`likes-${page}`], async () => {
    const { data } = await axios(`/api/likes?page=${page}&limit=5`);
    return data as LikeApiResponse;
  });

  return (
    <Layout>
      <div className="px-4 md:max-w-5xl mx-auto py-8">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-semibold leading-7 text-gray-900">
            마이페이지
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            사용자 기본정보
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                이름
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {session?.user?.name || '사용자님'}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                이메일
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {session?.user?.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                이미지
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <img
                  src={session?.user?.image || '/images/logo.png'}
                  alt="프로필 이미지"
                  width={48}
                  height={48}
                />
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                설정
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="underline"
                >
                  로그아웃
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
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
        {likes?.totalPage && likes?.totalPage > 0 && (
          <Pagination totalPage={likes?.totalPage} page={page} />
        )}
      </div>
    </Layout>
  );
}
