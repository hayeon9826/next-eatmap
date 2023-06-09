export interface StoreInterface {
  id: number;
  phone?: string;
  lat: number;
  lng: number;
  address: string;
  name: string;
  storeType?: StoreType;
  foodCertifyName: foodCertifyNameType;
  category?: categoryType;
  page?: string;
  totalPage?: string;
  district?: string;
  rating?: number;
  likes?: LikeInterface[];
}

export interface StoreApiResponse {
  data: StoreInterface[];
  totalPage?: number;
  totalCount?: string;
  page?: number;
}

export interface LikeInterface {
  id: string;
  storeId: number;
  userId: number;
  store: StoreInterface;
  createdAt: string;
}

export interface LikeApiResponse {
  data?: LikeInterface[];
  totalPage?: number;
  totalCount?: string;
  page?: number;
}

interface UserInterface {
  id: string;
  name?: string;
  email: string;
  image?: string;
}

export interface CommentInterface {
  id: string;
  storeId: number;
  userId: number;
  store: StoreInterface;
  user: UserInterface;
  createdAt: string;
  body: string;
}

export interface CommentApiResponse {
  data?: CommentInterface[];
  totalPage?: number;
  totalCount?: string;
  page?: number;
}

export interface LocationType {
  lat: number;
  lng: number;
  zoom: number;
}

export type foodCertifyNameType =
  | '채식가능음식점'
  | '채식음식점'
  | '저염실천음식점'
  | '식생활체험공간'
  | '농부시장'
  | '친환경유기농식품판매점';

export type StoreType = '일반음식점' | '휴게음식점' | '제과점영업';

export type categoryType =
  | '한식'
  | '카페'
  | '분식'
  | '동남아'
  | '양식'
  | '술집'
  | '베이커리'
  | '인도_중동'
  | '중국식'
  | '탕류'
  | '일식'
  | '복어취급';

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

export const CATEGORY_ARR = [
  '한식',
  '카페',
  '분식',
  '동남아',
  '양식',
  '술집',
  '베이커리',
  '인도_중동',
  '중국식',
  '탕류',
  '일식',
  '복어취급',
];

export const STORE_TYPE_ARR = ['일반음식점', '휴게음식점', '제과점영업'];

export const FOOD_CERTIFY_ARR = [
  '채식가능음식점',
  '채식음식점',
  '저염실천음식점',
  '식생활체험공간',
  '농부시장',
  '친환경유기농식품판매점',
];
