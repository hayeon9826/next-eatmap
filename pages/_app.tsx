import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session as Session}>
        <Component {...pageProps} />
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
