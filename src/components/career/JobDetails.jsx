"use client";

import React, { useRef, useEffect } from 'react';

const JobDetails = () => {
  // Refs for animation
  const sectionRef = useRef(null);
  const roleDetailsRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  const skillItemsRef = useRef([]);

  // Skills data array
  const skillsData = [
    'Figma',
    'Miro',
    'Maze',
    'XD',
    'Zepline',
    'Framers',
    'UI Design',
    'UX',
    'User Research & Usability Analysis',
    'Wireframing & Prototyping',
    'UX Testing & Feedback Integration',
    'Illustrator'
  ];

  // Animation on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initialize the skills items ref array
    skillItemsRef.current = skillItemsRef.current.slice(0, skillsData.length);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When section enters viewport
          if (entry.isIntersecting) {
            // Animate role details
            if (roleDetailsRef.current) {
              roleDetailsRef.current.style.transition = 'opacity 1s cubic-bezier(0.19, 1, 0.22, 1), transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)';
              roleDetailsRef.current.style.opacity = '1';
              roleDetailsRef.current.style.transform = 'translateY(0)';
            }
            
            // Animate education with delay
            if (educationRef.current) {
              setTimeout(() => {
                if (educationRef.current) {
                  educationRef.current.style.transition = 'opacity 1s cubic-bezier(0.19, 1, 0.22, 1), transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)';
                  educationRef.current.style.opacity = '1';
                  educationRef.current.style.transform = 'translateY(0)';
                }
              }, 300);
            }
            
            // Animate skills section with delay
            if (skillsRef.current) {
              setTimeout(() => {
                if (skillsRef.current) {
                  skillsRef.current.style.transition = 'opacity 1s cubic-bezier(0.19, 1, 0.22, 1), transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)';
                  skillsRef.current.style.opacity = '1';
                  skillsRef.current.style.transform = 'translateY(0)';
                }
              }, 600);
            }
            
            // Animate skill items with staggered delay
            skillItemsRef.current.forEach((item, index) => {
              if (item) {
                setTimeout(() => {
                  if (item) {
                    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                  }
                }, 800 + index * 50);
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Start observing the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Cleanup
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col items-start gap-10 sm:gap-12 md:gap-16 lg:gap-20">
        {/* Role Details */}
        <div 
          ref={roleDetailsRef}
          className="w-full flex flex-col items-start gap-4 sm:gap-6 opacity-0 transform translate-y-10"
        >
          <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black font-['Jost']">
            📌 Role Details
          </h3>
          <ul className="list-disc pl-5 space-y-1 md:space-y-2 w-full">
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">
              Position: UI/UX Designer
            </li>
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">
              Department: UX, Design & Architecture
            </li>
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">
              Industry: IT Services & Consulting
            </li>
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">
              Employment Type: Full-Time, Permanent
            </li>
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">
              Location: Gachibowli Hyderabad
            </li>
          </ul>
        </div>

        {/* Education */}
        <div 
          ref={educationRef}
          className="w-full flex flex-col items-start gap-4 sm:gap-6 opacity-0 transform translate-y-10"
        >
          <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black font-['Jost']">
            🎓 Education
          </h3>
          <ul className="list-disc pl-5 space-y-1 md:space-y-2 w-full">
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">
              UG: Any Graduate
            </li>
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">
              PG: Any Postgraduate
            </li>
          </ul>
        </div>

        {/* Key Skills Required */}
        <div 
          ref={skillsRef}
          className="w-full flex flex-col items-start gap-4 sm:gap-6 opacity-0 transform translate-y-10"
        >
          <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black font-['Jost']">
            🛠️ Key Skills Required
          </h3>
          
          <div className="flex items-center align-content-center gap-2 sm:gap-2.5 md:gap-3 flex-wrap w-full">
            {skillsData.map((skill, index) => (
              <span 
                key={index}
                ref={el => skillItemsRef.current[index] = el}
                className="flex justify-center items-center px-2 sm:px-2.5 md:px-3 py-1 md:py-1.5 rounded-2xl border border-gray-400 text-xs md:text-sm font-normal mb-1 opacity-0 transform translate-y-4"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;