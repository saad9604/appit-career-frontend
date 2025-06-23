'use client'

import React, { useEffect, useRef, useState } from 'react';

const OurPromise = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
        
        // Video optimization: only play when visible
        const video = videoRef.current;
        if (video) {
          if (entry.isIntersecting) {
            // Start playing when visible
            video.play().catch(e => console.log('Video play error:', e));
          } else {
            // Pause when not visible to save resources
            video.pause();
          }
        }
      },
      { 
        threshold: 0.15,
        rootMargin: '-10% 0px'
      }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const animationClasses = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-10';

  return (
    <section 
      ref={sectionRef}
      className="w-full py-6 sm:py-8 md:py-10 lg:pt-[50px] lg:pb-[50px] lg:px-[153px] flex justify-center will-change-transform font-jost"
    >
      <div 
        className={`flex flex-col lg:flex-row justify-center items-start gap-6 md:gap-8 lg:gap-[61px] w-full max-w-[1400px] transition-all duration-700 ease-out ${animationClasses}`}
      >
        {/* Text Content Container */}
        <div className="flex flex-col items-start gap-6 md:gap-[24px] w-full lg:w-[758px] p-2 md:p-4">
          {/* Red Bar and Heading Container */}
          <div className="flex items-start gap-4 md:gap-[28px] w-full">
            {/* Red Gradient Bar - Positioned higher */}
            <div className="w-[8px] sm:w-[16px] md:w-[24px] h-[60px] sm:h-[80px] md:h-[96px] bg-gradient-to-b from-[#EC1C26] to-white mt-[-15px] self-start flex-shrink-0"></div>
            
            {/* Heading - With line break */}
            <div className="flex flex-col gap-1 md:gap-2">
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-semibold leading-[120%] font-jost">
                <span className="text-[#EC1C26]">Our Promise:</span> Driving Innovation with
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-semibold leading-[120%] font-jost text-black">
                Purpose
              </h2>
            </div>
          </div>
          
          {/* Paragraphs - Fine-tuned alignment */}
          <div className="flex flex-col gap-4 md:gap-6 pl-[15px] md:pl-[24px]">
            <p className="text-black font-jost text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
              At APPIT, we are committed to turning our clients' strategies into impactful digital solutions. Our expert team of engineers and professionals dives deep into your business needs to craft tailored, high-performance solutions that drive growth and efficiency.
            </p>
            
            <p className="text-black font-jost text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
              By closely collaborating with our clients, we ensure that every project meets real business goals — from optimizing infrastructure and databases to integrating seamlessly with third-party tools.
            </p>
            
            <p className="text-black font-jost text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
              We stay ahead of the curve by continuously evolving with the latest trends in IT, cloud, AI, and automation. This allows us to deliver agile, scalable, and future-ready solutions that go beyond expectations.
            </p>
            
            <p className="text-black font-jost text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
              From development and deployment to maintenance and support, APPIT takes full ownership of the project lifecycle — ensuring a seamless experience across platforms with the right blend of technology and industry expertise to power your business forward.
            </p>
          </div>
        </div>
        
        {/* Video Container - Adjusted width for better proportions */}
        <div className="video-container w-[92%] xs:w-[90%] sm:w-[85%] md:w-[450px] lg:w-[330px] h-[220px] sm:h-[320px] md:h-[380px] rounded-[24px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] mx-auto lg:mx-0 self-center lg:self-start lg:mt-[80px] xl:mt-[100px]">
          {/* Using autoPlay to ensure video displays */}
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted 
            loop
            playsInline
          >
            <source src="/videos/about/promise.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Custom media query for extra small screens */}
      <style jsx>{`
        @media (max-width: 360px) {
          .video-container {
            width: 88% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default OurPromise;