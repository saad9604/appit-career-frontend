'use client'

import React, { useEffect, useRef, useState } from 'react';

const CompanyInfo = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Just check if the section is visible
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
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

  // CSS classes for animation based on visibility
  const animationClasses = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-10';

  return (
    <section 
      ref={sectionRef}
      className="w-full pt-0 pb-8 md:pb-10 px-12 md:px-16 lg:px-24 overflow-hidden bg-white will-change-transform"
    >
      <div className={`w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${animationClasses}`}>
        <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-6 lg:gap-10">
          {/* Text Container */}
          <div className="flex flex-col justify-center items-start gap-5 w-full lg:w-[560px] order-2 lg:order-1">
            {/* First Paragraph Container */}
            <div className="flex items-start gap-4">
              {/* Star Logo */}
              <svg className="flex-shrink-0 w-[30px] h-[30px] md:w-[35px] md:h-[35px] mt-1" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.208 5.79795C18.3731 5.46301 18.6286 5.18098 18.9457 4.98375C19.2627 4.78653 19.6287 4.68201 20.002 4.68201C20.3754 4.68201 20.7414 4.78653 21.0584 4.98375C21.3755 5.18098 21.631 5.46301 21.796 5.79795L25.656 13.6199L34.29 14.8739C34.6594 14.9276 35.0065 15.0835 35.2918 15.3242C35.5772 15.5648 35.7896 15.8804 35.9048 16.2355C36.0201 16.5905 36.0338 16.9707 35.9442 17.3331C35.8546 17.6954 35.6654 18.0255 35.398 18.2859L29.15 24.3759L30.626 32.9739C30.6891 33.3417 30.6479 33.7198 30.5073 34.0655C30.3666 34.4111 30.1321 34.7105 29.8302 34.9299C29.5283 35.1492 29.171 35.2796 28.7988 35.3065C28.4266 35.3334 28.0543 35.2556 27.724 35.0819L20.004 31.0219L12.28 35.0819C11.9498 35.2551 11.5778 35.3324 11.2059 35.3052C10.834 35.2781 10.4772 35.1475 10.1756 34.9283C9.87398 34.7091 9.63967 34.4099 9.4991 34.0646C9.35853 33.7192 9.31729 33.3415 9.38004 32.9739L10.854 24.3739L4.60604 18.2859C4.33864 18.0255 4.14945 17.6954 4.05989 17.3331C3.97033 16.9707 3.98396 16.5905 4.09925 16.2355C4.21454 15.8804 4.42688 15.5648 4.71226 15.3242C4.99763 15.0835 5.34465 14.9276 5.71405 14.8739L14.348 13.6199L18.208 5.79795Z" fill="#FF9D00"/>
              </svg>
              
              {/* Paragraph */}
              <p className="text-black font-jost text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
                APPIT Software is an IT services firm that delivers and supports software technologies, business management, and core infrastructure solutions for organizations spanning diverse IT technologies.
              </p>
            </div>
            
            {/* Second Paragraph Container */}
            <div className="flex items-start gap-4">
              {/* Star Logo */}
              <svg className="flex-shrink-0 w-[30px] h-[30px] md:w-[35px] md:h-[35px] mt-1" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.208 5.79795C18.3731 5.46301 18.6286 5.18098 18.9457 4.98375C19.2627 4.78653 19.6287 4.68201 20.002 4.68201C20.3754 4.68201 20.7414 4.78653 21.0584 4.98375C21.3755 5.18098 21.631 5.46301 21.796 5.79795L25.656 13.6199L34.29 14.8739C34.6594 14.9276 35.0065 15.0835 35.2918 15.3242C35.5772 15.5648 35.7896 15.8804 35.9048 16.2355C36.0201 16.5905 36.0338 16.9707 35.9442 17.3331C35.8546 17.6954 35.6654 18.0255 35.398 18.2859L29.15 24.3759L30.626 32.9739C30.6891 33.3417 30.6479 33.7198 30.5073 34.0655C30.3666 34.4111 30.1321 34.7105 29.8302 34.9299C29.5283 35.1492 29.171 35.2796 28.7988 35.3065C28.4266 35.3334 28.0543 35.2556 27.724 35.0819L20.004 31.0219L12.28 35.0819C11.9498 35.2551 11.5778 35.3324 11.2059 35.3052C10.834 35.2781 10.4772 35.1475 10.1756 34.9283C9.87398 34.7091 9.63967 34.4099 9.4991 34.0646C9.35853 33.7192 9.31729 33.3415 9.38004 32.9739L10.854 24.3739L4.60604 18.2859C4.33864 18.0255 4.14945 17.6954 4.05989 17.3331C3.97033 16.9707 3.98396 16.5905 4.09925 16.2355C4.21454 15.8804 4.42688 15.5648 4.71226 15.3242C4.99763 15.0835 5.34465 14.9276 5.71405 14.8739L14.348 13.6199L18.208 5.79795Z" fill="#FF9D00"/>
              </svg>
              
              {/* Paragraph */}
              <p className="text-black font-jost text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
                One-stop approach to all IT consultation services to maximize your ROI. We support services in cloud migration services, cloud computing, Oracle, AI, Big Data, Blockchain and mobile application platforms.
              </p>
            </div>
          </div>
          
          {/* Image Container */}
          <div className="w-full lg:w-[530px] h-[200px] sm:h-[220px] md:h-[251px] rounded-[24px] overflow-hidden order-1 lg:order-2">
            <img 
              src="/images/about/info.png" 
              alt="APPIT Software IT Services" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;