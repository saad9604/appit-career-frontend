'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function WhoWeAreDropdown({ isOpen, onClose, isMobile = false }) {
  const [activeTab, setActiveTab] = useState('About Us');
  const [animationState, setAnimationState] = useState(isOpen ? 'open' : 'closed');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  // Track hover state and timeout for hover
  const [hoveredTab, setHoveredTab] = useState(null);
  const hoverTimeoutRef = useRef(null);

  // Define animation classes based on state - smooth version
  const getAnimationClasses = () => {
    if (animationState === 'opening' || animationState === 'open') {
      return 'opacity-100 translate-y-0';
    } else if (animationState === 'closing') {
      return 'opacity-0 translate-y-0';
    } else {
      return 'opacity-0 translate-y-0';
    }
  };

  // Handle hover on tab
  const handleTabHover = useCallback((tab) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set the hovered tab
    setHoveredTab(tab);
    
    // Set a small timeout before changing the active tab to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveTab(tab);
    }, 100);
  }, [setHoveredTab, setActiveTab]);

  // Handle hover leave
  const handleTabLeave = useCallback(() => {
    // Clear timeout when leaving a tab
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredTab(null);
  }, [setHoveredTab]);

  // Update window width on resize for responsive features
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Effect to handle animation when isOpen changes
  useEffect(() => {
    if (isOpen) {
      setAnimationState('opening');
      const timer = setTimeout(() => {
        setAnimationState('open');
      }, 30); // Slight delay to ensure CSS transition works
      return () => clearTimeout(timer);
    } else {
      setAnimationState('closing');
      const timer = setTimeout(() => {
        setAnimationState('closed');
      }, 200); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, setAnimationState]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // This function is for sidebar item selection (keep for mobile or click fallback)
  const handleTabClick = useCallback((tab, e) => {
    if (e) e.stopPropagation();
    setActiveTab(tab);
    // On mobile, we don't want to close the dropdown when a tab is clicked
  }, [setActiveTab]);

  // Handle click on service item
  const handleItemClick = useCallback((e) => {
    if (e) e.stopPropagation();
    // Only close dropdown if we're in desktop mode
    if (!isMobile && onClose) {
      onClose();
    }
  }, [isMobile, onClose]);

  // Define the right arrow icon for navigation
  const rightArrow = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-all duration-300">
      <path d="M12.3867 21.1733L17.56 16L12.3867 10.8267C12.2632 10.7032 12.1653 10.5567 12.0985 10.3954C12.0317 10.2341 11.9973 10.0613 11.9973 9.88668C11.9973 9.71211 12.0317 9.53924 12.0985 9.37795C12.1653 9.21667 12.2632 9.07012 12.3867 8.94668C12.5101 8.82324 12.6567 8.72532 12.818 8.65851C12.9792 8.5917 13.1521 8.55732 13.3267 8.55732C13.5012 8.55732 13.6741 8.5917 13.8354 8.65851C13.9967 8.72532 14.1432 8.82324 14.2667 8.94668L20.3867 15.0667C20.5103 15.19 20.6083 15.3365 20.6753 15.4978C20.7422 15.6591 20.7766 15.8321 20.7766 16.0067C20.7766 16.1813 20.7422 16.3542 20.6753 16.5155C20.6083 16.6768 20.5103 16.8233 20.3867 16.9467L14.2667 23.0667C14.1433 23.1903 13.9968 23.2883 13.8355 23.3553C13.6742 23.4222 13.5013 23.4566 13.3267 23.4566C13.1521 23.4566 12.9791 23.4222 12.8178 23.3553C12.6565 23.2883 12.51 23.1903 12.3867 23.0667C11.88 22.5467 11.8667 21.6933 12.3867 21.1733Z" fill="currentColor"/>
    </svg>
  );

  // Get button size based on screen width
  const getButtonSize = () => {
    if (windowWidth >= 1280) {
      return 'gap-[15px]';
    } else if (windowWidth >= 1024) {
      return 'gap-[12px]';
    } else if (windowWidth >= 768) {
      return 'gap-[10px]';
    } else {
      return 'gap-[8px]';
    }
  };

  // Common button styling for all CTA buttons
  const ButtonCTA = ({ text, link = '#' }) => (
    <Link 
      href={link}
      prefetch={true}
      onClick={(e) => {
        if (isMobile) e.preventDefault();
        handleItemClick(e);
      }}
      className={`group inline-flex px-4 py-2.5 items-center ${getButtonSize()} rounded-[32px] bg-[#0066B3] text-white transition-all duration-300 hover:bg-[#A50F15]`}
    >
      <span className="font-medium">{text}</span>
      <div className="relative flex items-center justify-center w-[30px] h-[30px] lg:w-[34px] lg:h-[34px]">
        {/* Default state - original logo */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="33" 
          viewBox="0 0 32 33" 
          fill="none"
          className="w-[30px] h-[30px] lg:w-[34px] lg:h-[34px] group-hover:opacity-0 transition-opacity duration-300"
        >
          <path d="M16.0003 3.41683C19.5365 3.41683 22.9279 4.82159 25.4284 7.32207C27.9289 9.82256 29.3337 13.2139 29.3337 16.7502C29.3337 20.2864 27.9289 23.6778 25.4284 26.1783C22.9279 28.6787 19.5365 30.0835 16.0003 30.0835C12.4641 30.0835 9.07272 28.6787 6.57223 26.1783C4.07175 23.6778 2.66699 20.2864 2.66699 16.7502C2.66699 13.2139 4.07175 9.82256 6.57223 7.32207C9.07272 4.82159 12.4641 3.41683 16.0003 3.41683ZM16.2617 10.4728C16.1375 10.5967 16.039 10.7438 15.9718 10.9058C15.9045 11.0678 15.8699 11.2415 15.8699 11.4168C15.8699 11.5922 15.9045 11.7659 15.9718 11.9279C16.039 12.0898 16.1375 12.237 16.2617 12.3608L19.3177 15.4168H9.33366C8.98004 15.4168 8.6409 15.5573 8.39085 15.8074C8.1408 16.0574 8.00033 16.3965 8.00033 16.7502C8.00033 17.1038 8.1408 17.4429 8.39085 17.693C8.6409 17.943 8.98004 18.0835 9.33366 18.0835H19.3177L16.2617 21.1395C16.1377 21.2633 16.0393 21.4103 15.9722 21.5721C15.905 21.7339 15.8704 21.9074 15.8702 22.0826C15.8701 22.2577 15.9045 22.4312 15.9714 22.5932C16.0384 22.7551 16.1365 22.9022 16.2603 23.0262C16.3841 23.1501 16.5311 23.2485 16.6929 23.3157C16.8547 23.3828 17.0282 23.4174 17.2034 23.4176C17.3786 23.4177 17.5521 23.3833 17.714 23.3164C17.8759 23.2495 18.023 23.1513 18.147 23.0275L23.4803 17.6942C23.6045 17.5703 23.703 17.4232 23.7702 17.2612C23.8374 17.0992 23.872 16.9255 23.872 16.7502C23.872 16.5748 23.8374 16.4011 23.7702 16.2391C23.703 16.0772 23.6045 15.93 23.4803 15.8062L18.147 10.4728C17.897 10.2229 17.5579 10.0824 17.2043 10.0824C16.8508 10.0824 16.5117 10.2229 16.2617 10.4728Z" fill="white"/>
        </svg>
        
        {/* Hover state - circle with angled arrow */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg 
            width="20" 
            height="20" 
            className="w-5 h-5 lg:w-6 lg:h-6 transform rotate-[-45deg] text-[#A50F15]"
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );

  // About Us content
  const AboutUsContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
      <div 
        className="flex-1 self-stretch relative rounded overflow-hidden"
        style={{ 
          gridRow: '1 / span 1', 
          gridColumn: '1 / span 1',
          height: isMobile ? '200px' : 'auto',
          minHeight: isMobile ? '200px' : '280px',
          aspectRatio: isMobile ? 'auto' : '324/222.75'
        }}
      >
        <Image
          src="/images/dropdown/aboutus.png"
          alt="About Us"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      <div 
        className="flex flex-col gap-6" 
        style={{ 
          gridRow: '1 / span 1', 
          gridColumn: '2 / span 1' 
        }}
      >
        <p className="w-full md:w-[636px] font-['Jost'] text-[16px] leading-[120%] text-black">
          APPIT Software aims to deliver IT Services & Business Solutions that exceed the client's expectations. It is possible only when we update ourselves to agile and innovative IT solutions that can serve value to the business.
        </p>
        <div>
          <ButtonCTA text="About Us" link="/about" />
        </div>
      </div>
    </div>
  );

  // Partnership content
  const PartnershipContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
      <Link 
        href="/partnership"
        className="flex items-center gap-4 p-2 cursor-pointer transition-all duration-300 hover:translate-x-1 rounded transform group hover:bg-[#F0F8FF]"
        onClick={handleItemClick}
      >
        <div className="w-[48px] h-[48px] flex-shrink-0 aspect-square rounded-full flex items-center justify-center overflow-hidden">
          <Image 
            src="/images/dropdown/odoo.svg"
            alt="Odoo Partnership"
            width={48}
            height={48}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="self-stretch text-black font-['Jost'] text-[16px] font-semibold leading-[120%] group-hover:text-[#0066B3] transition-colors duration-300">Partner with Odoo</h3>
          <p className="self-stretch text-black font-['Jost'] text-[12px] italic font-normal leading-[120%] group-hover:text-[#0066B3] transition-colors duration-300">Odoo Partnership</p>
        </div>
      </Link>
      <div 
        className="flex items-center gap-4 p-2 cursor-pointer transition-all duration-300 hover:translate-x-1 rounded transform group hover:bg-[#F0F8FF]"
        onClick={handleItemClick}
      >
        <div className="w-[48px] h-[48px] flex-shrink-0 aspect-square rounded-full flex items-center justify-center overflow-hidden">
          <Image 
            src="/images/dropdown/host.svg"
            alt="Hostbooks Partnership"
            width={48}
            height={48}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="self-stretch text-black font-['Jost'] text-[16px] font-semibold leading-[120%] group-hover:text-[#0066B3] transition-colors duration-300">Partner with Hostbooks</h3>
          <p className="self-stretch text-black font-['Jost'] text-[12px] italic font-normal leading-[120%] group-hover:text-[#0066B3] transition-colors duration-300">Hostbooks Partnership</p>
        </div>
      </div>
    </div>
  );

  // Blogs content
  const BlogsContent = () => (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full md:w-[713px]">
        <h3 className="font-['Jost'] text-[16px] font-semibold leading-[120%] text-[#055087] mb-4">
          Appit Blog – Insights That Drive Innovation
        </h3>
        <p className="font-['Jost'] text-[16px] leading-[120%] text-black">
          Dive into expert insights, industry trends, and thought leadership across AI, legal tech, cloud solutions, and enterprise transformation. The Appit Blog is your go-to resource for staying ahead in the rapidly evolving world of technology.
        </p>
      </div>
      <div>
        <ButtonCTA text="Blogs" link="/blog" />
      </div>
    </div>
  );

  // Our Team content
  const OurTeamContent = () => (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4">
        <h3 className="w-full md:w-[713px] font-['Jost'] text-[16px] font-semibold leading-[120%] text-black">
          Meet the Minds Behind AppitSoftware
        </h3>
        <p className="w-full md:w-[672px] font-['Jost'] text-[16px] leading-[120%] text-black">
          A diverse group of visionaries, engineers, and strategists dedicated to building intelligent, scalable solutions that transform businesses.
        </p>
      </div>
      <div>
        <ButtonCTA text="Our Team" link="/team" />
      </div>
    </div>
  );

  // Get the active content based on selected tab
  const getActiveContent = () => {
    switch(activeTab) {
      case 'About Us':
        return <AboutUsContent />;
      case 'Partnership':
        return <PartnershipContent />;
      case 'Blogs':
        return <BlogsContent />;
      case 'Our Team':
        return <OurTeamContent />;
      default:
        return <AboutUsContent />;
    }
  };

  // Sidebar tabs
  const sidebarTabs = ['About Us', 'Partnership', 'Blogs', 'Our Team'];

  if (!isOpen && animationState === 'closed') {
    return null;
  }

  if (isMobile) {
    return (
      <div className={`mt-2 transition-all duration-200 ease-out ${getAnimationClasses()}`}>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Who We Are</h3>
          </div>
          <div className="py-2">
            {sidebarTabs.map((tab) => (
              <div 
                key={tab}
                className="py-2 px-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center group"
                onClick={(e) => handleTabClick(tab, e)}
              >
                <span>{tab}</span>
                <div className={`w-[32px] h-[32px] text-[#055087] group-hover:text-[#8B0000] transition-all duration-300 ${activeTab === tab ? 'rotate-90' : ''}`}>
                  {rightArrow}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4">
            {getActiveContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`fixed inset-0 top-[96px] z-40 w-full overflow-hidden transition-all duration-200 ease-out ${getAnimationClasses()}`} 
      style={{ background: 'transparent' }}>
      {/* Main Dropdown Container */}
      <div className="w-full mx-auto py-2.5 flex-col justify-center items-center">
        <div className={`flex flex-col w-full bg-white shadow-lg transition-all duration-200 ease-out ${getAnimationClasses()}`}>
          {/* Blue vertical bar & Who We Are heading */}
          <div className="flex px-10 py-2.5 items-center gap-6 self-stretch border-b border-gray-100">
            <div className="w-[10px] h-[57px] bg-[#055087]"></div>
            <h2 className="text-2xl font-bold">Who We Are</h2>
          </div>

          {/* Main content area with bottom padding only */}
          <div className="flex flex-col md:flex-row px-[10px] items-center gap-[24px] self-stretch pb-[20px]">
            {/* Left Sidebar with bottom padding only */}
            <div className="flex w-full md:w-[300px] py-[16px] pb-[20px] flex-col items-center self-stretch bg-[#DFF0FF]">
              {sidebarTabs.map((tab) => (
                <div 
                  key={tab}
                  onClick={(e) => handleTabClick(tab, e)}
                  onMouseEnter={() => handleTabHover(tab)}
                  onMouseLeave={handleTabLeave}
                  className={`flex py-1.5 px-6 justify-between items-center self-stretch cursor-pointer transition-all duration-300 group ${activeTab === tab ? 'bg-white' : 'hover:bg-blue-100 hover:pl-8'}`}
                >
                  <span className="font-semibold">{tab}</span>
                  <div className={`w-[32px] h-[32px] text-[#055087] group-hover:text-[#8B0000] transition-all duration-300 ${activeTab === tab ? 'rotate-90' : ''}`}>
                    {rightArrow}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Content Grid - with bottom padding only */}
            <div className="w-full md:w-[1020px] min-h-[343px] pb-[20px] p-6">
              {getActiveContent()}
            </div>
          </div>
        </div>
      </div>

      {/* No overlay for background */}
      <div 
        className="fixed inset-0 -z-10 bg-transparent"
        onClick={onClose}
      ></div>
    </div>
  );
}