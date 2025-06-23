'use client';
import React, { useEffect, useRef } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function PartnershipFeatures() {
  const { ref: sectionRef, isInView } = useScrollAnimation();


  // Card data to make the component more maintainable
  const cards = [
    {
      id: 1,
      title: "Business Process Automation",
      description: "Reduce manual work and improve efficiency.",
      svgContent: (
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
          <g filter="url(#filter0_i_1950_128)">
            <rect x="0.5" y="0.5" width="40" height="40" rx="20" fill="white"/>
            <path d="M30.7928 16.851C31.9891 15.6547 31.4436 14.2575 30.7928 13.5781L27.9217 10.7071C26.7159 9.51089 25.3282 10.0564 24.6487 10.7071L23.0217 12.3436H20.543C18.7246 12.3436 17.6718 13.3006 17.1359 14.4011L12.8867 18.6501V22.4781L12.2072 23.148C11.0109 24.3538 11.5564 25.7414 12.2072 26.4209L15.0783 29.2918C15.5951 29.8086 16.1502 30 16.6765 30C17.356 30 17.9781 29.6651 18.3513 29.2918L20.9353 26.6984H24.3711C25.9981 26.6984 26.8211 25.684 27.1178 24.6887C28.1993 24.4016 28.7926 23.5786 29.0319 22.7747C30.5153 22.3919 31.0704 20.9852 31.0704 19.9995V17.1285H30.5057L30.7928 16.851ZM29.1563 19.9995C29.1563 20.4301 28.9745 20.9565 28.1993 20.9565H27.2422V21.9135C27.2422 22.3441 27.0604 22.8704 26.2852 22.8704H25.3282V23.8274C25.3282 24.2581 25.1463 24.7844 24.3711 24.7844H20.1506L17.0115 27.9233C16.7148 28.2009 16.5425 28.0382 16.4373 27.9329L13.5757 25.0811C13.2982 24.7844 13.4609 24.6122 13.5662 24.5069L14.8007 23.2628V19.4349L16.7148 17.5209V19.0425C16.7148 20.2004 17.4804 21.9135 19.5859 21.9135C21.6914 21.9135 22.457 20.2004 22.457 19.0425H29.1563V19.9995ZM29.4338 15.4921L27.8069 17.1285H20.543V19.0425C20.543 19.4731 20.3611 19.9995 19.5859 19.9995C18.8107 19.9995 18.6289 19.4731 18.6289 19.0425V16.1715C18.6289 15.7313 18.7916 14.2575 20.543 14.2575H23.8065L25.9885 12.0756C26.2852 11.7981 26.4575 11.9608 26.5627 12.066L29.4243 14.9179C29.7018 15.2145 29.5391 15.3868 29.4338 15.4921Z" fill="black"/>
          </g>
          <defs>
            <filter id="filter0_i_1950_128" x="0.5" y="0.5" width="40" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1950_128"/>
            </filter>
          </defs>
        </svg>
      )
    },
    {
      id: 2,
      title: "Custom Odoo Development",
      description: "Tailored solutions that fit your industry needs.",
      svgContent: (
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
          <g filter="url(#filter0_i_1950_236)">
            <rect x="0.5" y="0.5" width="40" height="40" rx="20" fill="white"/>
            <path d="M25.5621 16.9723L28.463 19.8731C28.9337 20.3376 29.3079 20.8906 29.564 21.5002C29.8201 22.1099 29.9531 22.7642 29.9553 23.4255C29.9576 24.0867 29.8289 24.7419 29.5769 25.3533C29.3249 25.9646 28.9544 26.5201 28.4868 26.9877C28.0192 27.4553 27.4637 27.8258 26.8524 28.0778C26.241 28.3299 25.5858 28.4585 24.9246 28.4563C24.2633 28.454 23.609 28.321 22.9993 28.0649C22.3896 27.8088 21.8367 27.4346 21.3722 26.9639L20.4059 25.9975C20.2752 25.8715 20.171 25.7206 20.0992 25.5538C20.0275 25.387 19.9897 25.2076 19.988 25.026C19.9863 24.8444 20.0209 24.6644 20.0895 24.4963C20.1582 24.3282 20.2597 24.1755 20.388 24.047C20.5163 23.9186 20.669 23.8169 20.837 23.7481C21.005 23.6793 21.1851 23.6446 21.3666 23.6461C21.5482 23.6476 21.7277 23.6852 21.8945 23.7568C22.0614 23.8284 22.2124 23.9325 22.3386 24.063L23.3067 25.0303C23.7348 25.4545 24.3136 25.692 24.9163 25.6905C25.519 25.6891 26.0967 25.449 26.5228 25.0228C26.9489 24.5965 27.1889 24.0188 27.1901 23.4161C27.1913 22.8134 26.9538 22.2347 26.5294 21.8067L23.6285 18.9059C23.315 18.5922 22.9167 18.3768 22.4826 18.2861C22.0485 18.1955 21.5973 18.2334 21.1844 18.3954C21.0373 18.4537 20.8994 18.5133 20.7705 18.574L20.3475 18.7719C19.7823 19.0271 19.3475 19.1365 18.7941 18.5841C17.9991 17.7891 18.2052 17.0552 19.1743 16.387C20.1396 15.7228 21.3071 15.4176 22.474 15.5245C23.6409 15.6314 24.7336 16.1437 25.5621 16.9723ZM20.0832 11.4933L21.0495 12.4597C21.2987 12.7174 21.4367 13.0628 21.4338 13.4214C21.4308 13.7799 21.2872 14.1229 21.0337 14.3766C20.7803 14.6303 20.4374 14.7742 20.0789 14.7775C19.7203 14.7808 19.3748 14.6431 19.1168 14.3942L18.1496 13.4278C17.9394 13.2101 17.6879 13.0364 17.4099 12.9169C17.1319 12.7973 16.8329 12.7344 16.5302 12.7317C16.2276 12.729 15.9275 12.7865 15.6474 12.9011C15.3672 13.0156 15.1127 13.1847 14.8987 13.3987C14.6846 13.6126 14.5153 13.867 14.4006 14.1471C14.286 14.4271 14.2282 14.7272 14.2308 15.0298C14.2333 15.3325 14.2961 15.6315 14.4155 15.9096C14.5348 16.1877 14.7084 16.4393 14.926 16.6496L17.8268 19.5504C18.1404 19.8641 18.5386 20.0795 18.9728 20.1701C19.4069 20.2608 19.8581 20.2229 20.271 20.0609C20.418 20.0026 20.556 19.943 20.6848 19.8822L21.1078 19.6844C21.6731 19.4292 22.1088 19.3198 22.6613 19.8722C23.4562 20.6672 23.2502 21.401 22.2811 22.0693C21.3158 22.7335 20.1483 23.0387 18.9814 22.9318C17.8144 22.8249 16.7218 22.3126 15.8933 21.484L12.9924 18.5832C12.5217 18.1187 12.1475 17.5657 11.8914 16.9561C11.6352 16.3464 11.5022 15.6921 11.5 15.0308C11.4978 14.3696 11.6264 13.7144 11.8785 13.103C12.1305 12.4916 12.501 11.9362 12.9686 11.4686C13.4362 11.001 13.9916 10.6305 14.603 10.3785C15.2144 10.1264 15.8696 9.99781 16.5308 10C17.1921 10.0022 17.8464 10.1352 18.4561 10.3914C19.0657 10.6475 19.6187 11.0226 20.0832 11.4933Z" fill="black"/>
          </g>
          <defs>
            <filter id="filter0_i_1950_236" x="0.5" y="0.5" width="40" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1950_236"/>
            </filter>
          </defs>
        </svg>
      )
    },
    {
      id: 3,
      title: "Ongoing Support & Maintenance",
      description: "We're here for you at every step.",
      logoSrc: "/images/partnership/logo3.svg"
    },
    {
      id: 4,
      title: "Cost-Effective & Scalable",
      description: "Grow your business with flexible ERP modules.",
      logoSrc: "/images/partnership/logo4.svg"
    },
    {
      id: 5,
      title: "Seamless ERP Integration",
      description: "Get a unified solution for CRM, Sales, Inventory, and more.",
      logoSrc: "/images/partnership/logo5.svg"
    },
    {
      id: 6,
      title: "100+ Successful Odoo Projects",
      description: "We have delivered over 100 successful Odoo implementations, transforming businesses with ERP solutions.",
      logoSrc: "/images/partnership/logo6.svg"
    }
  ];

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 xs:py-14 sm:py-16 md:py-20 overflow-hidden">
      {/* Main container */}
      <div className="mx-auto flex flex-col justify-center items-center gap-8 lg:gap-[32px] w-full max-w-[1200px]">
        
        {/* First container - Heading and text */}
        <div className={`flex flex-col items-center gap-4 md:gap-[16px] w-full px-4 sm:px-6 md:px-8 transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-[#252525] text-center font-jost text-2xl sm:text-3xl md:text-[40px] font-semibold leading-[120%]">
            Accelerate <span className="text-[#EC1C26]">Success</span> with Our Expertise
          </h2>
          
          <p className="text-black text-center font-jost text-lg sm:text-xl md:text-[21px] font-normal leading-[120%] max-w-full md:max-w-[800px] lg:max-w-[997px]">
            Leverage our deep AI and cloud technology experience to drive innovation, streamline operations, and deliver measurable business outcomes. From strategy to deployment, we're with you every step of the way.
          </p>
        </div>
        
        {/* Second container - Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4 sm:px-6 md:px-8 max-w-[1200px] transition-all duration-1000 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {cards.map((card, index) => (
            <div 
              key={card.id}
              className="flex flex-col justify-center items-center bg-[#252525] rounded-[24px] w-full max-w-[382px] h-[170px] sm:h-[177px] mx-auto cursor-default sm:cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-out"
            >
              <div className="flex flex-col sm:flex-row sm:items-center px-6 py-0 w-full h-full relative overflow-hidden group">
                {/* Mobile layout (stacked with all content visible) */}
                <div className="flex flex-col w-full sm:hidden h-full justify-center">
                  <div className="flex items-center gap-6 mb-3">
                    <div className="w-[40px] h-[40px] flex-shrink-0 bg-white rounded-full">
                      {card.svgContent || 
                        <img 
                          src={card.logoSrc} 
                          alt={card.title} 
                          width={40} 
                          height={40} 
                          className="w-full h-full object-contain"
                        />
                      }
                    </div>
                    
                    <p className="text-white font-jost text-lg font-semibold leading-[1.2]">
                      {card.title}
                    </p>
                  </div>
                  
                  <div className="text-left">
                    <p className="text-white font-jost text-[12px] xs:text-[13px] font-normal leading-[140%]">
                      {card.description}
                    </p>
                  </div>
                </div>
                
                {/* Desktop layout (with hover effect) */}
                <div className="hidden sm:flex items-center gap-6 w-full transition-all duration-500 ease-in-out transform group-hover:-translate-y-6">
                  <div className="w-[40px] h-[40px] flex-shrink-0 bg-white rounded-full z-10">
                    {card.svgContent || 
                      <img 
                        src={card.logoSrc} 
                        alt={card.title} 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-contain"
                      />
                    }
                  </div>
                  
                  <p className="text-white font-jost text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%]">
                    {card.title}
                  </p>
                </div>
                
                {/* Description - Hidden until hover (desktop only) */}
                <div className="hidden sm:block absolute left-6 top-[60%] w-[329px] opacity-0 transition-all duration-500 ease-in-out transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 text-left">
                  <p className="text-white font-jost text-[14px] font-semibold leading-[120%]">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
