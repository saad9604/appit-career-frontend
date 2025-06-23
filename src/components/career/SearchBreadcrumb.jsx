"use client";

import React from 'react';
import Link from 'next/link';

const SearchBreadcrumb = () => {
  return (
    <div className="flex w-full max-w-[1239px] h-[60px] px-4 sm:px-6 md:px-8 py-[5px] mx-auto items-center gap-4 sm:gap-6 md:gap-[25px] border-b border-[#B0B0B0] bg-white">
      {/* Career Link with Arrow */}
      <Link href="/career" className="flex justify-center items-center gap-2 sm:gap-3 md:gap-[18px] group">
        <span className="text-[#5D5D5D] font-jost text-base sm:text-lg md:text-[21px] font-semibold leading-[120%] group-hover:text-[#EC1C26] transition-colors">
          Career
        </span>
        <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px] transform rotate-0 group-hover:translate-x-1 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 41 40" fill="none" className="w-full h-full">
            <path d="M15.9833 26.4667L22.45 20L15.9833 13.5333C15.829 13.379 15.7066 13.1958 15.6231 12.9942C15.5396 12.7926 15.4966 12.5766 15.4966 12.3583C15.4966 12.1401 15.5396 11.924 15.6231 11.7224C15.7066 11.5208 15.829 11.3376 15.9833 11.1833C16.1376 11.029 16.3208 10.9066 16.5224 10.8231C16.724 10.7396 16.9401 10.6966 17.1583 10.6966C17.3765 10.6966 17.5926 10.7396 17.7942 10.8231C17.9958 10.9066 18.179 11.029 18.3333 11.1833L25.9833 18.8333C26.1378 18.9875 26.2604 19.1707 26.344 19.3723C26.4276 19.5739 26.4707 19.7901 26.4707 20.0083C26.4707 20.2266 26.4276 20.4428 26.344 20.6444C26.2604 20.846 26.1378 21.0291 25.9833 21.1833L18.3333 28.8333C18.1791 28.9878 17.9959 29.1104 17.7943 29.1941C17.5927 29.2777 17.3766 29.3207 17.1583 29.3207C16.94 29.3207 16.7239 29.2777 16.5222 29.1941C16.3206 29.1104 16.1375 28.9878 15.9833 28.8333C15.3499 28.1833 15.3333 27.1167 15.9833 26.4667Z" fill="#5D5D5D" className="group-hover:fill-[#EC1C26] transition-colors"/>
          </svg>
        </div>
      </Link>

      {/* Divider */}
      <div className="w-[1px] sm:w-[1.5px] md:w-[2px] h-[30px] sm:h-[35px] md:h-[45px] bg-[#B0B0B0]"></div>

      {/* Search Text with Arrow (Current page - not clickable) */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-[18px]">
        <span className="text-black font-jost text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
          Search
        </span>
        <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 41 40" fill="none" className="w-full h-full">
            <path d="M15.9833 26.4667L22.45 20L15.9833 13.5333C15.829 13.379 15.7066 13.1958 15.6231 12.9942C15.5396 12.7926 15.4966 12.5766 15.4966 12.3583C15.4966 12.1401 15.5396 11.924 15.6231 11.7224C15.7066 11.5208 15.829 11.3376 15.9833 11.1833C16.1376 11.029 16.3208 10.9066 16.5224 10.8231C16.724 10.7396 16.9401 10.6966 17.1583 10.6966C17.3765 10.6966 17.5926 10.7396 17.7942 10.8231C17.9958 10.9066 18.179 11.029 18.3333 11.1833L25.9833 18.8333C26.1378 18.9875 26.2604 19.1707 26.344 19.3723C26.4276 19.5739 26.4707 19.7901 26.4707 20.0083C26.4707 20.2266 26.4276 20.4428 26.344 20.6444C26.2604 20.846 26.1378 21.0291 25.9833 21.1833L18.3333 28.8333C18.1791 28.9878 17.9959 29.1104 17.7943 29.1941C17.5927 29.2777 17.3766 29.3207 17.1583 29.3207C16.94 29.3207 16.7239 29.2777 16.5222 29.1941C16.3206 29.1104 16.1375 28.9878 15.9833 28.8333C15.3499 28.1833 15.3333 27.1167 15.9833 26.4667Z" fill="#000000"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBreadcrumb;