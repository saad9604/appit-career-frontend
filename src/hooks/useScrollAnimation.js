'use client';
import { useState, useEffect, useRef } from 'react';

export default function useScrollAnimation() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when element enters or exits viewport
        setIsInView(entry.isIntersecting);
      },
      {
        // Element is considered "in view" when 10% visible
        threshold: 0.1,
        // Start observing before element comes into view
        rootMargin: '0px 0px -25% 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup observer on component unmount
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { ref, isInView };
}
