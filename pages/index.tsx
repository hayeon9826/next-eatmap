/*global kakao*/
import Layout from '@/components/common/Layout';
import CurrentLocationButton from '@/components/map/CurrentLocationButton';
import Map from '@/components/map/Map';
import Markers from '@/components/map/Markers';
import StoreBox from '@/components/store/StoreBox';
import { StoreInterface } from '@/interface';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Home() {
  const { data: stores } = useQuery<StoreInterface[]>(
    ['stores'],
    async () => {
      const result = await axios('/api/stores');
      return result.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <Layout>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </Layout>
  );
}
