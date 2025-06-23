'use client';
import { useRef, useEffect, useState } from 'react';

export default function BlogHero() {
  const videoRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Only run client-side code after mount
  useEffect(() => {
    setIsMounted(true);
    
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative flex justify-center items-center w-full overflow-hidden h-[500px] sm:h-[600px] md:h-[700px] lg:h-[776px]">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          ref={videoRef}
          className="absolute inset-0 object-cover w-full h-full object-[center_70%]"
          // Remove autoPlay to prevent hydration issues
          muted
          loop
          playsInline
        >
          <source src="/images/blog/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative flex flex-col justify-center items-center gap-4 text-center px-4 w-full max-w-[1440px] py-20 sm:py-24 md:py-32 lg:py-36 xl:py-40 mt-16 sm:mt-20 md:mt-24">
        {/* Heading */}
        <h1 className="font-jost text-white text-4xl sm:text-5xl md:text-[60px] font-semibold leading-[120%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)] pr-0 md:pr-8">
          Blogs
        </h1>
        
        {/* Subheading */}
        <p className="font-jost text-gray-200 text-[21px] font-semibold leading-[120%] mt-2">
          Know about emerging tech trends and market happenings
        </p>
      </div>
    </section>
  );
}