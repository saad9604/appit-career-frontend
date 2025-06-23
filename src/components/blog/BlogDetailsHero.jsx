
'use client';
import { useRef, useEffect } from 'react';

export default function BlogDetailsHero() {
  const videoRef = useRef(null);

  useEffect(() => {
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
          autoPlay
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
      <div className="relative flex flex-col justify-center items-center gap-2 2xs:gap-3 sm:gap-4 text-center px-2 2xs:px-3 xs:px-4 w-full max-w-[1440px] py-16 xs:py-20 sm:py-24 md:py-32 lg:py-36 xl:py-40 mt-12 2xs:mt-14 xs:mt-16 sm:mt-20 md:mt-24">
        {/* Heading */}
        <h1 className="font-jost text-white text-2xl 2xs:text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[115%] sm:leading-[120%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)] max-w-[280px] xs:max-w-[350px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[900px]">
          Explore Our Insightful Blogs
        </h1>
        
        {/* Subheading */}
        <p className="font-jost text-gray-200 text-sm 2xs:text-base xs:text-lg sm:text-xl md:text-[18px] font-semibold leading-[115%] sm:leading-[120%] mt-1 2xs:mt-2 max-w-[250px] xs:max-w-[350px] sm:max-w-[450px] md:max-w-[600px]">
          Get to know the minds driving innovation at AppitSoftware.
        </p>
      </div>
    </section>
  );
}