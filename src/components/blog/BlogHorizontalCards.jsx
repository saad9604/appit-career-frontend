'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Blog card data using content from BlogCards (IDs 2-12)
const blogCards = [
  {
    id: 1,
    title: "From Zero to Dev: How AI Is Changing Who Can Code",
    imagePath: "/images/blog/blogcards/card2.png"
  },
  {
    id: 2,
    title: "Microsoft Phases Out Skype: Here's What's Happening",
    imagePath: "/images/blog/blogcards/card3.png"
  },
  {
    id: 3,
    title: "OpenAI Scales Back Corporate Shift, Nonprofit Remains in Control",
    imagePath: "/images/blog/blogcards/card4.png"
  },
  {
    id: 4,
    title: "AI-Driven Search Innovation: Elevating Customer Experience for a Tech Giant",
    imagePath: "/images/blog/blogcards/card5.png"
  },
  {
    id: 5,
    title: "Oracle's $40 Billion Nvidia Chip Commitment: Powering OpenAI's Texas AI Data Center",
    imagePath: "/images/blog/blogcards/card6.png"
  },
  {
    id: 6,
    title: "AI-Driven Knowledge Management Transformation for a Global Software Services Provider",
    imagePath: "/images/blog/blogcards/card7.png"
  },
  {
    id: 7,
    title: "Deploy Any AI, Any Agent, Any Model on the New ServiceNow AI Platform",
    imagePath: "/images/blog/blogcards/card8.png"
  },
  {
    id: 8,
    title: "Stargate UAE Project Announced with Support from OpenAI, NVIDIA, Oracle, and More",
    imagePath: "/images/blog/blogcards/card9.png"
  },
  {
    id: 9,
    title: "Gemini Nano-Enabled API Released to Android Developers Ahead of Google I/O 2025",
    imagePath: "/images/blog/blogcards/card10.png"
  },
  {
    id: 10,
    title: "Google's New 'AI Mode' Button Could Replace 'I'm Feeling Lucky' Feature",
    imagePath: "/images/blog/blogcards/card11.png"
  },
  {
    id: 11,
    title: "Oracle, Cleveland Clinic, and G42 Forge Revolutionary Alliance to Launch AI-Powered Global Healthcare Platform",
    imagePath: "/images/blog/blogcards/card12.png"
  }
];

export default function BlogHorizontalCards() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Enable animations after mount to avoid hydration issues
  useEffect(() => {
    setAnimationEnabled(true);
  }, []);

  // Set up intersection observer to detect when section enters/exits viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px'
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle mouse down event
  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
    containerRef.current.style.userSelect = 'none';
  };

  // Handle touch start event
  const handleTouchStart = (e) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  // Handle mouse move event
  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2.5; // Increased scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle touch move event
  const handleTouchMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2.5; // Increased scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse up event
  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.removeProperty('user-select');
    }
  };

  // Handle mouse leave event
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
        containerRef.current.style.removeProperty('user-select');
      }
    }
  };

  // Handle touch end event
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#F6F6F6] pt-0 sm:pt-0 md:pt-0 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      <div className="max-w-[1244px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-end gap-5 sm:gap-6 md:gap-8 lg:gap-10">
        {/* Section Heading */}
        <h2 className="text-black text-right font-jost text-2xl xs:text-[24px] sm:text-[27px] font-semibold leading-[120%] self-stretch">
          Explore More Insights
        </h2>

        {/* Blog Cards Scrollable Container */}
        <div className="w-full relative overflow-hidden">
          <div 
            ref={containerRef}
            className={`flex items-stretch gap-2 2xs:gap-3 xs:gap-3 sm:gap-4 md:gap-5 w-full overflow-x-auto pb-4 ${
              animationEnabled ? 'scroll-smooth' : ''
            }`}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              msOverflowStyle: 'none',  /* Hide scrollbar in IE and Edge */
              scrollbarWidth: 'none'    /* Hide scrollbar in Firefox */
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {blogCards.map((card) => (
              <div 
              key={card.id} 
              className="flex-shrink-0 w-[200px] 2xs:w-[220px] xs:w-[240px] sm:w-[260px] md:w-[280px] lg:w-[384px]"
              >
                <BlogCard title={card.title} imagePath={card.imagePath} cardId={card.id} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .overflow-x-auto {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        /* Prevent pull-to-refresh on mobile */
        html, body {
          overscroll-behavior-x: none;
        }
      `}</style>
    </section>
  );
}

// Individual Blog Card Component
function BlogCard({ title, imagePath, cardId }) {
  // Special positioning for specific cards
  const getBackgroundPosition = () => {
    if (cardId === 9) {
      // Gemini card - fine-tuned position to show "Gemini" text
      return '28% center';
    } else if (cardId === 2) {
      // Skype card - move further right to center the "S" logo
      return '80% center';
    } else if (cardId === 10) {
      // Google AI Mode card - adjust if needed
      return 'center';
    } else if (cardId === 11) {
      // Oracle, Cleveland Clinic, and G42 card - adjust if needed
      return 'center';
    }
    return 'center'; // Default position
  };
  
  return (
    <Link href="/blogdetails" className="block w-full h-[180px] 2xs:h-[200px] xs:h-[220px] sm:h-[250px] md:h-[280px] lg:h-[480px] rounded-[16px] 2xs:rounded-[18px] xs:rounded-[20px] sm:rounded-[24px] overflow-hidden relative group cursor-pointer">
      {/* Card Background with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        style={{ 
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 62.98%, rgba(0, 0, 0, 0.50) 74.83%), url(${imagePath})`,
          backgroundPosition: getBackgroundPosition()
        }}
      />
      
      {/* Card Content Container */}
      <div className="absolute bottom-0 left-0 w-full p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8">
        <div className="flex flex-col items-start gap-2 xs:gap-3 sm:gap-4 md:gap-6 max-w-[200px] xs:max-w-[240px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[360px]">
          {/* Card Title */}
          <p className="text-white font-jost text-sm 2xs:text-sm xs:text-base sm:text-lg md:text-xl lg:text-[21px] font-semibold leading-[120%] self-stretch">
            {title}
          </p>
          
          {/* View More Button with Hover Effect */}
          <div className="cursor-pointer">
            <span className="text-white font-jost text-xs 2xs:text-xs xs:text-sm sm:text-base md:text-base lg:text-lg font-semibold leading-[120%] relative">
              View More
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}