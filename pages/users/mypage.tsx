/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/common/Layout';
import Pagination from '@/components/common/Pagination';
import SkeletonList from '@/components/common/SkeletonList';
import CommentList from '@/components/comments/CommentList';
import { CommentApiResponse } from '@/interface';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export default function MyPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { page = '0' }: any = router.query;

  const {
    data: comments,
    isFetching,
    refetch,
  } = useQuery(
    [`comments-${page}`],
    async () => {
      const { data } = await axios(
        `/api/comments?page=${page}&limit=5&user=true`
      );
      return data as CommentApiResponse;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

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
                  className="rounded-full"
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
      <div className="px-4 md:max-w-5xl mx-auto py-10 pb-20">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-semibold leading-7 text-gray-900">
            내가 쓴 댓글
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            댓글 리스트
          </p>
          <ul
            role="list"
            className="divide-y divide-gray-100 max-w-5xl mx-auto"
          >
            {isFetching ? (
              <SkeletonList />
            ) : (
              <CommentList
                comments={comments}
                refetch={refetch}
                hasStoreLink={true}
              />
            )}
          </ul>
        </div>
        {comments?.totalPage && comments?.totalPage > 0 ? (
          <Pagination
            totalPage={comments?.totalPage}
            page={page}
            pathName="/users/mypage"
          />
        ) : null}
      </div>
    </Layout>
  );
}
