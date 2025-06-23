"use client";

import React, { useState, useEffect, useRef } from "react";

const contentSections = [
  {
    heading: "Oracle Consultation",
    paragraph:
      "APPIT Software - Oracle consultation services can helps the IT business and cloud services with faster adoption and return.",
    video: "/videos/consultation.mp4",
  },
  {
    heading: "Offshore Development",
    paragraph:
      "Appit Software - offers reliable and cost-effective offshore development services that help you accelerate project delivery, reduce overheads",
    video: "/videos/off_video.mp4",
  },
  {
    heading: "Cyber Security Solutions",
    paragraph:
      "APPIT Software offers cutting-edge cybersecurity solutions designed to protect your business from evolving digital threats.",
    video: "/videos/cyber_video.mp4",
  },
  {
    heading: "AI Solutions & Integration",
    paragraph:
      "APPIT Software, we empower businesses with cutting-edge AI-driven IT solutions, cloud services, and Oracle expertise. Our mission is to streamline your operations..",
    video: "/videos/ai_video.mp4",
  },
  {
    heading: "ECommerce Services",
    paragraph:
      "We help businesses launch, scale, and optimize their online stores with custom-built e-commerce platforms tailored to deliver.",
    video: "/videos/ecommerce_video.mp4",
  },
  {
    heading: "Mobile App Development",
    paragraph:
      "APPIT Software Solutions addresses challenging prospects and reach your niche market with the use of our cloud service.",
    video: "/videos/mobile_video.mp4",
  },
];

// Easing function for smooth progress
const easeOutQuad = (t) => t * (2 - t);

export default function ServicesCarousel() {
  // Core state
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Animation state
  const [progress, setProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down"); // "up" or "down"
  
  // Interaction tracking
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);
  const lastInteractionTime = useRef(0);

  // Handler for when user enters the section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isTransitioning) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      // Lock scroll when section comes into view
      if (isInView && !isLocked) {
        setIsLocked(true);
        document.body.style.overflow = "hidden";
        setCurrentIndex(0); // Always start at the first video
        
        // Center the section
        window.scrollTo({
          top: window.scrollY + rect.top,
          behavior: "auto"
        });
      }
      
      // Determine if we should unlock
      if (isLocked) {
        const isScrollingDown = window.scrollY > lastScrollY.current;
        
        // Only unlock at boundaries (first or last slide)
        if ((currentIndex === 0 && !isScrollingDown) || 
            (currentIndex === contentSections.length - 1 && isScrollingDown)) {
          
          if (!isTransitioning) {
            document.body.style.overflow = "";
            setIsLocked(false);
          }
        }
      }
      
      // Remember scroll position for direction detection
      lastScrollY.current = window.scrollY;
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = ""; // Ensure we don't leave body locked
    };
  }, [isLocked, currentIndex, isTransitioning]);

  // Main scroll handling logic
  useEffect(() => {
    if (!isLocked) return;
    
    // Main wheel event handler for mouse/trackpad
    const handleWheel = (e) => {
      e.preventDefault();
      
      // Ignore rapid events (debounce)
      const now = Date.now();
      if (now - lastInteractionTime.current < 50) return;
      lastInteractionTime.current = now;
      
      // Determine scroll direction
      const scrollingDown = e.deltaY > 0;
      setScrollDirection(scrollingDown ? "down" : "up");
      
      // Handle in-progress transition reversal
      if (progress > 0 && progress < 1) {
        // If we're in mid-transition, adjust the progress based on direction
        if (scrollingDown) {
          setProgress(Math.min(progress + 0.1, 1));
        } else {
          setProgress(Math.max(progress - 0.1, 0));
        }
        return;
      }
      
      // Transition to next/previous slide
      if (scrollingDown) {
        if (currentIndex < contentSections.length - 1 && !isTransitioning) {
          // Start transition to next slide
          setIsTransitioning(true);
          setProgress(0.1); // Start progress
          
          // Use animation frames to smoothly increase progress
          const animate = () => {
            setProgress(prev => {
              const newProgress = prev + 0.05;
              if (newProgress >= 1) {
                // Transition complete
                setCurrentIndex(prevIndex => prevIndex + 1);
                setIsTransitioning(false);
                return 0;
              }
              // Continue animation
              requestAnimationFrame(animate);
              return newProgress;
            });
          };
          
          requestAnimationFrame(animate);
        }
      } else {
        // Scrolling up
        if (currentIndex > 0 && !isTransitioning) {
          // Start transition to previous slide
          setIsTransitioning(true);
          setProgress(0.1); // Start progress
          
          // Use animation frames to smoothly increase progress
          const animate = () => {
            setProgress(prev => {
              const newProgress = prev + 0.05;
              if (newProgress >= 1) {
                // Transition complete
                setCurrentIndex(prevIndex => prevIndex - 1);
                setIsTransitioning(false);
                return 0;
              }
              // Continue animation
              requestAnimationFrame(animate);
              return newProgress;
            });
          };
          
          requestAnimationFrame(animate);
        }
      }
      
      // Unlock at boundaries if continuing to scroll
      if ((currentIndex === 0 && !scrollingDown) || 
          (currentIndex === contentSections.length - 1 && scrollingDown)) {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        
        scrollTimeout.current = setTimeout(() => {
          document.body.style.overflow = "";
          setIsLocked(false);
          
          // Assist with the scroll to ensure we leave the section
          if (scrollingDown) {
            window.scrollBy({
              top: 100,
              behavior: 'smooth'
            });
          } else {
            window.scrollBy({
              top: -100,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };
    
    // Event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    
    // Touch support for mobile
    let touchStartY = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      if (!isLocked) return;
      e.preventDefault();
      
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      
      // Convert touch movement to wheel event equivalent
      const wheelEvent = new WheelEvent('wheel', {
        deltaY: deltaY * 3, // Amplify touch movement
        bubbles: true
      });
      
      handleWheel(wheelEvent);
      touchStartY = touchY;
    };
    
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    
    // Keyboard support
    const handleKeyDown = (e) => {
      if (!isLocked) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const wheelEvent = new WheelEvent('wheel', {
          deltaY: 100,
          bubbles: true
        });
        handleWheel(wheelEvent);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const wheelEvent = new WheelEvent('wheel', {
          deltaY: -100,
          bubbles: true
        });
        handleWheel(wheelEvent);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isLocked, currentIndex, progress, isTransitioning]);

  // Calculate animation values
  const easedProgress = easeOutQuad(progress);
  
  // Calculate all needed indexes safely
  const safeIndex = Math.min(Math.max(0, currentIndex), contentSections.length - 1);
  const nextIndex = Math.min(safeIndex + 1, contentSections.length - 1);
  const prevIndex = Math.max(safeIndex - 1, 0);
  
  // Determine which videos to show based on progress and direction
  const showNextVideo = scrollDirection === "down" && progress > 0;
  const showPrevVideo = scrollDirection === "up" && progress > 0;
  
  // Animation positioning
  const nextVideoTop = scrollDirection === "down" 
    ? `${100 - easedProgress * 100}%` // Slide up from bottom
    : "100%"; // Hidden
    
  const prevVideoTop = scrollDirection === "up"
    ? `${-100 + easedProgress * 100}%` // Slide down from top
    : "-100%"; // Hidden
    
  // Text animation
  const fadeThreshold = 0.3;
  let textOpacity = 1;
  let translateY = "0px";
  
  if (progress > fadeThreshold) {
    const fadeProgress = (progress - fadeThreshold) / (1 - fadeThreshold);
    textOpacity = 1 - fadeProgress;
    
    translateY = scrollDirection === "down"
      ? `${fadeProgress * 20}px` // Move down
      : `-${fadeProgress * 20}px`; // Move up
  }

  return (
    <section
      ref={sectionRef}
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        padding: "40px 0",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
        background: "#252525",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        overflow: "hidden",
      }}
    >
      {/* Heading and Subheading Container */}
      <div
        style={{
          display: "flex",
          width: "1152px",
          maxWidth: "90%",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <h2
          style={{
            color: "#FFF",
            textAlign: "center",
            fontFamily: "Jost",
            fontSize: "50px",
            fontWeight: 600,
            lineHeight: "120%",
          }}
        >
          Our Core{" "}
          <span
            style={{
              color: "#EC1C26",
              fontFamily: "Jost",
              fontSize: "50px",
              fontWeight: 600,
              lineHeight: "120%",
            }}
          >
            Services
          </span>
        </h2>

        <p
          style={{
            alignSelf: "stretch",
            color: "#FFF",
            textAlign: "center",
            fontFamily: "Jost",
            fontSize: "21px",
            fontWeight: 600,
            lineHeight: "120%",
          }}
        >
          We specialize in delivering end-to-end digital solutions that blend
          strategy, design, and technology. Our focus is on creating impactful
          experiences that drive results and support your business growth
        </p>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1440px",
          justifyContent: "center",
          alignItems: "center",
          gap: "28px",
          padding: "0 20px",
          flexWrap: "wrap",
          position: "relative",
          margin: "0 auto",
        }}
      >
        {/* Text container */}
        <div
          style={{
            display: "flex",
            width: "349px",
            height: "518px",
            padding: "30px 10px",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            flexShrink: 0,
            borderRadius: "24px",
            background: "#F0F7F8",
            position: "relative",
            overflow: "hidden",
            zIndex: 5,
          }}
        >
          {/* Content container with opacity and translation effect */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: textOpacity,
              transform: `translateY(${translateY})`,
              transition: "opacity 0.3s ease, transform 0.3s ease",
              padding: "30px 10px",
            }}
          >
            <div
              style={{
                width: "100%",
                borderBottom: "1px solid #888",
                marginBottom: "20px",
                paddingBottom: "10px",
              }}
            >
              <h3
              style={{
              width: "309px",
              color: "#055087",
              textAlign: "center",
              fontFamily: "Jost",
              fontSize: "40px",
              fontWeight: 600,
              lineHeight: "120%",
              }}
              >
              {contentSections[safeIndex]?.heading || 'Service'}
              </h3>
            </div>
            <p
              style={{
                width: "273px",
                color: "#252525",
                textAlign: "center",
                fontFamily: "Jost",
                fontSize: "21px",
                fontWeight: 600,
                lineHeight: "120%",
                margin: "40px auto 0",
              }}
            >
              {contentSections[safeIndex]?.paragraph || 'Service description goes here.'}
            </p>

            {/* Button Container */}
            <div
              style={{
                display: "flex",
                height: "48px",
                padding: "0px 16px",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                flexShrink: 0,
                alignSelf: "stretch",
                position: "absolute",
                bottom: "40px",
                width: "calc(100% - 32px)",
              }}
            >
              <button
                style={{
                  display: "flex",
                  padding: "0px 10px 0px 20px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  borderRadius: "24px",
                  backgroundColor: "transparent",
                  border: "1px solid #000",
                  cursor:
                    currentIndex === contentSections.length - 1
                      ? "not-allowed"
                      : "pointer",
                  height: "100%",
                  transition: "all 0.3s ease",
                  opacity:
                    currentIndex === contentSections.length - 1 ? 0.6 : 1,
                }}
                disabled={currentIndex === contentSections.length - 1}
                onClick={() => {
                  if (
                    currentIndex < contentSections.length - 1 &&
                    !isTransitioning
                  ) {
                    setIsTransitioning(true);
                    setScrollDirection("down");
                    setProgress(0.1);
                    
                    // Animate transition
                    const animate = () => {
                      setProgress(prev => {
                        const newProgress = prev + 0.05;
                        if (newProgress >= 1) {
                          // Complete transition
                          setCurrentIndex(prev => prev + 1);
                          setIsTransitioning(false);
                          return 0;
                        }
                        requestAnimationFrame(animate);
                        return newProgress;
                      });
                    };
                    
                    requestAnimationFrame(animate);
                  }
                }}
                onMouseEnter={(e) => {
                  if (currentIndex < contentSections.length - 1) {
                    e.currentTarget.style.backgroundColor = "#005592";
                    e.currentTarget.style.borderColor = "#005592";
                    const textElement = e.currentTarget.querySelector("span");
                    if (textElement) textElement.style.color = "#FFFFFF";
                    const svgRect = e.currentTarget.querySelector("rect");
                    const svgPath = e.currentTarget.querySelector("path");
                    if (svgRect) svgRect.setAttribute("stroke", "#FFFFFF");
                    if (svgPath) svgPath.setAttribute("fill", "#FFFFFF");
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#000";
                  const textElement = e.currentTarget.querySelector("span");
                  if (textElement) textElement.style.color = "#454545";
                  const svgRect = e.currentTarget.querySelector("rect");
                  const svgPath = e.currentTarget.querySelector("path");
                  if (svgRect) svgRect.setAttribute("stroke", "#252525");
                  if (svgPath) svgPath.setAttribute("fill", "#252525");
                }}
              >
                <span
                  style={{
                    color: "#454545",
                    textAlign: "center",
                    fontFamily: "Jost",
                    fontSize: "21px",
                    fontWeight: 400,
                    lineHeight: "120%",
                  }}
                >
                  Read More
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  style={{ minWidth: "32px", height: "32px" }}
                >
                  <rect
                    x="31.75"
                    y="31.25"
                    width="30.5"
                    height="30.5"
                    rx="15.25"
                    transform="rotate(180 31.75 31.25)"
                    stroke="#252525"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6.5 15.9992C6.5 15.6812 6.629 15.3761 6.85863 15.1513C7.08825 14.9264 7.39969 14.8 7.72444 14.8H22.0699L16.7036 10.0976C16.5827 9.99293 16.4841 9.86586 16.4135 9.72371C16.3429 9.58157 16.3017 9.42716 16.2923 9.26937C16.2828 9.11157 16.3053 8.95351 16.3585 8.80426C16.4116 8.65501 16.4944 8.51753 16.602 8.39971C16.7096 8.2819 16.8399 8.18608 16.9854 8.11777C17.131 8.04946 17.2889 8.01 17.4501 8.00167C17.6112 7.99333 17.7725 8.01629 17.9246 8.06921C18.0766 8.12213 18.2165 8.20398 18.3362 8.31004L26.091 15.1054C26.2196 15.2179 26.3226 15.3557 26.3931 15.5099C26.4636 15.6641 26.5 15.8311 26.5 16C26.5 16.1689 26.4636 16.3359 26.3931 16.4901C26.3226 16.6443 26.2196 16.7821 26.091 16.8946L18.3362 23.69C18.2165 23.796 18.0766 23.8779 17.9246 23.9308C17.7725 23.9837 17.6112 24.0067 16.9501 23.9983C16.7889 23.99 16.631 23.9505 16.4854 23.8822C16.3399 23.8139 16.2096 23.7181 16.102 23.6003C15.9944 23.4825 15.9116 23.345 15.8585 23.1957C15.8053 23.0465 15.7828 22.8884 15.7923 22.7306C15.8017 22.5728 15.8429 22.4184 15.9135 22.2763C15.9841 22.1341 16.0827 22.0071 16.7036 21.9024L22.0699 17.1984H7.72444C7.39969 17.1984 7.08825 17.072 6.85863 16.8472C6.629 16.6223 6.5 16.3172 6.5 15.9992Z"
                    fill="#252525"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Video container */}
        <div
          style={{
            width: "823px",
            height: "518px",
            maxWidth: "100%",
            flexShrink: 0,
            borderRadius: "24px",
            overflow: "hidden",
            position: "relative",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {/* Current video */}
          <div
            style={{
              position: "absolute",
              top: "0%",
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              transition: "none",
            }}
          >
            <video
              key={`video-current-${safeIndex}`}
              src={contentSections[safeIndex]?.video || '/videos/consultation.mp4'}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "24px",
              }}
            />
          </div>

          {/* Next video - slides up from bottom */}
          {showNextVideo && nextIndex !== safeIndex && (
            <div
              style={{
                position: "absolute",
                top: nextVideoTop,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                transition: "none",
              }}
            >
              <video
                key={`video-next-${nextIndex}`}
                src={contentSections[nextIndex]?.video || '/videos/consultation.mp4'}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "24px",
                }}
              />
            </div>
          )}

          {/* Previous video - slides down from top */}
          {showPrevVideo && prevIndex !== currentIndex && (
            <div
              style={{
                position: "absolute",
                top: prevVideoTop,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                transition: "none",
              }}
            >
              <video
                key={`video-prev-${prevIndex}`}
                src={contentSections[prevIndex]?.video || '/videos/consultation.mp4'}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "24px",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Progress indicator and navigation buttons */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          zIndex: 10,
        }}
      >
        {/* Previous button */}
        <button
          onClick={() => {
            if (currentIndex > 0 && !isTransitioning) {
              // Navigate to previous slide
              setIsTransitioning(true);
              setScrollDirection("up");
              setProgress(0.1);
              
              // Animate transition
              const animate = () => {
                setProgress(prev => {
                  const newProgress = prev + 0.05;
                  if (newProgress >= 1) {
                    // Complete transition
                    setCurrentIndex(prev => prev - 1);
                    setIsTransitioning(false);
                    return 0;
                  }
                  requestAnimationFrame(animate);
                  return newProgress;
                });
              };
              
              requestAnimationFrame(animate);
            } else if (currentIndex === 0) {
              // Exit upward at first slide
              document.body.style.overflow = "";
              setIsLocked(false);
              
              // Help scroll upward
              setTimeout(() => {
                window.scrollBy({
                  top: -100,
                  behavior: 'smooth'
                });
              }, 50);
            }
          }}
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: currentIndex > 0 ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
            border: "none",
            cursor: "pointer",
            opacity: currentIndex > 0 ? 1 : 0.7,
            transition: "background-color 0.3s ease, opacity 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = currentIndex > 0 ? 
              "rgba(255, 255, 255, 0.2)" : 
              "rgba(255, 255, 255, 0.1)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dots navigation */}
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          {contentSections.map((_, index) => (
            <div
              key={index}
              onClick={() => {
                if (index !== currentIndex && !isTransitioning) {
                  // Determine direction based on target index
                  const goingForward = index > currentIndex;
                  setScrollDirection(goingForward ? "down" : "up");
                  
                  // Start transition animation
                  setIsTransitioning(true);
                  
                  // Skip animation for distant slides
                  if (Math.abs(index - currentIndex) > 1) {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  } else {
                    // Animate for adjacent slides
                    setProgress(0.1);
                    
                    const animate = () => {
                      setProgress(prev => {
                        const newProgress = prev + 0.05;
                        if (newProgress >= 1) {
                          setCurrentIndex(index);
                          setIsTransitioning(false);
                          return 0;
                        }
                        requestAnimationFrame(animate);
                        return newProgress;
                      });
                    };
                    
                    requestAnimationFrame(animate);
                  }
                }
              }}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background:
                  currentIndex === index
                    ? "#EC1C26"
                    : "rgba(255, 255, 255, 0.5)",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => {
            if (currentIndex < contentSections.length - 1 && !isTransitioning) {
              // Navigate to next slide
              setIsTransitioning(true);
              setScrollDirection("down");
              setProgress(0.1);
              
              // Animate transition
              const animate = () => {
                setProgress(prev => {
                  const newProgress = prev + 0.05;
                  if (newProgress >= 1) {
                    // Complete transition
                    setCurrentIndex(prev => prev + 1);
                    setIsTransitioning(false);
                    return 0;
                  }
                  requestAnimationFrame(animate);
                  return newProgress;
                });
              };
              
              requestAnimationFrame(animate);
            } else if (currentIndex === contentSections.length - 1) {
              // Exit downward at last slide
              document.body.style.overflow = "";
              setIsLocked(false);
              
              // Help scroll downward
              setTimeout(() => {
                window.scrollBy({
                  top: 100,
                  behavior: 'smooth'
                });
              }, 50);
            }
          }}
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: currentIndex < contentSections.length - 1 ? 
              "rgba(255, 255, 255, 0.2)" : 
              "rgba(255, 255, 255, 0.3)", // Brighter at last slide
            border: "none",
            cursor: "pointer",
            opacity: 1,
            transition: "background-color 0.3s ease, opacity 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = currentIndex < contentSections.length - 1 ? 
              "rgba(255, 255, 255, 0.2)" : 
              "rgba(255, 255, 255, 0.3)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Navigation instructions */}
      <div
        style={{
          position: "absolute",
          bottom: isLocked ? "60px" : "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255, 255, 255, 0.7)",
          fontFamily: "Jost",
          fontSize: "14px",
          textAlign: "center",
          transition: "bottom 0.5s ease",
          zIndex: 10,
          background: "rgba(0,0,0,0.3)",
          padding: "8px 16px",
          borderRadius: "20px",
          maxWidth: "90%",
          width: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {currentIndex === 0 ? 
          "Scroll down to explore our services" : 
          currentIndex === contentSections.length - 1 ? 
            "Scroll down to continue to the next section" : 
            "Scroll to navigate through our services"}
      </div>
    </section>
  );
}
