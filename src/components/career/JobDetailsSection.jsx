"use client";

import React, { useRef, useEffect } from 'react';

const JobDetailsSection = () => {
  // Refs for animations
  const sectionRef = useRef(null);
  const detailsRef = useRef(null);
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

  // Animation effect on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initialize skill items refs
    skillItemsRef.current = skillItemsRef.current.slice(0, skillsData.length);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When the section comes into view, animate elements
            if (detailsRef.current) {
              setTimeout(() => {
                detailsRef.current.style.opacity = '1';
                detailsRef.current.style.transform = 'translateY(0)';
              }, 100);
            }
            
            if (educationRef.current) {
              setTimeout(() => {
                educationRef.current.style.opacity = '1';
                educationRef.current.style.transform = 'translateY(0)';
              }, 300);
            }
            
            if (skillsRef.current) {
              setTimeout(() => {
                skillsRef.current.style.opacity = '1';
                skillsRef.current.style.transform = 'translateY(0)';
              }, 500);
            }
            
            // Animate skill tags with staggered delay
            skillItemsRef.current.forEach((item, index) => {
              if (item) {
                setTimeout(() => {
                  item.style.opacity = '1';
                  item.style.transform = 'translateY(0)';
                }, 700 + index * 50);
              }
            });
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [skillsData.length]);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Role Details */}
        <div 
          ref={detailsRef}
          className="mb-8 md:mb-10 opacity-0 transform translate-y-12 transition-all duration-700 ease-out"
        >
          <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black font-['Jost'] mb-4 md:mb-6">
            📌 Role Details
          </h3>
          <ul className="list-disc pl-5 space-y-1 md:space-y-2">
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">Position: UI/UX Designer</li>
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">Department: UX, Design & Architecture</li>
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">Industry: IT Services & Consulting</li>
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">Employment Type: Full-Time, Permanent</li>
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">Location: Gachibowli Hyderabad</li>
          </ul>
        </div>

        {/* Education */}
        <div 
          ref={educationRef}
          className="mb-8 md:mb-10 opacity-0 transform translate-y-12 transition-all duration-700 ease-out"
        >
          <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black font-['Jost'] mb-4 md:mb-6">
            🎓 Education
          </h3>
          <ul className="list-disc pl-5 space-y-1 md:space-y-2">
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">UG: Any Graduate</li>
            <li className="text-sm sm:text-base font-normal leading-[200%] text-black font-['Jost']">PG: Any Postgraduate</li>
          </ul>
        </div>

        {/* Key Skills Required */}
        <div 
          ref={skillsRef}
          className="opacity-0 transform translate-y-12 transition-all duration-700 ease-out"
        >
          <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black font-['Jost'] mb-4 md:mb-6">
            🛠️ Key Skills Required
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
            {skillsData.map((skill, index) => (
              <span
                key={index}
                ref={el => skillItemsRef.current[index] = el}
                className="inline-flex px-2 sm:px-2.5 md:px-3 py-1 md:py-1.5 rounded-2xl border border-gray-400 text-xs md:text-sm font-normal opacity-0 transform translate-y-8 transition-all duration-500 ease-out"
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

export default JobDetailsSection;