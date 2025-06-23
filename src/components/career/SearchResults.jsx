"use client";

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SearchResults = ({ searchQuery = "UI UX Designer" }) => {
  const router = useRouter();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Sample job cards data - this would be dynamic in a real implementation
  const jobCards = [
    {
      id: 1,
      title: "Jr UI UX Designer Intern",
      role: "Designer",
      experience: "0 years",
      location: "Hybrid - Hyderabad, India",
      skills: ["Figma", "Miro", "Maze", "XD", "Zepline", "Framers", "UI Design", "UX"]
    },
    {
      id: 2,
      title: "Sr UI UX Designer",
      role: "Developer",
      experience: "4 - 9 years",
      location: "Hybrid - Hyderabad, India",
      skills: ["Figma", "Miro", "Maze", "XD", "Zepline", "Framers", "UI Design", "UX"]
    }
  ];
  
  // Add animation effect when section comes into view
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Reset ref array to match the number of cards
    cardsRef.current = cardsRef.current.slice(0, jobCards.length);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When section enters viewport
          if (entry.isIntersecting) {
            // Animate header
            if (headerRef.current) {
              headerRef.current.style.opacity = '0';
              headerRef.current.style.transform = 'translateY(20px)';
              
              setTimeout(() => {
                if (headerRef.current) {
                  headerRef.current.style.opacity = '1';
                  headerRef.current.style.transform = 'translateY(0)';
                }
              }, 100);
            }
            
            // Animate cards with staggered delay
            cardsRef.current.forEach((card, index) => {
              if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                  if (card) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                  }
                }, 300 + index * 150); // Staggered delay
              }
            });
          } else {
            // Reset animations when scrolled out of view
            if (headerRef.current) {
              headerRef.current.style.opacity = '0';
              headerRef.current.style.transform = 'translateY(20px)';
            }
            
            cardsRef.current.forEach((card) => {
              if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
              }
            });
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );
    
    // Start observing the section
    observer.observe(sectionRef.current);
    
    // Cleanup
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [jobCards.length]);

  return (
    <section 
      ref={sectionRef}
      className="w-full py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 bg-[#FFFF]"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col items-start gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10">
        <div 
          ref={headerRef} 
          className="w-full flex flex-col items-start gap-2 xs:gap-3 sm:gap-[13px] max-w-full xs:max-w-[663px] transition-all duration-700 ease-out"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <h2 className="w-full text-[#252525] font-jost text-base xs:text-lg sm:text-[21px] font-semibold leading-[120%] text-left break-words">
            We Found {jobCards.length} Job Openings Matching Your Search
          </h2>
          <p className="w-full text-black font-jost text-xs xs:text-sm sm:text-base font-normal leading-[120%] text-left break-words">
            Explore exciting opportunities that align with your skills and interests. Discover roles that challenge you, inspire growth, and put you on the path to a rewarding career at APPIT Software.
          </p>
        </div>

        <div 
          ref={cardsContainerRef}
          className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8"
        >
          {jobCards.map((job, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="w-full flex flex-col p-4 sm:p-6 gap-4 sm:gap-6 bg-white rounded-[24px] shadow-[0px_0px_4px_3px_rgba(0,0,0,0.25)] transition-all duration-700 ease-out"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <div className="w-full flex flex-row justify-between items-start gap-4">
                <div className="flex flex-col items-start gap-2 sm:gap-2.5">
                  <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] font-jost text-black">{job.title}</h3>
                  <p className="text-base sm:text-[16px] font-semibold leading-[120%] font-jost text-[#252525]">{job.role}</p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
                        <path d="M14 6V4H10V6H14ZM4 9V18C4 18.55 4.45 19 5 19H19C19.55 19 20 18.55 20 18V9C20 8.45 19.55 8 19 8H5C4.45 8 4 8.45 4 9ZM20 6C21.11 6 22 6.89 22 8V19C22 20.11 21.11 21 20 21H4C2.89 21 2 20.11 2 19L2.01 8C2.01 6.89 2.89 6 4 6H8V4C8 2.89 8.89 2 10 2H14C15.11 2 16 2.89 16 4V6H20Z" fill="#454545"/>
                      </svg>
                      <span className="text-sm sm:text-base font-normal leading-[120%] font-jost text-[#454545]">{job.experience}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.247 20.969C13.3971 19.9254 14.4615 18.7911 15.43 17.577C17.47 15.014 18.711 12.487 18.795 10.24C18.8282 9.32679 18.6771 8.41626 18.3505 7.56278C18.024 6.7093 17.5288 5.9304 16.8945 5.27259C16.2602 4.61478 15.4998 4.09157 14.6588 3.7342C13.8177 3.37684 12.9133 3.19265 11.9995 3.19265C11.0857 3.19265 10.1813 3.37684 9.34022 3.7342C8.49918 4.09157 7.73881 4.61478 7.10451 5.27259C6.4702 5.9304 5.975 6.7093 5.64846 7.56278C5.32192 8.41626 5.17076 9.32679 5.204 10.24C5.289 12.487 6.531 15.014 8.57 17.577C9.53846 18.7911 10.6029 19.9254 11.753 20.969C11.8637 21.069 11.946 21.1417 12 21.187L12.247 20.969ZM11.262 22.134C11.262 22.134 4 16.018 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10C20 16.018 12.738 22.134 12.738 22.134C12.334 22.506 11.669 22.502 11.262 22.134ZM12 12.8C12.7426 12.8 13.4548 12.505 13.9799 11.9799C14.505 11.4548 14.8 10.7426 14.8 10C14.8 9.25739 14.505 8.5452 13.9799 8.0201C13.4548 7.495 12.7426 7.2 12 7.2C11.2574 7.2 10.5452 7.495 10.0201 8.0201C9.495 8.5452 9.2 9.25739 9.2 10C9.2 10.7426 9.495 11.4548 10.0201 11.9799C10.5452 12.505 11.2574 12.8 12 12.8ZM12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10C8 8.93913 8.42143 7.92172 9.17157 7.17157C9.92172 6.42143 10.9391 6 12 6C13.0609 6 14.0783 6.42143 14.8284 7.17157C15.5786 7.92172 16 8.93913 16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14Z" fill="#454545"/>
                      </svg>
                      <span className="text-sm sm:text-base font-normal leading-[120%] font-jost text-[#454545]">{job.location}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="min-w-[90px] sm:min-w-[120px] py-1.5 sm:py-2.5 px-3 sm:px-4 rounded-[24px] bg-[#0066B3] text-white text-xs sm:text-base font-semibold leading-[120%] font-jost flex justify-center items-center hover:bg-[#EC1C26] transition-colors h-fit mt-1"
                  onClick={() => router.push(`/career-apply`)}
                >
                  View Job
                </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {job.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="px-2 sm:px-2.5 py-1 sm:py-1.5 border border-[#888] rounded-[16px] text-xs sm:text-sm md:text-base font-normal leading-[120%] font-jost text-[#454545]"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;