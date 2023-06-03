import { StoreInterface } from '@/interface';
import Image from 'next/image';
import Link from 'next/link';

interface StoreListProps {
  index: number;
  store: StoreInterface;
}

export default function StoreList({ index, store }: StoreListProps) {
  return (
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
        <p className="text-sm leading-6 text-gray-900">{store?.address}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          {store?.phone} | {store?.foodCertifyName} |{store?.category}
        </p>
      </div>
    </li>
  );
}
