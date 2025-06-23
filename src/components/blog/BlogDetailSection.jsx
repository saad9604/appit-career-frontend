'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function BlogDetailSection() {
  const sectionRef = useRef(null);
  const containerRefs = useRef([]);
  // Specific refs for 5th and 6th containers
  const fifthImageRef = useRef(null);
  const fifthTextRef = useRef(null);
  const sixthImageRef = useRef(null);
  const sixthTextRef = useRef(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

  // Initialize refs array
  useEffect(() => {
    containerRefs.current = containerRefs.current.slice(0, 6);
    setAnimationsEnabled(true);
  }, []);

  // Animation with Intersection Observer for containers 1-4
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        } else {
          entry.target.classList.remove('animate-fade-in');
        }
      });
    }, options);

    // Only observe the first 4 containers with the fade-in animation
    containerRefs.current.slice(0, 4).forEach(container => {
      if (container) observer.observe(container);
    });

    return () => {
      containerRefs.current.slice(0, 4).forEach(container => {
        if (container) observer.unobserve(container);
      });
    };
  }, []);

  // Special animations for 5th and 6th containers
  useEffect(() => {
    if (!animationsEnabled) return;

    // Initial visibility after a short delay to ensure DOM is ready
    setTimeout(() => {
      if (fifthImageRef.current) fifthImageRef.current.classList.add('animate-slide-in-left'); // Reversed back to left
      if (fifthTextRef.current) fifthTextRef.current.classList.add('animate-slide-in-bottom');
      if (sixthImageRef.current) sixthImageRef.current.classList.add('animate-slide-in-right'); // Reversed back to right
      if (sixthTextRef.current) sixthTextRef.current.classList.add('animate-slide-in-bottom');
    }, 300);

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const fifthSixthObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Apply appropriate animation class based on which element is being observed
          if (entry.target === fifthImageRef.current) {
            entry.target.classList.add('animate-slide-in-left'); // Reversed back to left
          } else if (entry.target === fifthTextRef.current) {
            entry.target.classList.add('animate-slide-in-bottom');
          } else if (entry.target === sixthImageRef.current) {
            entry.target.classList.add('animate-slide-in-right'); // Reversed back to right
          } else if (entry.target === sixthTextRef.current) {
            entry.target.classList.add('animate-slide-in-bottom');
          }
        } else {
          // Remove animation classes when element leaves viewport
          entry.target.classList.remove('animate-slide-in-left', 'animate-slide-in-right', 'animate-slide-in-bottom');
        }
      });
    }, options);

    // Observe the 5th and 6th container elements
    [fifthImageRef, fifthTextRef, sixthImageRef, sixthTextRef].forEach(ref => {
      if (ref.current) fifthSixthObserver.observe(ref.current);
    });

    return () => {
      [fifthImageRef, fifthTextRef, sixthImageRef, sixthTextRef].forEach(ref => {
        if (ref.current) fifthSixthObserver.unobserve(ref.current);
      });
    };
  }, [animationsEnabled]);

  return (
    <section ref={sectionRef} className="w-full bg-[#F6F6F6] py-8 xs:py-10 sm:py-12 md:pt-8 md:pb-16">
      <div className="mx-auto flex flex-col gap-5 xs:gap-6 md:gap-10 max-w-[1258px] px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 pt-0">
        {/* First Text Container */}
        <div 
          ref={el => containerRefs.current[0] = el}
          className={`w-full p-4 xs:p-6 sm:p-8 md:p-10 rounded-lg shadow-sm ${animationsEnabled ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="w-full max-w-[1238px] mx-auto">
            <h3 className="text-black font-jost text-xl xs:text-2xl md:text-[27px] font-semibold leading-[120%] mb-3 xs:mb-4 md:mb-5">
              The Rise of AI Chatbots
            </h3>
            
            <p className="text-black font-jost text-base xs:text-lg sm:text-xl md:text-[21px] font-normal leading-[120%]">
              AI chatbots powered by large language models (LLMs) have gained mass appeal. From productivity tools to creative writing, coding, and
              customer service, these bots have become digital companions for millions of users. Key platforms like:
            </p>
            
            <ul className="list-disc pl-6 xs:pl-8 mt-3 xs:mt-4 text-black font-jost text-base xs:text-lg sm:text-xl md:text-[21px] font-normal leading-[120%]">
              <li>ChatGPT by OpenAI</li>
              <li>Bard (now Gemini) by Google</li>
              <li>Copilot by Microsoft</li>
              <li>Claude by Anthropic</li>
            </ul>
            
            <p className="text-black font-jost text-base xs:text-lg sm:text-xl md:text-[21px] font-normal leading-[120%] mt-3 xs:mt-4">
              are being embedded into browsers, operating systems, search engines, and enterprise apps. However, their
              influence on global web behavior—particularly search engine usage—remains nuanced.
            </p>
          </div>
        </div>

        {/* Second Text Container */}
        <div 
          ref={el => containerRefs.current[1] = el}
          className={`w-full p-4 xs:p-6 sm:p-8 md:p-10 rounded-lg shadow-sm ${animationsEnabled ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="w-full max-w-[1238px] mx-auto">
            <h3 className="text-black font-jost text-xl xs:text-2xl md:text-[27px] font-semibold leading-[120%] mb-3 xs:mb-4 md:mb-5">
              The Future of AI Assistant Development
            </h3>
            
            <p className="text-black font-jost text-base xs:text-lg sm:text-xl md:text-[21px] font-normal leading-[120%]">
              As AI technology continues to evolve, we are witnessing a shift in how digital assistants function. Innovations in natural language processing
              and machine learning are leading to more intuitive interactions. Notable developments include:
            </p>
            
            <p className="text-black font-jost text-base xs:text-lg sm:text-xl md:text-[21px] font-normal leading-[120%] mt-3 xs:mt-4">
              Amazon's Alexa enhancing home automation<br />
              Apple's Siri improving contextual understanding<br />
              IBM Watson's advancements in data analysis<br />
              Meta's AI personalized content recommendations.
            </p>
            
            <p className="text-black font-jost text-base xs:text-lg sm:text-xl md:text-[21px] font-normal leading-[120%] mt-3 xs:mt-4">
              These technologies are shaping not only personal user experiences but also transforming business processes and customer engagement strategies.
            </p>
          </div>
        </div>

        {/* Third Text Container */}
        <div 
          ref={el => containerRefs.current[2] = el}
          className={`w-full p-4 xs:p-6 sm:p-8 md:p-10 rounded-lg shadow-sm ${animationsEnabled ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="w-full max-w-[1238px] mx-auto">
            <h3 className="text-black font-jost text-xl xs:text-2xl md:text-[27px] font-semibold leading-[120%] mb-3 xs:mb-4 md:mb-5">
              Challenges in AI Ethics and Safety
            </h3>
            
            <p className="text-black font-jost text-base xs:text-lg sm:text-xl md:text-[21px] font-normal leading-[120%]">
              With the rapid adoption of AI, significant ethical considerations are emerging. Issues such as data privacy, algorithmic bias, and
              misinformation are at the forefront. Companies are focusing on:
            </p>
            
            <p className="text-black font-jost text-base xs:text-lg sm:text-xl md:text-[21px] font-normal leading-[120%] mt-3 xs:mt-4">
              Establishing ethical AI frameworks<br />
              Implementing robust data governance<br />
              Promoting transparency in AI decision-making<br />
              Engaging users in discussions around AI impact.
            </p>
            
            <p className="text-black font-jost text-[21px] font-normal leading-[120%] mt-4">
              Addressing these challenges is essential for fostering trust and ensuring responsible AI deployment.
            </p>
          </div>
        </div>

        {/* Fourth Text Container */}
        <div 
          ref={el => containerRefs.current[3] = el}
          className={`w-full p-4 xs:p-6 sm:p-8 md:p-10 rounded-lg shadow-sm ${animationsEnabled ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="w-full max-w-[1238px] mx-auto">
            <h3 className="text-black font-jost text-xl xs:text-2xl md:text-[27px] font-semibold leading-[120%] mb-3 xs:mb-4 md:mb-5">
              The Integration of AI in Education
            </h3>
            
            <p className="text-black font-jost text-base xs:text-lg sm:text-xl md:text-[21px] font-normal leading-[120%]">
              AI is revolutionizing the educational landscape, offering personalized learning experiences and administrative efficiencies. Key trends include:
            </p>
            
            <p className="text-black font-jost text-base xs:text-lg sm:text-xl md:text-[21px] font-normal leading-[120%] mt-3 xs:mt-4">
              Adaptive learning platforms like DreamBox<br />
              Virtual tutoring assistants such as Carnegie Learning<br />
              AI-driven grading systems improving feedback speed<br />
              Learning analytics tools enhancing student engagement.
            </p>
            
            <p className="text-black font-jost text-lg md:text-[21px] font-normal leading-[120%] mt-4">
              These innovations aim to create a more inclusive and effective educational environment for diverse learners.
            </p>
          </div>
        </div>

        {/* Fifth Container - Text on Left, Image on Right */}
        <div 
          ref={el => containerRefs.current[4] = el}
          className={`w-full flex flex-col lg:flex-row justify-center items-center gap-5 xs:gap-6 md:gap-6 lg:gap-6 ${animationsEnabled ? '' : 'opacity-100'}`}
        >
          {/* Text Container */}
          <div 
            ref={fifthTextRef}
            className="w-full lg:w-[603px] flex flex-col justify-between items-center p-4 xs:p-6 md:p-8 lg:p-10 rounded-lg shadow-sm transform"
          >
            <div className="w-full max-w-full 2xs:w-[95%] xs:w-[92%] sm:max-w-[575px] mx-auto">
              <h3 className="text-black text-center font-jost text-xl xs:text-2xl md:text-[27px] font-semibold leading-[120%] mb-3 xs:mb-4 md:mb-5">
                The Evolution of User Interactions with Conversational Agents
              </h3>
              
              <p className="text-black font-jost text-base xs:text-lg sm:text-xl md:text-[21px] font-normal leading-[120%]">
                As AI technology advances, users are becoming more comfortable interacting with conversational agents. This shift is characterized by
                an increase in the complexity of queries posed to chatbots. Research shows that users are now relying on these AI tools not only for
                simple questions but also for complex problem-solving tasks. However, this evolution raises questions about the future of search
                engines and the potential for AI to become the primary interface for information retrieval.
              </p>
            </div>
          </div>
          
          {/* Image Container */}
          <div 
            ref={fifthImageRef}
            className="w-[90%] 2xs:w-[88%] xs:w-[85%] sm:w-[80%] lg:w-[621px] h-[210px] 2xs:h-[225px] xs:h-[230px] sm:h-[260px] md:h-[319px] relative rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden order-first lg:order-last mx-auto lg:mx-0 mb-4 xs:mb-5 sm:mb-6 lg:mb-0 transform"
          >
            <Image 
              src="/images/blog/first.png" 
              alt="Conversational Agents" 
              fill
              className="object-cover"
              sizes="(max-width: 375px) 90vw, (max-width: 480px) 88vw, (max-width: 640px) 85vw, (max-width: 1024px) 80vw, 621px"
            />
          </div>
        </div>

        {/* Sixth Container - Image on Left, Text on Right */}
        <div 
          ref={el => containerRefs.current[5] = el}
          className={`w-full flex flex-col lg:flex-row justify-center items-center gap-5 xs:gap-6 md:gap-6 lg:gap-6 ${animationsEnabled ? '' : 'opacity-100'}`}
        >
          {/* Text Container */}
          <div 
            ref={sixthTextRef}
            className="w-full lg:w-[603px] flex flex-col justify-between items-center p-4 xs:p-6 md:p-8 lg:p-10 rounded-lg shadow-sm order-last lg:order-last transform"
          >
            <div className="w-full max-w-full 2xs:w-[95%] xs:w-[92%] sm:max-w-[575px] mx-auto">
              <h3 className="text-black text-center font-jost text-xl xs:text-2xl md:text-[27px] font-semibold leading-[120%] mb-3 xs:mb-4 md:mb-5">
                Comparative Analysis of AI Chatbot Effectiveness
              </h3>
              
              <p className="text-black font-jost text-base xs:text-lg sm:text-xl md:text-[21px] font-normal leading-[120%]">
                To understand the potential of AI chatbots, it's essential to compare their effectiveness against traditional search engines.
                Various studies have shown that while chatbots can provide immediate responses and personalized interactions, they often lack
                the comprehensive depth and reliability of established search engine results. This article delves into user satisfaction ratings,
                information accuracy, and the scenarios in which chatbots excel compared to traditional search methods.
              </p>
            </div>
          </div>
          
          {/* Image Container */}
          <div 
            ref={sixthImageRef}
            className="w-[90%] 2xs:w-[88%] xs:w-[85%] sm:w-[80%] lg:w-[608px] h-[210px] 2xs:h-[225px] xs:h-[230px] sm:h-[260px] md:h-[331px] relative rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden order-first lg:order-first mx-auto lg:mx-0 mb-4 xs:mb-5 sm:mb-6 lg:mb-0 transform"
          >
            <Image 
              src="/images/blog/blogdetails.png" 
              alt="Chatbot Effectiveness" 
              fill
              className="object-cover"
              sizes="(max-width: 375px) 90vw, (max-width: 480px) 88vw, (max-width: 640px) 85vw, (max-width: 1024px) 80vw, 608px"
            />
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInBottom {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-slide-in-bottom {
          animation: slideInBottom 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </section>
  );
}
