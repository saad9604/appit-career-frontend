"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ContactSection() {
  // State to track when elements are in viewport
  const [isInView, setIsInView] = useState(false);
  
  // Reference for the section
  const sectionRef = useRef(null);

  // Function to check if element is in viewport
  const checkInView = () => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // If the top of the element is in view
    if (rect.top <= windowHeight * 0.7 && rect.bottom >= 0) {
      setIsInView(true);
    } else {
      // Reset animations when scrolling away
      setIsInView(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', checkInView);
    // Check on initial load
    checkInView();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', checkInView);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white font-jost py-10 sm:py-12 md:py-16 lg:py-24"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:gap-[55px]">
        {/* Heading and text container */}
        <div 
          className={`flex flex-col items-center gap-3 sm:gap-4 md:gap-[16px] w-full ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-all duration-1000 ease-out`}
        >
          <h2 className="text-[#252525] text-center text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-semibold leading-[120%]">
            Start Your <span className="text-[#EC1C26]">New Project</span> With APPIT
          </h2>
          
          <p 
            className={`text-[#252525] text-center text-base sm:text-lg md:text-xl lg:text-[21px] font-semibold leading-[120%] w-full ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } transition-all duration-1000 ease-out delay-200`}
          >
            Let's Try! Get A Call From Support Team!
          </p>
        </div>
        
        {/* Buttons container */}
        <div 
          className={`w-full max-w-[1229px] ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-all duration-1000 ease-out delay-300`}
        >
          {/* Flexible container for all buttons */}
          <div className="w-full flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-[44px]">
            {/* Contact Us Button */}
            <div className="flex">
              <Link 
                href="#contact"
                className="flex w-[130px] xs:w-[150px] sm:w-[200px] md:w-[260px] lg:w-[379px] h-[36px] xs:h-[40px] sm:h-[50px] md:h-[65px] lg:h-[82px] px-1.5 xs:px-2 sm:px-3 lg:px-5 py-[2px] xs:py-[3px] sm:py-[4px] justify-center items-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-[32px] rounded-[15px] xs:rounded-[20px] sm:rounded-[30px] lg:rounded-[50px] border border-[#4A0508] shadow-sm xs:shadow-md transition-all duration-300 ease-in-out hover:bg-black hover:border-white hover:border group"
              >
                <span className="text-[#252525] font-normal text-xs xs:text-sm sm:text-base md:text-xl lg:text-[27px] leading-[120%] transition-colors duration-300 ease-in-out group-hover:text-white">
                  Contact Us
                </span>
                
                {/* Arrow that changes on hover */}
                <div className="relative w-3 h-3 xs:w-4 xs:h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10">
                  {/* Default arrow */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 40 40" 
                    fill="none"
                    className="absolute transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                  >
                    <path d="M6.66683 20H33.3335M33.3335 20L23.3335 30M33.3335 20L23.3335 10" 
                      stroke="black" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  
                  {/* Hover arrow */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    className="transform rotate-[-45deg] absolute opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" 
                      stroke="white" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
            
            {/* Email Us Button */}
            <div className="flex">
              <Link 
                href="#email"
                className="flex w-[130px] xs:w-[150px] sm:w-[200px] md:w-[260px] lg:w-[379px] h-[36px] xs:h-[40px] sm:h-[50px] md:h-[65px] lg:h-[82px] px-1.5 xs:px-2 sm:px-3 lg:px-5 py-[2px] xs:py-[3px] sm:py-[4px] justify-center items-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-[32px] rounded-[15px] xs:rounded-[20px] sm:rounded-[30px] lg:rounded-[50px] border border-[#4A0508] shadow-sm xs:shadow-md transition-all duration-300 ease-in-out hover:bg-black hover:border-white hover:border group"
              >
                <span className="text-[#252525] font-normal text-xs xs:text-sm sm:text-base md:text-xl lg:text-[27px] leading-[120%] transition-colors duration-300 ease-in-out group-hover:text-white">
                  Email Us
                </span>
                
                {/* Arrow that changes on hover */}
                <div className="relative w-3 h-3 xs:w-4 xs:h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10">
                  {/* Default arrow */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 40 40" 
                    fill="none"
                    className="absolute transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                  >
                    <path d="M6.66683 20H33.3335M33.3335 20L23.3335 30M33.3335 20L23.3335 10" 
                      stroke="black" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  
                  {/* Hover arrow */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    className="transform rotate-[-45deg] absolute opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" 
                      stroke="white" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
            
            {/* Location Button */}
            <div className="flex">
              <Link 
                href="#location"
                className="flex w-[130px] xs:w-[150px] sm:w-[200px] md:w-[260px] lg:w-[379px] h-[36px] xs:h-[40px] sm:h-[50px] md:h-[65px] lg:h-[82px] px-1.5 xs:px-2 sm:px-3 lg:px-5 py-[2px] xs:py-[3px] sm:py-[4px] justify-center items-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-[32px] rounded-[15px] xs:rounded-[20px] sm:rounded-[30px] lg:rounded-[50px] border border-[#4A0508] shadow-sm xs:shadow-md transition-all duration-300 ease-in-out hover:bg-black hover:border-white hover:border group"
              >
                <span className="text-[#252525] font-normal text-xs xs:text-sm sm:text-base md:text-xl lg:text-[27px] leading-[120%] transition-colors duration-300 ease-in-out group-hover:text-white">
                  Location
                </span>
                
                {/* Arrow that changes on hover */}
                <div className="relative w-3 h-3 xs:w-4 xs:h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10">
                  {/* Default arrow */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 40 40" 
                    fill="none"
                    className="absolute transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                  >
                    <path d="M6.66683 20H33.3335M33.3335 20L23.3335 30M33.3335 20L23.3335 10" 
                      stroke="black" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  
                  {/* Hover arrow */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    className="transform rotate-[-45deg] absolute opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" 
                      stroke="white" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Import Jost font explicitly */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  );
}