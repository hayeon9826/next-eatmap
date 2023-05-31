import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MyPage() {
  const router = useRouter();
  return (
    <>
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
    </>
  );
}
