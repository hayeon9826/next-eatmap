/*global kakao*/
import Layout from '@/components/Layout';
import Map from '@/components/Map';
import Markers from '@/components/Markers';
import StoreBox from '@/components/StoreBox';
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
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <Layout>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
    </Layout>
  );
}
