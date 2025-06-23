'use client';
import Image from 'next/image';
import { useRef } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function PlatformRevolutionizingWorkflows() {
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
            Revolutionizing Workflows with AI Automation Software Services
          </h2>
          
          <div className="w-full text-black font-jost text-sm xs:text-base sm:text-lg md:text-[19px] lg:text-[21px] font-normal space-y-4 md:space-y-2">
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              AI is reshaping business operations—boosting efficiency, reducing errors, and driving productivity. AppitSoftware's AI Automation Software Services are built to meet the evolving automation needs of modern enterprises, streamlining everything from customer service to supply chain management.
            </p>
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              Our AI Automation Software Services integrate intelligent data processing, robotic process automation (RPA), and predictive analytics to automate both routine tasks and complex workflows. Whether it's invoice processing or lead scoring, we help your teams focus on high-impact, strategic work.
            </p>
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              Businesses leveraging our AI Automation Software Services benefit from faster execution, greater accuracy, and reduced operational costs. From startups to global enterprises, automation is a key enabler of scalable growth.
            </p>
            <p className="leading-[140%] md:leading-[120%] lg:leading-[110%]">
              AppitSoftware ensures that its AI Automation Software Services are secure, adaptable, and aligned with your unique business objectives—delivering automation that's smart, reliable, and future-ready.
            </p>
          </div>
        </div>

        {/* Image Container (Right on larger screens, bottom on mobile) */}
        <div className="w-full md:w-[50%] lg:w-[605px] h-[280px] xs:h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] order-1 md:order-2">
          <div className="w-full h-full rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden relative">
            <Image 
              src="/images/platform/revo.png"
              alt="Revolutionizing Workflows with AI Automation"
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