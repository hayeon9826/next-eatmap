import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { status } = useSession();

  return (
    <div className="navbar">
      <input type="checkbox" id="navbar__input--check" />
      <div className="navbar__header">
        <div className="navbar__title">
          <Link href="/">eatmap</Link>
        </div>
      </div>
      <div className="navbar__button">
        <label htmlFor="navbar__input--check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <div className="navbar__links">
        <Link href="/stores">맛집 목록</Link>
        <Link href="/stores/new">맛집 등록</Link>
        <Link href="/users/likes">찜한 가게</Link>
        {status === 'authenticated' ? (
          <>
            <Link href="/users/mypage">마이페이지</Link>
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          </>
        ) : (
          <Link href="/users/login">로그인</Link>
        )}
      </div>
    </div>
  );
}
