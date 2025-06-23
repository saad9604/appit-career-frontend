"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const GrowBusiness = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef(null);
  
  // Helper function to handle window resize events for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation for sequential appearance
  useEffect(() => {
    if (isVisible && activeIndex < 5) {
      const timer = setTimeout(() => {
        setActiveIndex(prev => prev + 1);
      }, 500); // 500ms delay between each column
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, activeIndex]);

  // Detect when timeline enters or leaves viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When component enters viewport
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset animation when component leaves viewport
          setIsVisible(false);
          setActiveIndex(-1);
        }
      },
      { threshold: 0.1, rootMargin: '-10% 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Individual positions for each dot to align with image centers
  const dotPositions = [
    '70px',     // 2015 - center of first image, moved slightly right
    '241px',    // 2018 - center of second image, moved slightly right
    '407px',    // 2020 - center of third image, moved slightly right
    '573px',    // 2022 - center of fourth image, moved slightly right
    '744px'     // 2025 - center of fifth image, moved slightly right
  ];

  // Mobile responsive positions
  const getMobilePositions = () => {
    if (windowWidth < 640) {
      return [
        '15%',     // 2015 - percentage for better mobile scaling
        '30%',     // 2018
        '50%',     // 2020
        '70%',     // 2022
        '85%'      // 2025
      ];
    } else {
      return [
        '50px',     // 2015
        '168px',    // 2018
        '286px',    // 2020
        '404px',    // 2022
        '522px'     // 2025
      ];
    }
  };
  
  const mobilePositions = getMobilePositions();

  const timelineData = [
    {
      year: '2015',
      imagePath: '2015',
      description: 'Establishment & Foundation'
    },
    {
      year: '2018',
      imagePath: '2018',
      description: 'Growth & Expansion'
    },
    {
      year: '2020',
      imagePath: '2020',
      description: 'Innovation & Impact'
    },
    {
      year: '2022',
      imagePath: '2022',
      description: 'Strengthening Foundations'
    },
    {
      year: '2025',
      imagePath: '2025',
      description: 'A Breakthrough Year'
    }
  ];

  return (
    <section ref={sectionRef} className="pt-24 md:pt-28 lg:pt-32 pb-0 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden bg-white">
      <div className="container mx-auto max-w-[1400px] px-4">
        <div className="relative">
          {/* Main content section */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mb-14 sm:mb-20 lg:mb-24">
            {/* Left side: Text */}
            <div className="flex flex-col items-start gap-7 w-full lg:w-[47%]">
              {/* Heading */}
              <h2 className={`text-3xl md:text-4xl font-semibold font-['Jost'] leading-[120%] transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="text-[#EC1C26]">Grow</span> your Business & Customer Satisfaction with <span className="text-[#EC1C26]">APPIT</span>
              </h2>
              
              {/* Paragraph */}
              <p className={`text-lg md:text-xl lg:text-[21px] font-normal font-['Jost'] leading-[130%] transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
                APPIT Software aims to deliver IT Services & Business Solutions that exceed the client's expectations. It is possible only when we update ourselves to agile and innovative IT solutions that can serve value to the business.
              </p>
            </div>
            
            {/* Right side: Image with logo and cropped shape */}
            <div className={`relative w-full lg:w-[53%] h-[320px] sm:h-[370px] md:h-[420px] lg:h-[480px] mt-4 lg:mt-0 transition-all duration-700 ease-out ${windowWidth < 1024 ? 'overflow-hidden' : ''} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ 
                transitionDelay: '200ms',
                borderRadius: windowWidth < 1024 ? '20px' : 'inherit'
              }}>
              {/* Just use the original image */}
              <img 
                src="/images/about/growbusiness.png" 
                alt="Business Growth" 
                className={windowWidth < 1024 ? 'grayscale' : ''}
                style={{ 
                  width: windowWidth < 1024 ? '100%' : '103%', 
                  height: windowWidth < 1024 ? '100%' : '103%', 
                  maxWidth: 'none',
                  borderRadius: windowWidth < 1024 ? '20px' : 'inherit',
                  objectFit: windowWidth < 1024 ? 'cover' : 'inherit'
                }}
              />
              
              {/* Red arrow logo positioned */}
              <div className="absolute left-[36%] top-[67%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                  <Image 
                    src="/images/about/imagearrow_styled.svg" 
                    alt="Arrow Icon" 
                    width={95} 
                    height={95} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* LARGE SCREENS: Timeline section - positioned to potentially overlap with image */}
          <div className="absolute w-full left-0 bottom-0 z-20 hidden lg:block" style={{ transform: 'translateY(29%)' }}>
            <div className="w-full max-w-[801px] h-[185px] flex-shrink-0">
              {/* Timeline section */}
              <div className="relative w-full">
                {/* Timeline images */}
                <div className="flex w-full mb-8" style={{ justifyContent: 'space-between' }}>
                  {timelineData.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col items-center"
                      style={{
                        width: '127px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.7s ease',
                        opacity: activeIndex >= index ? 1 : 0,
                        transform: activeIndex >= index ? 'translateX(0)' : 'translateX(-30px)'
                      }}
                    >
                      <div className="h-[61px] w-full overflow-hidden" style={{
                        borderRadius: '24px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                        alignSelf: 'stretch',
                        backgroundPosition: '0px -10.838px',
                        backgroundSize: '100% 156.808%',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'lightgray'
                      }}>
                        <Image 
                          src={`/images/about/${item.year === '2018' || item.year === '2020' ? item.year + '.png' : item.year + '.jpg'}`} 
                          alt={`Year ${item.year}`} 
                          width={127} 
                          height={61} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-semibold text-center text-[#252525] text-xs md:text-base font-['Jost']">
                        {item.year}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Timeline bar with dots */}
                <div className="relative w-full h-[2px] bg-black mb-6">
                  {timelineData.map((item, index) => {
                    return (
                      <div 
                        key={index} 
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ 
                          left: dotPositions[index],
                          transform: 'translateX(-50%)',
                          transition: 'all 0.7s ease',
                          opacity: activeIndex >= index ? 1 : 0,
                          scale: activeIndex >= index ? 1 : 0
                        }}
                      >
                        {index === 0 ? (
                          <div className="-mt-[15px] -ml-[15px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                              <circle cx="15" cy="15" r="15" fill="#EC1C26"/>
                            </svg>
                          </div>
                        ) : (
                          <div className="-mt-[12px] -ml-[12px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 24" fill="none">
                              <circle cx="12.5" cy="12" r="12" fill="#EC1C26"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Timeline descriptions */}
                <div className="flex w-full mb-6" style={{ justifyContent: 'space-between' }}>
                  {timelineData.map((item, index) => (
                    <div 
                      key={index} 
                      className="text-center"
                      style={{
                        width: '127px',
                        transition: 'all 0.7s ease',
                        opacity: activeIndex >= index ? 1 : 0,
                        transform: activeIndex >= index ? 'translateY(0)' : 'translateY(20px)'
                      }}
                    >
                      <p className="text-black font-['Jost'] text-base font-normal leading-[120%] whitespace-pre-line">
                        {item.description.split(' & ').map((part, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && <><br />& <br /></>}
                            {part}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Spacer for timeline that's positioned absolutely */}
        <div className="hidden lg:block" style={{ height: '160px' }}></div>
        
        {/* Responsive Timeline for smaller screens */}
        <div className="block lg:hidden -mt-2 mb-16">
          <h4 className="text-xl font-semibold font-['Jost'] mb-2 md:text-center">Our Journey</h4>
          
          {/* Small screens (mobile) - centered vertical timeline */}
          <div className="relative md:hidden px-4">
            {/* Vertical line - centered */}
            <div className="absolute left-1/2 top-2 bottom-10 w-[2px] bg-black"></div>
            
            {timelineData.map((item, index) => (
              <div 
                key={index}
                className={`relative flex flex-col items-center mb-10 transition-all duration-700 ease-out`}
                style={{
                  opacity: activeIndex >= index ? 1 : 0,
                  transform: activeIndex >= index ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                {/* Circle with year - centered */}
                <div className="relative z-10 flex-shrink-0 mb-3">
                  {index === 0 ? (
                    <div className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#EC1C26] text-white font-semibold text-xs">
                      {item.year}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#EC1C26] text-white font-semibold text-xs">
                      {item.year}
                    </div>
                  )}
                </div>
                
                {/* Content - centered */}
                <div className="flex flex-col items-center">
                  <div className="mb-2 h-[70px] w-[180px] overflow-hidden rounded-lg shadow-md">
                    <Image 
                      src={`/images/about/${item.year === '2018' || item.year === '2020' ? item.year + '.png' : item.year + '.jpg'}`}
                      alt={`Year ${item.year}`}
                      width={127} 
                      height={61}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-sm text-center font-['Jost'] max-w-[180px]">{item.description}</h4>
                </div>
              </div>
            ))}
          </div>
          
          {/* Medium screens (tablets) - centered horizontal timeline */}
          <div className="hidden md:block max-w-[700px] mx-auto px-4">
            {/* Timeline images */}
            <div className="flex justify-between mb-6">
              {timelineData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center"
                  style={{
                    width: '127px',
                    transition: 'all 0.7s ease',
                    opacity: activeIndex >= index ? 1 : 0,
                    transform: activeIndex >= index ? 'translateY(0)' : 'translateY(-20px)',
                    transitionDelay: `${index * 200}ms`,
                  }}
                >
                  <div className="h-[61px] w-full overflow-hidden rounded-lg shadow-md">
                    <Image 
                      src={`/images/about/${item.year === '2018' || item.year === '2020' ? item.year + '.png' : item.year + '.jpg'}`} 
                      alt={`Year ${item.year}`} 
                      width={127} 
                      height={61} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-center text-[#252525] text-sm mt-2">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Timeline bar with dots */}
            <div className="relative w-full h-[2px] bg-black mb-6">
              {timelineData.map((item, index) => {
                // Calculate positions evenly across the width
                const position = `${index * 25}%`;
                return (
                  <div 
                    key={index} 
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ 
                      left: position,
                      transform: 'translateX(-50%)',
                      transition: 'all 0.7s ease',
                      opacity: activeIndex >= index ? 1 : 0,
                      scale: activeIndex >= index ? 1 : 0,
                      transitionDelay: `${index * 200}ms`,
                    }}
                  >
                    <div className="-mt-[12px] -ml-[12px]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 24" fill="none">
                        <circle cx="12.5" cy="12" r="12" fill="#EC1C26"/>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Timeline descriptions */}
            <div className="flex justify-between">
              {timelineData.map((item, index) => (
                <div 
                  key={index} 
                  className="text-center"
                  style={{
                    width: '127px',
                    transition: 'all 0.7s ease',
                    opacity: activeIndex >= index ? 1 : 0,
                    transform: activeIndex >= index ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 200 + 100}ms`,
                  }}
                >
                  <p className="text-black font-['Jost'] text-sm font-normal leading-[120%] whitespace-pre-line">
                    {item.description.split(' & ').map((part, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <><br />& <br /></>}
                        {part}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowBusiness;