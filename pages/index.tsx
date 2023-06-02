/*global kakao*/
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
  return (
    <Layout>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
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
