'use client'

import React, { useState, useEffect, useRef } from 'react';

const StatItem = ({ finalValue, title, shouldAnimate }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!shouldAnimate) {
      setCount(0);
      return;
    }
    
    // Extract the numeric part from the finalValue (e.g., "25+" -> 25)
    const targetValue = parseInt(finalValue);
    
    // Animation duration - slightly shorter for better performance
    const duration = 2000;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      
      if (elapsedTime < duration) {
        // Easing function for smoother animation
        const progress = elapsedTime / duration;
        // Use easeOutQuad for a natural slow-down effect
        const easedProgress = 1 - Math.pow(1 - progress, 2);
        const currentValue = Math.floor(targetValue * easedProgress);
        
        setCount(currentValue);
        requestAnimationFrame(updateCounter);
      } else {
        setCount(targetValue);
      }
    };
    
    requestAnimationFrame(updateCounter);
    
    return () => {};
  }, [finalValue, shouldAnimate]);
  
  // Get the "+" or other suffix if exists
  const suffix = finalValue.replace(/[0-9]/g, '');
  
  return (
    <div className="flex flex-col w-full sm:w-[240px] md:w-[260px] lg:w-[269px] h-[90px] xs:h-[100px] md:h-[120px] lg:h-[130px] p-[10px] justify-center items-center gap-[6px] xs:gap-[10px] flex-shrink-0 rounded-[16px] xs:rounded-[24px] bg-gradient-to-br from-[#0066B3] via-[#2F8DD4] to-[#5BCBF5] shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)]">
      <h3 className="text-white text-center font-jost text-[24px] xs:text-[28px] sm:text-[35px] md:text-[40px] font-semibold leading-[120%]">
        {count}{suffix}
      </h3>
      <p className="text-white text-center font-jost text-[14px] xs:text-[16px] sm:text-[20px] md:text-[24px] font-semibold leading-[120%]">
        {title}
      </p>
    </div>
  );
};

const CompanyStats = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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
      className="w-full py-8 md:py-12 will-change-transform"
    >
      <div className={`w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${animationClasses}`}>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 xs:gap-5 sm:gap-6 md:gap-3 justify-items-center sm:justify-center">
          <StatItem finalValue="25+" title="Number Of Projects" shouldAnimate={isVisible} />
          <StatItem finalValue="100+" title="Clients Worldwide" shouldAnimate={isVisible} />
          <StatItem finalValue="150+" title="In Business" shouldAnimate={isVisible} />
          <StatItem finalValue="9+" title="Team Members" shouldAnimate={isVisible} />
        </div>
      </div>
    </section>
  );
};

export default CompanyStats;