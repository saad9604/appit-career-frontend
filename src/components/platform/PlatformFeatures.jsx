'use client';
import Image from 'next/image';
import { useRef } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function PlatformFeatures() {
  const { ref: sectionRef, isInView } = useScrollAnimation();

  return (
    <section className="w-full py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-[100px] overflow-hidden bg-white">
      <div 
        ref={sectionRef}
        className={`w-full max-w-full lg:max-w-[1240px] mx-auto flex flex-col md:flex-row gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] transition-all duration-1000 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Image Container (Left on larger screens, top on mobile) */}
        <div className="w-full md:w-[45%] lg:w-[560px] h-[200px] xs:h-[220px] sm:h-[250px] md:h-[270px] lg:h-[300px] md:flex-shrink-0">
          <div className="w-full h-full rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden relative">
            <Image 
              src="/images/platform/belowhero.png"
              alt="Platform Hero"
              fill
              style={{ objectFit: 'cover' }}
              className="bg-gray-200"
            />
          </div>
        </div>

        {/* Text Container (Right on larger screens, bottom on mobile) */}
        <div className="w-full md:w-[55%] lg:w-[608px] flex flex-col items-center justify-start px-2 xs:px-3 sm:px-4 md:px-5 lg:px-[24px] py-3 xs:py-4 md:py-[10px] gap-3 xs:gap-4 sm:gap-5 lg:gap-[24px] md:flex-shrink-0 md:pt-0">
          <h2 className="w-full text-black font-jost text-xl xs:text-2xl sm:text-[24px] md:text-[26px] lg:text-[27px] font-semibold leading-[120%] text-center md:text-left">
            Utilize AskGenie AI & Generative AI to provide self-service support options
          </h2>
          
          <ul className="w-full flex flex-col gap-0.5 xs:gap-1">
            <li className="flex items-start gap-3 sm:gap-4">
              <div className="min-w-[5px] h-[5px] sm:min-w-[6px] sm:h-[6px] md:min-w-[7px] md:h-[7px] rounded-full bg-[#2563eb] mt-2.5 ml-4 sm:ml-5 md:ml-6"></div>
              <p className="text-black font-jost text-sm xs:text-base sm:text-lg md:text-[19px] lg:text-[21px] font-normal leading-[100%]">
                Provide intuitive answers to customer FAQs by analyzing diverse online content such as blogs, knowledge bases, feedback, and reviews.
              </p>
            </li>
            <li className="flex items-start gap-3 sm:gap-4">
              <div className="min-w-[5px] h-[5px] sm:min-w-[6px] sm:h-[6px] md:min-w-[7px] md:h-[7px] rounded-full bg-[#2563eb] mt-2.5 ml-4 sm:ml-5 md:ml-6"></div>
              <p className="text-black font-jost text-sm xs:text-base sm:text-lg md:text-[19px] lg:text-[21px] font-normal leading-[100%]">
                Ensure precise responses to a broad spectrum of customer inquiries regarding your products and services.
              </p>
            </li>
            <li className="flex items-start gap-3 sm:gap-4">
              <div className="min-w-[5px] h-[5px] sm:min-w-[6px] sm:h-[6px] md:min-w-[7px] md:h-[7px] rounded-full bg-[#2563eb] mt-2.5 ml-4 sm:ml-5 md:ml-6"></div>
              <p className="text-black font-jost text-sm xs:text-base sm:text-lg md:text-[19px] lg:text-[21px] font-normal leading-[100%]">
                Enhance customer experience through immediate and thorough support.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}