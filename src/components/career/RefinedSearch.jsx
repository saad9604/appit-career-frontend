"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const RefinedSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchValue, setSearchValue] = useState(initialQuery);
  const sectionRef = useRef(null);
  const searchBarRef = useRef(null);
  
  // Handle search submission
  const handleSearch = () => {
    if (searchValue.trim()) {
      // Update the current URL instead of navigating to a new page
      router.replace(`/career-search?q=${encodeURIComponent(searchValue.trim())}`);
      console.log(`Refined search with query: ${searchValue.trim()}`);
    }
  };
  
  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Add smooth scroll animation that resets when section is scrolled in/out of view
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When section enters viewport
          if (entry.isIntersecting) {
            // Animate search bar appearance
            if (searchBarRef.current) {
              searchBarRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
              searchBarRef.current.style.opacity = '0';
              searchBarRef.current.style.transform = 'translateY(20px)';
              
              // Trigger animation after a small delay
              setTimeout(() => {
                if (searchBarRef.current) {
                  searchBarRef.current.style.opacity = '1';
                  searchBarRef.current.style.transform = 'translateY(0)';
                }
              }, 300);
            }
          } else {
            // Reset animations when scrolled out of view
            if (searchBarRef.current) {
              searchBarRef.current.style.transition = 'none';
              searchBarRef.current.style.opacity = '0';
              searchBarRef.current.style.transform = 'translateY(20px)';
            }
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );
    
    // Start observing the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Cleanup
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#F6F6F6] py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto gap-4 sm:gap-6">
        <h3 className="text-center font-['Jost'] text-xl sm:text-2xl md:text-[28px] font-semibold leading-[120%] w-full mb-2">
          Refine Your Search
        </h3>
        
        {/* Search Bar with animation */}
        <div 
          ref={searchBarRef}
          className="flex items-center justify-between w-full max-w-[608px] h-[60px] sm:h-[65px] md:h-[72px] px-4 sm:px-5 md:px-6 py-[10px] bg-white rounded-[50px] shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] transition-all duration-500 ease-out"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          {/* Left side with search icon and placeholder */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 w-full min-w-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" className="flex-shrink-0 w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px]">
              <path d="M15.8333 26.6667C12.8056 26.6667 10.2433 25.6178 8.14667 23.52C6.05 21.4222 5.00111 18.86 5 15.8333C4.99889 12.8067 6.04778 10.2444 8.14667 8.14667C10.2456 6.04889 12.8078 5 15.8333 5C18.8589 5 21.4217 6.04889 23.5217 8.14667C25.6217 10.2444 26.67 12.8067 26.6667 15.8333C26.6667 17.0556 26.4722 18.2083 26.0833 19.2917C25.6944 20.375 25.1667 21.3333 24.5 22.1667L33.8333 31.5C34.1389 31.8056 34.2917 32.1944 34.2917 32.6667C34.2917 33.1389 34.1389 33.5278 33.8333 33.8333C33.5278 34.1389 33.1389 34.2917 32.6667 34.2917C32.1944 34.2917 31.8056 34.1389 31.5 33.8333L22.1667 24.5C21.3333 25.1667 20.375 25.6944 19.2917 26.0833C18.2083 26.4722 17.0556 26.6667 15.8333 26.6667ZM15.8333 23.3333C17.9167 23.3333 19.6878 22.6044 21.1467 21.1467C22.6056 19.6889 23.3344 17.9178 23.3333 15.8333C23.3322 13.7489 22.6033 11.9783 21.1467 10.5217C19.69 9.065 17.9189 8.33556 15.8333 8.33333C13.7478 8.33111 11.9772 9.06056 10.5217 10.5217C9.06611 11.9828 8.33667 13.7533 8.33333 15.8333C8.33 17.9133 9.05945 19.6844 10.5217 21.1467C11.9839 22.6089 13.7544 23.3378 15.8333 23.3333Z" fill="#5D5D5D"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search by role, skill, or location" 
              className="text-[#6D6D6D] font-['Jost'] text-xs sm:text-sm md:text-base font-normal outline-none w-full min-w-0 bg-transparent"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          
          {/* Filter icon */}
          <div className="flex-shrink-0 ml-1 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" className="drop-shadow-md w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px]">
              <g filter="url(#filter0_d_893_4526)">
                <path fillRule="evenodd" clipRule="evenodd" d="M5 11.6667C5 11.2246 5.17559 10.8007 5.48816 10.4882C5.80072 10.1756 6.22464 10 6.66667 10H33.3333C33.7754 10 34.1993 10.1756 34.5118 10.4882C34.8244 10.8007 35 11.2246 35 11.6667C35 12.1087 34.8244 12.5326 34.5118 12.8452C34.1993 13.1577 33.7754 13.3333 33.3333 13.3333H6.66667C6.22464 13.3333 5.80072 13.1577 5.48816 12.8452C5.17559 12.5326 5 12.1087 5 11.6667ZM8.33333 19.1667C8.33333 18.7246 8.50893 18.3007 8.82149 17.9882C9.13405 17.6756 9.55797 17.5 10 17.5H30C30.442 17.5 30.866 17.6756 31.1785 17.9882C31.4911 18.3007 31.6667 18.7246 31.6667 19.1667C31.6667 19.6087 31.4911 20.0326 31.1785 20.3452C30.866 20.6577 30.442 20.8333 30 20.8333H10C9.55797 20.8333 9.13405 20.6577 8.82149 20.3452C8.50893 20.0326 8.33333 19.6087 8.33333 19.1667ZM13.3333 26.6667C13.3333 26.2246 13.5089 25.8007 13.8215 25.4882C14.134 25.1756 14.558 25 15 25H25C25.442 25 25.8659 25.1756 26.1785 25.4882C26.4911 25.8007 26.6667 26.2246 26.6667 26.6667C26.6667 27.1087 26.4911 27.5326 26.1785 27.8452C25.8659 28.1577 25.442 28.3333 25 28.3333H15C14.558 28.3333 14.134 28.1577 13.8215 27.8452C13.5089 27.5326 13.3333 27.1087 13.3333 26.6667Z" fill="#4F4F4F"/>
              </g>
              <defs>
                <filter id="filter0_d_893_4526" x="-4" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="4"/>
                  <feGaussianBlur stdDeviation="2"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_893_4526"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_893_4526" result="shape"/>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefinedSearch;