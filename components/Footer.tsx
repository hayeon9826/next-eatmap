import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white w-full fixed bottom-0 px-4 z-10 flex justify-between">
      <div className="inline-block text-xl font-medium text-blue-800 px-2 py-1.5 italic">
        <Link href="/">eatmap</Link>
      </div>
      <div className="text-xs flex flex-col gap-2 my-auto text-gray-500">
        <Link href="/users/icons" className="underline">
          아이콘 출처
        </Link>
      </div>
    </footer>
  );
}
