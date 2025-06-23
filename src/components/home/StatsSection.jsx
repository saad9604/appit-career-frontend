"use client";

import { useState, useEffect, useRef } from 'react';
import './StatsSection.css';

// Custom hook for intersection observer
function useOnScreen(ref, threshold = 0.1) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px', // Trigger a bit earlier
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold]);

  return isIntersecting;
}

// Counter component for animated numbers
function AnimatedCounter({ end, duration = 3500, suffix = "", prefix = "", triggerAnimation }) {
  const [count, setCount] = useState(0);

  // Reset and restart animation when triggerAnimation changes
  useEffect(() => {
    if (triggerAnimation) {
      // Reset counter
      setCount(0);
      
      let startTime = null;
      let animationFrameId = null;
      
      // Smoother easing function
      const easeOutQuad = t => t * (2 - t);
      
      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const currentCount = Math.floor(easedProgress * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };
      
      // Add a small delay to ensure the component is mounted
      const timer = setTimeout(() => {
        animationFrameId = requestAnimationFrame(updateCount);
      }, 300);
      
      return () => {
        clearTimeout(timer);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [triggerAnimation, end, duration]);

  return (
    <span className="animated-counter">{prefix}{count}{suffix}</span>
  );
}

// Common styles for reuse
const textContainerStyle = {
  color: '#FFF',
  fontFamily: 'Jost',
  fontSize: '21px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '120%',
  maxWidth: '200px'
};

const numberContainerStyle = {
  color: '#FFCE0C',
  textAlign: 'center',
  fontFamily: 'Jost',
  fontSize: '27px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '120%'
};

export default function StatsSection() {
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef, 0.15);
  const [animationKey, setAnimationKey] = useState(0);
  
  // Trigger animation when section becomes visible
  useEffect(() => {
    if (isVisible) {
      // Increment key to trigger animation restart
      setAnimationKey(prev => prev + 1);
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className={`stats-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="stats-container">
      {/* First component */}
      <div className="stats-card">
        <div className="stats-content">
          <AnimatedCounter end={58} suffix="+" triggerAnimation={isVisible && animationKey > 0} />
          <div className="stats-text">
            Number Of Projects
          </div>
        </div>
      </div>
      
      {/* Second component */}
      <div className="stats-card">
        <div className="stats-content">
          <AnimatedCounter end={100} suffix="+" triggerAnimation={isVisible && animationKey > 0} />
          <div className="stats-text">
            Clients Worldwide
          </div>
        </div>
      </div>
      
      {/* Third component */}
      <div className="stats-card">
        <div className="stats-content">
          <AnimatedCounter end={9} triggerAnimation={isVisible && animationKey > 0} />
          <div className="stats-text">
            Years In Business
          </div>
        </div>
      </div>
      
      {/* Fourth component */}
      <div className="stats-card">
        <div className="stats-content">
          <AnimatedCounter end={150} suffix="+" triggerAnimation={isVisible && animationKey > 0} />
          <div className="stats-text">
            Team Members
          </div>
        </div>
      </div>
      </div>
      
      {/* Import Jost font explicitly */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  );
}