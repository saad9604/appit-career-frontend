"use client";

import React, { useRef, useEffect } from 'react';

const CareerHero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays automatically and handles loading
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // Handle autoplay restrictions if needed
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <section className="relative w-full h-[380px] sm:h-[420px] md:h-[460px] lg:h-[560px] overflow-hidden">
      {/* Video Background with overlay */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover object-center object-[center_22%]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/career/careerhero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/20 z-10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col justify-center items-center w-full h-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 absolute top-[55%] sm:top-[58%] md:top-[60%] lg:top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          {/* Heading */}
          <h1 className="text-white font-['Jost'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-semibold leading-[120%] tracking-normal mt-0 pt-0">
            CAREERS
          </h1>
          
          {/* Subheading */}
          <p className="text-white text-center font-['Jost'] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[27px] font-semibold leading-[120%] max-w-2xl">
            Build the future with us. One solution at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
