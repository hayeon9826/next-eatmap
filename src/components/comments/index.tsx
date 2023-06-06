'use client';

import { CommentApiResponse } from '@/interface';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface CommentsProps {
  storeId: number;
}

export default function Comments({ storeId }: CommentsProps) {
  const { data: session } = useSession();
  const params = useSearchParams();
  const page = params?.get('page') || '0';

  const { data: comments, refetch } = useQuery(
    [`comments-${storeId}`],
    async () => {
      const { data } = await axios(
        `/api/comments?storeId=${storeId}&page=${page}&limit=5`
      );
      return data as CommentApiResponse;
    }
  );

  return (
    <div className="bg-white">
      {session && session?.user && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}
      <CommentList comments={comments} />
    </div>
  );
}
