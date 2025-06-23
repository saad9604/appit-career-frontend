'use client';
import Image from 'next/image';
import { useRef } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function PlatformSmarterConversations() {
  const { ref: sectionRef, isInView } = useScrollAnimation();

  return (
    <section className="w-full py-6 xs:py-8 sm:py-10 md:py-12 lg:py-[48px] px-3 xs:px-4 sm:px-6 md:px-8 lg:px-[100px] overflow-hidden">
      <div 
        ref={sectionRef}
        className={`w-full max-w-full lg:max-w-[1240px] mx-auto flex flex-col md:flex-row gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] transition-all duration-1000 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Text Container (Left on larger screens, top on mobile) */}
        <div className="w-full md:w-[50%] lg:w-[609px] flex flex-col items-start justify-start gap-3 xs:gap-4 sm:gap-5 lg:gap-[16px] order-2 md:order-1 md:pt-0">
          <h2 className="w-full text-black font-jost text-xl xs:text-2xl sm:text-[24px] md:text-[26px] lg:text-[27px] font-semibold leading-[120%]">
            Smarter Conversations with AI-Genie AI Services
          </h2>
          
          <div className="w-full text-black font-jost text-sm xs:text-base sm:text-lg md:text-[19px] lg:text-[21px] font-normal space-y-4 md:space-y-2">
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              At AppitSoftware, we believe in the power of intuitive, intelligent conversations. Our AI-Genie AI Services provide advanced conversational AI solutions that deliver first-class experiences, blurring the line between human customer support and machine interactions.
            </p>
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              Our AI-Genie AI Services combine natural language processing, contextual understanding, and continuous learning to offer personalized, human-like conversations that address complex user needs. It does this instantly, round-the-clock, and without the common limitations of traditional chatbots.
            </p>
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              Businesses integrating our AI-Genie AI Services benefit from reduced support costs, enhanced customer satisfaction, improved brand consistency, and higher agent productivity. With our conversational AI solutions, you can transform static interactions and create seamless, contextual conversations.
            </p>
          </div>
        </div>

        {/* Image Container (Right on larger screens, bottom on mobile) */}
        <div className="w-full md:w-[53%] lg:w-[640px] h-[270px] xs:h-[300px] sm:h-[340px] md:h-[370px] lg:h-[395px] order-1 md:order-2 flex justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <div className="w-full h-full rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[24px] bg-white flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">
              <Image 
                src="/images/platform/smarter.png"
                alt="Smarter Conversations with AI-Genie AI Services"
                fill
                sizes="(max-width: 768px) 100vw, 605px"
                priority
                className="scale-125"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}