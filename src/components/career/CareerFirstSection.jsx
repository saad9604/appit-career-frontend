'use client';
import { useRef, useEffect, useState } from 'react';

const CareerFirstSection = () => {
  const cardsContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [isHoveringCards, setIsHoveringCards] = useState(false);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);

  // Card data
  const cardsData = [
    {
      number: '01',
      heading: 'Innovation-Driven Culture',
      description: 'We encourage curiosity, experimentation, and bold thinking. Whether it\'s AI, automation, or cloud transformation, we work on cutting-edge technologies that push the boundaries of what\'s possible.'
    },
    {
      number: '02',
      heading: 'People-Centric Environment',
      description: 'We believe our people are our biggest strength. We foster a supportive and inclusive workplace where every voice is valued, and collaboration drives success.'
    },
    {
      number: '03',
      heading: 'Innovation-Driven Culture',
      description: 'We encourage curiosity, experimentation, and bold thinking. Whether it\'s AI, automation, or cloud transformation, we work on cutting-edge technologies that push the boundaries of what\'s possible.'
    },
    {
      number: '04',
      heading: 'People-Centric Environment',
      description: 'We believe our people are our biggest strength. We foster a supportive and inclusive workplace where every voice is valued, and collaboration drives success.'
    },
    {
      number: '05',
      heading: 'Innovation-Driven Culture',
      description: 'We encourage curiosity, experimentation, and bold thinking. Whether it\'s AI, automation, or cloud transformation, we work on cutting-edge technologies that push the boundaries of what\'s possible.'
    },
    {
      number: '06',
      heading: 'People-Centric Environment',
      description: 'We believe our people are our biggest strength. We foster a supportive and inclusive workplace where every voice is valued, and collaboration drives success.'
    },
  ];

  // Set initial card position - first card fully visible, second card partially
  useEffect(() => {
    if (cardsContainerRef.current) {
      // Set to show first card fully
      cardsContainerRef.current.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsHoveringCards(true);
    };

    const handleMouseLeave = () => {
      setIsHoveringCards(false);
    };

    // Scroll handler - only active when hovering over cards
    const handleScroll = (event) => {
      // Skip for mobile or if not hovering cards
      if (window.innerWidth < 768 || !isHoveringCards || !cardsContainerRef.current) return;
      
      const cardsContainer = cardsContainerRef.current;
      const cardsHeight = cardsContainer.scrollHeight - cardsContainer.clientHeight;
      
      // Determine direction
      const scrollingDown = event.deltaY > 0;
      
      // Special handling when scrolling down and reached bottom
      if (scrollingDown && cardsContainer.scrollTop >= cardsHeight - 20) {
        setHasReachedBottom(true);
        return; // Let default scroll take over
      }
      
      // Special handling when scrolling up and at the top
      if (!scrollingDown && cardsContainer.scrollTop <= 0) {
        setHasReachedBottom(false);
        return; // Let default scroll take over
      }

      // If we're hovering and not at an edge case, handle scrolling
      if (isHoveringCards) {
        event.preventDefault();
        
        // Calculate how much to scroll
        const scrollAmount = event.deltaY;
        cardsContainer.scrollTop += scrollAmount;
      }
    };

    // Reset states when section scrolls out of view
    const handleWindowScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionRect = sectionRef.current.getBoundingClientRect();
      
      // If completely out of view, reset states
      if (sectionRect.bottom < 0 || sectionRect.top > window.innerHeight) {
        setHasReachedBottom(false);
        
        // Reset scroll position for next time
        if (cardsContainerRef.current) {
          cardsContainerRef.current.scrollTop = 0;
        }
      }
    };

    // Add event listeners
    if (cardsContainerRef.current) {
      cardsContainerRef.current.addEventListener('mouseenter', handleMouseEnter);
      cardsContainerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('scroll', handleWindowScroll);

    // Cleanup
    return () => {
      if (cardsContainerRef.current) {
        cardsContainerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        cardsContainerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [isHoveringCards, hasReachedBottom]);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#02D7B2] relative overflow-hidden h-auto min-h-[714px] md:h-[714px]"
    >
      <div className="mx-auto max-w-[1440px] h-full px-4 lg:px-[120px] relative py-16 md:py-0">
        {/* Left side heading - Responsive positioning */}
        <div className="md:absolute md:top-[80px] md:left-4 lg:left-[120px] w-full md:w-[390px] mb-12 md:mb-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-jost leading-[120%] text-left">
            <span className="text-black">WHY</span>{" "}
            <span className="text-white">JOIN</span><br />
            <span className="text-white">APPIT?</span>
          </h2>
        </div>
        
        {/* Right side cards - Responsive layout */}
        <div className="md:absolute md:top-[80px] md:right-4 lg:right-[120px] w-full md:w-[622px] md:h-[560px] overflow-hidden">
          <div 
            ref={cardsContainerRef}
            className="w-full h-auto md:h-full max-h-[80vh] md:max-h-none overflow-y-auto scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            <div className="flex flex-col gap-8">
              {/* First card visible, second partial */}
              {cardsData.map((card, index) => (
                <div 
                  key={index}
                  className="rounded-[24px] bg-black p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 md:gap-6 h-auto min-h-[250px] md:h-[323px]"
                >
                  <span className="text-white text-xl sm:text-2xl md:text-[27px] font-semibold font-jost leading-[120%]">
                    {card.number}
                  </span>
                  <h3 className="text-[#02D7B2] text-2xl sm:text-3xl md:text-[40px] font-semibold font-jost leading-[120%] uppercase">
                    {card.heading}
                  </h3>
                  <p className="text-white text-base sm:text-lg md:text-[21px] font-normal font-jost leading-[120%] mb-4">
                    {card.description}
                  </p>
                </div>
              ))}
              {/* Bottom space for better scrolling */}
              <div className="h-8 md:h-16"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CareerFirstSection;