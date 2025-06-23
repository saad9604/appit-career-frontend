'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import AboveFooterSection from '@/components/home/AboveFooterSection';
import ScrollToTopButton from '@/components/home/ScrollToTopButton';

const MainLayout = ({ children }) => {
  // State to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  
  // Set mounted flag after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During server-side rendering, return minimal layout without header
  // This prevents the header from briefly showing before it's properly initialized
  if (!isMounted) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 h-[96px] bg-white shadow-sm z-50"></div>
        <div className="pt-[96px]">
          {children}
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="pt-[96px]">
        {children}
      </div>
      <AboveFooterSection />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default MainLayout;