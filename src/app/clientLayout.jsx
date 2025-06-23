'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/home/Header';

export default function RootLayout({ children }) {
  // Track if the component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  
  // Set mounted flag after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {/* The key prop ensures Header maintains its state across page transitions */}
      <Header key="persistent-header" />
      {children}
    </>
  );
}
