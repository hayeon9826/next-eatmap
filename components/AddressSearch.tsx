import { StoreInterface } from '@/interface';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface AddressProps {
  setValue: UseFormSetValue<StoreInterface>;
  register: UseFormRegister<StoreInterface>;
  errors: FieldErrors<StoreInterface>;
}

export default function AddressSearch({
  setValue,
  register,
  errors,
}: AddressProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setValue('address', fullAddress);
    setIsOpen(false);
  };

  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="address"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          주소
        </label>
        <div className="mt-2">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <input
              {...register('address', { required: true })}
              readOnly
              placeholder="주소를 검색해주세요"
              className="col-span-2 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="py-1.5 px-2 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 rounded text-white "
            >
              검색
            </button>
          </div>
          {errors?.address?.type === 'required' && (
            <div className="pt-2 text-xs text-red-600">
              필수 입력사항입니다.
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="border border-gray-300 w-full col-span-2 rounded-md p-2">
          <DaumPostcode className="" onComplete={handleComplete} />
        </div>
      )}
    </>
  );
}
