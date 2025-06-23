'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Chatbot from '@/components/home/Chatbot';

export default function ChatbotWithPathCheck() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  
  // Only show component after client-side hydration is complete
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Don't render anything during SSR or before hydration
  if (!isMounted) {
    return null;
  }
  
  // Don't show chatbot on partnership page or platform page
  if (pathname === '/partnership' || pathname === '/platform') {
    return null;
  }
  
  return <Chatbot />;
}