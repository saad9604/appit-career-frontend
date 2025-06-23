"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// This adds a fallback mechanism for local development
const getImageUrl = (path) => {
  try {
    return path;
  } catch (error) {
    console.error(`Error loading image: ${path}`, error);
    return 'https://via.placeholder.com/185?text=Team+Member';
  }
};

const TeamSection = () => {
  const sectionRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);

  // Function to handle responsive scaling for Teja's image
  const getTejaImageStyle = () => {
    return {}; // Remove special handling for Teja's image to maintain consistency
  };

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Add resize listener
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to get the optimal object position for each team member image
  const getImageStyle = (memberId) => {
    // Special positioning for Hassan's image (moved much more left and down)
    if (memberId === 3) {
      return { 
        objectPosition: '30% 70%', // Much more left (30%) and down (70%)
        objectFit: 'cover',
        transform: 'translate(-10px, 10px)' // Additional transform for more shift
      };
    }
    // Special positioning for Shravya's image to center the face
    if (memberId === 4) {
      return { 
        objectPosition: 'center 5%', // Positioned even higher
        objectFit: 'cover'
      };
    }
    // Special positioning for Akhil's image to show hair
    if (memberId === 5) {
      return { 
        objectPosition: 'center 15%', // Move image down to show more hair
        objectFit: 'cover'
      };
    }
    // Special positioning for Raghu's image - more lower and very slightly to the right
    if (memberId === 8) {
      return { 
        objectPosition: '60% 10%', // Positioned lower with more shift to the right
        objectFit: 'cover'
      };
    }
    // Return empty object for consistent positioning
    return { objectPosition: 'center center' };
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is in view
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate team members with staggered delay
            const teamMembers = entry.target.querySelectorAll('.team-member');
            teamMembers.forEach((member, index) => {
              setTimeout(() => {
                member.style.opacity = '1';
                member.style.transform = 'translateY(0)';
              }, 150 * (index + 1));
            });
          } else {
            // Element is out of view
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            // Reset animation for team members
            const teamMembers = entry.target.querySelectorAll('.team-member');
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

  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: "Sri Lakshmi",
      role: "Manager",
      image: "/images/about/team/team1.png",
      linkedin: "https://www.linkedin.com/in/sri-lakshmi-189015145/"
    },
    {
      id: 2,
      name: "MD Asif Iqbal",
      role: "SR.Software Lead",
      image: "/images/about/team/team2.jpg",
      linkedin: "https://www.linkedin.com/in/md-asif-iqubal/overlay/about-this-profile/"
    },
    {
      id: 3,
      name: "Hassan",
      role: "Senior Talent Acquisition Specialist",
      image: "/images/about/team/team3.png",
      linkedin: "https://www.linkedin.com/in/mohd-abdul-khader-hassan-9a90ab214/"
    },
    {
      id: 4,
      name: "Shravya",
      role: "Sales Head",
      image: "/images/about/team/team4.png",
      linkedin: "https://www.linkedin.com/in/sravya-k-0923811a1"
    },
    {
      id: 5,
      name: "Akhil",
      role: "Tag Specialist",
      image: "/images/about/team/team5.png",
      linkedin: "https://www.linkedin.com/in/sai-akhil-76690518b/"
    },
    {
      id: 6,
      name: "Teja",
      role: "Account Manager-Tag",
      image: "/images/about/team/team6.png",
      linkedin: "https://www.linkedin.com/in/teja-manohar-b599712a4/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      id: 7,
      name: "Praveen Nayak",
      role: "UI/UX Designer",
      image: "/images/about/team/team7.png",
      linkedin: "https://www.linkedin.com/in/praveen-malavath-a97410360/"
    },
    {
      id: 8,
      name: "Raghu",
      role: "Business Development Team Lead",
      image: "/images/about/team/team9.jpg",
      linkedin: "https://www.linkedin.com/in/raghu-nandan-gadamsetty-3a8b04138/"
    }
  ];

  const SocialIcons = ({ linkedin }) => (
    <div className="flex justify-center items-center mt-1">
      {/* LinkedIn */}
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" className="w-6 h-6">
          <path d="M22.25 1.06259H2.75C2.30756 1.05808 1.8814 1.22928 1.56504 1.53862C1.24867 1.84795 1.06794 2.27016 1.0625 2.71259V22.2913C1.06892 22.7331 1.25009 23.1544 1.56634 23.4629C1.8826 23.7714 2.3082 23.9421 2.75 23.9376H22.25C22.6925 23.9411 23.1183 23.7693 23.4345 23.4598C23.7507 23.1503 23.9316 22.7282 23.9375 22.2857V2.70696C23.9296 2.26583 23.7479 1.84564 23.4319 1.53772C23.1159 1.22981 22.6912 1.05906 22.25 1.06259Z" fill="#0076B2"/>
          <path d="M4.44871 9.63672H7.84434V20.5623H4.44871V9.63672ZM6.14746 4.19922C6.53692 4.19922 6.91764 4.31473 7.24144 4.53114C7.56523 4.74756 7.81757 5.05514 7.96653 5.41499C8.11548 5.77485 8.15436 6.17079 8.07824 6.55274C8.00213 6.93469 7.81444 7.28549 7.53891 7.56075C7.26339 7.83601 6.91242 8.02337 6.5304 8.09912C6.14837 8.17487 5.75246 8.13561 5.39275 7.98632C5.03304 7.83702 4.7257 7.58439 4.50959 7.26038C4.29349 6.93638 4.17834 6.55556 4.17871 6.16609C4.17921 5.64427 4.38685 5.144 4.75601 4.77519C5.12517 4.40638 5.62564 4.19922 6.14746 4.19922ZM9.97434 9.63672H13.2293V11.1367H13.2743C13.7281 10.278 14.8343 9.37234 16.4862 9.37234C19.925 9.36484 20.5625 11.628 20.5625 14.5623V20.5623H17.1668V15.2467C17.1668 13.9811 17.1443 12.3517 15.4025 12.3517C13.6606 12.3517 13.3643 13.7317 13.3643 15.1642V20.5623H9.97434V9.63672Z" fill="white"/>
        </svg>
      </a>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="flex justify-center items-center w-full py-12 px-4 sm:px-6 md:px-8 lg:px-32 xl:px-36 font-jost bg-white"
      style={{ 
        transition: 'opacity 0.7s ease, transform 0.7s ease', 
        opacity: 0, 
        transform: 'translateY(20px)'
      }}
    >
      <div className="flex flex-col items-center w-full max-w-7xl gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16">
        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-[45px] lg:text-[50px] font-semibold leading-[120%]">
          Meet the <span className="text-[#EC1C26]">Team</span> Driving Innovation
        </h2>
        
        {/* Team members grid */}
        <div className="flex flex-wrap justify-center items-start gap-6 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-20 w-full px-2 sm:px-4 md:px-6">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id}
              className="team-member flex flex-col items-center w-[140px] xs:w-[160px] sm:w-[170px] md:w-[180px] lg:w-[185px] gap-3 sm:gap-4"
              style={{ 
                transition: 'opacity 0.5s ease, transform 0.5s ease', 
                opacity: 0, 
                transform: 'translateY(20px)',
                transitionDelay: `${index * 0.1}s`
              }}
            >
              {/* Member image */}
              <div className="relative w-full aspect-square overflow-hidden">
                <div className="absolute inset-0 w-full h-full rounded-full border border-black/20 shadow-md"></div>
                <div className="relative w-full h-full rounded-full border border-black/20 overflow-hidden shadow-md">
                  {/* Special case for Hassan */}
                  {member.id === 3 ? (
                    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                      <Image 
                        src={getImageUrl(member.image)} 
                        alt={member.name}
                        width={185}
                        height={185}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: '10% 5%', transform: 'scale(1.05)' }}
                        priority={true}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/185?text=Team+Member';
                        }}
                      />
                    </div>
                  ) : (
                    /* Add consistent handling for all other images */
                    <Image 
                      src={getImageUrl(member.image)} 
                      alt={member.name}
                      width={185}
                      height={185}
                      className={`w-full h-full object-cover ${member.id === 4 ? 'scale-[1.1]' : ''}`}
                      style={getImageStyle(member.id)}
                      priority={index < 4}
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/185?text=Team+Member';
                      }}
                    />
                  )}
                </div>
              </div>
              
              {/* Member name */}
              <h3 className="text-black text-center text-lg sm:text-xl md:text-2xl lg:text-[27px] font-semibold leading-[120%] w-full">
                {member.name}
              </h3>
              
              {/* Member role */}
              <p className="text-black text-center text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-[120%] w-full -mt-1">
                {member.role}
              </p>
              
              {/* Social media icons */}
              <SocialIcons linkedin={member.linkedin} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;