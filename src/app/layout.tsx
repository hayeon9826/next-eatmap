import { Metadata } from 'next';
import { NextAuthProvider } from './providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Eatmap',
  description: 'Next.js 13을 이용한 지도앱',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
