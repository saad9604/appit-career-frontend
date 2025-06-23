"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function CoreServices() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const handleCardInteraction = (id, event) => {
    // Prevent event from affecting other elements
    event.stopPropagation();
    setHoveredCard(id);
  };

  const handleCardLeave = (event) => {
    // Prevent event from affecting other elements
    event.stopPropagation();
    setHoveredCard(null);
  };

  const handleCardTouch = (id, event) => {
    // Prevent event from affecting other elements
    event.stopPropagation();
    
    // If the card is already hovered, unhover it
    if (hoveredCard === id) {
      setHoveredCard(null);
    } else {
      setHoveredCard(id);
      // Clear hover after delay
      setTimeout(() => setHoveredCard(prevId => prevId === id ? null : prevId), 1000);
    }
  };

  const services = [
    {
      id: 1,
      title: "Artificial Intelligence",
      image: "/images/ai.png",
    },
    {
      id: 2,
      title: "Oracle Solutions Expertise",
      image: "/images/oracle.png",
    },
    {
      id: 3, 
      title: "Data Analytics & Insights",
      image: "/images/data.png",
    },
    {
      id: 4,
      title: "Cloud Integration Services",
      image: "/images/cloud.png",
    }
  ];

  // Handle scroll for section animation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;
      
      if (isVisible && !isInView) {
        setIsInView(true);
        
        // Only animate once
        if (!hasAnimated) {
          setHasAnimated(true);
        }
      } else if (!isVisible && isInView) {
        setIsInView(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check initial position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInView, hasAnimated]);

  return (
    <section 
      ref={sectionRef}
      className="flex w-screen px-2 xs:px-4 sm:px-8 md:px-16 lg:px-[120px] py-8 xs:py-12 sm:py-16 md:py-[80px] flex-col justify-center items-center gap-4 xs:gap-6 sm:gap-8 md:gap-[40px] lg:gap-[30px] bg-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] font-jost"
    >
      {/* Section Heading */}
      <h2 
        className={`text-center text-[#252525] text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-semibold leading-[120%] transition-all duration-800 ease-out font-jost max-w-[95%] xs:max-w-[90%] md:max-w-[80%]
                   ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {' '}Transform your business with
        <span className="text-[#EC1C26] text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-semibold leading-[120%] font-jost">
          advanced technologies
        </span>
      </h2>

      {/* Section Subheading */}
      <p 
        className={` text-center text-[#252525] text-xs xs:text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-[120%] transition-all duration-800 ease-out font-jost max-w-[98%] xs:max-w-[95%] md:max-w-[90%] lg:max-w-[80%] lg:mt-6
                  ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        style={{ transitionDelay: '0.2s' }}
      >
        At APPIT Software, our aim is to connect businesses by integrating emerging IT solutions and cloud services in a dynamic environment, APPIT Software's extensive experience in the administration of complex IT solutions.
      </p>

      {/* Service Cards Container */}
      <div 
        className="flex flex-wrap justify-center items-start w-full max-w-[1200px] gap-4 sm:gap-6 md:gap-[15px] lg:gap-[20px] py-4 xs:py-6 sm:py-8 md:py-[40px] lg:py-[20px] lg:mt-0 mt-2 xs:mt-4 sm:mt-[20px]"
      >
        {services.map((service, index) => (
          <div 
            key={service.id}
            data-hovered={hoveredCard === service.id ? "true" : "false"}
            className={`service-card w-full xs:w-[calc(50%-8px)] sm:w-[calc(50%-12px)] md:w-[calc(50%-12px)] lg:w-[calc(50%-12px)] xl:w-[calc(25%-16px)] h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] lg:h-[411px] relative cursor-pointer mb-4 sm:mb-0 ${index < 2 && 'row-1'} ${index >= 2 && 'row-2'}
                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[100px]'}`}
            style={{ 
              transitionDelay: `${index * 0.1}s`,
              transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out, translate 0.5s ease-in-out'
            }}
            onMouseEnter={(e) => handleCardInteraction(service.id, e)}
            onMouseLeave={handleCardLeave}
            // For touch devices
            onTouchStart={(e) => {
              e.stopPropagation();
              handleCardTouch(service.id, e);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleCardTouch(service.id, e);
            }}
          >
            <div
              className="w-full h-full rounded-[12px] xs:rounded-[16px] flex flex-col justify-start items-center p-2 xs:p-3 sm:p-4 md:p-[25px_20px] relative overflow-hidden"
              style={{
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.60) 16.69%, rgba(0, 0, 0, 0.00) 31.3%), 
                           linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), 
                           url(${service.image}) lightgray 50% / cover no-repeat`
              }}
            >
              {/* First title (visible by default, fades out on hover) */}
              <h3 
                className="text-white text-sm xs:text-base sm:text-lg md:text-xl lg:text-[24px] font-semibold leading-[1.2] absolute top-2 xs:top-3 sm:top-4 md:top-[25px] w-[90%] text-center transition-all duration-250 ease-in-out font-jost"
                style={{
                  opacity: hoveredCard === service.id ? 0 : 1,
                  transform: 'translateY(0)',
                  transition: 'opacity 0.25s ease-in-out',
                  transitionDelay: hoveredCard === service.id ? '0s' : '0.2s'
                }}
              >
                {service.title}
              </h3>
              
              {/* Second title (hidden by default, fades in on hover with upward positioning) */}
              <h3 
                className="text-white text-sm xs:text-base sm:text-lg md:text-xl lg:text-[24px] font-semibold leading-[1.2] absolute w-[90%] text-center transition-all duration-250 ease-in-out font-jost"
                style={{
                  opacity: hoveredCard === service.id ? 1 : 0,
                  top: hoveredCard === service.id ? '10px' : '25px',
                  transform: 'translateY(0)',
                  transition: 'opacity 0.25s ease-in-out, top 0.4s ease-in-out',
                  transitionDelay: hoveredCard === service.id ? '0.2s' : '0s'
                }}
              >
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Import Jost font explicitly and add custom styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');
        
        /* Prevent hovered cards from affecting other cards' positions */
        .service-card {
          transform-origin: center center;
          isolation: isolate;
          pointer-events: auto;
          touch-action: manipulation;
          will-change: transform, opacity;
          position: relative;
        }
        
        /* Apply card-specific hover effect */
        .service-card[data-hovered="true"] {
          z-index: 10 !important;
          transform: translateY(-10px) scale(1.02) !important;
        }
        
        .service-card[data-hovered="false"] {
          z-index: 1;
          transform: translateY(0) scale(1);
        }
        
        /* Margin between rows for 2x2 layout */
        @media (max-width: 1450px) and (min-width: 480px) {
          .service-card.row-1 {
            margin-bottom: 60px !important;
          }
        }

        /* Custom media query for very small screens */
        @media (max-width: 380px) {
          .service-card {
            width: 100% !important;
            margin-bottom: 16px !important;
            height: 180px !important;
          }
        }

        /* Custom media query for large screens */
        @media (min-width: 1126px) and (max-width: 1279px) {
          .service-card {
            width: calc(50% - 20px) !important;
          }
        }
        
        /* Force 2x2 layout for certain screen sizes to avoid 3+1 */
        @media (min-width: 1280px) and (max-width: 1450px) {
          .service-card {
            width: calc(50% - 20px) !important;
          }
        }
      `}</style>
    </section>
  );
}