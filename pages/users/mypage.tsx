import Link from 'next/link';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

export default function MyPage() {
  const router = useRouter();
  return (
    <Layout>
      <div>Mypage</div>
      <ul>
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <button type="button" onClick={() => router.back()}>
            Back
          </button>
        </li>
      </ul>
    </Layout>
  );
}
