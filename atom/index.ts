import { LocationType, SearchType, StoreInterface } from '@/interface';
import { atom } from 'recoil';

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;
const DEFAULT_ZOOM = 3;

export const mapState = atom<any>({
  key: `map`,
  default: null,
  dangerouslyAllowMutability:
    process.env.NODE_ENV === 'development' ? true : false,
});

export const currentStoreState = atom<StoreInterface | null>({
  key: `store`,
  default: null,
});

export const locationState = atom<LocationType>({
  key: 'location',
  default: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  },
});

export const searchState = atom<SearchType | null>({
  key: 'search',
  default: null,
});
