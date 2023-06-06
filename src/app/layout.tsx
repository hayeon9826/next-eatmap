import { Metadata } from 'next';
import { NextAuthProvider } from './providers';
import '@/styles/globals.css';
import GoogleAnalytics from './googleAnalytics';

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
      <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID} />
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
