'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-[#252525] font-jost mt-10 xs:mt-8 sm:mt-0">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-[120px] py-5 pb-6 sm:py-6 md:py-7 lg:h-[80px]">
        {/* Copyright Text */}
        <div className="w-full sm:w-auto text-white text-xs sm:text-sm md:text-base font-normal leading-[120%] text-center sm:text-left mb-3 sm:mb-0">
          Copyright @ APPIT SOFTWARE 2025. All rights reserved.
        </div>
        
        {/* Policy Links */}
        <div className="w-full sm:w-auto flex flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 text-white text-[10px] xs:text-xs sm:text-sm md:text-base font-normal leading-[120%] text-center">
          <Link href="/privacy" className="whitespace-nowrap hover:text-[#EC1C26] transition-colors duration-300">
            Privacy Policy
          </Link>
          <span className="mx-1 sm:mx-2 inline">|</span>
          <Link href="/terms" className="whitespace-nowrap hover:text-[#EC1C26] transition-colors duration-300 text-[9px] xs:text-xs sm:text-sm md:text-base">
            Terms & Conditions
          </Link>
          <span className="mx-1 sm:mx-2 inline">|</span>
          <Link href="/sitemap" className="whitespace-nowrap hover:text-[#EC1C26] transition-colors duration-300">
            Sitemap
          </Link>
        </div>
      </div>
      
      {/* Import Jost font explicitly using a style block */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
    </footer>
  );
};

export default Footer;