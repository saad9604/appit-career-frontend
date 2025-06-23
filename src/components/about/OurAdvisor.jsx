"use client";

import React, { useEffect, useRef } from 'react';

const OurAdvisor = () => {
  const sectionRef = useRef(null);

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
      className="inline-flex flex-col items-center gap-6 xs:gap-7 sm:gap-8 md:gap-10 lg:gap-12 py-8 px-4 xs:py-10 xs:px-5 sm:py-12 sm:px-6 md:py-[46px] md:px-8 lg:px-[120px] lg:pb-[71px] bg-[#252525] w-full overflow-hidden font-jost"
      style={{ 
        transition: 'opacity 0.7s ease, transform 0.7s ease', 
        opacity: 0, 
        transform: 'translateY(20px)'
      }}
    >
      {/* Heading container */}
      <div className="flex flex-col items-center gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 w-full max-w-full xs:max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:w-[1152px]">
        <h2 className="text-white text-center text-2xl xs:text-[28px] sm:text-3xl md:text-4xl lg:text-[50px] font-semibold leading-[120%]">
          Meet the Minds Behind Our <span className="text-[#EC1C26]">Success!</span>
        </h2>
        <p className="self-stretch text-white text-center text-base xs:text-lg sm:text-lg md:text-xl lg:text-[21px] font-semibold leading-[120%]">Our Advisor</p>
      </div>

      {/* Advisor information container */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 xs:gap-6 sm:gap-7 md:gap-8 lg:gap-[65px] w-full max-w-full xs:max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[1152px]">
        {/* Text content */}
        <div className="flex flex-col w-full order-2 lg:order-1">
          <h3 className="text-white text-left pl-0 sm:pl-6 md:pl-10 lg:pl-16 text-2xl xs:text-[28px] sm:text-3xl md:text-4xl lg:text-[60px] font-bold leading-[120%] mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10">
            Ventaka Niranjan
          </h3>
          <p className="text-white text-sm xs:text-base sm:text-lg md:text-lg lg:text-[21px] font-semibold leading-[130%] sm:leading-[120%]">
            A seasoned IT professional with over 30 years of experience, including 20+ years in leadership roles across IT and manufacturing sectors.
          </p>
          <p className="text-white text-sm xs:text-base sm:text-lg md:text-lg lg:text-[21px] font-semibold leading-[130%] sm:leading-[120%] mt-2 xs:mt-3 sm:mt-4 md:mt-5 lg:mt-6">
            He has led ERP and e-commerce implementations, upgrades, and maintenance, driving full-scale digital transformations using the latest technologies and best practices.
          </p>
          <p className="text-white text-sm xs:text-base sm:text-lg md:text-lg lg:text-[21px] font-semibold leading-[130%] sm:leading-[120%] mt-2 xs:mt-3 sm:mt-4 md:mt-5 lg:mt-6">
            With expertise in system integration, process optimization, and cross-functional leadership, he consistently delivers impactful, business-driven IT solutions.
          </p>
        </div>

        {/* Image container */}
        <div className="w-full xs:w-[85%] sm:w-[80%] md:w-[70%] lg:w-[459px] flex-shrink-0 order-1 lg:order-2 mb-4 xs:mb-5 sm:mb-6 lg:mb-0">
          <div className="relative">
            {/* Shadow effect - positioned to the right and lower with responsive adjustments */}
            <div className="absolute top-6 xs:top-8 sm:top-10 left-6 xs:left-8 sm:left-10 md:left-16 lg:left-[60px] w-full lg:w-[459px] h-[280px] xs:h-[320px] sm:h-[350px] md:h-[380px] lg:h-[404px] bg-[#454545] blur-[10px] z-10"></div>
            {/* Image with exact dimensions of the white container */}
            <div className="relative z-20 w-full lg:w-[459px] overflow-hidden rounded-[12px] xs:rounded-[14px] sm:rounded-[16px]">
              <img 
                src="/images/about/advisor.png" 
                alt="Ventaka Niranjan - Our Advisor" 
                className="w-full h-[280px] xs:h-[320px] sm:h-[350px] md:h-[380px] lg:h-[404px] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key attributes section - arranged in rows with responsive grid */}
      <div className="flex flex-col w-full max-w-full xs:max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[1152px] gap-y-3 xs:gap-y-4 sm:gap-y-5 md:gap-y-6 mt-2 xs:mt-3 sm:mt-4 md:mt-5 lg:mt-6">
        {/* First row */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {/* First attribute */}
          <div 
            className="flex items-start xs:items-center gap-2 xs:gap-3 attribute-item"
            style={{ 
              transition: 'opacity 0.5s ease, transform 0.5s ease', 
              opacity: 0, 
              transform: 'translateY(20px)' 
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="flex-shrink-0 w-[24px] h-[24px] xs:w-[28px] xs:h-[28px] sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px] mt-1 xs:mt-0">
              <path d="M8.80948 23.6051L17.5263 23.6878C17.6307 23.6898 17.7328 23.7182 17.8231 23.7704C17.9135 23.8225 17.9891 23.8967 18.043 23.9861L22.473 31.4938C22.5411 31.6074 22.6444 31.6957 22.7671 31.7453C22.8899 31.795 23.0255 31.8033 23.1534 31.7691C23.2813 31.7348 23.3946 31.6598 23.4761 31.5554C23.5576 31.451 23.6028 31.3229 23.605 31.1905L23.6877 22.4736C23.6896 22.3693 23.7181 22.2672 23.7702 22.1768C23.8224 22.0865 23.8966 22.0108 23.986 21.9569L31.4936 17.5269C31.6072 17.4588 31.6955 17.3556 31.7452 17.2328C31.7949 17.1101 31.8032 16.9745 31.7689 16.8465C31.7347 16.7186 31.6596 16.6054 31.5552 16.5239C31.4508 16.4424 31.3228 16.3971 31.1903 16.395L22.4735 16.3123C22.3692 16.3103 22.2671 16.2819 22.1767 16.2297C22.0863 16.1776 22.0107 16.1033 21.9568 16.014L17.5268 8.50631C17.4587 8.39272 17.3555 8.30442 17.2327 8.25475C17.1099 8.20507 16.9743 8.19675 16.8464 8.23102C16.7185 8.2653 16.6052 8.34031 16.5237 8.44471C16.4423 8.5491 16.397 8.6772 16.3948 8.80961L16.3122 17.5265C16.3102 17.6308 16.2818 17.7329 16.2296 17.8232C16.1774 17.9136 16.1032 17.9893 16.0139 18.0432L8.50618 22.4732C8.39259 22.5413 8.30429 22.6445 8.25462 22.7673C8.20494 22.89 8.19662 23.0256 8.23089 23.1535C8.26517 23.2815 8.34018 23.3947 8.44458 23.4762C8.54897 23.5577 8.67707 23.6029 8.80948 23.6051Z" fill="url(#paint0_linear_893_3892)" stroke="#FCD34D" strokeWidth="0.125" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear_893_3892" x1="12.4769" y1="12.48" x2="27.5229" y2="27.5201" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FCD966"/>
                  <stop offset="0.5" stopColor="#FCD966"/>
                  <stop offset="1" stopColor="#FCCD34"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-tight sm:leading-[120%]">Worked with TOP IT MNCs and received several awards</span>
          </div>

          {/* Second attribute */}
          <div 
            className="flex items-start xs:items-center gap-2 xs:gap-3 attribute-item" 
            style={{ 
              transition: 'opacity 0.5s ease, transform 0.5s ease', 
              opacity: 0, 
              transform: 'translateY(20px)',
              transitionDelay: '0.2s'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="flex-shrink-0 w-[24px] h-[24px] xs:w-[28px] xs:h-[28px] sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px] mt-1 xs:mt-0">
              <path d="M8.80948 23.6051L17.5263 23.6878C17.6307 23.6898 17.7328 23.7182 17.8231 23.7704C17.9135 23.8225 17.9891 23.8967 18.043 23.9861L22.473 31.4938C22.5411 31.6074 22.6444 31.6957 22.7671 31.7453C22.8899 31.795 23.0255 31.8033 23.1534 31.7691C23.2813 31.7348 23.3946 31.6598 23.4761 31.5554C23.5576 31.451 23.6028 31.3229 23.605 31.1905L23.6877 22.4736C23.6896 22.3693 23.7181 22.2672 23.7702 22.1768C23.8224 22.0865 23.8966 22.0108 23.986 21.9569L31.4936 17.5269C31.6072 17.4588 31.6955 17.3556 31.7452 17.2328C31.7949 17.1101 31.8032 16.9745 31.7689 16.8465C31.7347 16.7186 31.6596 16.6054 31.5552 16.5239C31.4508 16.4424 31.3228 16.3971 31.1903 16.395L22.4735 16.3123C22.3692 16.3103 22.2671 16.2819 22.1767 16.2297C22.0863 16.1776 22.0107 16.1033 21.9568 16.014L17.5268 8.50631C17.4587 8.39272 17.3555 8.30442 17.2327 8.25475C17.1099 8.20507 16.9743 8.19675 16.8464 8.23102C16.7185 8.2653 16.6052 8.34031 16.5237 8.44471C16.4423 8.5491 16.397 8.6772 16.3948 8.80961L16.3122 17.5265C16.3102 17.6308 16.2818 17.7329 16.2296 17.8232C16.1774 17.9136 16.1032 17.9893 16.0139 18.0432L8.50618 22.4732C8.39259 22.5413 8.30429 22.6445 8.25462 22.7673C8.20494 22.89 8.19662 23.0256 8.23089 23.1535C8.26517 23.2815 8.34018 23.3947 8.44458 23.4762C8.54897 23.5577 8.67707 23.6029 8.80948 23.6051Z" fill="url(#paint0_linear_893_3892)" stroke="#FCD34D" strokeWidth="0.125" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear_893_3892" x1="12.4769" y1="12.48" x2="27.5229" y2="27.5201" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FCD966"/>
                  <stop offset="0.5" stopColor="#FCD966"/>
                  <stop offset="1" stopColor="#FCCD34"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-tight sm:leading-[120%]">⁠Implemented ERP for diversified Business Verticals.</span>
          </div>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {/* Third attribute */}
          <div 
            className="flex items-start xs:items-center gap-2 xs:gap-3 attribute-item" 
            style={{ 
              transition: 'opacity 0.5s ease, transform 0.5s ease', 
              opacity: 0, 
              transform: 'translateY(20px)',
              transitionDelay: '0.4s'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="flex-shrink-0 w-[24px] h-[24px] xs:w-[28px] xs:h-[28px] sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px] mt-1 xs:mt-0">
              <path d="M8.80948 23.6051L17.5263 23.6878C17.6307 23.6898 17.7328 23.7182 17.8231 23.7704C17.9135 23.8225 17.9891 23.8967 18.043 23.9861L22.473 31.4938C22.5411 31.6074 22.6444 31.6957 22.7671 31.7453C22.8899 31.795 23.0255 31.8033 23.1534 31.7691C23.2813 31.7348 23.3946 31.6598 23.4761 31.5554C23.5576 31.451 23.6028 31.3229 23.605 31.1905L23.6877 22.4736C23.6896 22.3693 23.7181 22.2672 23.7702 22.1768C23.8224 22.0865 23.8966 22.0108 23.986 21.9569L31.4936 17.5269C31.6072 17.4588 31.6955 17.3556 31.7452 17.2328C31.7949 17.1101 31.8032 16.9745 31.7689 16.8465C31.7347 16.7186 31.6596 16.6054 31.5552 16.5239C31.4508 16.4424 31.3228 16.3971 31.1903 16.395L22.4735 16.3123C22.3692 16.3103 22.2671 16.2819 22.1767 16.2297C22.0863 16.1776 22.0107 16.1033 21.9568 16.014L17.5268 8.50631C17.4587 8.39272 17.3555 8.30442 17.2327 8.25475C17.1099 8.20507 16.9743 8.19675 16.8464 8.23102C16.7185 8.2653 16.6052 8.34031 16.5237 8.44471C16.4423 8.5491 16.397 8.6772 16.3948 8.80961L16.3122 17.5265C16.3102 17.6308 16.2818 17.7329 16.2296 17.8232C16.1774 17.9136 16.1032 17.9893 16.0139 18.0432L8.50618 22.4732C8.39259 22.5413 8.30429 22.6445 8.25462 22.7673C8.20494 22.89 8.19662 23.0256 8.23089 23.1535C8.26517 23.2815 8.34018 23.3947 8.44458 23.4762C8.54897 23.5577 8.67707 23.6029 8.80948 23.6051Z" fill="url(#paint0_linear_893_3892)" stroke="#FCD34D" strokeWidth="0.125" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear_893_3892" x1="12.4769" y1="12.48" x2="27.5229" y2="27.5201" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FCD966"/>
                  <stop offset="0.5" stopColor="#FCD966"/>
                  <stop offset="1" stopColor="#FCCD34"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-tight sm:leading-[120%]">Designed and developed Industry specific ERP customizations</span>
          </div>

          {/* Fourth attribute */}
          <div 
            className="flex items-start xs:items-center gap-2 xs:gap-3 attribute-item" 
            style={{ 
              transition: 'opacity 0.5s ease, transform 0.5s ease', 
              opacity: 0, 
              transform: 'translateY(20px)',
              transitionDelay: '0.6s'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="flex-shrink-0 w-[24px] h-[24px] xs:w-[28px] xs:h-[28px] sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px] mt-1 xs:mt-0">
              <path d="M8.80948 23.6051L17.5263 23.6878C17.6307 23.6898 17.7328 23.7182 17.8231 23.7704C17.9135 23.8225 17.9891 23.8967 18.043 23.9861L22.473 31.4938C22.5411 31.6074 22.6444 31.6957 22.7671 31.7453C22.8899 31.795 23.0255 31.8033 23.1534 31.7691C23.2813 31.7348 23.3946 31.6598 23.4761 31.5554C23.5576 31.451 23.6028 31.3229 23.605 31.1905L23.6877 22.4736C23.6896 22.3693 23.7181 22.2672 23.7702 22.1768C23.8224 22.0865 23.8966 22.0108 23.986 21.9569L31.4936 17.5269C31.6072 17.4588 31.6955 17.3556 31.7452 17.2328C31.7949 17.1101 31.8032 16.9745 31.7689 16.8465C31.7347 16.7186 31.6596 16.6054 31.5552 16.5239C31.4508 16.4424 31.3228 16.3971 31.1903 16.395L22.4735 16.3123C22.3692 16.3103 22.2671 16.2819 22.1767 16.2297C22.0863 16.1776 22.0107 16.1033 21.9568 16.014L17.5268 8.50631C17.4587 8.39272 17.3555 8.30442 17.2327 8.25475C17.1099 8.20507 16.9743 8.19675 16.8464 8.23102C16.7185 8.2653 16.6052 8.34031 16.5237 8.44471C16.4423 8.5491 16.397 8.6772 16.3948 8.80961L16.3122 17.5265C16.3102 17.6308 16.2818 17.7329 16.2296 17.8232C16.1774 17.9136 16.1032 17.9893 16.0139 18.0432L8.50618 22.4732C8.39259 22.5413 8.30429 22.6445 8.25462 22.7673C8.20494 22.89 8.19662 23.0256 8.23089 23.1535C8.26517 23.2815 8.34018 23.3947 8.44458 23.4762C8.54897 23.5577 8.67707 23.6029 8.80948 23.6051Z" fill="url(#paint0_linear_893_3892)" stroke="#FCD34D" strokeWidth="0.125" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear_893_3892" x1="12.4769" y1="12.48" x2="27.5229" y2="27.5201" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FCD966"/>
                  <stop offset="0.5" stopColor="#FCD966"/>
                  <stop offset="1" stopColor="#FCCD34"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-tight sm:leading-[120%]">Chaired Smart India Hackathons as technical judge.</span>
          </div>
        </div>

        {/* Third row - adaptive based on screen size */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {/* Fifth attribute */}
          <div 
            className="flex items-start xs:items-center gap-2 xs:gap-3 attribute-item col-span-1 xs:col-span-2 sm:col-span-1" 
            style={{ 
              transition: 'opacity 0.5s ease, transform 0.5s ease', 
              opacity: 0, 
              transform: 'translateY(20px)',
              transitionDelay: '0.8s'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="flex-shrink-0 w-[24px] h-[24px] xs:w-[28px] xs:h-[28px] sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px] mt-1 xs:mt-0">
              <path d="M8.80948 23.6051L17.5263 23.6878C17.6307 23.6898 17.7328 23.7182 17.8231 23.7704C17.9135 23.8225 17.9891 23.8967 18.043 23.9861L22.473 31.4938C22.5411 31.6074 22.6444 31.6957 22.7671 31.7453C22.8899 31.795 23.0255 31.8033 23.1534 31.7691C23.2813 31.7348 23.3946 31.6598 23.4761 31.5554C23.5576 31.451 23.6028 31.3229 23.605 31.1905L23.6877 22.4736C23.6896 22.3693 23.7181 22.2672 23.7702 22.1768C23.8224 22.0865 23.8966 22.0108 23.986 21.9569L31.4936 17.5269C31.6072 17.4588 31.6955 17.3556 31.7452 17.2328C31.7949 17.1101 31.8032 16.9745 31.7689 16.8465C31.7347 16.7186 31.6596 16.6054 31.5552 16.5239C31.4508 16.4424 31.3228 16.3971 31.1903 16.395L22.4735 16.3123C22.3692 16.3103 22.2671 16.2819 22.1767 16.2297C22.0863 16.1776 22.0107 16.1033 21.9568 16.014L17.5268 8.50631C17.4587 8.39272 17.3555 8.30442 17.2327 8.25475C17.1099 8.20507 16.9743 8.19675 16.8464 8.23102C16.7185 8.2653 16.6052 8.34031 16.5237 8.44471C16.4423 8.5491 16.397 8.6772 16.3948 8.80961L16.3122 17.5265C16.3102 17.6308 16.2818 17.7329 16.2296 17.8232C16.1774 17.9136 16.1032 17.9893 16.0139 18.0432L8.50618 22.4732C8.39259 22.5413 8.30429 22.6445 8.25462 22.7673C8.20494 22.89 8.19662 23.0256 8.23089 23.1535C8.26517 23.2815 8.34018 23.3947 8.44458 23.4762C8.54897 23.5577 8.67707 23.6029 8.80948 23.6051Z" fill="url(#paint0_linear_893_3892)" stroke="#FCD34D" strokeWidth="0.125" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear_893_3892" x1="12.4769" y1="12.48" x2="27.5229" y2="27.5201" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FCD966"/>
                  <stop offset="0.5" stopColor="#FCD966"/>
                  <stop offset="1" stopColor="#FCCD34"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-tight sm:leading-[120%]">⁠Specialized in handling Corporate, On-Job and fresher's training.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurAdvisor;