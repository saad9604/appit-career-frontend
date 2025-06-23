'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function BlogDetailContent() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

  useEffect(() => {
    // Enable animations only after component is mounted to avoid hydration issues
    setAnimationsEnabled(true);
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When section enters viewport
        if (entry.isIntersecting) {
          if (imageRef.current) {
            imageRef.current.classList.add('animate-slide-in-right');
          }
          if (textRef.current) {
            setTimeout(() => {
              textRef.current.classList.add('animate-fade-up');
            }, 300);
          }
        } 
        // When section leaves viewport
        else {
          if (imageRef.current) {
            imageRef.current.classList.remove('animate-slide-in-right');
          }
          if (textRef.current) {
            textRef.current.classList.remove('animate-fade-up');
          }
        }
      });
    }, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F6F6F6] py-8 xs:py-10 sm:py-12 md:py-16">
      <div className="mx-auto flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-16 max-w-[1258px] px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Image Container with animation */}
        <div 
          ref={imageRef}
          className={`w-[90%] 2xs:w-[88%] xs:w-[85%] sm:w-[80%] md:w-1/2 lg:w-[608px] h-[190px] 2xs:h-[205px] xs:h-[225px] sm:h-[255px] md:h-[280px] lg:h-[331px] flex-shrink-0 relative rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden mx-auto md:mx-0 mb-6 md:mb-0 ${animationsEnabled ? 'opacity-0 transform -translate-x-12' : 'opacity-100'}`}
        >
          <Image 
            src="/images/blog/blogdetails.png" 
            alt="Blog Detail Image" 
            fill
            className="object-cover"
            sizes="(max-width: 375px) 90vw, (max-width: 480px) 88vw, (max-width: 640px) 85vw, (max-width: 1024px) 80vw, 384px"
          />
        </div>
        
        {/* Text Container with animation */}
        <div 
          ref={textRef}
          className={`flex flex-col w-full 2xs:w-[95%] xs:w-[92%] sm:w-[85%] md:w-1/2 lg:w-[575px] mx-auto md:mx-0 md:px-4 lg:px-6 ${animationsEnabled ? 'opacity-0 transform translate-y-12' : 'opacity-100'}`}
        >
          <h3 className="text-black text-center font-jost text-xl 2xs:text-xl xs:text-2xl md:text-[27px] font-semibold leading-[120%] mb-3 xs:mb-4 sm:mb-5">
            Understanding the Real Impact of AI Chatbots on Search Behavior
          </h3>
          
          <p className="text-black font-jost text-base 2xs:text-lg xs:text-xl sm:text-[21px] font-normal leading-[120%] text-justify">
            The rise of artificial intelligence has brought a new wave of innovation in the form of AI chatbots. 
            Tools like ChatGPT, Google Gemini, Microsoft Copilot, and Meta's LLaMA have redefined how people 
            interact with information. But while these AI assistants are dominating headlines and reshaping 
            user experiences, recent research indicates that they have not yet disrupted traditional search 
            traffic at scale. This article explores the current state of AI chatbot adoption, their effect on 
            web traffic, and why Google Search and traditional engines still dominate information discovery in 2025.
          </p>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-48px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(48px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </section>
  );
}
