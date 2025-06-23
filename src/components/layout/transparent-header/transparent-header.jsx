'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WhatWeDoDropdown from '@/components/home/WhatWeDoDropdown';
import WhoWeAreDropdown from '@/components/home/WhoWeAreDropdown';

export default function TransparentHeader() {
  const pathname = usePathname();
  const isOracleAIPage = pathname === '/services/oracle-ai';
  
  // Track the pathname to detect route changes
  const prevPathRef = useRef(pathname);
  const textColor = isOracleAIPage ? 'text-white' : 'text-[#000]';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhatWeDoOpen, setIsWhatWeDoOpen] = useState(false);
  const [isWhoWeAreOpen, setIsWhoWeAreOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const whatWeDoRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Store dropdown states in sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && isClient) {
      const storedWhatWeDo = sessionStorage.getItem('isWhatWeDoOpen');
      const storedWhoWeAre = sessionStorage.getItem('isWhoWeAreOpen');
      
      if (storedWhatWeDo !== null) {
        setIsWhatWeDoOpen(storedWhatWeDo === 'true');
      }
      
      if (storedWhoWeAre !== null) {
        setIsWhoWeAreOpen(storedWhoWeAre === 'true');
      }
    }
  }, [isClient]);
  
  // Save dropdown states
  useEffect(() => {
    if (typeof window !== 'undefined' && isClient) {
      sessionStorage.setItem('isWhatWeDoOpen', isWhatWeDoOpen);
      sessionStorage.setItem('isWhoWeAreOpen', isWhoWeAreOpen);
    }
  }, [isWhatWeDoOpen, isWhoWeAreOpen, isClient]);

  // Set isClient to true after component mounts and handle route changes
  useEffect(() => {
    setIsClient(true);
    
    const timer = setTimeout(() => {
      setIsInitialRender(false);
    }, 300);
    
    // Check if route has changed
    if (prevPathRef.current !== pathname) {
      // Route has changed, close both dropdowns
      setIsWhatWeDoOpen(false);
      setIsWhoWeAreOpen(false);
      
      // Update sessionStorage to reflect closed dropdowns
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('isWhatWeDoOpen', false);
        sessionStorage.setItem('isWhoWeAreOpen', false);
      }
      
      // Update the previous path reference
      prevPathRef.current = pathname;
    }
    
    return () => clearTimeout(timer);
  }, [pathname]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Window width detection
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 940 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    const timer = setTimeout(() => {
      setWindowWidth(window.innerWidth);
      setIsClient(true);
    }, 0);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [isMenuOpen]);

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (windowWidth >= 940) {
        if (whatWeDoRef.current && !whatWeDoRef.current.contains(event.target)) {
          setIsWhatWeDoOpen(false);
        }
        if (whoWeAreRef.current && !whoWeAreRef.current.contains(event.target)) {
          setIsWhoWeAreOpen(false);
        }
      }
    };

    if (isWhatWeDoOpen || isWhoWeAreOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWhatWeDoOpen, isWhoWeAreOpen, windowWidth]);

  // Body scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleWhatWeDo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWhatWeDoOpen(!isWhatWeDoOpen);
    if (isWhoWeAreOpen) setIsWhoWeAreOpen(false);
  };

  const toggleWhoWeAre = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWhoWeAreOpen(!isWhoWeAreOpen);
    if (isWhatWeDoOpen) setIsWhatWeDoOpen(false);
  };

  const closeWhatWeDo = () => {
    if (windowWidth >= 940) {
      setIsWhatWeDoOpen(false);
    }
  };

  const closeWhoWeAre = () => {
    if (windowWidth >= 940) {
      setIsWhoWeAreOpen(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Button size calculations
  const getButtonSize = () => {
    if (windowWidth >= 1280) {
      return 'text-[17px] p-[11px_18px] gap-[15px]';
    } else if (windowWidth >= 1024) {
      return 'text-[16px] p-[10px_16px] gap-[12px]';
    } else if (windowWidth >= 768) {
      return 'text-[15px] p-[9px_14px] gap-[10px]';
    } else {
      return 'text-[15px] p-[8px_12px] gap-[8px]';
    }
  };

  // Hamburger menu color
  const hamburgerColor = isOracleAIPage && !scrolled ? 'bg-white' : 'bg-[#003366]';

  return (
    <header data-custom="transparent-header" className={`fixed w-full top-0 z-50 transition-all duration-150 ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'} font-jost`}>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] px-4 sm:px-[30px] md:px-[60px] py-[16px] flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-[65px] h-[65px] sm:w-[80px] sm:h-[80px] md:w-[94px] md:h-[94px] flex-shrink-0 aspect-[110.68/110] bg-transparent bg-[url('/images/app_logo.png')] bg-contain bg-no-repeat bg-center rounded-lg" />
          </Link>

          {/* Navigation - desktop */}
          <nav className={`hidden 2xl:flex lg:flex xl:flex custom940:flex items-center gap-[20px] lg:gap-[35px] flex-wrap justify-center mx-auto ${isInitialRender ? 'no-transition' : ''}`}>
            <div className="relative py-[10px] px-[8px] flex justify-center items-center" ref={whoWeAreRef}>
              <button 
                className={`text-[17px] lg:text-[21px] font-bold leading-[120%] font-jost flex items-center whitespace-nowrap transition-colors duration-300 hover:text-[#C7131A] ${scrolled ? 'text-[#000]' : textColor}`}
                onClick={toggleWhoWeAre}
                type="button"
              >
                Who We Are
                <svg 
                  className={`ml-2 w-5 h-5 ${isInitialRender ? 'no-transition' : 'transition-transform duration-300'} ${isWhoWeAreOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <WhoWeAreDropdown 
                isOpen={isClient && isWhoWeAreOpen} 
                onClose={closeWhoWeAre}
              />
            </div>
            <div className="relative py-[10px] px-[8px] flex justify-center items-center" ref={whatWeDoRef}>
              <button 
                className={`text-[17px] lg:text-[21px] font-bold leading-[120%] font-jost flex items-center whitespace-nowrap transition-colors duration-300 hover:text-[#C7131A] ${scrolled ? 'text-[#000]' : textColor}`}
                onClick={toggleWhatWeDo}
                type="button"
              >
                What We Do
                <svg 
                  className={`ml-2 w-5 h-5 ${isInitialRender ? 'no-transition' : 'transition-transform duration-300'} ${isWhatWeDoOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <WhatWeDoDropdown 
                isOpen={isClient && isWhatWeDoOpen} 
                onClose={closeWhatWeDo}
              />
            </div>
            <Link href="/career" className={`py-[10px] px-[8px] text-[17px] lg:text-[21px] font-bold leading-[120%] font-jost transition-colors duration-300 hover:text-[#C7131A] flex justify-center items-center ${scrolled ? 'text-[#000]' : textColor}`}>
              Career
            </Link>
            <Link href="/contact" className={`py-[10px] px-[8px] text-[17px] lg:text-[21px] font-bold leading-[120%] font-jost transition-colors duration-300 hover:text-[#C7131A] flex justify-center items-center ${scrolled ? 'text-[#000]' : textColor}`}>
              Contact
            </Link>
          </nav>

          {/* CTA Button - desktop */}
          <div className={`hidden 2xl:flex lg:flex xl:flex custom940:flex items-center ${isInitialRender ? 'no-transition' : ''}`}>
            <button className={`group flex ${getButtonSize()} items-center rounded-[32px] bg-[#0066B3] text-white font-semibold leading-[120%] font-jost border-none cursor-pointer transition-all duration-300 hover:bg-[#A50F15]`}>
              <span>Explore Appit Gen AI</span>
              <div className="relative flex items-center justify-center w-[30px] h-[30px] lg:w-[34px] lg:h-[34px]">
                {/* Default state */}
                <img 
                  src="/images/navbar_icon.svg" 
                  alt="Arrow icon" 
                  className="w-[30px] h-[30px] lg:w-[34px] lg:h-[34px] group-hover:opacity-0 transition-opacity duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/images/navbar_icon.png';
                    e.currentTarget.onerror = () => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    };
                  }}
                />
                <svg className="w-[30px] h-[30px] lg:w-[34px] lg:h-[34px] hidden group-hover:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                
                {/* Hover state */}
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="20" height="20" className="w-5 h-5 lg:w-6 lg:h-6 transform rotate-[-45deg] text-[#A50F15]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* Mobile menu icon */}
          <div className="2xl:hidden lg:hidden xl:hidden custom940:hidden block">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none relative flex items-center justify-center p-2"
              aria-label="Toggle menu"
            >
              <div className={`relative w-12 h-12 flex items-center justify-center transition-all duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}>
                <div className="relative flex flex-col gap-[6px] items-start">
                  {/* Top bar */}
                  <div 
                    className={`h-[4px] w-[38px] ${scrolled ? 'bg-[#003366]' : hamburgerColor} rounded-full transform-gpu transition-all duration-300 ${isMenuOpen ? 'translate-x-1 opacity-90' : ''}`}
                  ></div>
                  
                  {/* Middle bar */}
                  <div 
                    className={`h-[4px] w-[28px] bg-[#C7131A] rounded-full transform-gpu transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : ''}`}
                  ></div>
                  
                  {/* Bottom bar */}
                  <div 
                    className={`h-[4px] w-[18px] ${scrolled ? 'bg-[#003366]' : hamburgerColor} rounded-full transform-gpu transition-all duration-300 ${isMenuOpen ? 'translate-x-[-1px] opacity-90' : ''}`}
                  ></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        ref={mobileMenuRef}
        className={`2xl:hidden lg:hidden xl:hidden custom940:hidden fixed inset-0 bg-white z-40 pt-[96px] overflow-auto transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-[20px] right-[20px] p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-[#C7131A] transition-all duration-300 transform shadow-md z-10"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="px-3 py-4 h-full flex flex-col w-full">
          <div className="flex-1 space-y-1">
            <button 
              onClick={toggleWhoWeAre}
              className="block w-full text-left py-4 px-1 border-b border-gray-200 text-[#000] text-[21px] font-bold leading-[120%] font-jost flex items-center whitespace-nowrap justify-between"
            >
              <span>Who We Are</span>
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${
                  isWhoWeAreOpen ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isClient && isWhoWeAreOpen && (
              <div className="pl-2 pr-1 py-2 border-b border-gray-200 bg-gray-50">
                <WhoWeAreDropdown 
                  isOpen={isClient && isWhoWeAreOpen} 
                  onClose={closeWhoWeAre}
                  isMobile={true}
                />
              </div>
            )}
            
            <button 
              onClick={toggleWhatWeDo}
              className="block w-full text-left py-4 px-1 border-b border-gray-200 text-[#000] text-[21px] font-bold leading-[120%] font-jost flex items-center whitespace-nowrap justify-between"
            >
              <span>What We Do</span>
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${
                  isWhatWeDoOpen ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isClient && isWhatWeDoOpen && (
              <div className="pl-2 pr-1 py-2 border-b border-gray-200 bg-gray-50">
                <WhatWeDoDropdown 
                  isOpen={isClient && isWhatWeDoOpen} 
                  onClose={closeWhatWeDo}
                  isMobile={true}
                />
              </div>
            )}
            
            <Link href="/career" 
              className="block w-full py-4 px-1 border-b border-gray-200 text-[#000] text-[21px] font-bold leading-[120%] font-jost"
              onClick={closeMenu}
            >
              Career
            </Link>
            
            <Link 
              href="/contact"
              className="block w-full py-4 px-1 border-b border-gray-200 text-[#000] text-[21px] font-bold leading-[120%] font-jost"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </div>
          
          {/* CTA Button - mobile */}
          <div className="py-6 px-1 flex justify-center w-full">
            <button className="group w-full flex justify-center p-[12px_24px] items-center gap-[15px] rounded-[32px] bg-[#0066B3] text-white text-[17px] font-semibold leading-[120%] font-jost border-none cursor-pointer transition-all duration-300 hover:bg-[#A50F15]">
              <span>Explore Appit Gen AI</span>
              <div className="relative flex items-center justify-center w-[34px] h-[34px]">
                <img 
                  src="/images/navbar_icon.svg" 
                  alt="Arrow icon" 
                  className="w-[34px] h-[34px] group-hover:opacity-0 transition-opacity duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/images/navbar_icon.png';
                    e.currentTarget.onerror = () => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    };
                  }}
                />
                <svg className="w-[34px] h-[34px] hidden group-hover:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-[-45deg] text-[#A50F15]">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');
        
        .mobile-menu-enter {
          transform: translateY(100%);
        }
        .mobile-menu-enter-active {
          transform: translateY(0);
          transition: transform 300ms ease-in-out;
        }
        .mobile-menu-exit {
          transform: translateY(0);
        }
        .mobile-menu-exit-active {
          transform: translateY(100%);
          transition: transform 300ms ease-in-out;
        }
        
        .no-transition, 
        .no-transition * {
          transition: none !important;
        }
      `}</style>
    </header>
  );
}