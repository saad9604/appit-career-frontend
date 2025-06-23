"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

export default function Hero() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    // Using Intersection Observer to check if hero section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        // Adjust threshold as needed - 0.1 means when 10% of the element is visible
        threshold: 0.1,
        // rootMargin can be used to trigger slightly before/after the element enters/exits
        rootMargin: '0px'
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Memoize scrollToSection function to prevent unnecessary re-renders
  const scrollToSection = useCallback(() => {
    if (isHeroVisible) {
      // Scroll down to the next section
      const nextSection = document.querySelector('section:nth-of-type(2)');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Scroll up to the hero section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isHeroVisible]);
  return (
    <section 
      ref={heroRef}
      className="relative bg-black text-white overflow-hidden md:!h-[85vh] lg:!h-[calc(100vh+100px)] xl:!h-[calc(100vh+150px)]"
      style={{ 
        width: '100vw',
        height: '80vh', /* Reduced height for small screens only */
        minHeight: '500px', /* Lower minimum height for small screens */
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw'
      }}
    >
      {/* Background Video */}
      <video 
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }} // Flip horizontally
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/videos/landingvideo.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay to ensure text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative w-full h-full px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col justify-center md:justify-start lg:justify-start lg:pt-[calc(50vh-100px)] xl:pt-[calc(50vh-90px)]">
        <div className="hero-text-container pl-2 sm:pl-4 md:pl-6 lg:pl-16 transform translate-y-[10%] sm:translate-y-[15%] md:translate-y-[60%] lg:translate-y-[25px] lg:transform-none">
          {/* Text Container with original responsive specifications */}
          <div 
            className="flex flex-col justify-center items-start gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[450px]"
          >
            {/* Heading with responsive specifications */}
            <h1 
              className="font-jost text-white text-lg sm:text-xl md:text-xl lg:text-[27px] font-semibold leading-[120%] w-full"
            >
              Revolutionize your business with AI-driven solutions from APPIT Software Solutions
            </h1>
            
            {/* Subheading/paragraph with responsive specifications */}
            <p 
              className="font-jost text-[#f2f2f2] text-sm sm:text-base md:text-base lg:text-[21px] font-normal leading-[120%] w-full"
            >
              Unlock smarter operations and better decision-making with AI-driven tools. APPIT Software Solutions helps businesses enhance efficiency, drive innovation, and stay competitive with intelligent, future-ready technology.
            </p>

            {/* Button with responsive specifications */}
            <button 
              className="font-jost group flex items-center gap-3 sm:gap-4 md:gap-[15px] lg:gap-[20px] rounded-[32px] bg-[#0066B3] px-4 py-2 sm:px-5 sm:py-3 md:px-4 md:py-2 lg:px-5 lg:py-3 transition-all duration-300 hover:bg-[#A50F15]"
            >
              <span className="text-white text-sm sm:text-base md:text-base lg:text-[18px] font-medium">Explore Appit Gen AI</span>
              <div className="relative flex items-center justify-center w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] md:w-[30px] md:h-[30px] lg:w-[36px] lg:h-[36px]">
                {/* Default state - original logo */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 32 32" 
                  fill="none"
                  className="w-full h-full group-hover:opacity-0 transition-opacity duration-300"
                >
                  <path d="M16.0001 2.66665C19.5363 2.66665 22.9277 4.07141 25.4282 6.57189C27.9287 9.07238 29.3334 12.4638 29.3334 16C29.3334 19.5362 27.9287 22.9276 25.4282 25.4281C22.9277 27.9286 19.5363 29.3333 16.0001 29.3333C12.4639 29.3333 9.07248 27.9286 6.57199 25.4281C4.07151 22.9276 2.66675 19.5362 2.66675 16C2.66675 12.4638 4.07151 9.07238 6.57199 6.57189C9.07248 4.07141 12.4639 2.66665 16.0001 2.66665ZM16.2614 9.72265C16.1372 9.8465 16.0387 9.99364 15.9715 10.1556C15.9043 10.3176 15.8697 10.4913 15.8697 10.6666C15.8697 10.842 15.9043 11.0157 15.9715 11.1777C16.0387 11.3397 16.1372 11.4868 16.2614 11.6106L19.3174 14.6666H9.33341C8.97979 14.6666 8.64065 14.8071 8.39061 15.0572C8.14056 15.3072 8.00008 15.6464 8.00008 16C8.00008 16.3536 8.14056 16.6927 8.39061 16.9428C8.64065 17.1928 8.97979 17.3333 9.33341 17.3333H19.3174L16.2614 20.3893C16.1374 20.5131 16.0391 20.6601 15.9719 20.8219C15.9048 20.9837 15.8701 21.1572 15.87 21.3324C15.8699 21.5076 15.9043 21.6811 15.9712 21.843C16.0381 22.0049 16.1363 22.152 16.2601 22.276C16.3839 22.3999 16.5309 22.4983 16.6927 22.5655C16.8545 22.6326 17.0279 22.6673 17.2031 22.6674C17.3783 22.6675 17.5518 22.6331 17.7137 22.5662C17.8756 22.4993 18.0228 22.4011 18.1467 22.2773L23.4801 16.944C23.6042 16.8201 23.7028 16.673 23.77 16.511C23.8372 16.349 23.8718 16.1754 23.8718 16C23.8718 15.8246 23.8372 15.6509 23.77 15.489C23.7028 15.327 23.6042 15.1798 23.4801 15.056L18.1467 9.72265C17.8967 9.47269 17.5576 9.33227 17.2041 9.33227C16.8505 9.33227 16.5115 9.47269 16.2614 9.72265Z" fill="white"/>
                </svg>
                
                {/* Hover state - circle with arrow */}
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-[-45deg] text-[#A50F15]">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Arrow indicator */}
      <div className="fixed bottom-4 right-4 sm:right-8 md:right-12 z-50">
        <button 
          className="bg-red-600 text-white p-2 sm:p-3 rounded-full hover:bg-red-700 transition-colors"
          onClick={scrollToSection}
          aria-label={isHeroVisible ? "Scroll down" : "Scroll to top"}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isHeroVisible ? (
              // Down arrow
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            ) : (
              // Up arrow
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            )}
          </svg>
        </button>
      </div>

      {/* Import Jost font explicitly */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');
        
        /* Custom media query for specific screen size range */
        @media (min-width: 768px) and (max-width: 1028px) {
          .hero-text-container {
            padding-top: 6rem !important;
            transform: translateY(80%) !important;
          }
        }
        
        /* Custom media query for larger screens */
        @media (min-width: 1029px) and (max-width: 1279px) {
          .hero-text-container {
            padding-top: 3rem !important;
            transform: translateY(45px) !important;
          }
        }
        
        @media (min-width: 1280px) {
          .hero-text-container {
            padding-top: 2rem !important;
            transform: translateY(60px) !important;
          }
        }
      `}</style>
    </section>
  )
}