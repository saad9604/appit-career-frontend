'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HideDefaultHeader() {
  const pathname = usePathname();
  const transparentHeaderPages = [
    '/products/ai-lawyers',
    '/services/oracle-ai' // Add Oracle AI page path here
  ];
  const shouldHideDefaultHeader = transparentHeaderPages.includes(pathname);

  useEffect(() => {
    // Find the default header
    const defaultHeader = document.querySelector('header:not([data-custom="transparent-header"])');
    
    if (defaultHeader && shouldHideDefaultHeader) {
      // Hide the default header on pages that use transparent header
      defaultHeader.style.display = 'none';
    }

    return () => {
      // Show the default header when navigating away
      if (defaultHeader) {
        defaultHeader.style.display = '';
      }
    };
  }, [shouldHideDefaultHeader]);

  // This component doesn't render anything
  return null;
}
