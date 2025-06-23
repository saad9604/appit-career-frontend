'use client';
import Image from 'next/image';
import { useRef } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function PlatformSeamlessScalability() {
  const { ref: sectionRef, isInView } = useScrollAnimation();

  return (
    <section className="w-full py-6 xs:py-8 sm:py-10 md:py-12 lg:py-[48px] px-3 xs:px-4 sm:px-6 md:px-8 lg:px-[100px] overflow-hidden">
      <div 
        ref={sectionRef}
        className={`w-full max-w-full lg:max-w-[1240px] mx-auto flex flex-col md:flex-row gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] transition-all duration-1000 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Image Container (Left on larger screens, top on mobile) */}
        <div className="w-full md:w-[45%] lg:w-[605px] h-[250px] xs:h-[280px] sm:h-[320px] md:h-[350px] lg:h-[355px]">
          <div className="w-full h-full rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden relative">
            <Image 
              src="/images/platform/seamless.jpg"
              alt="Seamless Scalability with AI Cloud Integration Services"
              fill
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center' 
              }}
              className="bg-gray-200"
            />
          </div>
        </div>

        {/* Text Container (Right on larger screens, bottom on mobile) */}
        <div className="w-full md:w-[55%] lg:w-[609px] flex flex-col items-start justify-start gap-3 xs:gap-4 sm:gap-5 lg:gap-[16px] md:pt-0">
          <h2 className="w-full text-black font-jost text-xl xs:text-2xl sm:text-[24px] md:text-[26px] lg:text-[27px] font-semibold leading-[120%]">
            Seamless Scalability with AI Cloud Integration Services
          </h2>
          
          <div className="w-full text-black font-jost text-sm xs:text-base sm:text-lg md:text-[19px] lg:text-[21px] font-normal space-y-4 md:space-y-2">
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              As businesses grow, so does the complexity of their systems and data. AppitSoftware's AI Cloud Integration Services enable seamless connectivity between AI-powered solutions and leading cloud platforms like AWS, Azure, and Google Cloud.
            </p>
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              Our AI Cloud Integration Services are built for agility—facilitating secure data exchange, real-time analytics, and efficient AI model deployment in cloud-native environments. With scalable infrastructure and streamlined workflows, businesses can manage large data volumes and complex machine learning models with ease.
            </p>
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              Organizations trust our AI Cloud Integration Services to deliver cloud-ready AI solutions that minimize latency, strengthen security, and support multi-channel operations. Whether you're modernizing legacy systems or building new ones, we ensure your AI ecosystem is robust, scalable, and fully cloud-optimized.
            </p>
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              Additionally, our AI Cloud Integration Services are aligned with your compliance and security standards, giving you the performance, protection, and peace of mind you need to scale with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}