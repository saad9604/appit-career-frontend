'use client';
import Image from 'next/image';
import { useRef } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function PlatformElevateQueryResolution() {
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
        <div className="w-full md:w-[45%] lg:w-[545px] h-[250px] xs:h-[280px] sm:h-[320px] md:h-[350px] lg:h-auto md:flex-shrink-0 md:self-stretch">
          <div className="w-full h-full rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden relative">
            <Image 
              src="/images/platform/elevate.png"
              alt="Elevate Your Approach to Query Resolution"
              fill
              style={{ objectFit: 'cover' }}
              className="bg-gray-200"
            />
          </div>
        </div>

        {/* Text Container (Right on larger screens, bottom on mobile) */}
        <div className="w-full md:w-[55%] lg:w-[605px] flex flex-col items-start justify-start gap-3 xs:gap-4 sm:gap-5 lg:gap-[16px] md:pt-0">
          <h2 className="w-full text-black font-jost text-xl xs:text-2xl sm:text-[24px] md:text-[26px] lg:text-[27px] font-semibold leading-[120%]">
            Elevate Your Approach to Query Resolution
          </h2>
          
          <ul className="w-full flex flex-col gap-6 sm:gap-8">
            <li className="flex items-start gap-3 sm:gap-4">
              <div className="min-w-[5px] h-[5px] sm:min-w-[6px] sm:h-[6px] md:min-w-[7px] md:h-[7px] rounded-full bg-[#2563eb] mt-2.5 ml-4 sm:ml-5 md:ml-6"></div>
              <p className="text-black font-jost text-sm xs:text-base sm:text-lg md:text-[19px] lg:text-[21px] font-normal leading-[140%] md:leading-[120%] lg:leading-[100%]">
                Ensure clarity with context-sensitive, conversational responses using Generative AI.
              </p>
            </li>
            <li className="flex items-start gap-3 sm:gap-4">
              <div className="min-w-[5px] h-[5px] sm:min-w-[6px] sm:h-[6px] md:min-w-[7px] md:h-[7px] rounded-full bg-[#2563eb] mt-2.5 ml-4 sm:ml-5 md:ml-6"></div>
              <p className="text-black font-jost text-sm xs:text-base sm:text-lg md:text-[19px] lg:text-[21px] font-normal leading-[140%] md:leading-[120%] lg:leading-[100%]">
                Encourage follow-up inquiries to help customers identify optimal solutions.
              </p>
            </li>
            <li className="flex items-start gap-3 sm:gap-4">
              <div className="min-w-[5px] h-[5px] sm:min-w-[6px] sm:h-[6px] md:min-w-[7px] md:h-[7px] rounded-full bg-[#2563eb] mt-2.5 ml-4 sm:ml-5 md:ml-6"></div>
              <p className="text-black font-jost text-sm xs:text-base sm:text-lg md:text-[19px] lg:text-[21px] font-normal leading-[140%] md:leading-[120%] lg:leading-[100%]">
                Minimize reliance on agents while enhancing first-contact resolution to boost customer satisfaction.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}