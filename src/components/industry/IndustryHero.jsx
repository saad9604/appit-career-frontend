'use client';
import { useRef, useEffect } from 'react';

export default function IndustryHero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative w-full h-[500px] xs:h-[550px] sm:h-[600px] md:h-[650px] lg:h-[724px] overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          ref={videoRef}
          className="absolute inset-0 object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/industry/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Main Content Container */}
      <div className="absolute inset-0 flex flex-col justify-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
          <div className="flex flex-col items-start gap-4 sm:gap-5 md:gap-6 ml-0 sm:ml-0 md:ml-0 lg:ml-0 xl:ml-0">
            {/* Heading and Text Container */}
            <div className="flex flex-col justify-center items-start gap-1 sm:gap-2 max-w-full sm:max-w-[450px] md:max-w-[550px] lg:max-w-[623px]">
              <h1 className="font-jost text-[#252525] text-2xl xs:text-3xl sm:text-3xl md:text-[36px] lg:text-[40px] font-semibold leading-[120%]">
                Oil and Gas IT Solutions
              </h1>
              
              <p className="font-jost text-[#252525] text-sm xs:text-base sm:text-lg md:text-[19px] lg:text-[21px] font-normal leading-[120%] max-w-full sm:max-w-[450px] md:max-w-[550px] lg:max-w-[601px]" style={{ WebkitTextStrokeWidth: '0.4px', WebkitTextStrokeColor: '#000' }}>
                Empowering the Oil and Gas IT Solutions with Oracle EBS R12 Customizations
              </p>
            </div>
            
            {/* Button */}
            <button className="group flex items-center gap-2 xs:gap-3 sm:gap-4 py-2 xs:py-[8px] sm:py-[10px] px-4 xs:px-5 sm:px-6 md:px-[24px] rounded-[32px] bg-[#0066B3] text-white shadow-[0px_10px_10px_0px_rgba(0,0,0,0.25)] border-2 border-transparent transition-all duration-300 hover:bg-[#A50F15] hover:border-white hover:scale-[1.03]">
              <span className="font-jost text-xs xs:text-sm sm:text-base md:text-[16px] font-semibold leading-[120%]">
                Connect With Us
              </span>
              
              <div className="relative flex items-center justify-center w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-[32px] md:h-[32px]">
                {/* Default state - arrow icon */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-full h-full transform group-hover:opacity-0 transition-opacity duration-300"
                  viewBox="0 0 33 32" 
                  fill="none"
                >
                  <path d="M16.4998 2.66668C20.0361 2.66668 23.4274 4.07144 25.9279 6.57192C28.4284 9.07241 29.8332 12.4638 29.8332 16C29.8332 19.5362 28.4284 22.9276 25.9279 25.4281C23.4274 27.9286 20.0361 29.3333 16.4998 29.3333C12.9636 29.3333 9.57223 27.9286 7.07175 25.4281C4.57126 22.9276 3.1665 19.5362 3.1665 16C3.1665 12.4638 4.57126 9.07241 7.07175 6.57192C9.57223 4.07144 12.9636 2.66668 16.4998 2.66668ZM16.7612 9.72268C16.637 9.84653 16.5385 9.99367 16.4713 10.1557C16.4041 10.3176 16.3695 10.4913 16.3695 10.6667C16.3695 10.8421 16.4041 11.0157 16.4713 11.1777C16.5385 11.3397 16.637 11.4868 16.7612 11.6107L19.8172 14.6667H9.83317C9.47955 14.6667 9.14041 14.8072 8.89036 15.0572C8.64031 15.3073 8.49984 15.6464 8.49984 16C8.49984 16.3536 8.64031 16.6928 8.89036 16.9428C9.14041 17.1929 9.47955 17.3333 9.83317 17.3333H19.8172L16.7612 20.3893C16.6372 20.5131 16.5388 20.6601 16.4717 20.8219C16.4045 20.9838 16.3699 21.1572 16.3698 21.3324C16.3696 21.5076 16.404 21.6811 16.471 21.843C16.5379 22.0049 16.636 22.152 16.7598 22.276C16.8836 22.4 17.0306 22.4983 17.1924 22.5655C17.3542 22.6327 17.5277 22.6673 17.7029 22.6674C17.8781 22.6675 18.0516 22.6332 18.2135 22.5662C18.3754 22.4993 18.5225 22.4011 18.6465 22.2773L23.9798 16.944C24.104 16.8202 24.2025 16.673 24.2697 16.511C24.337 16.349 24.3716 16.1754 24.3716 16C24.3716 15.8246 24.337 15.651 24.2697 15.489C24.2025 15.327 24.104 15.1799 23.9798 15.056L18.6465 9.72268C18.3965 9.47272 18.0574 9.3323 17.7038 9.3323C17.3503 9.3323 17.0112 9.47272 16.7612 9.72268Z" fill="white"/>
                </svg>
                
                {/* Hover state - circle with arrow */}
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="20" height="20" className="w-4 h-4 xs:w-5 xs:h-5 transform rotate-[-45deg] text-[#A50F15]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
