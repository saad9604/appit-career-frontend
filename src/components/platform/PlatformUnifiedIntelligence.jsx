'use client';
import Image from 'next/image';
import { useRef } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function PlatformUnifiedIntelligence() {
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
            Unified Intelligence with All-in-One AI Services
          </h2>
          
          <div className="w-full text-black font-jost text-sm xs:text-base sm:text-lg md:text-[19px] lg:text-[21px] font-normal space-y-4 md:space-y-2">
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              AppitSoftware's All-in-One AI Services offer a complete suite of tools, platforms, and expert consulting to meet your end-to-end AI needs—making adoption, scaling, and management seamless across your organization.
            </p>
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              Our All-in-One AI Services unify machine learning, natural language processing, computer vision, and advanced analytics into a single, integrated solution. This centralized approach streamlines everything from model development and deployment to training, monitoring, and optimization.
            </p>
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              Whether you're building recommendation engines, fraud detection systems, or intelligent search tools, our All-in-One AI Services provide the flexibility, performance, and scalability you need to innovate faster.
            </p>
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              By consolidating your AI infrastructure, you reduce complexity, enhance visibility, and accelerate time to value—all while integrating smoothly with your existing systems.
            </p>
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              At AppitSoftware, we're committed to making AI accessible, actionable, and impactful. Our All-in-One AI Services are built to empower your business at every stage of the AI journey.
            </p>
          </div>
        </div>

        {/* Image Container (Right on larger screens, bottom on mobile) */}
        <div className="w-full md:w-[50%] lg:w-[605px] h-[280px] xs:h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] order-1 md:order-2">
          <div className="w-full h-full rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden relative">
            <Image 
              src="/images/platform/unified.jpg"
              alt="Unified Intelligence with All-in-One AI Services"
              fill
              style={{ objectFit: 'cover' }}
              className="bg-gray-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
}