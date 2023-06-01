/*global kakao*/
import { useState } from 'react';
import Layout from '@/components/Layout';
import Map from '@/components/Map';
import Markers from '@/components/Markers';
import StoreBox from '@/components/StoreBox';
import * as stores from '@/data/store.json';

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeDatas = stores?.['DATA'];

  return (
    <Layout>
      <Map setMap={setMap} setCurrentStore={setCurrentStore} />
      <Markers
        map={map}
        setCurrentStore={setCurrentStore}
        storeDatas={storeDatas}
      />
      <StoreBox store={currentStore} setCurrentStore={setCurrentStore} />
    </Layout>
  );
}
