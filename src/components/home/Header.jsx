'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import WhatWeDoDropdown from '@/components/home/WhatWeDoDropdown'
import WhoWeAreDropdown from '@/components/home/WhoWeAreDropdown'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWhatWeDoOpen, setIsWhatWeDoOpen] = useState(false)
  const [isWhoWeAreOpen, setIsWhoWeAreOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isClient, setIsClient] = useState(false) // Add to prevent hydration issues
  const [isInitialRender, setIsInitialRender] = useState(true) // Track initial render
  const whatWeDoRef = useRef(null)
  const whoWeAreRef = useRef(null)
  const mobileMenuRef = useRef(null)

  // Store dropdown states in sessionStorage to maintain them across page navigations
  useEffect(() => {
    if (typeof window !== 'undefined' && isClient) {
      // Check if there are stored values
      const storedWhatWeDo = sessionStorage.getItem('isWhatWeDoOpen');
      const storedWhoWeAre = sessionStorage.getItem('isWhoWeAreOpen');
      
      // Only update state if values exist and we're not just opening a new page
      if (storedWhatWeDo !== null) {
        setIsWhatWeDoOpen(storedWhatWeDo === 'true');
      }
      
      if (storedWhoWeAre !== null) {
        setIsWhoWeAreOpen(storedWhoWeAre === 'true');
      }
    }
  }, [isClient]);
  
  // Save dropdown states to sessionStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined' && isClient) {
      sessionStorage.setItem('isWhatWeDoOpen', isWhatWeDoOpen);
      sessionStorage.setItem('isWhoWeAreOpen', isWhoWeAreOpen);
    }
  }, [isWhatWeDoOpen, isWhoWeAreOpen, isClient]);

  // Set isClient to true after component mounts to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
    
    // After a short delay, mark the initial render as complete
    const timer = setTimeout(() => {
      setIsInitialRender(false)
    }, 300) // 300ms should be enough for initial animations
    
    return () => clearTimeout(timer)
  }, []);

  // Update window width on resize - Initialize to a specific value to prevent hydration mismatch
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 940 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    // Set window width only after component is mounted
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

  // Close dropdowns when clicking outside, but only on desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only handle outside clicks when on desktop (above 940px)
      if (windowWidth >= 940) {
        if (whatWeDoRef.current && !whatWeDoRef.current.contains(event.target)) {
          setIsWhatWeDoOpen(false)
        }
        if (whoWeAreRef.current && !whoWeAreRef.current.contains(event.target)) {
          setIsWhoWeAreOpen(false)
        }
      }
    }

    if (isWhatWeDoOpen || isWhoWeAreOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isWhatWeDoOpen, isWhoWeAreOpen, windowWidth])

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleWhatWeDo = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWhatWeDoOpen(!isWhatWeDoOpen)
    if (isWhoWeAreOpen) setIsWhoWeAreOpen(false)
  }

  const toggleWhoWeAre = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWhoWeAreOpen(!isWhoWeAreOpen)
    if (isWhatWeDoOpen) setIsWhatWeDoOpen(false)
  }

  const closeWhatWeDo = () => {
    // Only close if on desktop (above 940px)
    if (windowWidth >= 940) {
      setIsWhatWeDoOpen(false)
    }
  }

  const closeWhoWeAre = () => {
    // Only close if on desktop (above 940px)
    if (windowWidth >= 940) {
      setIsWhoWeAreOpen(false)
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Button size calculations based on available space
  const getButtonSize = () => {
    if (windowWidth >= 1280) {
      return 'text-[17px] p-[11px_18px] gap-[15px]'
    } else if (windowWidth >= 1024) {
      return 'text-[16px] p-[10px_16px] gap-[12px]'
    } else if (windowWidth >= 768) {
      return 'text-[15px] p-[9px_14px] gap-[10px]'
    } else {
      return 'text-[15px] p-[8px_12px] gap-[8px]'
    }
  }

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm font-jost">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] px-4 sm:px-[30px] md:px-[60px] py-[16px] flex justify-between items-center">
          {/* Logo - Responsive sizing */}
          <Link href="/" className="flex items-center">
            <div className="w-[45px] h-[55px] sm:w-[80px] sm:h-[80px] md:w-[50px] md:h-[40px] flex-shrink-0 aspect-[110.68/110] bg-white bg-[url('/images/app_logo.png')] bg-contain bg-no-repeat bg-center rounded-lg" />
          </Link>
          <h2 className='text-xl sm:text-2xl font-bold'>Careers</h2>

        
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div 
        ref={mobileMenuRef}
        className={`2xl:hidden lg:hidden xl:hidden custom940:hidden fixed inset-0 bg-white z-40 pt-[96px] overflow-auto transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Close button - positioned outside the container for better placement */}
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
          
          
          {/* CTA Button at the bottom of mobile menu */}
          <div className="py-6 px-1 flex justify-center w-full">
            <button className="group w-full flex justify-center p-[12px_24px] items-center gap-[15px] rounded-[32px] bg-[#0066B3] text-white text-[17px] font-semibold leading-[120%] font-jost border-none cursor-pointer transition-all duration-300 hover:bg-[#A50F15]">
              <span>Explore Appit Gen AI</span>
              <div className="relative flex items-center justify-center w-[34px] h-[34px]">
                {/* Default state - original logo */}
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
                
                {/* Hover state - circle with arrow */}
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

      {/* Add styles for the dropdown */}
      <style jsx global>{`
        /* Import Jost font explicitly */
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');
        
        /* Menu animation styles */
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
        
        /* Prevent transitions on initial render or page navigation */
        .no-transition, 
        .no-transition * {
          transition: none !important;
        }
      `}</style>
    </header>
  )
}