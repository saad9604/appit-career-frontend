'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const PoweringFuture = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation();

  // Card data
  const cards = [
    {
      id: 1,
      title: "AskGenie AI",
      description: "Accelerate the resolution of both complex and routine customer inquiries using AskGenie AI & Generative AI.",
      logoSrc: "/images/platform/ask.svg"
    },
    {
      id: 2,
      title: "WhatsAppBot AI",
      description: "Transform WhatsAppBot AI into your primary revenue stream by utilizing Appit's GPT-driven chatbots to engage with customers, cultivate high-quality leads, and enhance customer loyalty.",
      logoSrc: "/images/platform/whatsapp.svg"
    },
    {
      id: 3,
      title: "SmartChat AI",
      description: "Transform intricate business processes into seamless conversational experiences with our low-code Conversation Studio.",
      logoSrc: "/images/platform/smartai.svg"
    },
    {
      id: 4,
      title: "SalesBot AI",
      description: "Assist customers in discovering the ideal products and enhance their shopping journey through a SalesBot AI & Generative AI-driven sales assistant.",
      svgContent: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 8C19.55 8 18.74 9.44 19.07 10.51L15.52 14.07C15.22 13.98 14.78 13.98 14.48 14.07L11.93 11.52C12.27 10.45 11.46 9 10 9C8.55 9 7.73 10.44 8.07 11.52L3.51 16.07C2.44 15.74 1 16.55 1 18C1 19.1 1.9 20 3 20C4.45 20 5.26 18.56 4.93 17.49L9.48 12.93C9.78 13.02 10.22 13.02 10.52 12.93L13.07 15.48C12.73 16.55 13.54 18 15 18C16.45 18 17.27 16.56 16.93 15.48L20.49 11.93C21.56 12.26 23 11.45 23 10C23 8.9 22.1 8 21 8Z" fill="black"/>
          <path d="M15 9L15.94 6.93L18 6L15.94 5.07L15 3L14.08 5.07L12 6L14.08 6.93L15 9ZM3.5 11L4 9L6 8.5L4 8L3.5 6L3 8L1 8.5L3 9L3.5 11Z" fill="black"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "AI ChatWorks",
      description: "Appit offers a collection of pre-designed AI ChatWorks & Smart Skills, crafted by our skilled Conversation Designers.",
      logoSrc: "/images/platform/chatwork.svg"
    },
    {
      id: 6,
      title: "InsightGen AI",
      description: "Improve customer experience with InsightGen AI-driven actionable insights and develop personalized dashboards to track the metrics that are most significant",
      logoSrc: "/images/platform/insight.svg"
    }
  ];

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 xs:py-14 sm:py-16 md:py-20 overflow-hidden">
      {/* Main container */}
      <div className="mx-auto flex flex-col justify-center items-center gap-8 lg:gap-[32px] w-full max-w-[1200px]">
        
        {/* First container - Heading and text */}
        <div className={`flex flex-col items-center gap-4 md:gap-[16px] w-full px-4 sm:px-6 md:px-8 transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-[#252525] text-center font-jost text-2xl sm:text-3xl md:text-[40px] font-semibold leading-[120%]">
            Powering the Future with Unified <span className="text-[#EC1C26]">AI Platforms</span>
          </h2>
          
          <p className="text-black text-center font-jost text-lg sm:text-xl md:text-[21px] font-normal leading-[140%] md:leading-[120%] max-w-full md:max-w-[800px] lg:max-w-[997px]">
            Our integrated AI services combine machine learning, automation, and data intelligence to help your business scale smarter and faster.
          </p>
        </div>
        
        {/* Second container - Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4 sm:px-6 md:px-8 max-w-[1200px] transition-all duration-1000 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {cards.map((card, index) => (
            <div 
              key={card.id}
              className="flex flex-col justify-center items-center bg-[#252525] rounded-[24px] w-full max-w-[382px] mx-auto h-[170px] xs:h-[180px] sm:h-[200px] cursor-default sm:cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-out"
            >
              <div className="flex flex-col sm:flex-row sm:items-center px-3 xs:px-4 sm:px-6 py-0 w-full h-full relative overflow-hidden group">
                {/* Mobile layout (stacked with all content visible) */}
                <div className="flex flex-col w-full sm:hidden h-full justify-center">
                  <div className="flex items-center gap-3 xs:gap-4 mb-3">
                    {card.id === 4 ? (
                      <div className="w-[32px] h-[32px] xs:w-[36px] xs:h-[36px] flex-shrink-0 bg-white rounded-full flex justify-center items-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]">
                        {card.svgContent}
                      </div>
                    ) : (
                      <img 
                        src={card.logoSrc} 
                        alt={card.title} 
                        width={40} 
                        height={40} 
                        className="w-8 h-8 xs:w-9 xs:h-9 object-contain"
                      />
                    )}
                    
                    <p className="text-white font-jost text-base xs:text-lg font-semibold leading-[120%]">
                      {card.title}
                    </p>
                  </div>
                  
                  <div className="text-left">
                    <p className="text-white font-jost text-[12px] xs:text-[13px] font-normal leading-[140%]">
                      {card.description}
                    </p>
                  </div>
                </div>
                
                {/* Desktop layout (with hover effect) */}
                <div className="hidden sm:flex items-center gap-6 w-full transition-all duration-500 ease-in-out transform group-hover:-translate-y-10">
                  {card.id === 4 ? (
                    <div className="w-[40px] h-[40px] flex-shrink-0 bg-white rounded-full flex justify-center items-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)_inset] z-10">
                      {card.svgContent}
                    </div>
                  ) : (
                    <img 
                      src={card.logoSrc} 
                      alt={card.title} 
                      width={40} 
                      height={40} 
                      className="w-10 h-10 object-contain"
                    />
                  )}
                  
                  <p className="text-white font-jost text-xl md:text-[21px] font-semibold leading-[120%]">
                    {card.title}
                  </p>
                </div>
                
                {/* Description - Hidden until hover (desktop only) */}
                <div className="hidden sm:block absolute left-6 top-[50%] w-[329px] opacity-0 transition-all duration-500 ease-in-out transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 text-left">
                  <p className="text-white font-jost text-[14px] font-semibold leading-[120%]">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoweringFuture;
