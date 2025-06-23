'use client';
import { useEffect, useRef, useState } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function PartnershipServices() {
  const { ref: firstSectionRef, isInView: firstInView } = useScrollAnimation();
  const { ref: secondSectionRef, isInView: secondInView } = useScrollAnimation();
  const { ref: thirdSectionRef, isInView: thirdInView } = useScrollAnimation();
  const { ref: fourthSectionRef, isInView: fourthInView } = useScrollAnimation();

  return (
    <section className="w-full bg-white py-12 xs:py-14 sm:py-16 md:py-20 overflow-hidden">
      <div className="mx-auto flex flex-col gap-16 max-w-[1241px] w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 pt-0">
        
        {/* First Container - Image on Left, Text on Right */}
        <div ref={firstSectionRef} className="flex flex-col lg:flex-row gap-16 w-full">
          {/* Image Container - LEFT SIDE */}
          <div 
            className={`w-full lg:w-[750px] h-[160px] md:h-[280px] relative rounded-[24px] overflow-hidden transition-all duration-1000 ease-out ${firstInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            style={{
              aspectRatio: '631/473',
              background: 'url(/images/partnership/container1.png) #B75C9B 50% / 100% auto no-repeat'
            }}
          ></div>
          
          {/* Text Container - RIGHT SIDE */}
          <div 
            className={`w-full lg:w-[700px] flex flex-col gap-4 transition-all duration-1000 ease-out delay-300 ${firstInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
          >
            <h3 className="text-black font-jost text-2xl md:text-[27px] font-semibold leading-[120%]">
              Odoo ERP Solutions & Appit Software
            </h3>
            
            <p className="text-black font-jost text-lg md:text-[21px] font-normal leading-[115%]">
              At Appit Software Solutions, we specialize in Odoo ERP Solutions implementations, custom integrations, and business automation. As an official Odoo partner, we help businesses optimize their workflows and drive growth with the power of Odoo's all-in-one business management software. With our expertise in CRM, Accounting, HR, Inventory, and E-commerce, we provide end-to-end solutions tailored to your needs.
            </p>
          </div>
        </div>

        {/* Second Container - Text on Left, Image on Right */}
        <div ref={secondSectionRef} className="w-full flex flex-col lg:flex-row gap-16">
          {/* Text Container - LEFT SIDE */}
          <div 
            className={`w-full lg:w-[750px] flex flex-col gap-4 transition-all duration-1000 ease-out ${secondInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
          >
            <h3 className="text-black font-jost text-2xl md:text-[27px] font-semibold leading-[120%]">
              Experience Our Services as Odoo Partners in India
            </h3>
            
            <p className="text-black font-jost text-lg md:text-[21px] font-normal leading-[115%]">
              In the dynamic landscape of enterprise resource planning (ERP), AppitSoftware stands out as a premier Odoo partner in India. With a commitment to delivering AI-driven solutions, we specialize in customizing Odoo's modular ERP system to meet the unique needs of Indian businesses. Our services encompass seamless integration of Odoo modules, tailored to streamline operations across various sectors including manufacturing, retail, and services.<br/>
              Our team of certified Odoo professionals ensures that each implementation aligns with industry best practices, providing businesses with a scalable and efficient ERP solution. By leveraging our deep understanding of the Indian market, we assist companies in navigating regulatory requirements, optimizing supply chains, and enhancing customer engagement through Odoo's versatile platform.
            </p>
          </div>
          
          {/* Image Container - RIGHT SIDE */}
          <div 
            className={`w-full lg:w-[700px] h-[300px] md:h-[390px] relative rounded-[24px] mt-8 transition-all duration-1000 ease-out delay-300 ${secondInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
            style={{
              background: 'url(/images/partnership/container2.png) lightgray 50% / cover no-repeat'
            }}
          ></div>
        </div>

        {/* Third Container - Image on Left, Text on Right */}
        <div ref={thirdSectionRef} className="flex flex-col lg:flex-row gap-16 w-full items-center">
          {/* Image Container - LEFT SIDE */}
          <div 
            className={`w-full lg:w-[750px] h-[360px] md:h-[430px] relative rounded-[24px] transition-all duration-1000 ease-out ${thirdInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            style={{
              background: 'url(/images/partnership/container3.png) lightgray 50% / cover no-repeat'
            }}
          ></div>
          
          {/* Text Container - RIGHT SIDE */}
          <div 
            className={`w-full lg:w-[700px] flex flex-col gap-4 transition-all duration-1000 ease-out delay-300 ${thirdInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
          >
            <h3 className="text-black font-jost text-2xl md:text-[27px] font-semibold leading-[120%]">
              Experience Valuable Odoo Partners in the USA
            </h3>
            
            <p className="text-black font-jost text-lg md:text-[21px] font-normal leading-[125%]">
              As businesses grow, so does the complexity of their systems and data. AppitSoftware's AI Cloud Integration Services enable seamless connectivity between AI-powered solutions and leading cloud platforms like AWS, Azure, and Google Cloud.<br/>
              Our AI Cloud Integration Services are built for agility—facilitating secure data exchange, real-time analytics, and efficient AI model deployment in cloud-native environments. With scalable infrastructure and streamlined workflows, businesses can manage large data volumes and complex machine learning models with ease.<br/>
              Organizations trust our AI Cloud Integration Services to deliver cloud-ready AI solutions that minimize latency, strengthen security, and support multi-channel operations. Whether you're modernizing legacy systems or building new ones, we ensure your AI ecosystem is robust, scalable, and fully cloud-optimized.<br/>
              Additionally, our AI Cloud Integration Services are aligned with your compliance and security standards, giving you the performance, protection, and peace of mind you need to scale with confidence.
            </p>
          </div>
        </div>

        {/* Fourth Container - Text on Left, Image on Right */}
        <div ref={fourthSectionRef} className="w-full flex flex-col lg:flex-row gap-16">
          {/* Text Container - LEFT SIDE */}
          <div 
            className={`w-full lg:w-[750px] flex flex-col gap-4 transition-all duration-1000 ease-out ${fourthInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
          >
            <h3 className="text-black font-jost text-2xl md:text-[27px] font-semibold leading-[120%]">
              The Advantages of an Odoo Partner in the UK
            </h3>
            
            <p className="text-black font-jost text-lg md:text-[21px] font-normal leading-[125%]">
              In the United Kingdom, AppitSoftware offers specialized Odoo partnership services designed to address the unique challenges faced by UK businesses. Our expertise in Odoo's flexible architecture allows us to deliver <span className="underline decoration-solid">ERP solutions</span> that streamline operations, improve financial management, and enhance customer relationships.<br/>
              We understand the importance of compliance with UK-specific regulations, including VAT and GDPR, and ensure that our Odoo implementations adhere to these standards. By partnering with AppitSoftware, UK businesses gain access to a team of professionals dedicated to delivering ERP solutions that drive growth and operational excellence.
            </p>
          </div>
          
          {/* Image Container - RIGHT SIDE */}
          <div 
            className={`w-full lg:w-[700px] h-[300px] md:h-[355px] relative rounded-[24px] transition-all duration-1000 ease-out delay-300 ${fourthInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
            style={{
              background: 'url(/images/partnership/container4.png) lightgray 50% / cover no-repeat'
            }}
          ></div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInBottom {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-slide-in-bottom {
          animation: slideInBottom 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease forwards;
        }

        .animate-slide-up {
          animation: slideInBottom 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse forwards;
        }
      `}</style>
    </section>
  );
}