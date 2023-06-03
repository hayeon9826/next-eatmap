import { searchState } from '@/atom';
import { DISTRICT_ARR, districtType } from '@/interface';
import { useRecoilState } from 'recoil';

export default function SearchFilter() {
  const [search, setSearch] = useRecoilState(searchState);
  return (
    <div className="mb-4 md:flex gap-2">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          defaultValue={search?.q}
          onChange={(e) => setSearch({ ...search, q: e.target.value })}
          className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="음식점 검색"
        />
      </div>
      <select
        id="countries"
        defaultValue={search?.district}
        onChange={(e) =>
          setSearch({ ...search, district: e.target.value as districtType })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:max-w-[200px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-2 md:mt-0"
      >
        <option value="">지역 선택</option>
        {DISTRICT_ARR?.map((district) => (
          <option value={district} key={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  );
}
