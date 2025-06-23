'use client';
import React, { useState, useEffect, useRef } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const ChatWithAI = () => {
  // Animation hooks
  const { ref: sectionRef, isInView } = useScrollAnimation();
  
  // Animation state - track if animations have played
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Chat state
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Refs
  const chatWindowRef = useRef(null);
  const buttonRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // Handle animation playing once
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  
  // Toggle chat window
  const toggleChatWindow = () => {
    setShowChatWindow(prev => !prev);
    
    // If opening the chat, prevent body scrolling
    if (!showChatWindow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Close the chat window
  const closeChatWindow = () => {
    setShowChatWindow(false);
    document.body.style.overflow = '';
  };

  // Handle click outside to close chat window
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showChatWindow && 
          chatWindowRef.current && 
          !chatWindowRef.current.contains(event.target) && 
          buttonRef.current && 
          !buttonRef.current.contains(event.target)) {
        closeChatWindow();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Make sure to reset overflow when component unmounts
      document.body.style.overflow = '';
    };
  }, [showChatWindow]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot response after delay
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

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Generate a bot response based on the user's message
  const generateBotResponse = (userMessage) => {
    // Simple pattern matching for common questions
    const message = userMessage.toLowerCase();
    
    if (message.includes('ai platform') || message.includes('platforms')) {
      return "Our AI platforms include AskGenie AI, WhatsAppBot AI, SmartChat AI, SalesBot AI, AI ChatWorks, and InsightGen AI. Each platform is designed to enhance customer engagement and business operations. Would you like to know more about any specific platform?";
    } else if (message.includes('pricing') || message.includes('cost') || message.includes('quote')) {
      return "Our pricing depends on the specific AI platform and customization requirements. Would you like to schedule a consultation with our team to get a detailed quote for your business needs?";
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Thanks for reaching out. How can I assist you with our AI platforms today?";
    } else if (message.includes('contact') || message.includes('speak') || message.includes('talk')) {
      return "You can reach our team by filling out the contact form above, or email us at contact@appitsoftware.com. Would you like me to help you with anything specific about our AI solutions?";
    } else if (message.includes('demo') || message.includes('trial')) {
      return "We'd be happy to provide a demo of our AI platforms. Please share your contact details in the form above, and our team will arrange a personalized demonstration for your business needs.";
    } else {
      return "Thanks for your message. Our AI platforms are designed to help businesses automate customer interactions and improve engagement. Is there anything specific about our solutions you'd like to know?";
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
    <div 
      ref={sectionRef}
      className="w-full flex flex-col items-center py-6 xs:py-8 sm:py-10 md:py-12 mt-8 xs:mt-10 sm:mt-12 md:mt-0 mb-16 sm:mb-20 md:mb-24 lg:mb-28 bg-white"
    >
      <div className="mx-auto flex flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-7 max-w-[90%] xs:max-w-[85%] sm:max-w-[1241px] w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Heading Container - animate only once */}
        <div className={`w-full text-center mb-2 transition-all duration-1000 ease-out ${hasAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h2 className="text-black font-jost text-2xl xs:text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold leading-[120%]">
            Got Questions? <span className="text-[#EC1C26]">Chat with Ai</span>
          </h2>
        </div>
        
        {/* Button with chat window - animate only once */}
        <div className={`relative flex justify-center mt-1 md:mt-0 transition-all duration-1000 ease-out delay-300 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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

      {/* Chatbot Modal */}
      {showChatWindow && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeChatWindow}
          ></div>
          
          {/* Chat Window */}
          <div 
            ref={chatWindowRef}
            className="relative w-[95%] sm:w-[90%] max-w-[520px] max-h-[90vh] sm:max-h-[80vh] bg-white rounded-[24px] overflow-hidden flex flex-col shadow-2xl border-3 border-[#4A00E0]"
            style={{ border: '3px solid #4A00E0' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-2 sm:p-4 border-b border-gray-200">
              <h3 className="text-[#4A00E0] font-jost font-semibold text-base sm:text-lg md:text-xl pl-2">Chat with us</h3>
              <button 
                onClick={closeChatWindow}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 min-h-[280px] sm:min-h-[350px] max-h-[50vh] sm:max-h-[60vh]">
              <div className="flex flex-col gap-3 sm:gap-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`rounded-[24px] px-3 py-2 sm:px-4 sm:py-3 max-w-[80%] ${
                        message.sender === 'user' ? 'bg-[#FFE0E1]' : 'bg-[#DFF0FF]'
                      }`}
                    >
                      <p className="m-0 font-jost text-xs sm:text-sm md:text-base text-black">
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="rounded-[24px] px-3 py-2 sm:px-4 sm:py-3 bg-[#DFF0FF]">
                      <div className="flex gap-1 sm:gap-1.5 items-end h-2 sm:h-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-b from-[#8E2DE2] to-[#4A00E0] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-b from-[#8E2DE2] to-[#4A00E0] animate-bounce" style={{ animationDelay: '200ms' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-b from-[#8E2DE2] to-[#4A00E0] animate-bounce" style={{ animationDelay: '400ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input */}
            <div className="p-2 sm:p-4 border-t border-gray-200">
              <form 
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
              >
                <input 
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything..."
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl border-none shadow-sm outline-none text-xs sm:text-sm md:text-base font-jost"
                  style={{ boxShadow: '0 0 4px rgba(0, 0, 0, 0.15)' }}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={inputValue.trim() === ''}
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center bg-gradient-to-b from-[#8E2DE2] to-[#4A00E0]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]">
                    <line x1="22" y1="2" x2="11" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polygon points="22 2, 15 22, 11 13, 2 9, 22 2" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

export default ChatWithAI;