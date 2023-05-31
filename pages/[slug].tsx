import Link from 'next/link';
// https://nextjs.org/docs/pages/api-reference/functions/use-router

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Page: {router.query.slug}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <ul>
        <li>
          <Link href="/one">one</Link>
        </li>
        <li>
          <Link href="/two">two</Link>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              router.push({ pathname: '/[slug]', query: { slug: 'push' } });
            }}
          >
            push
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              router.replace({
                pathname: '/[slug]',
                query: { slug: 'replace' },
              });
            }}
          >
            replace
          </button>
        </li>
        <li>
          <button type="button" onClick={() => router.reload()}>
            Click here to reload
          </button>
        </li>
      </ul>
    </div>
  );
}
