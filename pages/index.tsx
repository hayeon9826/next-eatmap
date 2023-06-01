/*global kakao*/
import { useState } from 'react';
import Layout from '@/components/Layout';
import Map from '@/components/Map';
import Markers from '@/components/Markers';
import StoreBox from '@/components/StoreBox';
import { StoreType } from '@/interface';

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
  const stores: StoreType[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((response) => response.json());

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
