"use client";

import React, { useEffect, useRef } from 'react';

const VisionaryLeader = () => {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is in view
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate child elements
            const items = entry.target.querySelectorAll('.attribute-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, 200 * (index + 1));
            });
          } else {
            // Element is out of view
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            // Reset child elements
            const items = entry.target.querySelectorAll('.attribute-item');
            items.forEach((item) => {
              item.style.opacity = '0';
              item.style.transform = 'translateY(20px)';
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="inline-flex flex-col items-center gap-8 sm:gap-10 md:gap-11 py-12 px-4 md:py-[46px] md:px-8 lg:px-[120px] lg:pb-[71px] bg-[#252525] w-full relative pt-[70px] sm:pt-12"
      style={{ 
        transition: 'opacity 0.7s ease, transform 0.7s ease', 
        opacity: 0, 
        transform: 'translateY(20px)' 
      }}
    >
      {/* Heading container */}
      <div className="flex flex-col items-center gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 w-full lg:w-[1152px]">
        <h2 className="text-white text-center font-jost text-3xl md:text-4xl lg:text-[50px] font-semibold leading-[120%]">
          Meet Our <span className="text-[#EC1C26]">Visionary</span> Leader — <span className="text-[#EC1C26]">CEO</span> & <span className="text-[#EC1C26]">MD</span>
        </h2>
        <p className="self-stretch text-white text-center font-jost text-base md:text-lg lg:text-[21px] font-semibold leading-[120%]">APPIT Software Solutions</p>
      </div>

      {/* Leader information container */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 sm:gap-12 lg:gap-[65px] w-full max-w-[1152px] mt-2 sm:mt-0">
        {/* Text content - with improved z-index for visibility */}
        <div className="flex flex-col w-full relative z-20">
          <h3 className="text-white text-center font-jost text-3xl md:text-4xl lg:text-[60px] font-bold leading-[120%] mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
            Aravind Gajjela
          </h3>
          <p className="text-white font-jost text-sm xs:text-base md:text-lg lg:text-[21px] font-semibold leading-[120%]">
            Aravind Gajjela is the visionary CEO and Founder of APPIT Software Solutions, a leading provider of custom software and innovative IT services. With a strong background in technology and entrepreneurship, he has been instrumental in scaling the company and positioning it as a trusted partner for digital transformation.
          </p>
          <p className="text-white font-jost text-sm xs:text-base md:text-lg lg:text-[21px] font-semibold leading-[120%] mt-4">
            Under his leadership, APPIT has delivered tailored software, web, and cloud solutions that solve complex business challenges and drive operational efficiency. Aravind's expertise spans business process optimization, SDLC, and enterprise database management, all rooted in a customer-first, innovation-driven culture.
          </p>
        </div>

        {/* Image container - with adjusted positioning */}
        <div className="w-full lg:w-[459px] flex-shrink-0 mt-6 mb-4 lg:my-0">
          <div className="relative">
            {/* Shadow effect - repositioned and style adjusted for better visibility on small screens */}
            <div className="absolute top-[50px] sm:top-[40px] left-[10%] sm:left-[15%] lg:left-[60px] w-[80%] sm:w-[70%] lg:w-[459px] h-[250px] sm:h-[300px] lg:h-[404px] bg-[#454545] opacity-70 sm:opacity-80 lg:opacity-100 blur-[8px] sm:blur-[10px] z-10"></div>
            {/* White container */}
            <div className="relative bg-white rounded-[16px] w-[90%] sm:w-[80%] lg:w-[459px] mx-auto px-[10%] sm:px-[44px] flex justify-center items-end z-20 pt-4 sm:pt-6 lg:pt-8 pb-0">
              <img 
                src="/images/about/leader.png" 
                alt="Aravind Gajjela - CEO & Founder" 
                className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[371px] h-auto object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key attributes section - with improved positioning for small screens */}
      <div className="flex flex-col w-full max-w-[1152px] mt-4 sm:mt-6 lg:mt-0 relative z-30">
        {/* Row with all attributes in column on mobile */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* First attribute */}
          <div 
            className="flex items-center gap-3 attribute-item"
            style={{ 
              transition: 'opacity 0.5s ease, transform 0.5s ease', 
              opacity: 0, 
              transform: 'translateY(20px)' 
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40" fill="none" className="flex-shrink-0">
              <path d="M8.80948 23.6051L17.5263 23.6878C17.6307 23.6898 17.7328 23.7182 17.8231 23.7704C17.9135 23.8225 17.9891 23.8967 18.043 23.9861L22.473 31.4938C22.5411 31.6074 22.6444 31.6957 22.7671 31.7453C22.8899 31.795 23.0255 31.8033 23.1534 31.7691C23.2813 31.7348 23.3946 31.6598 23.4761 31.5554C23.5576 31.451 23.6028 31.3229 23.605 31.1905L23.6877 22.4736C23.6896 22.3693 23.7181 22.2672 23.7702 22.1768C23.8224 22.0865 23.8966 22.0108 23.986 21.9569L31.4936 17.5269C31.6072 17.4588 31.6955 17.3556 31.7452 17.2328C31.7949 17.1101 31.8032 16.9745 31.7689 16.8465C31.7347 16.7186 31.6596 16.6054 31.5552 16.5239C31.4508 16.4424 31.3228 16.3971 31.1903 16.395L22.4735 16.3123C22.3692 16.3103 22.2671 16.2819 22.1767 16.2297C22.0863 16.1776 22.0107 16.1033 21.9568 16.014L17.5268 8.50631C17.4587 8.39272 17.3555 8.30442 17.2327 8.25475C17.1099 8.20507 16.9743 8.19675 16.8464 8.23102C16.7185 8.2653 16.6052 8.34031 16.5237 8.44471C16.4423 8.5491 16.397 8.6772 16.3948 8.80961L16.3122 17.5265C16.3102 17.6308 16.2818 17.7329 16.2296 17.8232C16.1774 17.9136 16.1032 17.9893 16.0139 18.0432L8.50618 22.4732C8.39259 22.5413 8.30429 22.6445 8.25462 22.7673C8.20494 22.89 8.19662 23.0256 8.23089 23.1535C8.26517 23.2815 8.34018 23.3947 8.44458 23.4762C8.54897 23.5577 8.67707 23.6029 8.80948 23.6051Z" fill="url(#paint0_linear_893_3892)" stroke="#FCD34D" strokeWidth="0.125" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear_893_3892" x1="12.4769" y1="12.48" x2="27.5229" y2="27.5201" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FCD966"/>
                  <stop offset="0.5" stopColor="#FCD966"/>
                  <stop offset="1" stopColor="#FCCD34"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-white font-jost text-sm xs:text-base md:text-lg lg:text-[21px] font-normal leading-[120%]">Visionary Leadership</span>
          </div>

          {/* Second attribute */}
          <div 
            className="flex items-center gap-3 attribute-item" 
            style={{ 
              transition: 'opacity 0.5s ease, transform 0.5s ease', 
              opacity: 0, 
              transform: 'translateY(20px)',
              transitionDelay: '0.2s'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40" fill="none" className="flex-shrink-0">
              <path d="M8.80948 23.6051L17.5263 23.6878C17.6307 23.6898 17.7328 23.7182 17.8231 23.7704C17.9135 23.8225 17.9891 23.8967 18.043 23.9861L22.473 31.4938C22.5411 31.6074 22.6444 31.6957 22.7671 31.7453C22.8899 31.795 23.0255 31.8033 23.1534 31.7691C23.2813 31.7348 23.3946 31.6598 23.4761 31.5554C23.5576 31.451 23.6028 31.3229 23.605 31.1905L23.6877 22.4736C23.6896 22.3693 23.7181 22.2672 23.7702 22.1768C23.8224 22.0865 23.8966 22.0108 23.986 21.9569L31.4936 17.5269C31.6072 17.4588 31.6955 17.3556 31.7452 17.2328C31.7949 17.1101 31.8032 16.9745 31.7689 16.8465C31.7347 16.7186 31.6596 16.6054 31.5552 16.5239C31.4508 16.4424 31.3228 16.3971 31.1903 16.395L22.4735 16.3123C22.3692 16.3103 22.2671 16.2819 22.1767 16.2297C22.0863 16.1776 22.0107 16.1033 21.9568 16.014L17.5268 8.50631C17.4587 8.39272 17.3555 8.30442 17.2327 8.25475C17.1099 8.20507 16.9743 8.19675 16.8464 8.23102C16.7185 8.2653 16.6052 8.34031 16.5237 8.44471C16.4423 8.5491 16.397 8.6772 16.3948 8.80961L16.3122 17.5265C16.3102 17.6308 16.2818 17.7329 16.2296 17.8232C16.1774 17.9136 16.1032 17.9893 16.0139 18.0432L8.50618 22.4732C8.39259 22.5413 8.30429 22.6445 8.25462 22.7673C8.20494 22.89 8.19662 23.0256 8.23089 23.1535C8.26517 23.2815 8.34018 23.3947 8.44458 23.4762C8.54897 23.5577 8.67707 23.6029 8.80948 23.6051Z" fill="url(#paint0_linear_893_3892)" stroke="#FCD34D" strokeWidth="0.125" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear_893_3892" x1="12.4769" y1="12.48" x2="27.5229" y2="27.5201" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FCD966"/>
                  <stop offset="0.5" stopColor="#FCD966"/>
                  <stop offset="1" stopColor="#FCCD34"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-white font-jost text-sm xs:text-base md:text-lg lg:text-[21px] font-normal leading-[120%]">Customer-Centric Approach</span>
          </div>
          
          {/* Third attribute */}
          <div 
            className="flex items-center gap-3 attribute-item" 
            style={{ 
              transition: 'opacity 0.5s ease, transform 0.5s ease', 
              opacity: 0, 
              transform: 'translateY(20px)',
              transitionDelay: '0.4s'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40" fill="none" className="flex-shrink-0">
              <path d="M8.80948 23.6051L17.5263 23.6878C17.6307 23.6898 17.7328 23.7182 17.8231 23.7704C17.9135 23.8225 17.9891 23.8967 18.043 23.9861L22.473 31.4938C22.5411 31.6074 22.6444 31.6957 22.7671 31.7453C22.8899 31.795 23.0255 31.8033 23.1534 31.7691C23.2813 31.7348 23.3946 31.6598 23.4761 31.5554C23.5576 31.451 23.6028 31.3229 23.605 31.1905L23.6877 22.4736C23.6896 22.3693 23.7181 22.2672 23.7702 22.1768C23.8224 22.0865 23.8966 22.0108 23.986 21.9569L31.4936 17.5269C31.6072 17.4588 31.6955 17.3556 31.7452 17.2328C31.7949 17.1101 31.8032 16.9745 31.7689 16.8465C31.7347 16.7186 31.6596 16.6054 31.5552 16.5239C31.4508 16.4424 31.3228 16.3971 31.1903 16.395L22.4735 16.3123C22.3692 16.3103 22.2671 16.2819 22.1767 16.2297C22.0863 16.1776 22.0107 16.1033 21.9568 16.014L17.5268 8.50631C17.4587 8.39272 17.3555 8.30442 17.2327 8.25475C17.1099 8.20507 16.9743 8.19675 16.8464 8.23102C16.7185 8.2653 16.6052 8.34031 16.5237 8.44471C16.4423 8.5491 16.397 8.6772 16.3948 8.80961L16.3122 17.5265C16.3102 17.6308 16.2818 17.7329 16.2296 17.8232C16.1774 17.9136 16.1032 17.9893 16.0139 18.0432L8.50618 22.4732C8.39259 22.5413 8.30429 22.6445 8.25462 22.7673C8.20494 22.89 8.19662 23.0256 8.23089 23.1535C8.26517 23.2815 8.34018 23.3947 8.44458 23.4762C8.54897 23.5577 8.67707 23.6029 8.80948 23.6051Z" fill="url(#paint0_linear_893_3892)" stroke="#FCD34D" strokeWidth="0.125" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear_893_3892" x1="12.4769" y1="12.48" x2="27.5229" y2="27.5201" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FCD966"/>
                  <stop offset="0.5" stopColor="#FCD966"/>
                  <stop offset="1" stopColor="#FCCD34"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-white font-jost text-sm xs:text-base md:text-lg lg:text-[21px] font-normal leading-[120%]">Expertise in Technology and Business</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionaryLeader;