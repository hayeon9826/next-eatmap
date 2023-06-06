'use client';

import { RecoilRoot } from 'recoil';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  children?: React.ReactNode;
};

const queryClient = new QueryClient();
export const NextAuthProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SessionProvider>
          {children}
          <ToastContainer
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            autoClose={1000}
          />
        </SessionProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};
