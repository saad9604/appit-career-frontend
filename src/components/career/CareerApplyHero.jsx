'use client';

import React, { useRef, useEffect, useState } from 'react';

const CareerApplyHero = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Handle video loading and playing
  useEffect(() => {
    if (videoRef.current) {
      // Set video playback options
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      videoRef.current.playsInline = true;
      
      // Attempt to play the video
      const playVideo = async () => {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.error("Video play failed:", error);
          // Add a fallback if video fails to play
          if (containerRef.current) {
            containerRef.current.classList.add('video-fallback');
          }
        }
      };
      
      // Handle video loading errors
      const handleVideoError = () => {
        console.error("Video loading error");
        if (containerRef.current) {
          containerRef.current.classList.add('video-fallback');
        }
      };
      
      videoRef.current.addEventListener('error', handleVideoError);
      playVideo();
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('error', handleVideoError);
        }
      };
    }
    
    // Clean up
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };
  }, []);

  return (
    <section className="relative w-full h-[200px] 2xs:h-[230px] xs:h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px] overflow-hidden mt-[70px] sm:mt-[80px] md:mt-[95px]">
      {/* Video background */}
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full bg-[#001C30]"
      >
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-90 filter brightness-110 contrast-105"
          src="/videos/career/waves.mp4"
          muted 
          loop 
          playsInline
          preload="auto"
        >
          <source src="/videos/career/waves.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-[1440px] mx-auto h-full flex flex-col justify-center items-center px-3 2xs:px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Main heading */}
        <h1 className="text-white font-jost text-3xl 2xs:text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-semibold leading-[110%] 2xs:leading-[120%] text-center mb-1 2xs:mb-2 xs:mb-3 sm:mb-4 transition-all duration-300 tracking-tight 2xs:tracking-normal sm:tracking-tight shadow-text">
          UI UX Designer
        </h1>
      </div>

      {/* Styling for video fallback */}
      <style jsx>{`
        .video-fallback {
          background: linear-gradient(45deg, #001C30, #003660, #005690);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .shadow-text {
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        
        @media (max-width: 360px) {
          .shadow-text {
            text-shadow: 0 1px 2px rgba(0,0,0,0.8);
          }
        }
        
        @media (min-width: 1920px) {
          .shadow-text {
            text-shadow: 0 3px 6px rgba(0,0,0,0.4);
          }
        }
      `}</style>
    </section>
  );
};

export default CareerApplyHero;