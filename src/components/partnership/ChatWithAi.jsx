'use client';
import React, { useState, useEffect, useRef } from 'react';

const ChatWithAi = () => {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnimatingSend, setIsAnimatingSend] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if section is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Calculate scroll progress (0 to 1)
          const progress = 1 - (rect.top / windowHeight);
          // Apply subtle animation based on scroll position
          section.style.opacity = Math.min(1, 0.7 + progress * 0.3);
          section.style.transform = `translateY(${Math.max(0, 10 - progress * 10)}px)`;
        }
        
        // Update scrollY state for animation reset logic
        setScrollY(window.scrollY);
      }
    };
    
    // Set initial state
    if (sectionRef.current) {
      sectionRef.current.style.opacity = '0.7';
      sectionRef.current.style.transform = 'translateY(10px)';
      sectionRef.current.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  // Toggle chat window
  const toggleChatWindow = () => {
    setShowChatWindow(!showChatWindow);
  };

  // Scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
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
    <section ref={sectionRef} className="w-full bg-white pt-0 pb-10 xs:pb-12 sm:pb-16 md:pb-20">
      <div className="mx-auto flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:gap-[32px] max-w-[90%] xs:max-w-[85%] sm:max-w-[1241px] w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Heading Container */}
        <div className="w-full text-center">
          <h2 className="text-black font-jost text-2xl xs:text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold leading-[120%]">
            Got Questions? <span className="text-[#EC1C26]">Chat with Ai</span>
          </h2>
        </div>
        
        {/* Button with chat window */}
        <div className="relative flex justify-center" style={{ zIndex: 9999 }}>
          {/* Chat Window */}
          {showChatWindow && (
            <div
              className="fixed inset-0 bg-transparent"
              onClick={toggleChatWindow}
              style={{ zIndex: 9998 }}
            ></div>
          )}
          
          {/* Chat Window */}
          {showChatWindow && (
            <div 
              className={`
                absolute bottom-[calc(100%+12px)] left-1/2 transform -translate-x-1/2
                w-[calc(100vw-4rem)] sm:w-[453px] max-w-[90vw] sm:max-w-none h-auto sm:h-[540px] md:h-[540px] max-h-[70vh] sm:max-h-[540px]
                flex flex-col
                rounded-[24px] border-[1px] sm:border-2 border-[#0066B3] sm:border-[#4A00E0]
                shadow-[0px_0px_15px_5px_rgba(0,0,0,0.25)] overflow-hidden
              `}
              style={{ 
                zIndex: 9999, 
                backgroundColor: 'white',
                pointerEvents: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="p-3 sm:p-4 border-b border-gray-200 flex justify-between items-center" 
                style={{ backgroundColor: 'white' }}
              >
                <h3 className="font-jost font-semibold text-[#4A00E0] text-sm md:text-base">Chat with us</h3>
                <button 
                  onClick={toggleChatWindow}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Messages container */}
              <div 
                className="flex-1 p-4 overflow-y-auto" 
                style={{ backgroundColor: 'white' }}
              >
                <div className="flex flex-col gap-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`
                          max-w-[80%] inline-flex px-[16px] py-[12px] justify-center items-center gap-[10px] rounded-[24px]
                          ${message.sender === 'user' 
                            ? 'bg-[#FFE0E1]' 
                            : 'bg-[#DFF0FF]'}
                        `}
                      >
                        <p className="font-jost text-[14px] font-normal leading-[120%] text-black">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="inline-flex justify-center items-center gap-[2px] bg-[#DFF0FF] px-[16px] py-[12px] rounded-[24px]">
                        <div className="flex gap-[5px] items-end h-[12px]">
                          <div className="w-[6px] h-[6px] bg-gradient-to-b from-[#8E2DE2] to-[#4A00E0] rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.8s' }}></div>
                          <div className="w-[6px] h-[6px] bg-gradient-to-b from-[#8E2DE2] to-[#4A00E0] rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '0.8s' }}></div>
                          <div className="w-[6px] h-[6px] bg-gradient-to-b from-[#8E2DE2] to-[#4A00E0] rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '0.8s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Input container */}
              <div 
                className="p-4 sm:p-6 border-t border-gray-200" 
                style={{ backgroundColor: 'white' }}
              >
                <div className="inline-flex items-center gap-[8px] sm:gap-[10px] w-full justify-center">
                  <div className={`flex ${isMobile ? 'w-[85%]' : 'w-[336px]'} h-[48px] ${isMobile ? 'px-[10px]' : 'px-[24px]'} py-[10px] items-center justify-center gap-[10px] rounded-[16px] bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]`}>
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder={isMobile ? "Enter your text here" : "Ask anything..."}
                      className={`w-full font-jost text-[14px] font-normal md:font-semibold leading-[120%] text-[#252525] placeholder-[#6D6D6D] focus:outline-none ${isMobile ? 'text-center focus:text-left' : ''}`}
                    />
                  </div>
                  <button 
                    onClick={handleSendMessage}
                    className={`${isMobile ? 'w-[40px] h-[40px]' : 'w-[48px] h-[48px]'} flex items-center justify-center ${isMobile ? 'bg-[#0066B3]' : 'bg-gradient-to-b from-[#8E2DE2] to-[#4A00E0]'} rounded-full ${isMobile ? 'shadow-[4px_2px_4px_rgba(0,0,0,0.25)] border border-white' : 'shadow-md hover:shadow-lg transition-shadow'}`}
                    disabled={inputValue.trim() === ''}
                  >
                    {isMobile ? (
                      <svg xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 text-white ${isAnimatingSend ? 'animate-send-message' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" 
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-white ${isAnimatingSend ? 'animate-send-message' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Button */}
          <a 
            ref={buttonRef}
            onClick={toggleChatWindow}
            className="flex w-[280px] xs:w-[300px] sm:w-[320px] md:w-[340px] h-[50px] xs:h-[56px] sm:h-[64px] md:h-[72px] px-4 sm:px-5 justify-center items-center gap-2 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] rounded-[50px] border-2 border-[#4A0508] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out hover:bg-black hover:border-white hover:border-2 group cursor-pointer"
          >
            <span className="text-[#252525] font-jost text-lg xs:text-xl sm:text-2xl md:text-[27px] font-normal leading-[120%] whitespace-nowrap transition-colors duration-300 ease-in-out group-hover:text-white">
              Ask us anything
            </span>
            
            {/* Arrow with hover effect */}
            <div className="relative w-[24px] h-[24px] xs:w-[28px] xs:h-[28px] sm:w-[34px] sm:h-[34px] md:w-[40px] md:h-[40px]">
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

      {/* Responsive styles and animations */}
      <style jsx>{`
        @media (max-width: 480px) {
          /* Extra small devices */
          section {
            padding-top: 0;
            margin-top: -10px;
            padding-bottom: 40px;
          }
        }

        @media (min-width: 481px) and (max-width: 767px) {
          /* Small devices */
          section {
            padding-top: 0;
            margin-top: -15px;
            padding-bottom: 50px;
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          /* Medium devices */
          section {
            padding-top: 0;
            margin-top: -20px;
            padding-bottom: 60px;
          }
        }

        @media (min-width: 992px) {
          /* Large devices and above */
          section {
            padding-top: 0;
            margin-top: -25px;
            padding-bottom: 70px;
          }
        }
        
        /* Send message animation */
        .animate-send-message {
          animation: send-message-animation 0.5s ease-in-out;
        }

        @keyframes send-message-animation {
          0% { transform: scale(1); }
          50% { transform: scale(0.85); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default ChatWithAi;