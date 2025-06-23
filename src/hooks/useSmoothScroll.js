'use client';
import { useEffect } from 'react';

// This function adds smooth scroll behavior to the entire page
export default function useSmoothScroll() {
  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window === 'undefined') return;

    // Add smooth scrolling to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    const handleLinkClick = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };
    
    internalLinks.forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });
    
    // Add smooth scrolling to HTML element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup event listeners
    return () => {
      internalLinks.forEach(link => {
        link.removeEventListener('click', handleLinkClick);
      });
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  return null;
}
