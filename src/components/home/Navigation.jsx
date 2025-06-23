'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import WhatWeDoDropdown from './WhatWeDoDropdown'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isWhatWeDoOpen, setIsWhatWeDoOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsWhatWeDoOpen(false)
      }
    }

    if (isWhatWeDoOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isWhatWeDoOpen])

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Career', href: '/career' },
    { name: 'Contact', href: '/contact' },
  ]

  const handleWhatWeDoClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWhatWeDoOpen(!isWhatWeDoOpen)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 lg:h-24">
          {/* Logo - Further increased size */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-xl lg:text-2xl font-heading">A</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                  Appit<span className="text-gradient">Software</span>
                </span>
                <div className="text-sm text-gray-500 font-medium tracking-wide">Software Solutions</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - centered with increased spacing */}
          <div className="hidden lg:flex items-center justify-center space-x-4 relative mx-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 relative group font-jost ${
                  pathname === item.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></div>
                )}
              </Link>
            ))}
            
            {/* What We Do Dropdown - Using WhatWeDoDropdown component (increased size) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleWhatWeDoClick}
                className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 relative group flex items-center space-x-2 cursor-pointer select-none font-jost ${
                  isWhatWeDoOpen
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
                type="button"
                aria-expanded={isWhatWeDoOpen}
                aria-haspopup="true"
              >
                <span className="cursor-pointer">What We Do</span>
                <svg 
                  className={`w-6 h-6 transition-transform duration-300 cursor-pointer ${
                    isWhatWeDoOpen ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* What We Do Dropdown */}
              <WhatWeDoDropdown 
                isOpen={isWhatWeDoOpen} 
                onClose={() => setIsWhatWeDoOpen(false)} 
              />
            </div>
          </div>

          {/* CTA Button & Mobile Menu - Further increased button size */}
          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex btn-primary text-lg lg:text-xl px-8 lg:px-10 py-3 lg:py-4 font-jost"
            >
              Get Started
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
                } top-3`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden relative ${
          isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {/* Close button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`absolute top-3 right-3 p-3 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-all duration-300 transform ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} shadow-md z-10`}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="py-4 space-y-1 border-t border-gray-100">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsWhatWeDoOpen(false)
                }}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 font-jost ${
                  pathname === item.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile What We Do */}
            <button
              onClick={handleWhatWeDoClick}
              type="button"
              className="w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center justify-between font-jost"
            >
              <span>What We Do</span>
              <svg 
                className={`w-6 h-6 transition-transform duration-300 cursor-pointer ${
                  isWhatWeDoOpen ? 'rotate-180' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Mobile dropdown */}
            {isWhatWeDoOpen && (
              <WhatWeDoDropdown 
                isOpen={isWhatWeDoOpen} 
                onClose={() => setIsWhatWeDoOpen(false)}
                isMobile={true}
              />
            )}
            
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsWhatWeDoOpen(false)
                }}
                className="btn-primary w-full text-center text-lg py-3 font-jost"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}