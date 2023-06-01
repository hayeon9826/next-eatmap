import Layout from '@/components/Layout';
import Image from 'next/image';
import { StoreType } from '@/interface';
import axios from 'axios';
import Link from 'next/link';
import { useQuery } from 'react-query';
import SkeletonList from '@/components/SkeletonList';

export default function ShopIndex() {
  const config = {
    url: '/api/stores',
  };
  const { data: stores, isFetching } = useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const { data } = await axios(config);
      return data as StoreType[];
    },
  });

  return (
    <Layout>
      <div className="px-4 md:max-w-5xl mx-auto py-8">
        <ul role="list" className="divide-y divide-gray-100">
          {isFetching ? (
            <SkeletonList />
          ) : (
            stores?.map((store, index) => (
              <li className="flex justify-between gap-x-6 py-5" key={index}>
                <div className="flex gap-x-4">
                  <Image
                    src={
                      store?.category
                        ? `/images/markers/${store?.category}.png`
                        : '/images/markers/default.png'
                    }
                    width={48}
                    height={48}
                    alt="아이콘 이미지"
                  />
                  <Link href={`/stores/${store.id}`}>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {store?.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {store?.storeType}
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {store?.address}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {store?.phone} | {store?.foodCertifyName} |{store?.category}
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </Layout>
  );
}

// export async function getServerSideProps() {
//   const stores = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
//   );

//   return {
//     props: { stores: stores.data },
//   };
// }
