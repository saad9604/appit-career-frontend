'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import './blog-animations.css';

// Blog card data
const blogCards = [
  {
    id: 1,
    title: "AI Chatbots Have Yet to Disrupt Search Traffic, Research Shows",
    imagePath: "/images/blog/blogcards/card1"
  },
  {
    id: 2,
    title: "From Zero to Dev: How AI Is Changing Who Can Code",
    imagePath: "/images/blog/blogcards/card2"
  },
  {
    id: 3,
    title: "Microsoft Phases Out Skype: Here's What's Happening",
    imagePath: "/images/blog/blogcards/card3"
  },
  {
    id: 4,
    title: "OpenAI Scales Back Corporate Shift, Nonprofit Remains in Control",
    imagePath: "/images/blog/blogcards/card4"
  },
  {
    id: 5,
    title: "AI-Driven Search Innovation: Elevating Customer Experience for a Tech Giant",
    imagePath: "/images/blog/blogcards/card5"
  },
  {
    id: 6,
    title: "Oracle's $40 Billion Nvidia Chip Commitment: Powering OpenAI's Texas AI Data Center",
    imagePath: "/images/blog/blogcards/card6"
  },
  {
    id: 7,
    title: "AI-Driven Knowledge Management Transformation for a Global Software Services Provider",
    imagePath: "/images/blog/blogcards/card7"
  },
  {
    id: 8,
    title: "Deploy Any AI, Any Agent, Any Model on the New ServiceNow AI Platform",
    imagePath: "/images/blog/blogcards/card8"
  },
  {
    id: 9,
    title: "Stargate UAE Project Announced with Support from OpenAI, NVIDIA, Oracle, and More",
    imagePath: "/images/blog/blogcards/card9"
  },
  {
    id: 10,
    title: "Gemini Nano-Enabled API Released to Android Developers Ahead of Google I/O 2025",
    imagePath: "/images/blog/blogcards/card10"
  },
  {
    id: 11,
    title: "Google's New 'AI Mode' Button Could Replace 'I'm Feeling Lucky' Feature",
    imagePath: "/images/blog/blogcards/card11"
  },
  {
    id: 12,
    title: "Oracle, Cleveland Clinic, and G42 Forge Revolutionary Alliance to Launch AI-Powered Global Healthcare Platform",
    imagePath: "/images/blog/blogcards/card12"
  }
];

export default function BlogCards() {
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

  // Only run animations after hydration is complete
  useEffect(() => {
    setIsMounted(true);
    
    // Short timeout to ensure hydration is complete before animation starts
    const timer = setTimeout(() => {
      setAnimationsEnabled(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Set up the Intersection Observer to animate cards on scroll
  useEffect(() => {
    if (!isMounted || !animationsEnabled) return; // Skip if not mounted yet
    
    const options = {
      root: null,
      rootMargin: '30px', // Detect earlier
      threshold: 0.05 // Very low threshold for earlier detection
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Add visible class when card enters viewport
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          // Reset animation when card leaves viewport
          entry.target.classList.remove('visible');
        }
      });
    }, options);

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (cardRefs.current) {
        cardRefs.current.forEach((card) => {
          if (card) observer.unobserve(card);
        });
      }
    };
  }, [isMounted, animationsEnabled]);

  // Create reference array for cards
  useEffect(() => {
    if (isMounted) {
      cardRefs.current = cardRefs.current.slice(0, blogCards.length);
    }
  }, [blogCards.length, isMounted]);

  return (
    <section 
      ref={sectionRef} 
      className={`w-full bg-[#F6F6F6] py-16 md:py-20 lg:py-24 min-h-screen ${animationsEnabled ? 'js-enabled' : ''}`}
    >
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-0 max-w-[1440px]">
        {/* Section Heading */}
        <h2 className="text-[#252525] text-center font-jost text-3xl sm:text-4xl md:text-[50px] font-semibold leading-[120%] mb-12 md:mb-16 lg:mb-20">
          Stay Ahead with Industry Perspectives
        </h2>
        
        {/* Blog Cards Container */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1200px] mx-auto">
            {blogCards.map((card, index) => (
              <div
                key={card.id}
                ref={el => cardRefs.current[index] = el}
                className="blog-card"
                style={{ transitionDelay: `${Math.min(index * 60, 240)}ms` }}
              >
                <BlogCard title={card.title} imagePath={card.imagePath} cardId={card.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Individual Blog Card Component
function BlogCard({ title, imagePath, cardId }) {
  // Special positioning for specific cards
  const getBackgroundPosition = () => {
    if (cardId === 10) {
      // Gemini card - fine-tuned position to show "Gemini" text
      return '28% center';
    } else if (cardId === 3) {
      // Skype card - move further right to center the "S" logo
      return '80% center';
    }
    return 'center'; // Default position
  };
  
  return (
    <Link href="/blogdetails" className="block w-full h-[320px] sm:h-[400px] md:h-[480px] rounded-[24px] overflow-hidden relative group cursor-pointer">
      {/* Card Background with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        style={{ 
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 62.98%, rgba(0, 0, 0, 0.50) 74.83%), url(${imagePath}.png)`,
          backgroundPosition: getBackgroundPosition()
        }}
      />
      
      {/* Card Content Container */}
      <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-6">
        <div className="flex flex-col items-start gap-4 sm:gap-5 md:gap-6 max-w-[280px] sm:max-w-[300px] md:max-w-[327px]">
          {/* Card Title */}
          <p className="text-white font-jost text-base sm:text-lg md:text-[21px] font-semibold leading-[120%]">
            {title}
          </p>
          
          {/* View More Button with Hover Effect */}
          <div className="cursor-pointer">
            <span className="text-white font-jost text-sm sm:text-base font-semibold leading-[120%] relative">
              View More
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}