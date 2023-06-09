'use client';

import Image from 'next/image';
import { BiMap } from 'react-icons/bi';
import {
  AiOutlineInfoCircle,
  AiOutlinePhone,
  AiOutlineClose,
  AiOutlineCheck,
} from 'react-icons/ai';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { currentStoreState } from '@/atom';
import Like from '../likes/Like';

export default function StoreBox() {
  const router = useRouter();
  const [currentStore, setCurrentStore] = useRecoilState(currentStoreState);

  return (
    <div
      className={cn(
        'transition ease-in-out delay-150 fixed inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white',
        { 'opacity-0': !currentStore }
      )}
    >
      {currentStore && (
        <>
          <div className="px-8 py-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    currentStore?.category
                      ? `/images/markers/${currentStore?.category}.png`
                      : '/images/markers/default.png'
                  }
                  width={40}
                  height={40}
                  alt="아이콘 이미지"
                />
                <div>
                  <div className="font-semibold">{currentStore?.name}</div>
                  <div className="text-sm">{currentStore?.storeType}</div>
                </div>
              </div>
              <button type="button" onClick={() => setCurrentStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="flex justify-between gap-4">
              <div className="mt-4 flex gap-2 items-center col-span-3">
                <BiMap />
                {currentStore?.address || '주소가 없습니다.'}
              </div>
              <Like storeId={currentStore.id} className="mt-4" />
            </div>

            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {currentStore?.phone || '연락처가 없습니다.'}
            </div>
            <div className="mt-2 flex gap-2 items-center text-sm text-gray-700">
              <AiOutlineInfoCircle />
              {currentStore?.storeType || '업종명이 없습니다.'}
            </div>
            <div className="mt-2 flex gap-2 items-center text-sm text-gray-700">
              <AiOutlineCheck />
              {currentStore?.category || '카테고리가 없습니다.'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push(`/stores/${currentStore.id}`)}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
