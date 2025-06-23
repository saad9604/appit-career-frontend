'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function IndustryFAQ() {
  // State to track which FAQ is open
  const [openFaq, setOpenFaq] = useState(null);
  // Ref for measuring content height
  const answerRefs = useRef([]);
  const { ref: sectionRef, isInView } = useScrollAnimation();
  const { ref: transformRef, isInView: transformInView } = useScrollAnimation();

  // Initialize refs for each FAQ
  useEffect(() => {
    answerRefs.current = answerRefs.current.slice(0, faqs.length);
  }, []);

  // FAQ data
  const faqs = [
    {
      question: "How do Oracle ERP Products and Services support oil and gas operations?",
      answer: "Our Oracle ERP services deliver scalable solutions for finance, procurement, inventory, and project management. They help oil and gas companies gain real-time insights and optimize end-to-end business processes using intelligent automation."
    },
    {
      question: "How is AI integrated into Oracle services for the oil and gas sector?",
      answer: "Through Oracle AI in Oil and Gas Services, AppitSoftware leverages machine learning, predictive analytics, and automation to forecast equipment failures, optimize supply chain operations, and enhance field productivity."
    },
    {
      question: "What are Oracle EBS R12 Oil and Gas IT Solutions offered by AppitSoftware?",
      answer: "AppitSoftware provides Oracle EBS R12 IT solutions specifically tailored for the oil and gas industry, helping companies streamline operations, manage assets, ensure regulatory compliance, and improve overall efficiency through integrated ERP modules."
    },
    {
      question: "Why should oil and gas companies choose AppitSoftware for Oracle EBS R12 services?",
      answer: "As an AI-driven solutions provider, AppitSoftware combines deep industry knowledge with Oracle's robust ERP capabilities to deliver agile, data-centric solutions that maximize ROI and minimize operational risks."
    },
    {
      question: "What benefits do Oracle EBS R12 Oil Industry Services offer?",
      answer: "AppitSoftware's services help oil companies handle complex upstream and downstream activities, with customized workflows, robust reporting, and AI integration for smarter asset utilization, production tracking, and cost control."
    }
  ];

  // Toggle FAQ open/close with a smooth scroll
  const toggleFaq = (index) => {
    const newOpenFaq = openFaq === index ? null : index;
    setOpenFaq(newOpenFaq);
    
    // Add a small delay to allow animation to start before scrolling
    if (newOpenFaq !== null) {
      setTimeout(() => {
        const element = answerRefs.current[index];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  };

  return (
    <section className="w-full py-10 xs:py-12 sm:py-14 md:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 flex flex-col items-center gap-8 md:gap-16 max-w-[1241px]">
        {/* FAQ and Heading Container */}
        <div ref={sectionRef} className="flex flex-col items-start gap-6 md:gap-12 w-full">
          {/* Heading */}
          <h2 className={`w-full text-center font-jost text-2xl xs:text-3xl sm:text-[36px] md:text-[40px] font-semibold leading-[120%] transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Got Questions? We've Got <span className="text-[#EC1C26]">Answers (FAQs)</span>
          </h2>

          {/* FAQ Section */}
          <div className={`flex flex-col lg:flex-row justify-between items-start gap-8 w-full transition-all duration-1000 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* FAQs Container */}
            <div className="w-full lg:w-[568px] flex flex-col items-start gap-6 md:gap-[24px] transition-all duration-500 ease-in-out order-2 lg:order-1">
              {faqs.map((faq, index) => (
                <div key={index} className="w-full transition-all duration-500 ease-in-out">
                  {/* FAQ Question Bar */}
                  <div 
                    className={`flex justify-between items-center p-3 xs:p-4 md:p-[16px_24px] transition-all duration-500 ease-in-out ${openFaq === index ? 'rounded-t-[32px]' : 'rounded-[32px]'} bg-[#0A4270] cursor-pointer w-full border-b border-white`}
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-white font-jost text-xs xs:text-sm sm:text-base font-semibold leading-[120%] w-full md:w-[518px] pr-2">
                      {faq.question}
                    </h3>
                    <div className={`w-8 h-8 flex-shrink-0 transition-transform duration-500 ease-in-out ${openFaq === index ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M10.8262 12.3864L15.9996 17.5598L21.1729 12.3864C21.2963 12.263 21.4429 12.1651 21.6042 12.0983C21.7655 12.0315 21.9383 11.9971 22.1129 11.9971C22.2875 11.9971 22.4603 12.0315 22.6216 12.0983C22.7829 12.1651 22.9295 12.263 23.0529 12.3864C23.1763 12.5099 23.2743 12.6564 23.3411 12.8177C23.4079 12.979 23.4423 13.1519 23.4423 13.3264C23.4423 13.501 23.4079 13.6739 23.3411 13.8352C23.2743 13.9964 23.1763 14.143 23.0529 14.2664L16.9329 20.3864C16.8095 20.51 16.663 20.6081 16.5017 20.675C16.3404 20.7419 16.1675 20.7764 15.9929 20.7764C15.8183 20.7764 15.6454 20.7419 15.4841 20.675C15.3228 20.6081 15.1762 20.51 15.0529 20.3864L8.93289 14.2664C8.80929 14.1431 8.71123 13.9966 8.64432 13.8353C8.57741 13.674 8.54297 13.5011 8.54297 13.3264C8.54297 13.1518 8.57741 12.9789 8.64432 12.8176C8.71123 12.6563 8.80929 12.5098 8.93289 12.3864C9.45289 11.8798 10.3062 11.8664 10.8262 12.3864Z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* FAQ Answer Container */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out`}
                    style={{
                      maxHeight: openFaq === index ? `${answerRefs.current[index]?.scrollHeight}px` : '0px',
                      opacity: openFaq === index ? 1 : 0,
                      transformOrigin: 'top',
                      transform: openFaq === index ? 'scaleY(1)' : 'scaleY(0)'
                    }}
                  >
                    <div 
                      className="flex p-3 xs:p-4 md:p-[10px_16px] justify-center items-center gap-[10px] rounded-b-[32px] bg-[#F6F6F6] w-full"
                      ref={el => answerRefs.current[index] = el}
                    >
                      <p className="text-black font-inter text-xs sm:text-sm md:text-[14px] font-normal leading-[120%] md:w-[445px] ml-2 xs:ml-4 flex items-start">
                        <span className="text-black inline-block rounded-full w-2 h-2 bg-black mr-2 mt-1 flex-shrink-0"></span>
                        <span>{faq.answer}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Image Container - Moved to right side on large screens */}
            <div 
              className={`w-full md:w-[600px] lg:w-[550px] h-[280px] xs:h-[320px] sm:h-[350px] md:h-[420px] lg:h-[430px] rounded-[32px] bg-center bg-contain bg-no-repeat block mx-auto order-1 lg:order-2 transition-all duration-1000 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}              
              style={{ 
                backgroundImage: "url('/images/industry/faqlogo.png')",
                backgroundColor: "white" 
              }}
            />
          </div>
        </div>

        {/* Transformation Section */}
        <div ref={transformRef} className="flex flex-col items-center gap-8 md:gap-16 w-full mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className={`text-center font-jost text-2xl xs:text-3xl sm:text-[36px] md:text-[40px] font-semibold leading-[120%] transition-all duration-1000 ease-out ${transformInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Start Your <span className="text-[#EC1C26]">Digital Transformation</span>
          </h2>

          {/* Buttons Container */}
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-[44px] w-full flex-wrap transition-all duration-1000 ease-out delay-300 ${transformInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Location Button */}
            <Link 
              href="https://www.google.com/maps/place/APPIT+Software+Solutions+Private+Limited/@17.4468931,78.3522052,16z/data=!4m6!3m5!1s0x3bcb93e1cd2b5181:0x6953abcde44fb0fc!8m2!3d17.4469061!4d78.3543102!16s%2Fg%2F11dfgs33hw?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-4 xs:gap-6 md:gap-8 w-full sm:w-[300px] md:w-[340px] h-[60px] xs:h-[65px] sm:h-[72px] px-4 xs:px-5 rounded-[50px] border-2 border-[#4A0508] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-black hover:border-white transition-all duration-300 ease-in-out"
            >
              <span className="text-[#252525] group-hover:text-white font-jost text-lg xs:text-xl sm:text-2xl md:text-[27px] font-normal leading-[120%] underline transition-colors duration-300">
                Location
              </span>
              <div className="relative w-10 h-10">
                {/* Default arrow */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="41" 
                  height="40" 
                  viewBox="0 0 41 40" 
                  fill="none"
                  className="absolute transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                >
                  <path d="M7.16634 20H33.833M33.833 20L23.833 30M33.833 20L23.833 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                {/* Hover arrow */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="41" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  className="transform rotate-[-45deg] absolute opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" 
                    stroke="white" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>

            {/* Email Button */}
            <Link 
              href="mailto:info@appitsoftware.com"
              className="group flex items-center justify-center gap-4 xs:gap-6 md:gap-8 w-full sm:w-[300px] md:w-[340px] h-[60px] xs:h-[65px] sm:h-[72px] px-4 xs:px-5 rounded-[50px] border-2 border-[#4A0508] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-black hover:border-white transition-all duration-300 ease-in-out"
            >
              <span className="text-[#252525] group-hover:text-white font-jost text-lg xs:text-xl sm:text-2xl md:text-[27px] font-normal leading-[120%] underline transition-colors duration-300">
                Email Us
              </span>
              <div className="relative w-10 h-10">
                {/* Default arrow */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="41" 
                  height="40" 
                  viewBox="0 0 41 40" 
                  fill="none"
                  className="absolute transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                >
                  <path d="M7.16634 20H33.833M33.833 20L23.833 30M33.833 20L23.833 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                {/* Hover arrow */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="41" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  className="transform rotate-[-45deg] absolute opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" 
                    stroke="white" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
