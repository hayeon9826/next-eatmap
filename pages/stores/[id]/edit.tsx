import Layout from '@/components/Layout';
import StoreForm from '@/components/StoreForm';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useQuery } from 'react-query';

export default function StoreEdit() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery([`shop-${id}`, id], async () => {
    const result = await axios('/api/stores', {
      params: {
        id,
      },
    });
    return result.data;
  });

  return (
    <Layout>
      <StoreForm store={data} />
    </Layout>
  );
}
