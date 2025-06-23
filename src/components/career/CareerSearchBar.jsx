'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CareerSearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get search params from URL
  const searchQuery = searchParams.get('q') || '';
  const jobTypeParam = searchParams.get('jobType') || '';
  const experienceLevelParam = searchParams.get('level') || '';
  
  // State management
  const [searchValue, setSearchValue] = useState(searchQuery);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filters, setFilters] = useState({
    jobType: jobTypeParam ? jobTypeParam.split(',') : [],
    experienceLevel: experienceLevelParam ? experienceLevelParam.split(',') : []
  });
  
  const filterPopupRef = useRef(null);
  
  // Update local state when URL search query changes
  useEffect(() => {
    setSearchValue(searchQuery);
    setFilters({
      jobType: jobTypeParam ? jobTypeParam.split(',') : [],
      experienceLevel: experienceLevelParam ? experienceLevelParam.split(',') : []
    });
  }, [searchQuery, jobTypeParam, experienceLevelParam]);
  
  // Handle search submission
  const handleSearch = () => {
    if (searchValue.trim()) { // Only redirect if there's search text
      // Build search parameters
      const params = new URLSearchParams();
      params.set('q', encodeURIComponent(searchValue.trim()));
      if (filters.jobType.length) params.set('jobType', filters.jobType.join(','));
      if (filters.experienceLevel.length) params.set('level', filters.experienceLevel.join(','));
      
      router.push(`/career-search?${params.toString()}`);
    }
  };
  
  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Remove a single filter
  const removeFilter = (type, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (type === 'jobType') {
        newFilters.jobType = prev.jobType.filter(item => item !== value);
      } else if (type === 'experienceLevel') {
        newFilters.experienceLevel = prev.experienceLevel.filter(item => item !== value);
      }
      
      // Update URL with new filters
      const params = new URLSearchParams();
      params.set('q', encodeURIComponent(searchValue.trim()));
      if (newFilters.jobType.length) params.set('jobType', newFilters.jobType.join(','));
      if (newFilters.experienceLevel.length) params.set('level', newFilters.experienceLevel.join(','));
      
      router.push(`/career-search?${params.toString()}`);
      return newFilters;
    });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({ jobType: [], experienceLevel: [] });
    
    // Update URL without filters
    router.push(`/career-search?q=${encodeURIComponent(searchValue.trim())}`);
  };
  
  // Apply filters from popup
  const applyFilters = () => {
    // Close the popup
    setShowFilterPopup(false);
    
    // Update URL with new filters
    const params = new URLSearchParams();
    params.set('q', encodeURIComponent(searchValue.trim()));
    if (filters.jobType.length) params.set('jobType', filters.jobType.join(','));
    if (filters.experienceLevel.length) params.set('level', filters.experienceLevel.join(','));
    
    router.push(`/career-search?${params.toString()}`);
  };
  
  return (
    <section className="w-full bg-[#FFFF] py-10 sm:py-10 md:py-12 pb-8 sm:pb-8 md:pb-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto gap-6 sm:gap-8 md:gap-10">
        {/* Heading */}
        <h2 className="text-center font-jost text-3xl sm:text-4xl md:text-[40px] lg:text-[48px] font-semibold leading-[120%] w-full">
          <span className="text-[#EC1C26]">Discover</span> Roles That Inspire You
        </h2>
        
        {/* Subheading */}
        <p className="text-center font-jost text-lg sm:text-xl md:text-[21px] lg:text-[24px] font-normal leading-[120%] w-full max-w-[800px]">
          Search and apply for jobs that match <span className="text-[#EC1C26]">your talent</span>
        </p>
        
        {/* Search Bar */}
        <div className="flex items-center justify-between w-full max-w-[280px] xs:max-w-[350px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[608px] h-[60px] sm:h-[65px] md:h-[72px] px-4 sm:px-5 md:px-6 py-[10px] bg-white rounded-[50px] shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] transition-all duration-500 ease-out">
          {/* Left side with search icon and placeholder */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 w-full min-w-0">
            <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" className="flex-shrink-0 w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px]">
                <path d="M15.8333 26.6667C12.8056 26.6667 10.2433 25.6178 8.14667 23.52C6.05 21.4222 5.00111 18.86 5 15.8333C4.99889 12.8067 6.04778 10.2444 8.14667 8.14667C10.2456 6.04889 12.8078 5 15.8333 5C18.8589 5 21.4217 6.04889 23.5217 8.14667C25.6217 10.2444 26.67 12.8067 26.6667 15.8333C26.6667 17.0556 26.4722 18.2083 26.0833 19.2917C25.6944 20.375 25.1667 21.3333 24.5 22.1667L33.8333 31.5C34.1389 31.8056 34.2917 32.1944 34.2917 32.6667C34.2917 33.1389 34.1389 33.5278 33.8333 33.8333C33.5278 34.1389 33.1389 34.2917 32.6667 34.2917C32.1944 34.2917 31.8056 34.1389 31.5 33.8333L22.1667 24.5C21.3333 25.1667 20.375 25.6944 19.2917 26.0833C18.2083 26.4722 17.0556 26.6667 15.8333 26.6667ZM15.8333 23.3333C17.9167 23.3333 19.6878 22.6044 21.1467 21.1467C22.6056 19.6889 23.3344 17.9178 23.3333 15.8333C23.3322 13.7489 22.6033 11.9783 21.1467 10.5217C19.69 9.065 17.9189 8.33556 15.8333 8.33333C13.7478 8.33111 11.9772 9.06056 10.5217 10.5217C9.06611 11.9828 8.33667 13.7533 8.33333 15.8333C8.33 17.9133 9.05945 19.6844 10.5217 21.1467C11.9839 22.6089 13.7544 23.3378 15.8333 23.3333Z" fill="#5D5D5D"/>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search by role, skill, or location" 
              className="text-[#6D6D6D] font-jost text-xs sm:text-sm md:text-base font-normal outline-none w-full min-w-0 bg-transparent"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          
          {/* Filter icon */}
          <div className="flex-shrink-0 ml-1 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setShowFilterPopup(true)}>
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
        
        {/* Selected Filters Display */}
        {(filters.jobType.length > 0 || filters.experienceLevel.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 max-w-[280px] xs:max-w-[350px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[608px] mx-auto">
            <span className="text-gray-700 font-jost text-sm md:text-base">Filters:</span>
            
            {/* Job Type Tags */}
            {filters.jobType.map(type => (
              <div 
                key={`job-${type}`} 
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-xs sm:text-sm flex items-center gap-1 group shadow-sm"
              >
                <span>{type}</span>
                <button 
                  onClick={() => removeFilter('jobType', type)}
                  className="text-gray-500 hover:text-[#EC1C26] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
            
            {/* Experience Level Tags */}
            {filters.experienceLevel.map(level => (
              <div 
                key={`exp-${level}`} 
                className="bg-red-100 text-[#EC1C26] px-2 py-1 rounded-md text-xs sm:text-sm flex items-center gap-1 group shadow-sm"
              >
                <span>{level}</span>
                <button 
                  onClick={() => removeFilter('experienceLevel', level)}
                  className="text-[#EC1C26] hover:text-red-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
            
            {/* Reset Button */}
            <button 
              onClick={resetFilters}
              className="text-[#EC1C26] text-xs sm:text-sm hover:underline transition-all font-medium ml-1"
            >
              Reset all
            </button>
          </div>
        )}
      </div>
      
      {/* Filter Popup */}
      {showFilterPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div 
            ref={filterPopupRef}
            className="bg-white rounded-2xl shadow-large w-full max-w-md p-6 animate-slide-up font-jost"
          >
            {/* Popup Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Filter Jobs</h3>
              <button 
                className="p-1 hover:bg-gray-100 rounded-full transition-colors" 
                onClick={() => setShowFilterPopup(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Job Type Filter */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-3">Job Type</h4>
              <div className="space-y-2">
                {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={filters.jobType.includes(type)}
                        onChange={() => {
                          setFilters(prev => {
                            const newJobType = prev.jobType.includes(type) 
                              ? prev.jobType.filter(t => t !== type)
                              : [...prev.jobType, type];
                            return { ...prev, jobType: newJobType };
                          });
                        }}
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-[#EC1C26] peer-checked:bg-[#EC1C26] transition-all"></div>
                      <svg
                        className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Experience Level Filter */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-3">Experience Level</h4>
              <div className="grid grid-cols-2 gap-3">
                {['Entry-level', 'Mid-level', 'Senior', 'Executive'].map((level) => (
                  <div 
                    key={level}
                    className={`px-4 py-2 rounded-full border-2 cursor-pointer transition-all shadow-sm ${filters.experienceLevel.includes(level) ? 'border-[#EC1C26] bg-red-100 text-[#EC1C26]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                    onClick={() => {
                      setFilters(prev => {
                        const newExpLevel = prev.experienceLevel.includes(level) 
                          ? prev.experienceLevel.filter(l => l !== level)
                          : [...prev.experienceLevel, level];
                        return { ...prev, experienceLevel: newExpLevel };
                      });
                    }}
                  >
                    <p className="text-center text-sm font-medium">{level}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-3 mt-8">
              <button 
                className="flex-1 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                onClick={resetFilters}
              >
                Clear All
              </button>
              <button 
                className="flex-1 py-3 rounded-lg bg-[#EC1C26] text-white font-medium hover:bg-red-700 transition-colors"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CareerSearchBar;