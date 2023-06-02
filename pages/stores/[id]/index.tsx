import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useQuery } from 'react-query';
import axios from 'axios';
import { StoreInterface } from '@/interface';
import Map from '@/components/Map';
import Marker from '@/components/Marker';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { AiOutlineHeart } from 'react-icons/ai';

export default function StorePage() {
  const router = useRouter();
  const { status } = useSession();
  const { id } = router.query;

  const config = {
    url: `/api/stores?id=${id}`,
  };

  const { data: store, isSuccess } = useQuery<StoreInterface>(
    [config],
    async () => {
      const { data } = await axios(config);
      return data as StoreInterface;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  const handleDelete = async () => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');
    if (confirm && store) {
      try {
        const res = await axios.delete(`/api/stores?id=${store.id}`);

        if (res.status === 200) {
          toast.success('게시글을 삭제했습니다.');
          router.replace('/');
        } else {
          toast.error('다시 시도해주세요');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Layout>
      <div className="px-4 md:max-w-5xl mx-auto py-8">
        <div className="md:flex justify-between items-center py-4 md:py-0">
          <div className="flex gap-4">
            <Image
              src={
                store?.category
                  ? `/images/markers/${store?.category}.png`
                  : '/images/markers/default.png'
              }
              width={56}
              height={56}
              alt="아이콘 이미지"
            />
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                {store?.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {store?.address}
              </p>
            </div>
          </div>
          {status === 'authenticated' && (
            <div className="px-4 sm:px-0 text-sm leading-6 text-gray-500 flex gap-4 items-center float-right mt-2 md:mt-0">
              <button type="button">
                <AiOutlineHeart className="hover:text-red-600 focus:text-red-600" />
              </button>
              <Link className="underline" href={`/stores/${store?.id}/edit`}>
                수정
              </Link>
              <button
                type="button"
                className="underline"
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                주소
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.address}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                위도
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lat}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                경도
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lng}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                연락처
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                카테고리
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.category}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                식품인증구분
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.foodCertifyName}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                업종명
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.storeType}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isSuccess && (
        <div className="overflow-hidden w-full mb-20 mx-auto">
          <Map lat={store?.lat} lng={store?.lng} zoom={1} />
          <Marker store={store} />
        </div>
      )}
    </Layout>
  );
}
