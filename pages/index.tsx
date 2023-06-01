/*global kakao*/
import { useState } from 'react';
import Layout from '@/components/Layout';
import Map from '@/components/Map';
import Markers from '@/components/Markers';
import StoreBox from '@/components/StoreBox';
import { StoreType } from '@/interface';
import axios from 'axios';

interface HomeProps {
  stores: StoreType[];
}

export default function Home({ stores }: HomeProps) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState<StoreType | null>(null);

  return (
    <Layout>
      <Map setMap={setMap} setCurrentStore={setCurrentStore} />
      <Markers map={map} setCurrentStore={setCurrentStore} stores={stores} />
      <StoreBox store={currentStore} setCurrentStore={setCurrentStore} />
    </Layout>
  );
}

export async function getStaticProps() {
  const stores = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  );

  return {
    props: { stores: stores.data },
    revalidate: 60 * 60,
  };
}
