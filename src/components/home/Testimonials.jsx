"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    quote: "APPIT was able to add value to my existing business with intelligent technology solutions. We were able to scale our service offerings and differentiate our business from the competition. We're very pleased with the result",
    name: "Jason",
    position: "Director, Arrow Solutions",
    image: "/images/test1.png"
  },
  {
    id: 2,
    quote: "Working with APPIT has been a real pleasure. They really understood my needs as a client and were fantastic in understanding the needs of our customers. I recommend them highly enough.",
    name: "Jonathan Roper",
    position: "Product Manager, Nexas pvt lmt",
    image: "/images/test2.png"
  },
  {
    id: 3,
    quote: "APPIT Software understood our needs and gave us the right and required solution. It is very important to choose the right partner who understands the rite requirements of our business.",
    name: "Nagarjuna",
    position: "Co-Director, Hyderabad IT Solutions",
    image: "/images/test3.png"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentContent, setCurrentContent] = useState(testimonials[0]);
  const [previousContent, setPreviousContent] = useState(null);
  const [isInView, setIsInView] = useState(false);
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
    // Add scroll event listener
    window.addEventListener('scroll', checkInView);
    // Check on initial load
    checkInView();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', checkInView);
    };
  }, []);
  
  // Function to handle transitions with crossfade
  const handleTransition = (nextIndex) => {
    // Start transition and store current content for crossfade
    setIsTransitioning(true);
    setPreviousContent(currentContent);
    
    // Change content after a delay (halfway through the fade transition)
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setCurrentContent(testimonials[nextIndex]);
      
      // End transition after the fade-in is complete
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 600);
  };
  
  // Function to navigate to the next testimonial
  const nextTestimonial = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    handleTransition(nextIndex);
  };
  
  // Function to navigate to the previous testimonial
  const prevTestimonial = () => {
    const nextIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    handleTransition(nextIndex);
  };
  
  // Auto rotate testimonials every 6 seconds
  useEffect(() => {
    // Only start the timer if not in transition
    if (!isTransitioning) {
      const interval = setInterval(() => {
        nextTestimonial();
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [currentIndex, isTransitioning]); // Dependencies
  
  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className={`inline-flex flex-col justify-center items-center gap-10 bg-[#252525] px-4 sm:px-8 md:px-16 lg:px-[120px] py-[46px] w-full font-jost ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } transition-all duration-1000 ease-out`}
    >
      {/* Separator Line at Bottom */}
      <div className="w-full h-px bg-white/10 absolute bottom-0 left-0"></div>
      
      {/* Text container */}
      <div className={`flex flex-col items-center gap-4 w-full max-w-[1152px] ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } transition-all duration-1000 ease-out delay-300`}>
        {/* Heading */}
        <h2 className="text-white text-center text-3xl md:text-4xl lg:text-[50px] font-semibold leading-[120%]">
          Don't just take our words for it – <span className="text-[#EC1C26]">Take theirs!</span>
        </h2>
        
        {/* Subheading */}
        <p className="self-stretch text-white text-center text-lg md:text-xl lg:text-[21px] font-semibold leading-[120%]">
          Testimonial
        </p>
      </div>
      
      {/* Main content container - Reordered for mobile */}
      <div className="w-full max-w-[1152px] relative">
        {/* Testimonial container */}
        <div className={`flex flex-col-reverse md:flex-row items-center gap-8 md:gap-[65px] w-full ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } transition-all duration-1000 ease-out delay-500`}>
          {/* Left container - text and logo */}
          <div className="flex flex-col items-start gap-8 w-full md:w-[623px]">
            {/* Quote icon */}
            <div className="flex flex-col items-start self-stretch">
              <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150" fill="none" className="w-[80px] sm:w-[100px] md:w-[150px] h-[80px] sm:h-[100px] md:h-[150px]">
                <path d="M71.1749 99.15C71.1749 93.6 69.6749 88.8 66.5999 84.9C61.9499 79.05 52.8749 78.3 47.6249 79.5C45.4499 67.125 55.9499 51.375 69.5249 44.625L59.0999 30C38.6249 39.75 18.4499 62.1 21.8999 90.375C24.0749 108.225 34.4249 120 49.0499 120C55.4249 120 60.7499 118.125 64.9499 114.375C69.1499 110.625 71.1749 105.525 71.1749 99.15ZM131.55 99.15C131.55 93.6 130.05 88.8 126.975 84.9C122.25 79.05 113.25 78.3 108 79.5C105.825 67.125 116.325 51.375 129.9 44.625L119.475 30C98.9999 39.75 78.8999 62.1 82.3499 90.375C84.5249 108.225 94.7999 120 109.425 120C115.8 120 121.125 118.125 125.325 114.375C129.525 110.625 131.55 105.525 131.55 99.15Z" fill="white" fillOpacity="0.8"/>
              </svg>
            </div>
            
            {/* Testimonial paragraph with enhanced crossfade */}
            <div className="self-stretch h-auto min-h-[120px] sm:min-h-[127px] overflow-hidden relative">
              {/* Previous quote text (for crossfade effect) */}
              {isTransitioning && previousContent && (
                <p 
                  className="text-white text-base sm:text-lg md:text-[21px] font-semibold leading-[120%] absolute inset-0"
                  style={{ 
                    animation: 'fadeOut 1000ms cubic-bezier(0.33, 1, 0.68, 1) forwards'
                  }}
                  aria-hidden="true"
                >
                  {previousContent.quote}
                </p>
              )}
              
              {/* Current quote text */}
              <p 
                className={`text-white text-base sm:text-lg md:text-[21px] font-semibold leading-[120%] ${isTransitioning ? 'absolute inset-0' : ''}`}
                style={{ 
                  opacity: isTransitioning ? 0 : 1,
                  animation: isTransitioning ? 'fadeIn 1000ms cubic-bezier(0.33, 1, 0.68, 1) 600ms forwards' : 'none'
                }}
              >
                {currentContent.quote}
              </p>
            </div>
            
            {/* Name and position with enhanced crossfade */}
            <div className="relative">
              {/* Previous name/position (for crossfade effect) */}
              {isTransitioning && previousContent && (
                <div 
                  className="absolute inset-0"
                  style={{ 
                    animation: 'fadeOut 1000ms cubic-bezier(0.33, 1, 0.68, 1) forwards'
                  }}
                  aria-hidden="true"
                >
                  <p className="text-[#EC1C26] text-lg md:text-[21px] font-semibold leading-[120%]">
                    {previousContent.name}
                  </p>
                  <p className="text-white text-sm md:text-[16px] font-semibold leading-[120%]">
                    {previousContent.position}
                  </p>
                </div>
              )}
              
              {/* Current name/position */}
              <div
                style={{ 
                  opacity: isTransitioning ? 0 : 1,
                  animation: isTransitioning ? 'fadeIn 1000ms cubic-bezier(0.33, 1, 0.68, 1) 700ms forwards' : 'none'
                }}
              >
                <p className="text-[#EC1C26] text-lg md:text-[21px] font-semibold leading-[120%]">
                  {currentContent.name}
                </p>
                <p className="text-white text-sm md:text-[16px] font-semibold leading-[120%]">
                  {currentContent.position}
                </p>
              </div>
            </div>
            
            {/* Arrow navigation - Only visible on larger screens */}
            <div className="hidden md:flex justify-start items-center gap-12 relative mt-2">
              {/* Previous button */}
              <button 
                onClick={prevTestimonial}
                className="nav-btn"
                aria-label="Previous testimonial"
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-arrow">
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pointerEvents="none"/>
                </svg>
              </button>
              
              {/* Next button */}
              <button 
                onClick={nextTestimonial}
                className="nav-btn"
                aria-label="Next testimonial"
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-arrow">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pointerEvents="none"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Right container - image with enhanced crossfade */}
          <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[512px] h-auto aspect-[512/434] flex items-center justify-center overflow-hidden">
            {/* Shadow effect - static */}
            <div 
              className="absolute w-[90%] sm:w-[90%] md:w-[459px] h-[90%] sm:h-[90%] md:h-[404px] bg-[#454545] blur-[10px] right-0 bottom-0 z-0"
            ></div>
            
            {/* Image container with enhanced crossfade */}
            <div className="absolute left-0 top-0 w-[90%] sm:w-[90%] md:w-[459px] h-[90%] sm:h-[90%] md:h-[404px] overflow-hidden z-10">
              {/* Previous image (for crossfade effect) */}
              {isTransitioning && previousContent && (
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${previousContent.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: previousContent.id === 3 ? 'center 30%' : 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'lightgray',
                    animation: 'fadeOut 1000ms cubic-bezier(0.33, 1, 0.68, 1) forwards'
                  }}
                  aria-hidden="true"
                ></div>
              )}
              
              {/* Current image with enhanced crossfade */}
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${currentContent.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: currentContent.id === 3 ? 'center 30%' : 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'lightgray',
                  opacity: isTransitioning ? 0 : 1,
                  animation: isTransitioning ? 'fadeIn 1000ms cubic-bezier(0.33, 1, 0.68, 1) 600ms forwards' : 'none'
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Navigation arrows for mobile and tablet - Positioned at bottom center */}
        <div className="md:hidden flex justify-center items-center gap-6 w-full mt-10 z-20">
          <button 
            onClick={prevTestimonial}
            className="nav-btn-mobile"
            aria-label="Previous testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="nav-btn-mobile"
            aria-label="Next testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Add keyframes and styles */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .nav-btn {
          width: 75px;
          height: 75px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          border: 1px solid white;
          background: transparent;
          transition: all 0.3s ease;
          cursor: pointer;
          padding: 0;
          position: relative;
        }
        
        .nav-btn:hover {
          background-color: #EC1C26;
          border-color: #EC1C26;
        }

        .nav-btn-mobile {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          border: 1px solid white;
          background: rgba(37, 37, 37, 0.9); /* Darker semi-transparent background */
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
          cursor: pointer;
          padding: 0;
          position: relative;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3); /* Added shadow for better visibility */
        }
        
        .nav-btn-mobile:hover {
          background-color: #EC1C26;
          border-color: #EC1C26;
        }
        
        .nav-arrow {
          pointer-events: none;
        }

        /* Media queries for responsive adjustments */
        @media (max-width: 480px) {
          .nav-btn-mobile {
            width: 45px;
            height: 45px;
          }
          
          .mt-10 {
            margin-top: 2rem; /* Smaller margin on very small screens */
          }
        }

        /* Import Jost font explicitly */
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  );
}