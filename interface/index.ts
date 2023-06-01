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
}

export interface StoreApiResponse {
  data: StoreType[];
  totalPage?: number;
  totalCount?: string;
  page?: number;
}
