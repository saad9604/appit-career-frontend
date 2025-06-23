'use client';

import { useState, useEffect } from 'react';

const RedLogoScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down'); // 'up' or 'down'
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Function to check scroll position and direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('up'); // Scrolling down, so button should go up
      } else {
        setScrollDirection('down'); // Scrolling up, so button should go down
      }
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
      
      // Show button after scrolling past hero section (adjust threshold as needed)
      if (currentScrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleClick = () => {
    if (scrollDirection === 'up') {
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Scroll to next section
      window.scrollTo({
        top: window.scrollY + window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`fixed bottom-8 right-4 sm:right-8 md:right-12 z-40 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <button 
        onClick={handleClick}
        className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#EC1C26] hover:bg-[#C7131A] shadow-lg transition-all duration-300 transform hover:scale-105"
        aria-label={scrollDirection === 'up' ? "Scroll to top" : "Scroll down"}
      >
        {/* Red circle with arrow */}
        <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
          {/* Arrow icon - changes direction based on scroll direction */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 ${scrollDirection === 'up' ? 'rotate-180' : 'rotate-0'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default RedLogoScrollButton;