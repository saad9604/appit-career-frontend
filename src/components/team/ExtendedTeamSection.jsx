"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../styles/animations.css';
import AboveFooterSection from '@/components/home/AboveFooterSection';
import Footer from '@/components/home/Footer';

const ExtendedTeamSection = () => {
  const sectionRef = useRef(null);

  // Team member data - all 16 members
  const teamMembers = [
    {
      name: "Sri Lakshmi",
      role: "Manager",
      image: "/images/about/team/team1.png",
      linkedin: "https://www.linkedin.com/in/sri-lakshmi-189015145/"
    },
    {
      name: "MD Asif Iqbal",
      role: "Sr. Software Lead",
      image: "/images/about/team/team2.jpg",
      linkedin: "https://www.linkedin.com/in/md-asif-iqubal/overlay/about-this-profile/"
    },
    {
      name: "Hassan",
      role: "Senior Talent Acquisition Specialist",
      image: "/images/about/team/team3.png",
      linkedin: "https://www.linkedin.com/in/mohd-abdul-khader-hassan-9a90ab214/"
    },
    {
      name: "Sravya",
      role: "Sales Head",
      image: "/images/about/team/team4.png",
      linkedin: "https://www.linkedin.com/in/sravya-k-0923811a1"
    },
    {
      name: "Akhil",
      role: "Tag Specialist",
      image: "/images/about/team/team5.png",
      linkedin: "https://www.linkedin.com/in/sai-akhil-76690518b/"
    },
    {
      name: "Teja",
      role: "Account Manager-Tag",
      image: "/images/about/team/team6.png",
      linkedin: "https://www.linkedin.com/in/teja-manohar-b599712a4/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Praveen Nayak",
      role: "UI/UX Designer",
      image: "/images/about/team/team7.png",
      linkedin: "https://www.linkedin.com/in/praveen-malavath-a97410360/"
    },
    {
      name: "Raghu",
      role: "Business Development Team Lead",
      image: "/images/about/team/team9.jpg",
      linkedin: "https://www.linkedin.com/in/raghu-nandan-gadamsetty-3a8b04138/"
    },
    // 8 additional cards
    {
      name: "Swapna",
      role: "Senior Human Resources Specialist",
      image: "/images/team/swapna.png?v=2",
      linkedin: "https://www.linkedin.com/in/swapna-s-158828320/"
    },
    {
      name: "Vasavendra",
      role: "Sr. BDE",
      image: "/images/team/vasavendra.png",
      linkedin: "https://www.linkedin.com/in/vasavendra-r-5b5827154/"
    },
    {
      name: "Manasa Veena",
      role: "Recruitment Manager",
      image: "/images/team/manasa.png",
      linkedin: "https://www.linkedin.com/in/manasa-veena-chittimalla-0520a9146/"
    },
    {
      name: "Gopal Krishna",
      role: "Talent Acquisition",
      image: "/images/team/gopal.png",
      linkedin: "https://www.linkedin.com/in/gopal-krishna-thunuguntla/"
    },
    {
      name: "Sai Vamshi",
      role: "Business Development Manager",
      image: "/images/team/sai.png",
      linkedin: "https://www.linkedin.com/in/sai-vamshi-49a406170/"
    },
    {
      name: "Chandrakanth",
      role: "Tag Specialist",
      image: "/images/team/chandrakh.png",
      linkedin: "https://www.linkedin.com/in/nama-chandrakanth-356bb71a0/"
    },
    {
      name: "Anil Kumar",
      role: "Sr Talent Acquisition Specialist",
      image: "/images/team/anil.png",
      linkedin: "https://www.linkedin.com/in/anil-ozil-0307ab215"
    },
    {
      name: "Saikumar Raj",
      role: "Sr. Analyst",
      image: "/images/team/kumar.png",
      linkedin: "https://www.linkedin.com/in/saikiran-raj/"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is in view
            entry.target.style.opacity = '1';
            
            // Animate all team members at once
            const teamMembers = entry.target.querySelectorAll('.team-card');
            teamMembers.forEach((member, index) => {
              setTimeout(() => {
                member.style.opacity = '1';
                member.style.transform = 'translateY(0)';
              }, index * 100); // Stagger each card animation by 100ms
            });
          } else {
            // Element is out of view
            entry.target.style.opacity = '0';
            
            // Reset animation for team members
            const teamMembers = entry.target.querySelectorAll('.team-card');
            teamMembers.forEach((member) => {
              member.style.opacity = '0';
              member.style.transform = 'translateY(20px)';
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="flex justify-center items-center w-full py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 font-jost bg-white"
      style={{ 
        transition: 'opacity 0.7s ease', 
        opacity: 0
      }}
    >
      <div className="flex flex-col items-center w-full max-w-7xl gap-14 sm:gap-16 md:gap-20 lg:gap-24 px-2 xs:px-4 sm:px-6 md:px-8 lg:px-4">
        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-[45px] lg:text-[50px] font-semibold leading-[120%] pt-8 pb-2">
          Meet Our <span className="text-[#EC1C26]">Team</span>
        </h2>
        
        {/* Team cards grid */}
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10 md:gap-8 md:gap-y-12 w-full">
          {teamMembers.map((member, index) => {
            // Custom styling for specific images
            let customImageStyle = { objectPosition: 'center center' };
            let imageContainerStyle = {};
            
            // Hassan is at index 2 (third item)
            if (index === 2) {
              // Reset position to default as we're using container positioning instead
              customImageStyle = { objectPosition: 'center center' };
            }
            // Vasavendra is at index 9 (tenth item)
            else if (index === 9) {
              customImageStyle = { objectPosition: '30% center' };
            }
            // Sravya is at index 3
            else if (index === 3) {
              customImageStyle = { objectPosition: 'center 5%' };
            }
            // Akhil is at index 4
            else if (index === 4) {
              customImageStyle = { objectPosition: 'center 15%' };
            }
            // Raghu is at index 7
            else if (index === 7) {
              customImageStyle = { objectPosition: '60% 10%' };
            }
            
            return (
            <div 
              key={index}
              className="team-card relative flex flex-col items-center w-full max-w-[292px] h-[350px] sm:h-[370px] md:h-[390px] mx-auto overflow-hidden rounded-[16px] group cursor-pointer shadow-sm"
              style={{ 
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              {/* Image */}
              <div className="relative w-full h-full overflow-hidden rounded-[16px]">
                {/* Background image container with zoom effect */}
                <div className="absolute inset-0 w-full h-full transition-all duration-500 ease-out group-hover:scale-110" style={imageContainerStyle}>
                  {/* Handle special cases for specific team members */}
                  {index === 8 ? (
                    /* Special handling for Swapna to force refresh */
                    <Image 
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 292px"
                      className="object-cover scale-125"
                      style={{ objectPosition: 'center 20%' }}
                      priority={true}
                      unoptimized={true}
                    />
                  ) : index === 2 ? (
                    /* For Hassan, use a custom container that shifts the image */
                    <div className="absolute inset-0 -top-2 h-[calc(100%+40px)]">
                      <Image 
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 292px"
                        className="object-cover"
                        style={{ objectFit: 'cover' }}
                        priority={index < 4}
                      />
                    </div>
                  ) : (
                    /* Default image handling for other team members */
                    <Image 
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 292px"
                      className="object-cover"
                      style={customImageStyle}
                      priority={index < 4}
                    />
                  )}
                </div>

                {/* Default gradient overlay - always visible */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-75% to-black/60 to-100% z-10"></div>
                
                {/* Hover gradient overlay - appears on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-20"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 55%, rgba(0, 0, 0, 0.70) 75%, rgba(0, 0, 0, 0.85) 90%)'
                    }}>
                </div>
                
                {/* Name container - always visible, but moves up on hover */}
                <div className="absolute bottom-[16px] left-0 right-0 pb-2 pt-4 px-4 transition-all duration-500 ease-in-out group-hover:-translate-y-14 z-30">
                  {/* Name */}
                  <p className="text-white text-left font-['Jost'] text-[16px] sm:text-[18px] md:text-[21px] font-semibold leading-[120%] capitalize">
                    {member.name.toLowerCase()}
                  </p>
                </div>
                
                {/* Info that appears from bottom on hover */}
                <div className="absolute bottom-[16px] left-0 right-0 py-3 px-4 translate-y-[110%] group-hover:translate-y-0 transition-all duration-500 ease-in-out z-30">
                  {/* Role and LinkedIn container */}
                  <div className="flex justify-between items-start">
                    {/* Role with underline */}
                    <p className="text-white font-['Jost'] text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[120%] underline decoration-solid pr-6 max-w-[70%] break-words">
                      {member.role}
                    </p>
                    
                    {/* LinkedIn icon */}
                    <Link 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-shrink-0 hover:opacity-80 transition-opacity duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 25" fill="none">
                        <path d="M22.25 1.06259H2.75C2.30756 1.05808 1.8814 1.22928 1.56504 1.53862C1.24867 1.84795 1.06794 2.27016 1.0625 2.71259V22.2913C1.06892 22.7331 1.25009 23.1544 1.56634 23.4629C1.8826 23.7714 2.3082 23.9421 2.75 23.9376H22.25C22.6925 23.9411 23.1183 23.7693 23.4345 23.4598C23.7507 23.1503 23.9316 22.7282 23.9375 22.2857V2.70696C23.9296 2.26583 23.7479 1.84564 23.4319 1.53772C23.1159 1.22981 22.6912 1.05906 22.25 1.06259Z" fill="#0076B2"/>
                        <path d="M4.44871 9.63672H7.84434V20.5623H4.44871V9.63672ZM6.14746 4.19922C6.53692 4.19922 6.91764 4.31473 7.24144 4.53114C7.56523 4.74756 7.81757 5.05514 7.96653 5.41499C8.11548 5.77485 8.15436 6.17079 8.07824 6.55274C8.00213 6.93469 7.81444 7.28549 7.53891 7.56075C7.26339 7.83601 6.91242 8.02337 6.5304 8.09912C6.14837 8.17487 5.75246 8.13561 5.39275 7.98632C5.03304 7.83702 4.7257 7.58439 4.50959 7.26038C4.29349 6.93638 4.17834 6.55556 4.17871 6.16609C4.17921 5.64427 4.38685 5.144 4.75601 4.77519C5.12517 4.40638 5.62564 4.19922 6.14746 4.19922ZM9.97434 9.63672H13.2293V11.1367H13.2743C13.7281 10.278 14.8343 9.37234 16.4862 9.37234C19.925 9.36484 20.5625 11.628 20.5625 14.5623V20.5623H17.1668V15.2467C17.1668 13.9811 17.1443 12.3517 15.4025 12.3517C13.6606 12.3517 13.3643 13.7317 13.3643 15.1642V20.5623H9.97434V9.63672Z" fill="white"/>
                      </svg>
                    </Link>
                  </div>
                </div>
                
                {/* Full card link */}
                <Link 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute inset-0 z-5"
                  aria-label={`Connect with ${member.name} on LinkedIn`}
                />
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExtendedTeamSection;