'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function WhatWeDoDropdown({ isOpen, onClose, isMobile = false }) {
  const [activeTab, setActiveTab] = useState('Services');
  const [animationState, setAnimationState] = useState(isOpen ? 'open' : 'closed');
  
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

  // Handle hover on tab - memoized to prevent unnecessary rerenders
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
    // Close dropdown and update sessionStorage
    if (onClose) {
      onClose();
      
      // Reset the dropdown state in sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('isWhatWeDoOpen', 'false');
      }
    }
  }, [onClose]);

  // Define the right arrow icon for navigation
  const rightArrow = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-all duration-300">
      <path d="M12.3867 21.1733L17.56 16L12.3867 10.8267C12.2632 10.7032 12.1653 10.5567 12.0985 10.3954C12.0317 10.2341 11.9973 10.0613 11.9973 9.88668C11.9973 9.71211 12.0317 9.53924 12.0985 9.37795C12.1653 9.21667 12.2632 9.07012 12.3867 8.94668C12.5101 8.82324 12.6567 8.72532 12.818 8.65851C12.9792 8.5917 13.1521 8.55732 13.3267 8.55732C13.5012 8.55732 13.6741 8.5917 13.8354 8.65851C13.9967 8.72532 14.1432 8.82324 14.2667 8.94668L20.3867 15.0667C20.5103 15.19 20.6083 15.3365 20.6753 15.4978C20.7422 15.6591 20.7766 15.8321 20.7766 16.0067C20.7766 16.1813 20.7422 16.3542 20.6753 16.5155C20.6083 16.6768 20.5103 16.8233 20.3867 16.9467L14.2667 23.0667C14.1433 23.1903 13.9968 23.2883 13.8355 23.3553C13.6742 23.4222 13.5013 23.4566 13.3267 23.4566C13.1521 23.4566 12.9791 23.4222 12.8178 23.3553C12.6565 23.2883 12.51 23.1903 12.3867 23.0667C11.88 22.5467 11.8667 21.6933 12.3867 21.1733Z" fill="currentColor"/>
    </svg>
  );

  // Service items for the grid with mapped SVG paths
  const serviceItems = [
    {
      icon: 'first', // Oracle AI
      title: 'Oracle AI',
      subtitle: 'Oracle AI Solutions'
    },
    {
      icon: 'first', // Service Now AI
      title: 'Service Now AI',
      subtitle: 'ServiceNow AI Solutions'
    },
    {
      icon: 'second', // Managed Services
      title: 'Managed Services',
      subtitle: 'Outsourced IT Support'
    },
    {
      icon: 'third', // Cyber Security
      title: 'Cyber Security GRC Solutions',
      subtitle: 'Outsourced IT Support'
    },
    {
      icon: 'fourth', // Offshore Development
      title: 'Offshore Development Center',
      subtitle: 'Cost-effective, Scalable, Reliable'
    },
    {
      icon: 'fifth', // E-Commerce
      title: 'E-Commerce Services',
      subtitle: 'AI-Powered Solutions for Smarter Shopping'
    },
    {
      icon: 'sixth', // Digital Transformation
      title: 'Digital Transformation Services',
      subtitle: 'Innovate. Automate. Grow'
    },
    {
      icon: 'seventh', // Adobe Commerce
      title: 'Adobe Commerce (Magento)',
      subtitle: 'Powering E-Commerce with Adobe Commerce Expertise'
    },
    {
      icon: 'eighth', // Magento Open Source
      title: 'Magento Open Source',
      subtitle: 'Flexible E-Commerce Solutions with Magento Open Source'
    },
    {
      icon: 'nineth', // GenMind
      title: 'GenMind Consulting',
      subtitle: 'From Strategy to Execution'
    },
    {
      icon: 'tenth', // BigCommerce
      title: 'BigCommerce',
      subtitle: 'Scalable Solutions with BigCommerce Expertise'
    },
    {
      icon: 'eleventh', // Shopify
      title: 'Shopify',
      subtitle: 'Seamless E-Commerce with Shopify Solutions'
    }
  ];

  // Industry items for the grid with updated SVG paths
  /* 
  const industryItems = [
    {
      icon: 'thermal', // Updated to first.svg
      title: 'Thermal Power',
      subtitle: 'Heat, Conversion, Turbines, Electricity'
    },
    {
      icon: 'oil', // Updated to second.svg
      title: 'Oil and Gas',
      subtitle: 'Energy, Exploration, Extraction, Infrastructure'
    },
    {
      icon: 'manu', // Updated to third.svg
      title: 'Manufacturing Supply Chain',
      subtitle: 'Production, Procurement, Logistics'
    },
    {
      icon: 'edible', // Updated to fourth.svg
      title: 'Edible Oils',
      subtitle: 'Cooking, Nutrition, Extraction, Health'
    },
    {
      icon: 'const', // Updated to fifth.svg
      title: 'Construction & Real Estates',
      subtitle: 'Design, Development & Infrastructure'
    }
  ];
  */

  // Products items with new content
  const productItems = [
    {
      icon: 'first',
      title: 'AskGenie AI',
      subtitle: 'Intelligent Self-Serve Support'
    },
    {
      icon: 'first',
      title: 'SmartChat AI',
      subtitle: 'Powered by Gen AI Agent Co-Pilot'
    },
    {
      icon: 'second',
      title: 'AI ChartWorks',
      subtitle: 'AI-Powered Low-Code Builder'
    },
    {
      icon: 'sale',
      title: 'SalesBot AI',
      subtitle: 'Conversational Buying Guidance'
    },
    {
      icon: 'gen1',
      title: 'InsightsGen AI',
      subtitle: 'Advanced User Behaviour Analytics'
    },
    {
      icon: 'whatsapp',
      title: 'WhatsAppBot AI',
      subtitle: 'Enhance Your Brand'
    }
  ];

  // Platform items with new content
  const platformItems = [
    {
      icon: 'legal',
      title: 'Legal AI Assistance',
      subtitle: 'AI Legal Document Automation'
    },
    {
      icon: 'talent',
      title: 'AI-Driven Talent Acquisition',
      subtitle: 'Smart AI Hiring Solutions'
    },
    {
      icon: 'crm',
      title: 'All-in-One CRM',
      subtitle: 'Sales & Support Simplified'
    },
    {
      icon: 'ats',
      title: 'ATS (Application Tracking System)',
      subtitle: 'Optimize Talent Acquisition'
    },
    {
      icon: 'outlook',
      title: 'Outlook AI Copilot',
      subtitle: 'Assist. Organize. Respond'
    }
  ];

  // Get the active items based on selected tab
  const getActiveItems = () => {
    switch(activeTab) {
      case 'Services':
        return serviceItems;
      /* case 'Industries':
        return industryItems; */
      case 'Products':
        return platformItems;
      case 'Platform':
        return productItems;
      default:
        return serviceItems;
    }
  };

  // Sidebar tabs
  const sidebarTabs = ['Services', /* 'Industries', */ 'Products', 'Platform'];

  if (!isOpen && animationState === 'closed') {
    return null;
  }

  if (isMobile) {
    const activeItems = getActiveItems();
    
    return (
      <div className={`mt-2 transition-all duration-200 ease-out ${getAnimationClasses()}`}>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">What We Do</h3>
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
          <div className="p-4 grid grid-cols-1 gap-4">
            {activeItems.map((item, index) => {
              const ItemComponent = 
                (activeTab === 'Platform' && item.title === 'AskGenie AI') ? Link :
                (activeTab === 'Services' && item.title === 'Oracle AI') ? Link :
                (activeTab === 'Products' && item.title === 'Legal AI Assistance') ? Link : 'div';
              const itemProps = 
                (activeTab === 'Platform' && item.title === 'AskGenie AI') ? { href: '/platform', prefetch: true } :
                (activeTab === 'Services' && item.title === 'Oracle AI') ? { href: '/services/oracle-ai', prefetch: true } :
                (activeTab === 'Products' && item.title === 'Legal AI Assistance') ? { href: '/products/ai-lawyers', prefetch: true } : {};
              
              return (
                <ItemComponent 
                  key={index}
                  {...itemProps}
                  onClick={(e) => {
                    // For navigation links, ensure the dropdown is closed
                    if (onClose) {
                      onClose();
                      // Reset the dropdown state in sessionStorage
                      if (typeof window !== 'undefined') {
                        sessionStorage.setItem('isWhatWeDoOpen', 'false');
                      }
                    }
                    handleItemClick(e);
                  }}
                  className="flex items-center gap-3 p-2 rounded transition-all duration-300 group hover:bg-[#F0F8FF]"
                  style={{
                    transitionDelay: `${index * 30}ms`,
                    opacity: animationState === 'opening' || animationState === 'open' ? 1 : 0,
                    transform: animationState === 'opening' || animationState === 'open' ? 'translateX(0)' : 'translateX(-5px)'
                  }}
                >
                  <div className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center">
                    <Image 
                      src={`/images/dropdown/${item.icon}.svg`}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold group-hover:text-[#0066B3] transition-colors duration-300">{item.title}</h4>
                    <p className="text-xs text-gray-600 group-hover:text-[#0066B3] transition-colors duration-300">{item.subtitle}</p>
                  </div>
                </ItemComponent>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const activeItems = getActiveItems();

  return (
    <div 
      className={`fixed inset-0 top-[96px] z-40 w-full overflow-hidden transition-all duration-200 ease-out ${getAnimationClasses()}`} 
      style={{ background: 'transparent' }}>
      {/* Main Dropdown Container */}
      <div className="w-full mx-auto py-2.5 flex-col justify-center items-center">
        <div className={`flex flex-col w-full bg-white shadow-lg transition-all duration-200 ease-out ${getAnimationClasses()}`}>
          {/* Blue vertical bar & What We Do heading */}
          <div className="flex px-10 py-2.5 items-center gap-6 self-stretch border-b border-gray-100">
            <div className="w-[10px] h-[57px] bg-[#055087]"></div>
            <h2 className="text-2xl font-bold">What We Do</h2>
          </div>

          {/* Main content area with bottom padding only */}
          <div className="flex px-[10px] items-center gap-[24px] self-stretch pb-[20px]">
            {/* Left Sidebar with bottom padding only */}
            <div className="flex w-[300px] py-[16px] pb-[20px] flex-col items-center self-stretch bg-[#DFF0FF]">
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
            <div 
              className="grid w-[1020px] h-[343px] pb-[20px]" 
              style={{
                gridTemplateRows: 'repeat(4, minmax(0, 1fr))',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                rowGap: '16px',
                columnGap: '24px'
              }}
            >
              {activeItems.map((item, index) => {
                const ItemComponent = 
                  (activeTab === 'Platform' && item.title === 'AskGenie AI') ? Link :
                  (activeTab === 'Services' && item.title === 'Oracle AI') ? Link :
                  (activeTab === 'Products' && item.title === 'Legal AI Assistance') ? Link : 'div';
                const itemProps = 
                  (activeTab === 'Platform' && item.title === 'AskGenie AI') ? { href: '/platform', prefetch: true } :
                  (activeTab === 'Services' && item.title === 'Oracle AI') ? { href: '/services/oracle-ai', prefetch: true } :
                  (activeTab === 'Products' && item.title === 'Legal AI Assistance') ? { href: '/products/ai-lawyers', prefetch: true } : {};
                
                return (
                  <ItemComponent 
                    key={index}
                    {...itemProps}
                    className="flex items-center gap-4 p-2 cursor-pointer transition-all duration-300 hover:translate-x-1 rounded group hover:bg-[#F0F8FF]" 
                    style={{ 
                      transitionDelay: `${(index % 3) * 50 + Math.floor(index / 3) * 30}ms`,
                      opacity: animationState === 'opening' || animationState === 'open' ? 1 : 0,
                      transform: animationState === 'opening' || animationState === 'open' ? 'translateX(0)' : 'translateX(-5px)'
                    }}
                    onClick={(e) => {
                      // For navigation links, make sure to close the dropdown
                      if (onClose) {
                        onClose();
                        // Reset the dropdown state in sessionStorage
                        if (typeof window !== 'undefined') {
                          sessionStorage.setItem('isWhatWeDoOpen', 'false');
                        }
                      }
                      
                      // For non-navigation items, use the regular handleItemClick
                      if (!(activeTab === 'Platform' && item.title === 'AskGenie AI') &&
                          !(activeTab === 'Services' && item.title === 'Oracle AI') &&
                          !(activeTab === 'Products' && item.title === 'Legal AI Assistance')) {
                        handleItemClick(e);
                      }
                    }}
                  >
                    <div className="w-[48px] h-[48px] flex-shrink-0 aspect-square rounded-full flex items-center justify-center overflow-hidden">
                      <Image 
                        src={`/images/dropdown/${item.icon}.svg`}
                        alt={item.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="self-stretch text-black font-['Jost'] text-[16px] font-semibold leading-[120%] group-hover:text-[#0066B3] transition-colors duration-300">{item.title}</h3>
                      <p className="self-stretch text-black font-['Jost'] text-[12px] italic font-normal leading-[120%] group-hover:text-[#0066B3] transition-colors duration-300">{item.subtitle}</p>
                    </div>
                  </ItemComponent>
                );
              })}
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