"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const TeamAboveFooterSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionPosition = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Only apply the effect when the section is in view
      if (scrollPosition + viewportHeight > sectionPosition && scrollPosition < sectionPosition + sectionRef.current.offsetHeight) {
        const distanceFromTop = scrollPosition - sectionPosition;
        const offset = Math.min(distanceFromTop * 0.05, 30); // Limit the maximum offset
        sectionRef.current.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initialize the animation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white pt-0 px-4 md:px-6 lg:px-0 mb-6 sm:mb-8 md:mb-10 font-jost -mt-5 sm:-mt-8 md:-mt-12 lg:-mt-16"
    >
      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto flex flex-col items-start w-full">
        {/* Social Media Container */}
        <div className="w-full">
          {/* SM Heading */}
          <h3 className="font-jost text-sm sm:text-base font-semibold leading-[120%] font-bold">
            SOCIAL
          </h3>
          
          {/* Follow Us Heading */}
          <h2 className="font-jost text-xl sm:text-2xl md:text-3xl font-semibold leading-[120%] mb-6 sm:mb-8 md:mb-10">
            Follow us for the latest updates
          </h2>
          
          {/* Social Media Icons Container */}
          <div className="flex flex-wrap justify-start sm:justify-between items-center w-full gap-4 sm:gap-5 mb-8 sm:mb-12 md:mb-16">
            {/* Facebook Container */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 aspect-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 40 40" fill="none">
                  <path d="M23.3333 22.5002H27.5L29.1666 15.8335H23.3333V12.5002C23.3333 10.7835 23.3333 9.16683 26.6666 9.16683H29.1666V3.56683C28.6233 3.49516 26.5716 3.3335 24.405 3.3335C19.88 3.3335 16.6666 6.09516 16.6666 11.1668V15.8335H11.6666V22.5002H16.6666V36.6668H23.3333V22.5002Z" fill="black"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="text-black font-jost text-sm sm:text-base font-semibold leading-[120%]">
                  FACEBOOK
                </h4>
                <p className="text-black font-jost text-xs sm:text-sm md:text-base font-normal leading-[120%]">
                  Appit Solutions
                </p>
              </div>
            </div>
            
            {/* Twitter/X Container */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 aspect-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 41 40" fill="none">
                  <path d="M23.485 17.32L36.1425 2.5H33.1425L22.155 15.3675L13.375 2.5H3.25L16.525 21.96L3.25 37.5H6.25L17.855 23.91L27.1275 37.5H37.2525L23.485 17.32ZM19.3775 22.13L18.0325 20.1925L7.33 4.775H11.9375L20.5725 17.2175L21.9175 19.155L33.145 35.33H28.5375L19.3775 22.13Z" fill="black"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="text-black font-jost text-sm sm:text-base font-semibold leading-[120%]">
                  X
                </h4>
                <p className="text-black font-jost text-xs sm:text-sm md:text-base font-normal leading-[120%]">
                  Appit Solutions
                </p>
              </div>
            </div>
            
            {/* YouTube Container */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 aspect-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 41 40" fill="none">
                  <path d="M17.1666 25.0002L25.8166 20.0002L17.1666 15.0002V25.0002ZM36.4333 11.9502C36.6499 12.7335 36.7999 13.7835 36.8999 15.1168C37.0166 16.4502 37.0666 17.6002 37.0666 18.6002L37.1666 20.0002C37.1666 23.6502 36.8999 26.3335 36.4333 28.0502C36.0166 29.5502 35.0499 30.5168 33.5499 30.9335C32.7666 31.1502 31.3333 31.3002 29.1333 31.4002C26.9666 31.5168 24.9833 31.5668 23.1499 31.5668L20.4999 31.6668C13.5166 31.6668 9.16659 31.4002 7.44992 30.9335C5.94992 30.5168 4.98325 29.5502 4.56659 28.0502C4.34992 27.2668 4.19992 26.2168 4.09992 24.8835C3.98325 23.5502 3.93325 22.4002 3.93325 21.4002L3.83325 20.0002C3.83325 16.3502 4.09992 13.6668 4.56659 11.9502C4.98325 10.4502 5.94992 9.4835 7.44992 9.06683C8.23325 8.85016 9.66659 8.70016 11.8666 8.60016C14.0333 8.4835 16.0166 8.4335 17.8499 8.4335L20.4999 8.3335C27.4833 8.3335 31.8333 8.60016 33.5499 9.06683C35.0499 9.4835 36.0166 10.4502 36.4333 11.9502Z" fill="black"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="text-black font-jost text-sm sm:text-base font-semibold leading-[120%]">
                  YOUTUBE
                </h4>
                <p className="text-black font-jost text-xs sm:text-sm md:text-base font-normal leading-[120%]">
                  Appit Solutions
                </p>
              </div>
            </div>
            
            {/* Instagram Container */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 aspect-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 41 40" fill="none">
                  <path d="M13.7499 3.3335H27.7499C33.0833 3.3335 37.4166 7.66683 37.4166 13.0002V27.0002C37.4166 29.5639 36.3981 32.0227 34.5853 33.8355C32.7724 35.6484 30.3137 36.6668 27.7499 36.6668H13.7499C8.41659 36.6668 4.08325 32.3335 4.08325 27.0002V13.0002C4.08325 10.4364 5.1017 7.97765 6.91455 6.1648C8.7274 4.35195 11.1862 3.3335 13.7499 3.3335ZM13.4166 6.66683C11.8253 6.66683 10.2992 7.29897 9.17394 8.42419C8.04873 9.54941 7.41659 11.0755 7.41659 12.6668V27.3335C7.41659 30.6502 10.0999 33.3335 13.4166 33.3335H28.0833C29.6745 33.3335 31.2007 32.7014 32.3259 31.5761C33.4511 30.4509 34.0833 28.9248 34.0833 27.3335V12.6668C34.0833 9.35016 31.3999 6.66683 28.0833 6.66683H13.4166ZM29.4999 9.16683C30.0525 9.16683 30.5824 9.38632 30.9731 9.77702C31.3638 10.1677 31.5833 10.6976 31.5833 11.2502C31.5833 11.8027 31.3638 12.3326 30.9731 12.7233C30.5824 13.114 30.0525 13.3335 29.4999 13.3335C28.9474 13.3335 28.4175 13.114 28.0268 12.7233C27.6361 12.3326 27.4166 11.8027 27.4166 11.2502C27.4166 10.6976 27.6361 10.1677 28.0268 9.77702C28.4175 9.38632 28.9474 9.16683 29.4999 9.16683ZM20.7499 11.6668C22.9601 11.6668 25.0797 12.5448 26.6425 14.1076C28.2053 15.6704 29.0833 17.79 29.0833 20.0002C29.0833 22.2103 28.2053 24.3299 26.6425 25.8927C25.0797 27.4555 22.9601 28.3335 20.7499 28.3335C18.5398 28.3335 16.4202 27.4555 14.8574 25.8927C13.2946 24.3299 12.4166 22.2103 12.4166 20.0002C12.4166 17.79 13.2946 15.6704 14.8574 14.1076C16.4202 12.5448 18.5398 11.6668 20.7499 11.6668ZM20.7499 15.0002C19.4238 15.0002 18.1521 15.5269 17.2144 16.4646C16.2767 17.4023 15.7499 18.6741 15.7499 20.0002C15.7499 21.3262 16.2767 22.598 17.2144 23.5357C18.1521 24.4734 19.4238 25.0002 20.7499 25.0002C22.076 25.0002 23.3478 24.4734 24.2855 23.5357C25.2231 22.598 25.7499 21.3262 25.7499 20.0002C25.7499 18.6741 25.2231 17.4023 24.2855 16.4646C23.3478 15.5269 22.076 15.0002 20.7499 15.0002Z" fill="black"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="text-black font-jost text-sm sm:text-base font-semibold leading-[120%]">
                  INSTAGRAM
                </h4>
                <p className="text-black font-jost text-xs sm:text-sm md:text-base font-normal leading-[120%]">
                  Appit Solutions
                </p>
              </div>
            </div>
            
            {/* LinkedIn Container */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 aspect-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 40 40" fill="none">
                  <path d="M32.8451 5.00002H7.24505C6.95884 4.9987 6.67519 5.0541 6.41051 5.16302C6.14583 5.27193 5.90535 5.43222 5.70296 5.6346C5.50058 5.83699 5.34029 6.07747 5.23137 6.34215C5.12246 6.60683 5.06706 6.89048 5.06838 7.17669V32.8234C5.06838 33.9834 6.03505 35 7.24505 35H32.745C33.0314 35.0016 33.3152 34.9463 33.5801 34.8375C33.845 34.7287 34.0857 34.5684 34.2882 34.366C34.4908 34.1636 34.6512 33.9231 34.7602 33.6583C34.8693 33.3935 34.9247 33.1097 34.9234 32.8234V7.12836C35.0217 5.96836 34.0534 5.00002 32.8451 5.00002ZM13.9234 30.5H9.52172V16.225H13.925L13.9234 30.5ZM11.6984 14.2417C11.3611 14.2435 11.0269 14.1783 10.715 14.05C10.4031 13.9217 10.1197 13.7328 9.8813 13.4943C9.64289 13.2557 9.45418 12.9722 9.32609 12.6602C9.19799 12.3482 9.13306 12.0139 9.13505 11.6767C9.13505 10.275 10.295 9.11336 11.6984 9.11336C13.1017 9.11336 14.265 10.275 14.265 11.6767C14.265 13.0784 13.1984 14.2417 11.6984 14.2417ZM30.6184 30.5H26.215V23.58C26.215 21.935 26.1667 19.7584 23.8934 19.7584C21.57 19.7584 21.2317 21.5967 21.2317 23.435V30.5H16.8284V16.225H21.135V18.2084H21.1834C21.8117 17.0484 23.2167 15.8867 25.3934 15.8867C29.8934 15.8867 30.715 18.79 30.715 22.7584V30.5H30.6184Z" fill="black"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="text-black font-jost text-sm sm:text-base font-semibold leading-[120%]">
                  LINKEDIN
                </h4>
                <p className="text-black font-jost text-xs sm:text-sm md:text-base font-normal leading-[120%]">
                  Appit Solutions
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Links Container */}
        <div className="w-full mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-[#252525] font-jost text-xl sm:text-2xl md:text-3xl font-bold leading-[120%] mb-4 sm:mb-6 md:mb-8">
            Quick links
          </h2>
          
          {/* Actual Links Container */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8 md:gap-12 w-full px-0 sm:px-4 md:px-[60px] lg:px-[120px] mb-4">
            {/* Container 1 */}
            <div className="flex">
              <div className="w-1 h-[129px] bg-[#0066B3]"></div>
              <div className="flex flex-col pl-3 sm:pl-4">
                <div className="py-2 sm:py-2.5">
                  <Link href="#" className="group inline-block text-[#252525] hover:text-[#FF5555] font-jost text-sm sm:text-base font-bold leading-[120%] transition-all duration-300">
                    <div className="relative pl-0 group-hover:pl-5 sm:group-hover:pl-7 transition-all duration-300 ease-out">
                      <svg className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{top: '2px'}} width="12" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1.5L8 8L0.5 14.5" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">ServiceNow AI Solutions</span>
                    </div>
                  </Link>
                </div>
                <div className="py-2 sm:py-2.5">
                  <Link href="#" className="group inline-block text-[#252525] hover:text-[#FF5555] font-jost text-sm sm:text-base font-bold leading-[120%] transition-all duration-300">
                    <div className="relative pl-0 group-hover:pl-5 sm:group-hover:pl-7 transition-all duration-300 ease-out">
                      <svg className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{top: '2px'}} width="12" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1.5L8 8L0.5 14.5" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">Oracle AI Solutions</span>
                    </div>
                  </Link>
                </div>
                <div className="py-2 sm:py-2.5">
                  <Link href="#" className="group inline-block text-[#252525] hover:text-[#FF5555] font-jost text-sm sm:text-base font-bold leading-[120%] transition-all duration-300">
                    <div className="relative pl-0 group-hover:pl-5 sm:group-hover:pl-7 transition-all duration-300 ease-out">
                      <svg className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{top: '2px'}} width="12" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1.5L8 8L0.5 14.5" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">Legal AI Assistance</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Container 2 */}
            <div className="flex">
              <div className="w-1 h-[129px] bg-[#0066B3]"></div>
              <div className="flex flex-col pl-3 sm:pl-4">
                <div className="py-2 sm:py-2.5">
                  <Link href="#" className="group inline-block text-[#252525] hover:text-[#FF5555] font-jost text-sm sm:text-base font-bold leading-[120%] transition-all duration-300">
                    <div className="relative pl-0 group-hover:pl-5 sm:group-hover:pl-7 transition-all duration-300 ease-out">
                      <svg className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{top: '2px'}} width="12" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1.5L8 8L0.5 14.5" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">AI-Driven Talent Acquisition</span>
                    </div>
                  </Link>
                </div>
                <div className="py-2 sm:py-2.5">
                  <Link href="#" className="group inline-block text-[#252525] hover:text-[#FF5555] font-jost text-sm sm:text-base font-bold leading-[120%] transition-all duration-300">
                    <div className="relative pl-0 group-hover:pl-5 sm:group-hover:pl-7 transition-all duration-300 ease-out">
                      <svg className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{top: '2px'}} width="12" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1.5L8 8L0.5 14.5" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">All-in-One CRM Solution</span>
                    </div>
                  </Link>
                </div>
                <div className="py-2 sm:py-2.5">
                  <Link href="#" className="group inline-block text-[#252525] hover:text-[#FF5555] font-jost text-sm sm:text-base font-bold leading-[120%] transition-all duration-300">
                    <div className="relative pl-0 group-hover:pl-5 sm:group-hover:pl-7 transition-all duration-300 ease-out">
                      <svg className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{top: '2px'}} width="12" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1.5L8 8L0.5 14.5" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">Outlook AI Copilot</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Container 3 */}
            <div className="flex">
              <div className="w-1 h-[129px] bg-[#0066B3]"></div>
              <div className="flex flex-col pl-3 sm:pl-4">
                <div className="py-2 sm:py-2.5">
                  <Link href="#" className="group inline-block text-[#252525] hover:text-[#FF5555] font-jost text-sm sm:text-base font-bold leading-[120%] transition-all duration-300">
                    <div className="relative pl-0 group-hover:pl-5 sm:group-hover:pl-7 transition-all duration-300 ease-out">
                      <svg className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{top: '2px'}} width="12" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1.5L8 8L0.5 14.5" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">ECommerce Services</span>
                    </div>
                  </Link>
                </div>
                <div className="py-2 sm:py-2.5">
                  <Link href="#" className="group inline-block text-[#252525] hover:text-[#FF5555] font-jost text-sm sm:text-base font-bold leading-[120%] transition-all duration-300">
                    <div className="relative pl-0 group-hover:pl-5 sm:group-hover:pl-7 transition-all duration-300 ease-out">
                      <svg className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{top: '2px'}} width="12" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1.5L8 8L0.5 14.5" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">Outlook AI Copilot</span>
                    </div>
                  </Link>
                </div>
                <div className="py-2 sm:py-2.5">
                  <Link href="#" className="group inline-block text-[#252525] hover:text-[#FF5555] font-jost text-sm sm:text-base font-bold leading-[120%] transition-all duration-300">
                    <div className="relative pl-0 group-hover:pl-5 sm:group-hover:pl-7 transition-all duration-300 ease-out">
                      <svg className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{top: '2px'}} width="12" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1.5L8 8L0.5 14.5" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">GenMind Consulting</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Container 4 */}
            <div className="flex">
              <div className="w-1 h-[129px] bg-[#0066B3]"></div>
              <div className="flex flex-col pl-3 sm:pl-4">
                <div className="py-2 sm:py-2.5">
                  <Link href="#" className="group inline-block text-[#252525] hover:text-[#FF5555] font-jost text-sm sm:text-base font-bold leading-[120%] transition-all duration-300">
                    <div className="relative pl-0 group-hover:pl-5 sm:group-hover:pl-7 transition-all duration-300 ease-out">
                      <svg className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{top: '2px'}} width="12" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1.5L8 8L0.5 14.5" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">Contact Us</span>
                    </div>
                  </Link>
                </div>
                <div className="py-2 sm:py-2.5">
                  <Link href="#" className="group inline-block text-[#252525] hover:text-[#FF5555] font-jost text-sm sm:text-base font-bold leading-[120%] transition-all duration-300">
                    <div className="relative pl-0 group-hover:pl-5 sm:group-hover:pl-7 transition-all duration-300 ease-out">
                      <svg className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{top: '2px'}} width="12" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1.5L8 8L0.5 14.5" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">Careers</span>
                    </div>
                  </Link>
                </div>
                <div className="py-2 sm:py-2.5">
                  <Link href="#" className="group inline-block text-[#252525] hover:text-[#FF5555] font-jost text-sm sm:text-base font-bold leading-[120%] transition-all duration-300">
                    <div className="relative pl-0 group-hover:pl-5 sm:group-hover:pl-7 transition-all duration-300 ease-out">
                      <svg className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{top: '2px'}} width="12" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1.5L8 8L0.5 14.5" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10">About Us</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Countries Container */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {/* India Container */}
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
              <img src="/images/india.svg" alt="India Flag" className="w-full h-full" />
            </div>
            <p className="text-black font-jost text-[10px] xs:text-xs sm:text-xs font-normal leading-tight">
              IND: PSR Prime Towers, 704 C, 7th Floor, Adjacent to DLF Cyber City, Gachibowli, Hyderabad, Telangana, India-500032.
            </p>
          </div>
          
          {/* UAE Container */}
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-8 h-4 sm:w-10 sm:h-5 rounded aspect-[2/1] overflow-hidden flex-shrink-0">
              <img src="/images/uae.png" alt="UAE Flag" className="w-full h-full object-cover" />
            </div>
            <p className="text-black font-jost text-[10px] xs:text-xs sm:text-xs font-normal leading-tight">
              UAE: IFZA Business Park, DDPDubai Silicon Oasis, DDP, Building A1, Dubai, United Arab Emirates.
            </p>
          </div>
          
          {/* USA Container */}
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-8 h-4 sm:w-10 sm:h-[21px] rounded aspect-[40/21] overflow-hidden flex-shrink-0">
              <img src="/images/usa.png" alt="USA Flag" className="w-full h-full object-cover" />
            </div>
            <p className="text-black font-jost text-[10px] xs:text-xs sm:text-xs font-normal leading-tight">
              USA:16192 Coastal Highway, Lewes, DE 19958, USA.
            </p>
          </div>
          
          {/* Saudi Container */}
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-8 h-5 sm:w-10 sm:h-[27px] rounded aspect-[40/27] overflow-hidden flex-shrink-0">
              <img src="/images/saudi.png" alt="Saudi Arabia Flag" className="w-full h-full object-cover" />
            </div>
            <p className="text-black font-jost text-[10px] xs:text-xs sm:text-xs font-normal leading-tight">
              KSA: Office 254, Al Olaya Street, Riyadh, Kingdom of Saudi Arabia.
            </p>
          </div>
        </div>
      </div>
      
      {/* Import Jost font explicitly */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');
        
        @media (max-width: 479px) {
          .grid-cols-1 > div {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default TeamAboveFooterSection;