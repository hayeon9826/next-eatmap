'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  CATEGORY_ARR,
  DISTRICT_ARR,
  FOOD_CERTIFY_ARR,
  STORE_TYPE_ARR,
  StoreInterface,
} from '@/interface';
import axios from 'axios';
import AddressSearch from '@/components/store/AddressSearch';

interface StoreFormProps {
  store?: StoreInterface;
}

export default function StoreForm({ store }: StoreFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StoreInterface>();

  useEffect(() => {
    if (store) {
      setValue('name', store?.name);
      setValue('phone', store?.phone);
      setValue('lat', store?.lat);
      setValue('lng', store?.lng);
      setValue('address', store?.address);
      setValue('storeType', store?.storeType);
      setValue('foodCertifyName', store?.foodCertifyName);
      setValue('category', store?.category);
      setValue('district', store?.district);
    }
  }, [store, setValue]);

  return (
    <div className="px-4 md:max-w-5xl mx-auto pb-20 py-8 md:pb-8">
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            let res;
            if (store) {
              res = await axios.put('/api/stores', { ...data, id: store.id });
              if (res.status === 200) {
                toast.success('맛집을 수정했습니다.');
                router.replace(`/stores/${store.id}`);
              } else {
                toast.error('다시 시도해주세요');
              }
            } else {
              res = await axios.post('/api/stores', data);
              if (res.status === 200) {
                toast.success('맛집을 등록했습니다.');
                router.replace('/stores');
              } else {
                toast.error('다시 시도해주세요');
              }
            }
          } catch (e) {
            console.log(e);
            toast.error('데이터 생성중 문제가 생겼습니다. 다시 시도해주세요');
          }
        })}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              맛집 등록
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              아래 폼을 입력하여 맛집을 등록해주세요
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  가게명
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  {errors?.name?.type === 'required' && (
                    <div className="pt-2 text-xs text-red-600">
                      필수 입력사항입니다.
                    </div>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  카테고리
                </label>
                <div className="mt-2">
                  <select
                    {...register('category', { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">카테고리 선택</option>
                    {CATEGORY_ARR?.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors?.category?.type === 'required' && (
                    <div className="pt-2 text-xs text-red-600">
                      필수 입력사항입니다.
                    </div>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  연락처
                </label>
                <div className="mt-2">
                  <input
                    {...register('phone', { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  {errors?.phone?.type === 'required' && (
                    <div className="pt-2 text-xs text-red-600">
                      필수 입력사항입니다.
                    </div>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="district"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  자치구
                </label>
                <div className="mt-2">
                  <select
                    {...register('district', { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">자치구 선택</option>
                    {DISTRICT_ARR?.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors?.district?.type === 'required' && (
                    <div className="pt-2 text-xs text-red-600">
                      필수 입력사항입니다.
                    </div>
                  )}
                </div>
              </div>
              <AddressSearch
                register={register}
                setValue={setValue}
                errors={errors}
              />
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="foodCertifyName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  식품인증구분
                </label>
                <div className="mt-2">
                  <select
                    {...register('foodCertifyName', { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">식품인증구분 선택</option>
                    {FOOD_CERTIFY_ARR?.map((data) => (
                      <option key={data} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>
                  {errors?.foodCertifyName?.type === 'required' && (
                    <div className="pt-2 text-xs text-red-600">
                      필수 입력사항입니다.
                    </div>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="storeType"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  업종구분
                </label>
                <div className="mt-2">
                  <select
                    {...register('storeType', { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">업종구분 선택</option>
                    {STORE_TYPE_ARR?.map((data) => (
                      <option key={data} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>
                  {errors?.storeType?.type === 'required' && (
                    <div className="pt-2 text-xs text-red-600">
                      필수 입력사항입니다.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
          >
            뒤로가기
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            제출하기
          </button>
        </div>
      </form>
    </div>
  );
}
