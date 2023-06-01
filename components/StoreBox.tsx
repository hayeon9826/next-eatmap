import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { BiMap } from 'react-icons/bi';
import {
  AiOutlineInfoCircle,
  AiOutlinePhone,
  AiOutlineClose,
  AiOutlineCheck,
} from 'react-icons/ai';
import cn from 'classnames';
import { StoreType } from '@/interface';

interface StoreBoxProps {
  store: StoreType | null;
  setCurrentStore: Dispatch<SetStateAction<StoreType | null>>;
}

export default function StoreBox({ store, setCurrentStore }: StoreBoxProps) {
  return (
    <div
      className={cn(
        'transition ease-in-out delay-150 fixed inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white',
        { 'opacity-0': !store }
      )}
    >
      {store && (
        <>
          <div className="px-8 py-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    store?.bizcnd_code_nm
                      ? `/images/markers/${store?.bizcnd_code_nm}.png`
                      : '/images/markers/default.png'
                  }
                  width={40}
                  height={40}
                  alt="아이콘 이미지"
                />
                <div>
                  <div className="font-semibold">{store?.upso_nm}</div>
                  <div className="text-sm">{store?.cob_code_nm}</div>
                </div>
              </div>
              <button type="button" onClick={() => setCurrentStore(null)}>
                <AiOutlineClose />
              </button>
            </div>

            <div className="mt-4 flex gap-2 items-center">
              <BiMap />
              {store?.rdn_code_nm}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {store?.tel_no}
            </div>
            <div className="mt-2 flex gap-2 items-center text-sm text-gray-700">
              <AiOutlineInfoCircle />
              {store?.crtfc_gbn_nm}
            </div>
            <div className="mt-2 flex gap-2 items-center text-sm text-gray-700">
              <AiOutlineCheck />
              {store?.bizcnd_code_nm}
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.alert('상세보기 링크 이동')}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
