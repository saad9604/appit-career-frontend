"use client";

import { useState, useEffect, useRef } from 'react';

// Custom hook for intersection observer
function useOnScreen(ref, threshold = 0.1) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px', // Trigger a bit earlier
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold]);

  return isIntersecting;
}

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  
  // Use the intersection observer to trigger section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // After section becomes visible, trigger card animations with a slight delay
          setTimeout(() => {
            setCardsVisible(true);
          }, 200);
        } else {
          setIsVisible(false);
          setCardsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const calculateDelay = (index) => {
    // Different delays for different cards
    const baseDelay = 0.05;
    const increment = 0.05;
    return baseDelay + (index * increment);
  };

  const processItems = [
    {
      video: "/videos/comp1.mp4",
      title: "Planning",
      paragraph: `From the initial idea to final delivery, our planning phase focuses on setting clear goals and laying the foundation for your brand's success. We identify your business objectives, define a unique brand voice, and strategically pinpoint your target audience. Additionally, we conduct comprehensive competitor analysis to understand industry benchmarks and discover opportunities to differentiate and lead.`,
      icon: (
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
        >
          <rect
            x="0.75"
            y="0.75"
            width="58.5"
            height="58.5"
            rx="29.25"
            fill="white"
            stroke="#0066B3"
            strokeWidth="1.5"
          />
          <path
            d="M39.268 20.732C38.7992 20.2633 38.1634 20 37.5005 20C36.8376 20 36.2018 20.2633 35.733 20.732L26.2502 30.2147V33.7497H29.7853L39.268 24.2671C39.7367 23.7982 40 23.1624 40 22.4995C40 21.8366 39.7367 21.2008 39.268 20.732Z"
            fill="#0066B3"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 24.9998C20 24.3368 20.2634 23.7009 20.7322 23.232C21.2011 22.7632 21.837 22.4998 22.5001 22.4998H27.5002C27.8317 22.4998 28.1497 22.6315 28.3841 22.8659C28.6185 23.1003 28.7502 23.4183 28.7502 23.7498C28.7502 24.0813 28.6185 24.3993 28.3841 24.6337C28.1497 24.8681 27.8317 24.9998 27.5002 24.9998H22.5001V37.5001H35.0003V32.5C35.0003 32.1684 35.132 31.8505 35.3665 31.6161C35.6009 31.3816 35.9188 31.2499 36.2504 31.2499C36.5819 31.2499 36.8999 31.3816 37.1343 31.6161C37.3687 31.8505 37.5004 32.1684 37.5004 32.5V37.5001C37.5004 38.1631 37.237 38.799 36.7682 39.2679C36.2993 39.7367 35.6634 40.0001 35.0003 40.0001H22.5001C21.837 40.0001 21.2011 39.7367 20.7322 39.2679C20.2634 38.799 20 38.1631 20 37.5001V24.9998Z"
            fill="#0066B3"
          />
        </svg>
      ),
      reverse: false,
    },
    {
      video: "/videos/comp2.mp4",
      title: "Design",
      paragraph: `Our design process goes beyond aesthetics. It includes user experience (UX) and user interface (UI) design, webpage layout structuring, visual storytelling through graphics, and tailored content production. Every element is created to enhance usability, engage users, and reflect your brand identity with precision and creativity.`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
        >
          <rect
            x="0.75"
            y="0.75"
            width="58.5"
            height="58.5"
            rx="29.25"
            fill="white"
            stroke="#0066B3"
            strokeWidth="1.5"
          />
          <path
            d="M27.1795 34.359C23.2144 34.359 20 31.1446 20 27.1795C20 23.2144 23.2144 20 27.1795 20C31.1446 20 34.359 23.2144 34.359 27.1795"
            stroke="#0066B3"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M40.0001 27.1794H26.6667V40.5128H40.0001V27.1794Z"
            fill="#0066B3"
            stroke="#0066B3"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      ),
      reverse: true,
    },
    {
      video: "/videos/comp3.mp4",
      title: "Development",
      paragraph: `We specialize in building robust, scalable solutions across multiple platforms. Whether it's a responsive website, a high-performance web app, a feature-rich mobile app, or a secure cloud-based system, our development team ensures seamless functionality, clean code architecture, and optimal performance across devices and platforms.`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
        >
          <rect
            x="0.75"
            y="0.75"
            width="58.5"
            height="58.5"
            rx="29.25"
            fill="white"
            stroke="#0066B3"
            strokeWidth="1.5"
          />
          <path
            d="M39.5454 35.7273H38.4182C38.7345 35.3767 38.9094 34.9212 38.909 34.449V24.9147C38.9084 24.4071 38.7065 23.9204 38.3475 23.5615C37.9886 23.2026 37.502 23.0006 36.9944 23H23.0055C22.4979 23.0006 22.0113 23.2026 21.6523 23.5615C21.2934 23.9204 21.0915 24.4071 21.0908 24.9147V34.449C21.0904 34.9212 21.2653 35.3767 21.5816 35.7273H20.4545C20.2857 35.7273 20.1238 35.7943 20.0045 35.9137C19.8852 36.033 19.8181 36.1949 19.8181 36.3636C19.8181 36.5324 19.8852 36.6943 20.0045 36.8136C20.1238 36.933 20.2857 37 20.4545 37H39.5454C39.7142 37 39.876 36.933 39.9954 36.8136C40.1147 36.6943 40.1818 36.5324 40.1818 36.3636C40.1818 36.1949 40.1147 36.033 39.9954 35.9137C39.876 35.7943 39.7142 35.7273 39.5454 35.7273Z"
            fill="#0066B3"
          />
        </svg>
      ),
      reverse: false,
    },
    {
      video: "/videos/comp4.mp4",
      title: "Testing",
      paragraph: `Quality assurance is a non-negotiable part of our process. Before any solution goes live, it undergoes rigorous testing—including functionality testing, usability analysis, compatibility checks, and security reviews. We proactively identify and resolve any issues to ensure a smooth, bug-free experience for end-users.`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
        >
          <rect
            x="0.75"
            y="0.75"
            width="58.5"
            height="58.5"
            rx="29.25"
            fill="white"
            stroke="#0066B3"
            strokeWidth="1.5"
          />
          <path
            d="M29.691 33.9771L27.9906 32.1995L33.6316 27.2547L34.6366 28.3362L29.691 33.9771ZM37.0314 39C38.809 37.2224 39.9677 34.7496 39.9677 31.9678C39.9677 26.4822 35.4864 22 30 22C24.5136 22 20.0322 26.4822 20.0322 31.9678C20.0322 34.7504 21.1137 37.2224 22.9686 39L24.3591 37.6087C22.8913 36.1409 22.0416 34.2088 22.0416 31.9686C22.0401 30.923 22.245 29.8874 22.6444 28.9211C23.0439 27.9548 23.63 27.0768 24.3693 26.3374C25.1085 25.598 25.9864 25.0116 26.9526 24.612C27.9188 24.2124 28.9544 24.0073 30 24.0085C31.0454 24.0073 32.0809 24.2123 33.047 24.6119C34.0131 25.0114 34.8909 25.5975 35.6301 26.3368C36.3694 27.076 36.9555 27.9538 37.355 28.9199C37.7546 29.886 37.9596 30.9215 37.9584 31.9669C37.9584 34.1308 37.0314 36.1401 35.6409 37.6078L37.0314 39Z"
            fill="#0066B3"
          />
        </svg>
      ),
      reverse: true,
    },
    {
      video: "/videos/comp5.mp4",
      title: "Launch",
      paragraph: `Once your solution is fully developed and tested, we execute a strategic launch. This includes setting up necessary analytics, optimizing for search engines, and creating marketing assets designed to capture attention and convert leads. By aligning with your business goals and analyzing competitors, we position your brand for a strong and impactful entry into the market.`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
        >
          <rect
            x="0.75"
            y="0.75"
            width="58.5"
            height="58.5"
            rx="29.25"
            fill="white"
            stroke="#0066B3"
            strokeWidth="1.5"
          />
          <path
            d="M31.2165 40L29.576 36.2043C31.1572 35.631 32.6099 34.8698 33.9539 33.9604L31.2066 40M23.7948 30.4217L20 28.7907L26.0381 26.0428C25.111 27.4033 24.3574 28.8743 23.7948 30.4217ZM39.6165 20.3887C39.6165 20.3887 41.7115 25.2916 36.1082 30.916C33.9341 33.0609 31.5821 34.3756 29.4574 35.2059C28.7261 35.4827 27.9059 35.3048 27.3624 34.7512L25.2574 32.6458C24.704 32.0922 24.5261 31.2817 24.7929 30.5403C25.6231 28.4448 26.9374 26.0626 29.0819 23.8879C34.705 18.2793 39.6165 20.3887 39.6165 20.3887ZM24.3878 39.8122H22.9944L27.0362 35.7595C27.3327 35.967 27.6588 36.1153 27.9948 36.2043L24.3878 39.8122ZM20.1878 39.8122V38.4184L24.9017 33.6936L26.3148 35.0972L21.5812 39.8122H20.1878ZM20.1878 37.0049V35.6112L23.7948 32.0033C23.8838 32.3492 24.032 32.6754 24.2395 32.9621L20.1878 37.0049ZM34.0231 23.9967C33.4989 23.9967 32.9962 24.2049 32.6255 24.5757C32.2548 24.9464 32.0466 25.4493 32.0466 25.9736C32.0466 26.4979 32.2548 27.0008 32.6255 27.3715C32.9962 27.7423 33.4989 27.9505 34.0231 27.9505C35.12 27.9505 35.9995 27.0708 35.9995 25.9736C35.9995 25.4493 35.7913 24.9464 35.4206 24.5757C35.05 24.2049 34.5473 23.9967 34.0231 23.9967Z"
            fill="#0066B3"
          />
        </svg>
      ),
      reverse: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`inline-flex flex-col justify-center items-center font-jost
                 px-4 sm:px-8 md:px-16 lg:px-[97px] py-10 sm:py-12 md:py-16 lg:py-[80px] bg-[#F5F6FA] w-full transition-all duration-800 ease-out
                 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-[40px] max-w-[1200px] w-full">
        {/* Text container */}
        <div
          className={`flex flex-col items-center gap-3 sm:gap-4 md:gap-[16px] w-full transition-all duration-700 ease-out delay-300
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ maxWidth: "1200px" }}
        >
          <h2 className="text-[#EC1C26] text-center font-jost font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-tight">
            Process
          </h2>
          <p className="text-black text-center font-jost font-semibold text-base sm:text-lg md:text-xl lg:text-[21px] leading-tight">
            Our Proven Process for Digital Success
          </p>
        </div>

        {/* Process items */}
        {processItems.map(({ video, title, paragraph, icon, reverse }, i) => (
          <div
            key={i}
            className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-4 sm:gap-6 md:gap-[30px]
                        p-4 sm:p-6 md:p-[24px] rounded-lg sm:rounded-xl md:rounded-[24px] bg-white w-full max-w-[1200px] group
                        hover:bg-[#0066B3] hover:shadow-[0_0_15px_2px_rgba(0,102,179,0.5)]
                        transition-all duration-200 ease-out cursor-pointer hover:text-white
                        transform transition-all
                        ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{
              transitionDuration: "0.35s"
            }}
          >
            {/* Video container */}
            <div className="relative w-full md:w-[45%] lg:w-[700px] h-[200px] sm:h-[250px] md:h-[300px] rounded-lg sm:rounded-xl md:rounded-[24px] overflow-hidden shadow-[0_4px_4px_2px_rgba(0,0,0,0.25)] transition-transform duration-100 ease-out hover:scale-[1.02]">
              <video
                className="w-full h-full object-cover rounded-lg sm:rounded-xl md:rounded-[24px]"
                src={video}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            
            {/* Content container */}
            <div className="flex flex-col items-start gap-2 sm:gap-3 md:gap-[16px] p-2 sm:p-3 md:p-[5px] w-full md:w-[55%] lg:w-[700px] h-auto md:h-[300px] mt-4 md:mt-0">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-[24px]">
                <div>{icon}</div>
                <h3 className="font-jost font-semibold text-xl sm:text-2xl md:text-[27px] leading-tight">
                  {title}
                </h3>
              </div>
              <p className="font-jost font-normal text-sm sm:text-base md:text-lg lg:text-[21px] leading-tight md:leading-[1.2] color-inherit">
                {paragraph}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Import Jost font explicitly */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  );
}