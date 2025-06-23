'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HideDefaultHeader() {
  const pathname = usePathname();
  const isAILawyerPage = pathname === '/products/ai-lawyers';

  useEffect(() => {
    // Find the default header
    const defaultHeader = document.querySelector('header:not([data-custom="ai-lawyer"])');
    
    if (defaultHeader && isAILawyerPage) {
      // Hide the default header on AI Lawyer page
      defaultHeader.style.display = 'none';
    }

    return () => {
      // Show the default header when navigating away
      if (defaultHeader) {
        defaultHeader.style.display = '';
      }
    };
  }, [isAILawyerPage]);

  // This component doesn't render anything
  return null;
}
