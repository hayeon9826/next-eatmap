'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="pt-[52px]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
