export interface StoreType {
  id: number;
  phone?: string;
  lat: number;
  lng: number;
  address: string;
  name: string;
  storeType?: string;
  foodCertifyName: string;
  category?: string;
  page?: string;
  totalPage?: string;
  district?: string;
  rating?: number;
}

export interface StoreApiResponse {
  data: StoreType[];
  totalPage?: number;
  totalCount?: string;
  page?: number;
}

export interface LocationType {
  lat: number;
  lng: number;
  zoom: number;
}

export type districtType =
  | '강남구'
  | '강동구'
  | '강북구'
  | '강서구'
  | '관악구'
  | '광진구'
  | '구로구'
  | '금천구'
  | '노원구'
  | '도봉구'
  | '동대문구'
  | '동작구'
  | '마포구'
  | '서대문구'
  | '서초구'
  | '성동구'
  | '성북구'
  | '송파구'
  | '양천구'
  | '영등포구'
  | '용산구'
  | '은평구'
  | '종로구'
  | '중구'
  | '중랑구';

export interface SearchType {
  q?: string;
  district?: districtType;
}

export const DISTRICT_ARR = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];
