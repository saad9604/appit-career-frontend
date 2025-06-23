"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function WhyChoose() {
  // State to track which card is being hovered
  const [hoveredCard, setHoveredCard] = useState(null);
  // State to track which card is being touched
  const [touchedCard, setTouchedCard] = useState(null);
  // State to track whether element is in viewport for animation
  const [isInView, setIsInView] = useState(false);
  
  // Create references for each element we want to animate
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

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

  // Set up intersection observer to trigger animations
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

  // Handle click outside cards
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the card
      if (touchedCard !== null && !event.target.closest('.card-item')) {
        setTouchedCard(null);
      }
    };

    // Add event listener
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [touchedCard]);

  // Reset cardsRef when card count changes
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, 4);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full py-8 sm:py-12 md:py-16 lg:py-[57px] px-2 sm:px-4 md:px-8 lg:px-[120px] flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-[60px] bg-[#F5F6FA] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] font-jost"
    >
      {/* Heading and paragraph container */}
      <div className="w-full max-w-[1152px] flex flex-col items-center gap-4 sm:gap-5 md:gap-[20px]">
        <h2 
          className={`text-center text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-semibold leading-[120%] m-0 transition-all duration-500 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-[#EC1C26] lg:text-[50px] lg:font-semibold lg:leading-[120%]">Why Choose</span>{' '}
          <span className="text-[#252525] sm:inline md:inline lg:inline lg:text-[50px] lg:font-semibold lg:leading-[120%]">APPIT Software</span>
          <span className="text-[#252525] sm:inline md:inline lg:inline lg:text-[50px] lg:font-semibold lg:leading-[120%]"> Solutions</span>
          <span className="text-[#252525] sm:inline md:inline lg:inline whitespace-nowrap lg:text-[50px] lg:font-semibold lg:leading-[120%]"> ?</span>
        </h2>
        <p 
          className={`w-full text-center text-[#000] text-lg sm:text-xl md:text-2xl lg:text-[21px] font-semibold leading-[120%] m-0 transition-all duration-500 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.2s' }}
        >
          We solve your most complex technology challenges with innovative, scalable solutions. From strategy to execution, we transform your digital ecosystem to unlock new growth.
        </p>
      </div>

      {/* Cards container */}
      <div className="w-full max-w-[1200px] 2xl:max-w-[1250px] flex justify-center flex-wrap gap-4 lg:gap-6 xl:gap-[20px] px-1 sm:px-2 md:px-4 lg:px-8 card-container">
        {/* First Card */}
        <div
          ref={el => cardsRef.current[0] = el}
          className={`w-[calc(50%-8px)] xs:w-[calc(50%-8px)] sm:w-[calc(50%-10px)] md:w-[calc(50%-20px)] lg:w-[calc(50%-20px)] xl:w-[calc(50%-20px)] h-[220px] xs:h-[240px] sm:h-[340px] md:h-[380px] lg:h-[255px] flex flex-col justify-center items-center py-4 rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] bg-cover bg-center bg-no-repeat lg:shadow-[0px_0px_10px_2px_rgba(0,0,0,0.25)] shadow-lg cursor-pointer relative overflow-hidden transition-all duration-500 ease-out card-item ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          style={{ 
            backgroundImage: 'url(/images/first_card.jpg)',
            transitionDelay: '0.3s'
          }}
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          // For touch devices
          onTouchStart={(e) => {
            e.stopPropagation();
            setTouchedCard(1);
          }}
        >
          {/* Background overlay with transition */}
          <div
            className="absolute inset-0 bg-[#003352] transition-opacity duration-300 ease-in-out z-10"
            style={{
              opacity: hoveredCard === 1 || touchedCard === 1 ? 1 : 0
            }}
          />

          {/* Hover content */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-[40px_24px] lg:flex lg:flex-col lg:justify-center z-30 transition-opacity duration-300 ease-in-out hover-content"
            style={{
              opacity: hoveredCard === 1 || touchedCard === 1 ? 1 : 0
            }}
          >
            <p className="text-white text-center text-base xs:text-lg sm:text-xl md:text-xl lg:text-[21px] font-normal leading-[120%] m-0 px-2 xs:px-4 sm:px-6 lg:self-stretch lg:font-normal lg:mt-auto lg:mb-auto">
              Our extensive experience in AI development and implementation gives us a proven track record of success and expertise to meet your business's AI needs.
            </p>
          </div>

          {/* Default content */}
          <div 
            className="text-center z-20 transition-opacity duration-300 ease-in-out flex flex-col items-center justify-center h-full"
            style={{
              opacity: hoveredCard === 1 || touchedCard === 1 ? 0 : 1
            }}
          >
            <div 
              className="w-[80px] h-[80px] xs:w-[90px] xs:h-[90px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] lg:w-[140px] lg:h-[140px] mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-0 inline-block bg-center bg-contain bg-no-repeat"
              style={{
                backgroundImage: 'url(/images/first_logo.png)'
              }}
            />
            <p className="text-white text-center text-sm xs:text-base sm:text-lg md:text-xl lg:text-[21px] font-semibold leading-[120%] mt-2 xs:mt-3 m-0 lg:self-stretch">
              10+ Years of Experience
            </p>
          </div>
        </div>
        
        {/* Second Card */}
        <div
          ref={el => cardsRef.current[1] = el}
          className={`w-[calc(50%-8px)] xs:w-[calc(50%-8px)] sm:w-[calc(50%-10px)] md:w-[calc(50%-20px)] lg:w-[calc(50%-20px)] xl:w-[calc(50%-20px)] h-[220px] xs:h-[240px] sm:h-[340px] md:h-[380px] lg:h-[255px] flex flex-col justify-center items-center py-4 rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] bg-cover bg-center bg-no-repeat lg:shadow-[0px_0px_10px_2px_rgba(0,0,0,0.25)] shadow-lg cursor-pointer relative overflow-hidden transition-all duration-500 ease-out card-item ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          style={{ 
            backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), url(/images/second_card.jpg)',
            transitionDelay: '0.4s'
          }}
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          // For touch devices
          onTouchStart={(e) => {
            e.stopPropagation();
            setTouchedCard(2);
          }}
        >
          {/* Background overlay with transition */}
          <div
            className="absolute inset-0 bg-[#C8E4D8] transition-opacity duration-300 ease-in-out z-10"
            style={{
              opacity: hoveredCard === 2 || touchedCard === 2 ? 1 : 0
            }}
          />

          {/* Hover content */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-[40px_24px] lg:flex lg:flex-col lg:justify-center z-30 transition-opacity duration-300 ease-in-out hover-content"
            style={{
              opacity: hoveredCard === 2 || touchedCard === 2 ? 1 : 0
            }}
          >
            <p className="text-[#252525] text-center text-base xs:text-lg sm:text-xl md:text-xl lg:text-[21px] font-normal leading-[120%] m-0 px-2 xs:px-4 sm:px-6 lg:self-stretch lg:font-normal lg:mt-auto lg:mb-auto">
              Employing over 150 individuals, we offer a broad range of skills and knowledge to support your business's AI requirements, providing a comprehensive solution to meet your needs
            </p>
          </div>

          {/* Default content */}
          <div 
            className="text-center z-20 transition-opacity duration-300 ease-in-out flex flex-col items-center justify-center h-full"
            style={{
              opacity: hoveredCard === 2 || touchedCard === 2 ? 0 : 1
            }}
          >
            <div 
              className="w-[100px] h-[80px] xs:w-[110px] xs:h-[90px] sm:w-[160px] sm:h-[130px] md:w-[180px] md:h-[150px] lg:w-[209px] lg:h-[140px] mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-0 inline-block bg-center bg-contain bg-no-repeat"
              style={{
                backgroundImage: 'url(/images/second_logo.png)'
              }}
            />
            <p className="text-black text-center text-sm xs:text-base sm:text-lg md:text-xl lg:text-[21px] font-semibold leading-[120%] mt-2 xs:mt-3 m-0 lg:self-stretch">
              Team of 250+ Experts
            </p>
          </div>
        </div>
        
        {/* Third Card */}
        <div
          ref={el => cardsRef.current[2] = el}
          className={`w-[calc(50%-8px)] xs:w-[calc(50%-8px)] sm:w-[calc(50%-10px)] md:w-[calc(50%-20px)] lg:w-[calc(50%-20px)] xl:w-[calc(50%-20px)] h-[220px] xs:h-[240px] sm:h-[340px] md:h-[380px] lg:h-[255px] flex flex-col justify-center items-center py-4 rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] bg-cover bg-center bg-no-repeat lg:shadow-[0px_0px_10px_2px_rgba(0,0,0,0.25)] shadow-lg cursor-pointer relative overflow-hidden transition-all duration-500 ease-out card-item ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          style={{ 
            backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), url(/images/third_card.jpg)',
            transitionDelay: '0.5s'
          }}
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
          // For touch devices
          onTouchStart={(e) => {
            e.stopPropagation();
            setTouchedCard(3);
          }}
        >
          {/* Background overlay with transition */}
          <div
            className="absolute inset-0 bg-[#060606] transition-opacity duration-300 ease-in-out z-10"
            style={{
              opacity: hoveredCard === 3 || touchedCard === 3 ? 1 : 0
            }}
          />

          {/* Hover content */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-[40px_24px] lg:flex lg:flex-col lg:justify-center z-30 transition-opacity duration-300 ease-in-out hover-content"
            style={{
              opacity: hoveredCard === 3 || touchedCard === 3 ? 1 : 0
            }}
          >
            <p className="text-white text-center text-base xs:text-lg sm:text-xl md:text-xl lg:text-[21px] font-normal leading-[120%] m-0 px-2 xs:px-4 sm:px-6 lg:self-stretch lg:font-normal lg:mt-auto lg:mb-auto">
              Our extensive experience in AI development and implementation gives us a proven track record of success and expertise to meet your business's AI needs.
            </p>
          </div>

          {/* Default content */}
          <div 
            className="text-center z-20 transition-opacity duration-300 ease-in-out flex flex-col items-center justify-center h-full"
            style={{
              opacity: hoveredCard === 3 || touchedCard === 3 ? 0 : 1
            }}
          >
            <div 
              className="w-[80px] h-[80px] xs:w-[90px] xs:h-[90px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] lg:w-[162px] lg:h-[140px] mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-0 inline-block bg-center bg-contain bg-no-repeat"
              style={{
                backgroundImage: 'url(/images/third_logo.png)'
              }}
            />
            <p className="text-white text-center text-sm xs:text-base sm:text-lg md:text-xl lg:text-[21px] font-semibold leading-[120%] mt-2 xs:mt-3 m-0 lg:self-stretch">
              People Driven
            </p>
          </div>
        </div>
        
        {/* Fourth Card */}
        <div
          ref={el => cardsRef.current[3] = el}
          className={`w-[calc(50%-8px)] xs:w-[calc(50%-8px)] sm:w-[calc(50%-10px)] md:w-[calc(50%-20px)] lg:w-[calc(50%-20px)] xl:w-[calc(50%-20px)] h-[220px] xs:h-[240px] sm:h-[340px] md:h-[380px] lg:h-[255px] flex flex-col justify-center items-center py-4 rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] bg-cover bg-center bg-no-repeat lg:shadow-[0px_0px_10px_2px_rgba(0,0,0,0.25)] shadow-lg cursor-pointer relative overflow-hidden transition-all duration-500 ease-out card-item ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          style={{ 
            backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(/images/fourth_card.jpg)',
            transitionDelay: '0.6s'
          }}
          onMouseEnter={() => setHoveredCard(4)}
          onMouseLeave={() => setHoveredCard(null)}
          // For touch devices
          onTouchStart={(e) => {
            e.stopPropagation();
            setTouchedCard(4);
          }}
        >
          {/* Background overlay with transition */}
          <div
            className="absolute inset-0 bg-[#4992B1] transition-opacity duration-300 ease-in-out z-10"
            style={{
              opacity: hoveredCard === 4 || touchedCard === 4 ? 1 : 0
            }}
          />

          {/* Hover content */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-[40px_24px] lg:flex lg:flex-col lg:justify-center z-30 transition-opacity duration-300 ease-in-out hover-content"
            style={{
              opacity: hoveredCard === 4 || touchedCard === 4 ? 1 : 0
            }}
          >
            <p className="text-white text-center text-base xs:text-lg sm:text-xl md:text-xl lg:text-[21px] font-normal leading-[120%] m-0 px-2 xs:px-4 sm:px-6 lg:self-stretch lg:font-normal lg:mt-auto lg:mb-auto">
              We prioritize our employees' growth and development, ensuring a dedicated and motivated team that is committed to delivering the best AI solutions for your business.
            </p>
          </div>

          {/* Default content */}
          <div 
            className="text-center z-20 transition-opacity duration-300 ease-in-out flex flex-col items-center justify-center h-full"
            style={{
              opacity: hoveredCard === 4 || touchedCard === 4 ? 0 : 1
            }}
          >
            <div 
              className="w-[80px] h-[80px] xs:w-[90px] xs:h-[90px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] lg:w-[146px] lg:h-[140px] mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-0 inline-block bg-center bg-contain bg-no-repeat"
              style={{
                backgroundImage: 'url(/images/fourth_logo.png)'
              }}
            />
            <p className="text-white text-center text-sm xs:text-base sm:text-lg md:text-xl lg:text-[21px] font-semibold leading-[120%] mt-2 xs:mt-3 m-0 lg:self-stretch">
              Global Presence
            </p>
          </div>
        </div>
      </div>
      
      {/* Import Jost font explicitly */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');
        
        @media (min-width: 768px) and (max-width: 1023px) {
          .card-container > div p {
            font-size: 18px !important;
          }
          .card-container > div .hover-content p {
            font-size: 16px !important;
          }
        }
        
        @media (min-width: 1024px) and (max-width: 1496px) {
          .card-container > div {
            width: calc(50% - 20px) !important;
            height: 255px !important;
            margin-bottom: 16px;
          }
          .card-container > div p {
            font-size: 18px !important;
          }
          .card-container > div .hover-content p {
            font-size: 17px !important;
            padding: 0 15px !important;
          }
        }
        
        @media (min-width: 1497px) {
          .card-container > div {
            width: calc(50% - 20px) !important;
            max-width: 588px !important;
            margin-bottom: 16px;
          }
          .card-container {
            justify-content: center;
            gap: 20px !important;
          }
        }
        
        @media (min-width: 481px) and (max-width: 767px) {
          .card-container > div {
            width: calc(50% - 12px) !important;
            height: 280px !important;
          }
          .card-container > div p {
            font-size: 16px !important;
          }
          .card-container > div .hover-content p {
            font-size: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .card-container > div {
            width: calc(50% - 8px) !important;
            height: 220px !important;
            margin-bottom: 16px;
          }
          .card-container > div p {
            font-size: 14px !important;
          }
          .card-container > div .hover-content p {
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}