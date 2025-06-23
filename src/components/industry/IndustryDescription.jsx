'use client';
import { useRef, useEffect } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function IndustryDescription() {
  const videoRef = useRef(null);
  const { ref: sectionRef, isInView } = useScrollAnimation();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-10 xs:py-12 sm:py-14 md:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-24">
          {/* Text Container */}
          <div 
            className={`w-full lg:w-[500px] xl:w-[608px] p-3 xs:p-4 sm:p-5 md:p-6 lg:p-[10px_24px] flex flex-col justify-center items-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-[24px] bg-white order-2 lg:order-1 transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
          >
            <h2 className="self-stretch text-black font-jost text-lg xs:text-xl sm:text-2xl md:text-[27px] font-semibold leading-[120%]">
              ⚙️ Oracle EBS R12 Solutions for the Oil & Gas Industry
            </h2>
            
            <div className="self-stretch text-black font-jost text-xs xs:text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-[125%] xs:leading-[125%] sm:leading-[125%] md:leading-[115%] lg:leading-[115%] xl:leading-[125%] space-y-0">
              <p className="mb-0">
                At AppitSoftware, we understand the critical demands of the oil and gas sector—precision, efficiency, and reliability. Our tailored Oracle EBS R12 IT Solutions are built to support every stage of your operations.
              </p>
              <p className="mb-0">
                With Oracle E-Business Suite R12, oil and gas companies can seamlessly manage supply chains, finances, human resources, and asset lifecycles with improved control and visibility.
              </p>
              <p className="mb-0">
                Our experienced team customizes solutions to meet the specific needs of exploration, drilling, production, and distribution. From optimizing project accounting to streamlining procurement, AppitSoftware ensures your Oracle investment delivers maximum ROI and long-term operational value.
              </p>
            </div>
          </div>
          
          {/* Video Container */}
          <div 
            className={`w-full xs:w-[90%] sm:w-[85%] md:w-[75%] lg:w-[450px] xl:w-[556px] h-[220px] xs:h-[250px] sm:h-[280px] md:h-[320px] lg:h-[380px] rounded-[20px] xs:rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden order-1 lg:order-2 mb-6 lg:mb-0 lg:mt-0 transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
          >
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/industry/belowhero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
