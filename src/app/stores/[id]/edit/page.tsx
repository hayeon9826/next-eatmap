'use client';

import Layout from '@/components/common/Layout';
import StoreForm from '@/components/store/StoreForm';
import { StoreInterface } from '@/interface';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

import { useQuery } from 'react-query';

export default function StoreEdit() {
  const params = useSearchParams();
  const id = params?.get('id');

  const { data } = useQuery<StoreInterface>(
    [`store-${id}`, id],
    async () => {
      const result = await axios('/api/stores', {
        params: {
          id,
        },
      });
      return result.data;
    },
    {
      enabled: !!id,
    }
  );

  return (
    <Layout>
      <StoreForm store={data} />
    </Layout>
  );
}
