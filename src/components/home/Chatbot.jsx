'use client';

import { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to Appit", sender: 'bot' },
    { text: "Hi Praveen. How can I help you?", sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnimatingSend, setIsAnimatingSend] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Mobile form states
  const [userName, setUserName] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [serviceOptions, setServiceOptions] = useState([
    { id: 'service-ai', label: 'Service now AI', checked: false },
    { id: 'oracle-ai', label: 'Oracle AI', checked: false },
    { id: 'cybersecurity', label: 'Cyber Security', checked: false },
    { id: 'grc', label: 'GRC Solutions', checked: false },
  ]);
  const [selectedService, setSelectedService] = useState('');
  const [showServiceSelection, setShowServiceSelection] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formStage, setFormStage] = useState(0); // 0: none, 1: name, 2: mobile, 3: email, 4: complete
  // FIX: Use state for client detection
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Toggle chatbot open/close
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    
    // Reset form when closing chatbot
    if (isOpen) {
      setShowServiceSelection(false);
      setShowContactForm(false);
      setFormStage(0);
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate AI response based on user input
  const generateResponse = (userMessage) => {
    // Convert to lowercase for easier matching
    const message = userMessage.toLowerCase();
    
    // First message should trigger service selection on mobile
    if (isMobile && messages.length <= 3) {
      if (message.includes('service') || message.includes('help') || message.includes('looking')) {
        setShowServiceSelection(true);
        return "Select a Service";
      }
    }
    
    // Simple pattern matching for common questions
    if (message.includes('service')) {
      return "Great! Could you please tell me what kind of service you're interested in? We offer software development, cloud solutions, AI integration, and more.";
    } else if (message.includes('software') || message.includes('development')) {
      return "Perfect! We specialize in building scalable, tailor-made software solutions. Would you like to schedule a consultation or get a quote?";
    } else if (message.includes('quote')) {
      if (isMobile) {
        setShowContactForm(true);
        setFormStage(1);
        return "Enter your name";
      } else {
        return "Got it. Please share a few details about your project—such as its purpose, key features, and timeline—and we'll get back to you with a personalized quote.";
      }
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hi, I'm looking for a service.";
    } else {
      // Default responses for other queries
      const defaultResponses = [
        "That's an interesting question. Could you provide more details so I can better assist you?",
        "Thanks for your message. To better help you, could you elaborate a bit more on what you're looking for?",
        "I'd be happy to help with that. Could you share more specific information about your requirements?",
        "I understand you're interested in our services. Could you tell me more about your project or needs?"
      ];
      
      // Return a random default response
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
  };

  // Handle service selection
  const handleServiceSelect = (id) => {
    const updatedOptions = serviceOptions.map(option => ({
      ...option,
      checked: option.id === id
    }));
    
    setServiceOptions(updatedOptions);
    const selected = serviceOptions.find(option => option.id === id);
    setSelectedService(selected ? selected.label : '');
  };
  
  // Handle form submission for small screens
  const handleFormSubmit = () => {
    // Trigger animation
    setIsAnimatingSend(true);
    
    // Reset animation after delay
    setTimeout(() => {
      setIsAnimatingSend(false);
    }, 500);
    
    if (formStage === 0) {
      // If user selected a service, move to name input
      if (selectedService) {
        setFormStage(1);
        setMessages(prev => [...prev, { text: selectedService, sender: 'user' }]);
      }
    } else if (formStage === 1) {
      // Save name and move to mobile input
      if (userName.trim()) {
        setFormStage(2);
        setMessages(prev => [...prev, { text: userName, sender: 'user' }]);
      }
    } else if (formStage === 2) {
      // Save mobile and move to email input
      if (userMobile.trim()) {
        setFormStage(3);
        setMessages(prev => [...prev, { text: userMobile, sender: 'user' }]);
      }
    } else if (formStage === 3) {
      // Save email and complete form
      if (userEmail.trim()) {
        setFormStage(4);
        setMessages(prev => [...prev, { text: userEmail, sender: 'user' }]);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { 
            text: "Our Service team will contact you", 
            sender: 'bot' 
          }]);
        }, 1500);
      }
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Detect screen size - FIX: Only run on client side
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
  }, [isClient]); // Only run when client is detected

  // Handle send message
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
        text: generateResponse(inputValue),
        sender: 'bot' 
      }]);
    }, thinkingTime);
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 sm:right-8 md:right-12 z-50">
      {/* Chatbot toggle button */}
      <button 
        onClick={toggleChatbot}
        className={`p-2 sm:p-3 rounded-full bg-gradient-to-b from-[#8E2DE2] to-[#4A00E0] flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-purple-700 transition-all transform duration-300 ${isOpen ? 'rotate-0' : 'hover:rotate-12'} ring-2 ring-white`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {/* Chatbot container */}
      <div 
        className={`
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'} 
          transform transition-all duration-300 ease-in-out origin-bottom-right
          absolute bottom-[calc(100%+12px)] sm:bottom-[calc(100%+12px)] right-0 sm:right-0 md:right-0
          w-[calc(100vw-4rem)] sm:w-[453px] max-w-[90vw] sm:max-w-none h-auto sm:h-[540px] md:h-[540px] max-h-[70vh] sm:max-h-[540px]
          flex flex-col
          rounded-[24px] border-[1px] sm:border-2 border-[#0066B3] sm:border-[#4A00E0] bg-white
          shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)]
        `}
      >
        <div className="p-3 sm:p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-jost font-semibold text-[#4A00E0] text-sm md:text-base">Chat with us</h3>
          <button 
            onClick={toggleChatbot}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Messages container */}
        <div className="flex-1 p-4 overflow-y-auto">
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
        <div className="p-4 sm:p-6 border-t border-gray-200">
          {isMobile && showServiceSelection ? (
            <div className="flex flex-col gap-3">
              <div className="text-[14px] font-jost font-medium text-left">Select a Service</div>
              {serviceOptions.map((option) => (
                <div key={option.id} className="flex items-center gap-2" onClick={() => handleServiceSelect(option.id)}>
                  <div className={`w-4 h-4 rounded-full border ${option.checked ? 'border-[#0066B3] bg-[#0066B3]' : 'border-gray-300'}`}>
                    {option.checked && (
                      <div className="w-2 h-2 mx-auto mt-[3px] bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-[14px] font-jost">{option.label}</span>
                </div>
              ))}
              <button
                onClick={handleFormSubmit}
                className="mt-2 self-end w-9 h-9 rounded-full bg-[#0066B3] flex items-center justify-center"
              >
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
              </button>
            </div>
          ) : isMobile && showContactForm ? (
            <div className="flex flex-col gap-3">
              {formStage === 1 && (
                <>
                  <div className="text-[14px] font-jost font-medium text-left">Enter your name</div>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md font-jost text-[14px]"
                  />
                </>
              )}
              {formStage === 2 && (
                <>
                  <div className="text-[14px] font-jost font-medium text-left">Enter your Mobile no</div>
                  <input
                    type="tel"
                    value={userMobile}
                    onChange={(e) => setUserMobile(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md font-jost text-[14px]"
                  />
                </>
              )}
              {formStage === 3 && (
                <>
                  <div className="text-[14px] font-jost font-medium text-left">Enter your mail id</div>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md font-jost text-[14px]"
                  />
                </>
              )}
              {formStage < 4 && (
                <button
                  onClick={handleFormSubmit}
                  className="mt-2 self-end w-9 h-9 rounded-full bg-[#0066B3] flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-white ${isAnimatingSend ? 'animate-send-message' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              )}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;