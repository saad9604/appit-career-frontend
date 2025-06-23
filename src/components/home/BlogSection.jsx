"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Function to check if element is in viewport
  const checkInView = () => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // If the top of the element is in view
    if (rect.top <= windowHeight * 0.7 && rect.bottom >= 0) {
      setIsInView(true);
    } else {
      // Reset animations when scrolling away
      setIsInView(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', checkInView);
    checkInView();
    
    return () => {
      window.removeEventListener('scroll', checkInView);
    };
  }, []);

  const blogs = [
    {
      id: 1,
      title: "From Zero to Dev: How AI Is Changing Who Can Code",
      image: "/images/blog1.png",
      link: "/blogdetails"
    },
    {
      id: 2,
      title: "Microsoft Phases Out Skype: Here's What's Happening",
      image: "/images/blog2.png",
      link: "/blogdetails",
      bgPosition: "65% center"
    },
    {
      id: 3,
      title: "OpenAI Scales Back Corporate Shift, Nonprofit Remains in Control",
      image: "/images/blog3.png",
      link: "/blogdetails"
    }
  ];

  return (
    <section 
      id="blog-section"
      ref={sectionRef}
      className="w-full bg-[#252525] relative"
    >
      {/* Separator Line */}
      <div className="w-full h-px bg-white/10 absolute top-0 left-0"></div>
      
      <div className="max-w-[1440px] mx-auto py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Heading Container */}
        <div 
          className={`flex flex-col items-center gap-4 sm:gap-5 md:gap-[30px] w-full max-w-[1152px] mx-auto transition-all duration-1000 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-jost text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-semibold leading-[120%] text-center text-white">
            Explore Our Insightful <span className="text-[#EC1C26]">Blogs</span>
          </h2>
          <p 
            className={`font-jost text-base sm:text-lg md:text-xl lg:text-[21px] font-semibold leading-[120%] text-white text-center w-full transition-all duration-1000 ease-out delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Know about emerging tech trends and market happenings
          </p>
        </div>

        {/* Blogs Container */}
        <div 
          className={`w-full max-w-[1196px] mx-auto mt-6 sm:mt-8 md:mt-10 transition-all duration-1000 ease-out delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* View More Link (Top) */}
          <div className="w-full flex justify-end mb-4">
            <Link 
              href="/blog" 
              className="py-2 sm:py-[10px] group"
            >
              <span className="font-jost text-base sm:text-lg md:text-xl font-semibold text-white relative inline-block">
                View More
                <span className="absolute left-0 bottom-[-4px] sm:bottom-[-6px] w-0 h-[2px] bg-[#EC1C26] group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </div>

          {/* Blog Cards Container - Using straightforward Tailwind flex/grid approach */}
          <div className="w-full">
            {/* Mobile screens (single column) */}
            <div className="flex flex-col items-center gap-4 sm:hidden">
              {blogs.map((blog, index) => (
                <BlogCard 
                  key={blog.id} 
                  blog={blog} 
                  isInView={isInView} 
                  delay={(index + 1) * 100 + 300} 
                  width="100%" 
                  maxWidth="260px"
                  xsMaxWidth="220px"
                />
              ))}
            </div>
            
            {/* Small to Medium screens (2x1 layout) */}
            <div className="hidden sm:block lg:hidden max-w-3xl mx-auto">
              {/* First row (2 cards) */}
              <div className="flex justify-center gap-4 md:gap-6">
                <BlogCard 
                  blog={blogs[0]} 
                  isInView={isInView} 
                  delay={400} 
                  width="100%" 
                  maxWidth="270px" 
                  mdMaxWidth="320px"
                />
                <BlogCard 
                  blog={blogs[1]} 
                  isInView={isInView} 
                  delay={500} 
                  width="100%" 
                  maxWidth="270px" 
                  mdMaxWidth="320px"
                />
              </div>
              
              {/* Second row (1 card) with margin-top */}
              <div className="flex justify-center mt-4 md:mt-6">
                <BlogCard 
                  blog={blogs[2]} 
                  isInView={isInView} 
                  delay={600} 
                  width="100%" 
                  maxWidth="270px"
                  mdMaxWidth="320px"
                />
              </div>
            </div>
            
            {/* Large screens (3 in a row) */}
            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4 xl:gap-6">
              {blogs.map((blog, index) => (
                <div key={blog.id} className="col-span-1 flex justify-center">
                  <BlogCard 
                    blog={blog} 
                    isInView={isInView} 
                    delay={(index + 1) * 100 + 300} 
                    width="100%" 
                    maxWidth="384px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Separate BlogCard component for cleaner structure
function BlogCard({ blog, isInView, delay, width, maxWidth, mdMaxWidth, xsMaxWidth, className = "" }) {
  return (
    <div 
      className={`blog-card-container ${className}`}
      style={{ 
        width, 
        maxWidth,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 1s ease-out, transform 1s ease-out`,
        transitionDelay: `${delay}ms`
      }}
    >
      <style jsx>{`
        @media (max-width: 350px) {
          .blog-card-container {
            max-width: ${xsMaxWidth || '220px'};
          }
          .blog-card-container .card-title {
            font-size: 13px;
            line-height: 1.3;
          }
          .blog-card-container .view-more {
            font-size: 11px;
          }
          .blog-card-container .card-content {
            padding: 0.75rem;
          }
        }
        @media (min-width: 768px) {
          .blog-card-container {
            max-width: ${mdMaxWidth || maxWidth};
          }
        }
      `}</style>
      <Link 
        href={blog.link} 
        className="blog-card group relative block w-full overflow-hidden rounded-xl md:rounded-2xl transition-transform duration-300"
        style={{ aspectRatio: '384/480' }}
      >
        {/* Card Background */}
        <div 
          className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ 
            backgroundImage: `url(${blog.image})`,
            backgroundPosition: blog.bgPosition || 'center'
          }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-65% to-black/80"></div>
        
        {/* Content */}
        <div className="card-content absolute bottom-0 left-0 w-full p-4 md:p-6 flex flex-col gap-2">
          <h3 className="card-title font-jost text-sm sm:text-[15px] md:text-lg lg:text-xl font-semibold text-white leading-tight">
            {blog.title}
          </h3>
          <div className="inline-block">
            <span className="view-more-text font-jost text-xs sm:text-[13px] md:text-base font-semibold text-white relative inline-block">
              View More
              <span className="red-underline absolute left-0 bottom-[-3px] w-0 h-[2px] bg-[#EC1C26] group-hover:w-full transition-all duration-300"></span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
