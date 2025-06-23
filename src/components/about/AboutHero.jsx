'use client'

import React from 'react';

const AboutHero = () => {
  return (
    <section className="relative w-full h-[385px] sm:h-[435px] md:h-[485px] lg:h-[535px] overflow-hidden font-jost">
      {/* Video background - Simplified for reliable playback */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          className="w-full h-full object-cover" 
          autoPlay 
          loop 
          muted 
          playsInline
          src="/videos/about/about_hero.mp4"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/20"></div>
      </div>
      
      {/* Content container - with adjusted positioning for perfect centering */}
      <div className="absolute top-[65%] sm:top-[60%] md:top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-10 text-center px-4">
        {/* Heading */}
        <h1 className="text-white text-[50px] sm:text-[70px] md:text-[90px] lg:text-[100px] font-semibold leading-[120%] font-jost mb-1 sm:mb-3">
          ABOUT US
        </h1>
        
        {/* Subheading */}
        <p className="text-white text-[18px] sm:text-[22px] md:text-[25px] lg:text-[27px] font-semibold leading-[120%] max-w-3xl mx-auto font-jost">
          Empowering businesses through smart, scalable technology
        </p>
      </div>
    </section>
  );
};

export default AboutHero;