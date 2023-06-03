import { CommentApiResponse } from '@/interface';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface CommentsProps {
  storeId: number;
}

export default function Comments({ storeId }: CommentsProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { page = '0' }: any = router.query;

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
