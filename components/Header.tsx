import Link from 'next/link';

export default function Header() {
  return (
    <div className="navbar">
      <input type="checkbox" id="navbar__input--check" />
      <div className="navbar__header">
        <div className="navbar__title">eatmap</div>
      </div>
      <div className="navbar__button">
        <label htmlFor="navbar__input--check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <div className="navbar__links">
        <Link href="/shops">맛집 목록</Link>
        <Link href="/shops/new">맛집 등록</Link>
        <Link href="/users/mypage">마이페이지</Link>
        <Link href="/users/login">로그인</Link>
        <Link href="/users/signin">회원가입</Link>
      </div>
    </div>
  );
}
