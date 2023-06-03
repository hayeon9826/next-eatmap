/* eslint-disable @next/next/no-img-element */
import { CommentApiResponse } from '@/interface';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface CommentListProps {
  comments?: CommentApiResponse;
  refetch?: any;
  hasStoreLink?: boolean;
}

export default function CommentList({
  comments,
  refetch,
  hasStoreLink = false,
}: CommentListProps) {
  const { data: session } = useSession();

  const handleDeleteComment = async (id: string) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');
    if (confirm && id) {
      try {
        const res = await axios.delete(`/api/comments?id=${id}`);
        refetch?.();
        if (res.status === 200) {
          toast.success('댓글을 삭제했습니다.');
        } else {
          toast.error('다시 시도해주세요');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div>
      <div className="my-10">
        {comments && comments?.data && comments?.data?.length > 0 ? (
          comments?.data?.map((review) => (
            <div
              key={review.id}
              className="flex space-x-4 text-sm text-gray-500"
            >
              <div className="flex-none py-10">
                <img
                  src={review?.user?.image || '/images/logo.png'}
                  alt="profile image"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full bg-gray-100"
                />
              </div>
              <div className="flex-1 py-10 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">
                    {review.user?.name || review.user?.email}
                  </h3>
                  {review.user.email === session?.user.email && (
                    <button
                      type="button"
                      className="underline"
                      onClick={() => handleDeleteComment(review.id)}
                    >
                      삭제
                    </button>
                  )}
                </div>
                <p>
                  <time dateTime={review.createdAt}>{review.createdAt}</time>
                </p>

                <div className="prose prose-sm mt-4 max-w-none text-gray-500 whitespace-pre-wrap">
                  {review.body}
                </div>
                {hasStoreLink && (
                  <div className="mt-2">
                    <Link
                      href={`/stores/${review.store.id}`}
                      className=" text-gray-800 underline font-medium"
                    >
                      {review.store.name}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="my-10 p-4 border border-gray-200 rounded-md text-sm text-gray-400">
            댓글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
