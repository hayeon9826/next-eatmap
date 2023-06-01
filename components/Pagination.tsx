import Link from 'next/link';

interface PaginationProps {
  totalPage: number;
  page: string;
}

export default function Pagination({ totalPage, page }: PaginationProps) {
  return (
    <div className="py-6 w-full px-10 flex justify-center gap-y-4 bg-white shadow border my-10 flex-wrap">
      {totalPage < 10 ? (
        [...Array(totalPage)].map((x, i) => (
          <Link
            href={{
              pathname: `/stores`,
              query: { page: i },
            }}
            key={i}
          >
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white mr-2 ${
                parseInt(page, 10) === i
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-300'
              }`}
            >
              {i + 1}
            </span>
          </Link>
        ))
      ) : (
        <>
          {parseInt(page) > 0 && (
            <Link
              href={{
                pathname: `/stores`,
                query: { page: parseInt(page) - 1 },
              }}
            >
              <span
                className={`px-3 py-2 rounded border shadow-sm bg-white mr-2 text-gray-300`}
              >
                이전
              </span>
            </Link>
          )}

          <Link
            href={{
              pathname: `/stores`,
              query: { page: parseInt(page) },
            }}
          >
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white mr-2 text-blue-600 font-bold`}
            >
              {parseInt(page) + 1}
            </span>
          </Link>
          {parseInt(page) < totalPage - 1 && (
            <Link
              href={{
                pathname: `/stores`,
                query: { page: parseInt(page) + 1 },
              }}
            >
              <span
                className={`px-3 py-2 rounded border shadow-sm bg-white mr-2 text-gray-300`}
              >
                다음
              </span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
