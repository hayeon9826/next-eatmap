'use client';

import Layout from '@/components/common/Layout';
import Link from 'next/link';

export default function IconPage() {
  return (
    <Layout>
      <div className="px-4 md:max-w-5xl mx-auto py-8">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            아이콘 출처
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            <Link href="https://www.flaticon.com/" target="_blank">
              Flaticon
            </Link>{' '}
            바로가기
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                아이콘 리스트
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                <div>
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/bibimbap_8269621"
                    title="비빔밥 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    비빔밥 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/coffee-cup_3361135"
                    title="커피 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    커피 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/tteokbokki_6609199"
                    title="떡볶이 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    떡볶이 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/noodles_2082080"
                    title="국수 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    국수 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/pizza_3595458"
                    title="피자 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    피자 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/beer_1161611"
                    title="맥주 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    맥주 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/breads_7146167"
                    title="빵 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    빵 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/curry_590729"
                    title="카페 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    카페 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/jajangmyeon_6105044"
                    title="짜장면 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    짜장면 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/soup_6978158"
                    title="탕류 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    탕류 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/puffer-fish_756983"
                    title="복어 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    복어 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/nigiri_5391494"
                    title="초밥 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    초밥 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.flaticon.com/kr/free-icon/baby-cutlery_4911411"
                    title="수저 아이콘"
                    target="_blank"
                    className="hover:text-black focus:text-black underline"
                  >
                    수저 아이콘 제작자: Freepik - Flaticon
                  </Link>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Layout>
  );
}
