import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div>Hello World</div>
      <ul>
        <li>
          <Link href="/users/login">login</Link>
        </li>
        <li>
          <Link href="/users/signin">signin</Link>
        </li>
        <li>
          <Link href="/users/mypage">mypage</Link>
        </li>
        <li>
          <Link href="/shops">shops</Link>
        </li>
        <li>
          <Link href="/shops/1/edit">shop edit</Link>
        </li>
        <li>
          <Link href="/shops/1">shop detail</Link>
        </li>
      </ul>
    </>
  );
}
