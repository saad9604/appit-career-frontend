'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const PartnershipBenefitsWithChat = () => {
  const { ref: firstSectionRef, isInView: firstInView } = useScrollAnimation();
  const { ref: secondSectionRef, isInView: secondInView } = useScrollAnimation();
  const { ref: thirdSectionRef, isInView: thirdInView } = useScrollAnimation();
  const { ref: chatHeadingRef, isInView: chatHeadingInView } = useScrollAnimation();
  const { ref: chatButtonRef, isInView: chatButtonInView } = useScrollAnimation();
  
  const chatSectionRef = useRef(null);
  const buttonRef = useRef(null);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const chatWindowRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnimatingSend, setIsAnimatingSend] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Toggle chat window
  const toggleChatWindow = () => {
    const newState = !showChatWindow;
    setShowChatWindow(newState);
  };

  // Close chat window when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showChatWindow && chatWindowRef.current && !chatWindowRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        toggleChatWindow();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChatWindow]);

  // Scroll to the bottom of the chat without page scrolling
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);
  
  // Handle send message with animation
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Trigger send animation
    setIsAnimatingSend(true);
    
    // Add user message
    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Reset animation after a short delay
    setTimeout(() => {
      setIsAnimatingSend(false);
    }, 500);
    
    // Simulate bot response after delay
    // Vary the delay based on message length to simulate thinking time
    const thinkingTime = Math.min(1000 + inputValue.length * 20, 3000);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: generateBotResponse(inputValue),
        sender: 'bot' 
      }]);
    }, thinkingTime);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Prevent default form submission behavior
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior which might cause page scroll
      handleSendMessage();
    }
  };

  // Generate a bot response based on the user's message
  const generateBotResponse = (userMessage) => {
    // Simple pattern matching for common questions
    const message = userMessage.toLowerCase();
    
    if (message.includes('service') || message.includes('offer')) {
      return "We offer a range of services including web development, mobile app development, AI solutions, and more. How can we help with your specific needs?";
    } else if (message.includes('pricing') || message.includes('cost') || message.includes('quote')) {
      return "Our pricing depends on the specific requirements of your project. Would you like to schedule a consultation with our team to discuss your needs in detail?";
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Thanks for reaching out. How can I assist you today?";
    } else if (message.includes('contact') || message.includes('speak') || message.includes('talk')) {
      return "You can reach our team at contact@appitsoftware.com or fill out the contact form on our website. Would you like me to help you with anything specific?";
    } else {
      return "Thanks for your message. A member of our team will get back to you shortly. Is there anything specific you'd like to know about our services in the meantime?";
    }
  };

  // Detect screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <section className="w-full bg-white py-12 xs:py-14 sm:py-16 md:py-20 mb-0 overflow-hidden">
        <div className="mx-auto flex flex-col gap-12 sm:gap-14 md:gap-16 max-w-[1241px] w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 overflow-visible pt-0">
          {/* First Container */}
          <div ref={firstSectionRef} className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16 w-full items-center">
            {/* Text Container */}
            <div className={`w-full md:w-1/2 lg:w-[750px] flex flex-col gap-4 order-2 md:order-1 transition-all duration-1000 ease-out ${firstInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <h3 className="text-black font-jost text-2xl md:text-[27px] font-semibold leading-[120%]">
                Benefits of Working with an Odoo Partner
              </h3>
              <p className="text-black font-jost text-lg md:text-[21px] font-normal leading-[115%]">
                Collaborating with an official Odoo partner like AppitSoftware offers numerous benefits:
                <br/><span className="font-medium">Expertise and Experience:</span>{' '}
                <span className="underline decoration-solid underline-offset-auto">Our team</span> possesses in-depth knowledge of Odoo's functionalities, ensuring efficient and effective implementation.​
                <br/><span className="font-medium">Customized Solutions:</span> We tailor Odoo modules to align with specific business processes, providing a personalized ERP experience.​
                <br/><span className="font-medium">Ongoing Support:</span> AppitSoftware offers continuous support and maintenance, ensuring that your ERP system evolves with your business needs.​
                <br/><span className="font-medium">Training and Education:</span> We provide comprehensive training to empower your team to utilize Odoo's features fully.​
                <br/><span className="font-medium">Integration Capabilities:</span> Our expertise extends to integrating Odoo with other systems, facilitating seamless data flow across your organization.​
                <br/>By choosing AppitSoftware as your Odoo partner, you invest in a collaborative relationship aimed at achieving operational efficiency and business growth.​
              </p>
            </div>
            
            {/* Image Container */}
            <div className={`w-full md:w-1/2 lg:w-[750px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[480px] relative order-1 md:order-2 rounded-[24px] overflow-hidden transition-all duration-1000 ease-out delay-300 ${firstInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <Image 
                src="/images/partnership/benefits.png" 
                alt="Benefits of Odoo Partnership"
                fill
                className="object-cover rounded-[24px]"
              />
            </div>
          </div>

          {/* Second Container */}
          <div ref={secondSectionRef} className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16 w-full items-center">
            {/* Image Container - Now on the right */}
            <div className={`w-full md:w-1/2 lg:w-[700px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[321px] relative order-1 md:order-2 rounded-[24px] overflow-hidden transition-all duration-1000 ease-out ${secondInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <Image 
                src="/images/partnership/best.png" 
                alt="Best Odoo Partner 2025"
                fill
                className="object-cover rounded-[24px]"
              />
            </div>
            
            {/* Text Container - Now on the left */}
            <div className={`w-full md:w-1/2 lg:w-[750px] flex flex-col gap-4 order-2 md:order-1 transition-all duration-1000 ease-out delay-300 ${secondInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <h3 className="text-black font-jost text-2xl md:text-[27px] font-semibold leading-[120%]">
                Best Odoo Partner 2025 – India: BrowseInfo
              </h3>
              <p className="text-black font-jost text-lg md:text-[21px] font-normal leading-[115%]">
                As we look ahead to 2025, BrowseInfo emerges as a leading Odoo partner in India, recognized for its innovative solutions and customer-centric approach. With a track record of successful Odoo implementations across various industries, BrowseInfo has demonstrated excellence in delivering ERP solutions that drive business transformation.​
                <br/>
                Their commitment to staying abreast of technological advancements ensures that clients benefit from the latest features and enhancements in Odoo. By focusing on quality, reliability, and customer satisfaction, BrowseInfo sets the benchmark for Odoo partnership services in India.​
              </p>
            </div>
          </div>

          {/* Third Container */}
          <div ref={thirdSectionRef} className="flex flex-col lg:flex-row gap-0 w-full items-start mb-12 overflow-visible relative lg:min-h-[500px]">
            {/* Text Container */}
            <div className={`w-full lg:w-[500px] px-2 lg:ml-6 flex flex-col gap-4 transition-all duration-1000 ease-out ${thirdInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <h3 className="text-black font-jost text-2xl md:text-[27px] font-semibold leading-[120%]">
                <span className="text-[#EC1C26]">Why Choose</span> Odoo & Appit Software Solutions?
              </h3>
              <p className="text-black font-jost text-lg md:text-[21px] font-normal leading-[115%]">
                As a trusted Odoo partner, Appit Software delivers tailored ERP solutions that fit your business needs. We handle everything from implementation and customization to ongoing support and training, making sure your system runs smoothly and grows with you. Our expert team combines deep industry knowledge with technical expertise to create solutions that streamline operations, improve productivity, and reduce manual effort. Whether you're a small startup or an established enterprise, and whether you need a fully-customized solution or third-party tools, we ensure a seamless experience from start to finish. With scalable and flexible Odoo ERP solutions, we help your business adapt to changing market demands and achieve business success.
              </p>
            </div>
            
            {/* Form Container */}
            <div className={`w-full lg:w-[600px] p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center gap-6 rounded-[32px] bg-white shadow-[0px_0px_10px_5px_rgba(0,0,0,0.15)] z-10 lg:absolute lg:right-[-40px] lg:top-0 transition-all duration-1000 ease-out delay-300 mt-10 sm:mt-14 md:mt-16 lg:mt-0 ${thirdInView ? 'opacity-100 translate-x-0 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.15)]' : 'opacity-0 translate-x-20 shadow-none'}`}>
              <div className="w-full px-4 flex justify-center items-center">
                <div className="w-full max-w-[560px] flex flex-col items-center gap-4">
                  {/* Name Field */}
                  <div className="w-full h-14 px-6 flex items-center gap-4 rounded-[50px] border border-black/10 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4.5 21C4.5 21 3 21 3 19.5C3 18 4.5 13.5 12 13.5C19.5 13.5 21 18 21 19.5C21 21 19.5 21 19.5 21H4.5ZM12 12C13.1935 12 14.3381 11.5259 15.182 10.682C16.0259 9.83807 16.5 8.69347 16.5 7.5C16.5 6.30653 16.0259 5.16193 15.182 4.31802C14.3381 3.47411 13.1935 3 12 3C10.8065 3 9.66193 3.47411 8.81802 4.31802C7.97411 5.16193 7.5 6.30653 7.5 7.5C7.5 8.69347 7.97411 9.83807 8.81802 10.682C9.66193 11.5259 10.8065 12 12 12Z" fill="black"/>
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Enter Your Name" 
                      className="w-full text-xs font-jost font-normal leading-[120%] focus:outline-none placeholder:text-black placeholder:font-jost placeholder:text-xs placeholder:font-normal placeholder:leading-[120%]"
                    />
                  </div>

                  {/* Mobile and Email Fields */}
                  <div className="w-full flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2 h-14 px-6 flex items-center gap-2 rounded-[50px] border border-black/10 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M20.4375 9.23438C20.5406 9.23438 20.625 9.15 20.625 9.04688V7.64062C20.625 7.5375 20.5406 7.45312 20.4375 7.45312H16.5938V3.5625C16.5938 3.45937 16.5094 3.375 16.4062 3.375H14.9062C14.8031 3.375 14.7188 3.45937 14.7188 3.5625V7.45312H9.375V3.5625C9.375 3.45937 9.29063 3.375 9.1875 3.375H7.6875C7.58437 3.375 7.5 3.45937 7.5 3.5625V7.45312H3.5625C3.45937 7.45312 3.375 7.5375 3.375 7.64062V9.04688C3.375 9.15 3.45937 9.23438 3.5625 9.23438H7.5V14.7656H3.5625C3.45937 14.7656 3.375 14.85 3.375 14.9531V16.3594C3.375 16.4625 3.45937 16.5469 3.5625 16.5469H7.5V20.4375C7.5 20.5406 7.58437 20.625 7.6875 20.625H9.1875C9.29063 20.625 9.375 20.5406 9.375 20.4375V16.5469H14.7188V20.4375C14.7188 20.5406 14.8031 20.625 14.9062 20.625H16.4062C16.5094 20.625 16.5938 20.5406 16.5938 20.4375V16.5469H20.4375C20.5406 16.5469 20.625 16.4625 20.625 16.3594V14.9531C20.625 14.85 20.5406 14.7656 20.4375 14.7656H16.5938V9.23438H20.4375ZM14.7188 14.7656H9.375V9.23438H14.7188V14.7656Z" fill="black"/>
                      </svg>
                      <input 
                        type="text" 
                        placeholder="Enter Your Mobile Number" 
                        className="w-full text-xs font-jost font-normal leading-[120%] focus:outline-none placeholder:text-black placeholder:font-jost placeholder:text-xs placeholder:font-normal placeholder:leading-[120%] placeholder:w-[137px] placeholder:flex-shrink-0"
                      />
                    </div>
                    <div className="w-full sm:w-1/2 h-14 px-6 flex items-center gap-2 rounded-[50px] border border-black/10 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                        <path d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM12.06 11.683L5.648 6.238L4.353 7.762L12.073 14.317L19.654 7.757L18.346 6.244L12.061 11.683H12.06Z" fill="black"/>
                      </svg>
                      <input 
                        type="email" 
                        placeholder="Enter Your Mail ID" 
                        className="w-full text-xs font-jost font-normal leading-[120%] focus:outline-none placeholder:text-black placeholder:font-jost placeholder:text-xs placeholder:font-normal placeholder:leading-[120%]"
                      />
                    </div>
                  </div>

                  {/* Company Name Field */}
                  <div className="w-full h-14 px-6 flex items-center gap-4 rounded-[50px] border border-black/10 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 19H23V21H1V19H3V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V19H17V9H20C20.2652 9 20.5196 9.10536 20.7071 9.29289C20.8946 9.48043 21 9.73478 21 10V19ZM7 11V13H11V11H7ZM7 7V9H11V7H7Z" fill="black"/>
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Enter Your Company Name" 
                      className="w-full text-xs font-jost font-normal leading-[120%] focus:outline-none placeholder:text-black placeholder:font-jost placeholder:text-xs placeholder:font-normal placeholder:leading-[120%]"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="w-full h-14 px-6 flex items-center gap-4 rounded-[50px] border border-black/10 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 3C19.0609 3 20.0783 3.42143 20.8284 4.17157C21.5786 4.92172 22 5.93913 22 7V15C22 16.0609 21.5786 17.0783 20.8284 17.8284C20.0783 18.5786 19.0609 19 18 19H13.276L8.514 21.857C8.37059 21.9431 8.20788 21.9918 8.04077 21.9987C7.87366 22.0056 7.70749 21.9705 7.55746 21.8966C7.40743 21.8227 7.27833 21.7123 7.18199 21.5756C7.08565 21.4389 7.02514 21.2802 7.006 21.114L7 21V19H6C4.97376 19 3.98677 18.6056 3.24319 17.8983C2.4996 17.191 2.05631 16.225 2.005 15.2L2 15V7C2 5.93913 2.42143 4.92172 3.17157 4.17157C3.92172 3.42143 4.93913 3 6 3H18ZM14 12H8C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4804 7 12.7348 7 13C7 13.2652 7.10536 13.5196 7.29289 13.7071C7.48043 13.8946 7.73478 14 8 14H14C14.2652 14 14.5196 13.8946 14.7071 13.7071C14.8946 13.5196 15 13.2652 15 13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12ZM16 8H8C7.73478 8 7.48043 8.10536 7.29289 8.29289C7.10536 8.48043 7 8.73478 7 9C7 9.26522 7.10536 9.51957 7.29289 9.70711C7.48043 9.89464 7.73478 10 8 10H16C16.2652 10 16.5196 9.89464 16.7071 9.70711C16.8946 9.51957 17 9.26522 17 9C17 8.73478 16.8946 8.48043 16.7071 8.29289C16.5196 8.10536 16.2652 8 16 8Z" fill="black"/>
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Your Message................." 
                      className="w-full text-xs font-jost font-normal leading-[120%] focus:outline-none placeholder:text-black placeholder:font-jost placeholder:text-xs placeholder:font-normal placeholder:leading-[120%]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button className="w-full h-14 px-6 mt-4 flex justify-center items-center gap-4 rounded-[16px] bg-gradient-to-r from-[#002C4D] to-[#0066B3] shadow-[2px_4px_4px_2px_rgba(0,0,0,0.25)_inset] text-white font-jost font-semibold text-base leading-[120%]">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat with AI Container - Integrated at the end of PartnershipBenefit section */}
      <div 
        ref={chatSectionRef}
        className="w-full flex flex-col items-center py-6 xs:py-8 sm:py-10 md:py-12 mt-8 xs:mt-10 sm:mt-12 md:mt-0 mb-16 sm:mb-20 md:mb-24 lg:mb-28 bg-white"
      >
        <div className="mx-auto flex flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-7 max-w-[90%] xs:max-w-[85%] sm:max-w-[1241px] w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10">
          {/* Heading Container - animate only once */}
          <div ref={chatHeadingRef} className={`w-full text-center mb-2 transition-all duration-1000 ease-out ${chatHeadingInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-black font-jost text-2xl xs:text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold leading-[120%]">
              Got Questions? <span className="text-[#EC1C26]">Chat with Ai</span>
            </h2>
          </div>
          
          {/* Button with chat window - animate only once */}
          <div ref={chatButtonRef} className={`relative flex justify-center mt-1 md:mt-0 transition-all duration-1000 ease-out delay-300 ${chatHeadingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Chat Window Container */}
            {showChatWindow && (
              <>
                {/* Overlay to prevent interactions with background content */}
                <div 
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999998
                  }}
                  onClick={() => setShowChatWindow(false)}
                />
              <div 
                ref={chatWindowRef}
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: isMobile ? 'calc(100vw - 4rem)' : window.innerWidth < 1024 ? '450px' : '520px',
                  maxWidth: isMobile ? '90vw' : '90vw',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  zIndex: 999999,
                  boxShadow: '0 0 30px 10px rgba(0,0,0,0.6)',
                  border: '3px solid #4A00E0'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Full-width opaque background */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: '#FFFFFF',
                  zIndex: -1
                }}></div>

                {/* Opaque container */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {/* Header */}
                  <div style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #e0e0e0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF'
                  }}>
                    <h3 style={{
                      fontWeight: 600,
                      fontFamily: 'var(--font-jost)',
                      color: '#4A00E0',
                      margin: 0,
                      fontSize: isMobile ? '16px' : window.innerWidth < 1024 ? '18px' : '20px'
                    }}>Chat with us</h3>
                    
                    <button 
                      onClick={() => setShowChatWindow(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '6px'
                      }}
                    >
                      <svg width={isMobile ? '20' : '24'} height={isMobile ? '20' : '24'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6L18 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Messages Container */}
                  <div style={{
                    padding: '20px',
                    overflowY: 'auto',
                    backgroundColor: '#FFFFFF',
                    minHeight: isMobile ? '280px' : window.innerWidth < 1024 ? '320px' : '350px',
                    maxHeight: isMobile ? '320px' : window.innerWidth < 1024 ? '360px' : '400px'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px'
                    }}>
                      {/* Messages */}
                      {messages.map((message, index) => (
                        <div 
                          key={index} 
                          style={{
                            display: 'flex',
                            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                          }}
                        >
                          <div 
                            style={{
                              backgroundColor: message.sender === 'user' ? '#FFE0E1' : '#DFF0FF',
                              padding: isMobile ? '12px 16px' : window.innerWidth < 1024 ? '14px 18px' : '16px 20px',
                              borderRadius: '24px',
                              maxWidth: '80%'
                            }}
                          >
                            <p style={{
                              margin: 0,
                              fontFamily: 'var(--font-jost)',
                              fontSize: isMobile ? '14px' : window.innerWidth < 1024 ? '14px' : '15px',
                              color: '#000000'
                            }}>
                              {message.text}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {/* Typing indicator */}
                      {isTyping && (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'flex-start'
                        }}>
                          <div style={{
                            backgroundColor: '#DFF0FF',
                            padding: isMobile ? '12px 16px' : window.innerWidth < 1024 ? '14px 18px' : '16px 20px',
                            borderRadius: '24px'
                          }}>
                            <div style={{
                              display: 'flex',
                              gap: '5px',
                              alignItems: 'flex-end',
                              height: '12px'
                            }}>
                              <div style={{
                                width: isMobile ? '6px' : '8px',
                                height: isMobile ? '6px' : '8px',
                                borderRadius: '50%',
                                background: 'linear-gradient(to bottom, #8E2DE2, #4A00E0)',
                                animation: 'bounce 0.8s infinite',
                                animationDelay: '0ms'
                              }}></div>
                              <div style={{
                                width: isMobile ? '6px' : '8px',
                                height: isMobile ? '6px' : '8px',
                                borderRadius: '50%',
                                background: 'linear-gradient(to bottom, #8E2DE2, #4A00E0)',
                                animation: 'bounce 0.8s infinite',
                                animationDelay: '200ms'
                              }}></div>
                              <div style={{
                                width: isMobile ? '6px' : '8px',
                                height: isMobile ? '6px' : '8px',
                                borderRadius: '50%',
                                background: 'linear-gradient(to bottom, #8E2DE2, #4A00E0)',
                                animation: 'bounce 0.8s infinite',
                                animationDelay: '400ms'
                              }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  
                  {/* Input Area */}
                  <form 
                    onSubmit={(e) => e.preventDefault()}
                    style={{
                      padding: '20px',
                      borderTop: '1px solid #e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <input 
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask anything..."
                      style={{
                        flex: 1,
                        padding: '12px 20px',
                        borderRadius: '20px',
                        border: 'none',
                        boxShadow: '0 0 4px rgba(0, 0, 0, 0.15)',
                        outline: 'none',
                        fontSize: isMobile ? '14px' : window.innerWidth < 1024 ? '14px' : '15px',
                        fontFamily: 'var(--font-jost)'
                      }}
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={inputValue.trim() === ''}
                      style={{
                        width: isMobile ? '48px' : '56px',
                        height: isMobile ? '48px' : '56px',
                        borderRadius: '50%',
                        border: 'none',
                        background: 'linear-gradient(to bottom, #8E2DE2, #4A00E0)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="22" y1="2" x2="11" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polygon points="22 2, 15 22, 11 13, 2 9, 22 2" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
              </>
            )}
            
            {/* Button */}
            <a 
              ref={buttonRef}
              onClick={toggleChatWindow}
              className="flex w-[220px] xxs:w-[240px] xs:w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] h-[44px] xxs:h-[48px] xs:h-[52px] sm:h-[58px] md:h-[64px] lg:h-[72px] px-3 xxs:px-3.5 xs:px-4 sm:px-5 justify-center items-center gap-2 xxs:gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] rounded-[50px] border-[1px] border-black bg-white transition-all duration-300 ease-in-out hover:bg-black hover:border-white group cursor-pointer select-none"
              style={{ userSelect: 'none', outline: 'none' }}
            >
              <span className="text-[#252525] font-jost text-base xxs:text-base xs:text-lg sm:text-xl md:text-2xl lg:text-[27px] font-normal leading-[120%] whitespace-nowrap transition-colors duration-300 ease-in-out group-hover:text-white">
                Ask us anything
              </span>
              
              {/* Arrow with hover effect */}
              <div className="relative w-[20px] h-[20px] xxs:w-[22px] xxs:h-[22px] xs:w-[24px] xs:h-[24px] sm:w-[28px] sm:h-[28px] md:w-[34px] md:h-[34px] lg:w-[40px] lg:h-[40px]">
                {/* Default arrow */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 40 40" 
                  fill="none"
                  className="absolute transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                >
                  <path d="M6.66683 20H33.3335M33.3335 20L23.3335 30M33.3335 20L23.3335 10" 
                    stroke="black" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                
                {/* Hover arrow */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  className="transform rotate-[-45deg] absolute opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" 
                    stroke="white" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Responsive styles */}
        <style jsx global>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
        `}</style>
      </div>
    </>
  );
};

export default PartnershipBenefitsWithChat;