"use client";

import React, { useEffect } from 'react';

// Mobile card component (no animations)
const MobileHistoryCard = ({ image, title, description }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-[150px] rounded-[12px] overflow-hidden border border-black/20 mb-2">
        <div className="w-full h-full relative">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>
      <h3 className="text-center font-jost text-[16px] font-semibold leading-[120%] text-black mb-1">
        {title}
      </h3>
      <p className="text-center font-jost text-[10px] leading-tight font-medium text-black/80">
        {description.length > 80 ? `${description.substring(0, 80)}...` : description}
      </p>
    </div>
  );
};

const OurHistory = () => {
  // Add mobile click handling after component mounts
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    // Check if we're on mobile
    const isMobile = window.innerWidth < 640;
    if (!isMobile) return;
    
    // Find all cards
    const cards = document.querySelectorAll('.card-item');
    
    // Attach click handler to each card
    cards.forEach(card => {
      card.addEventListener('click', function(e) {
        // Get the clicked card (this)
        const clickedCard = this;
        
        // First remove active class from all cards
        cards.forEach(c => {
          if (c !== clickedCard) {
            c.classList.remove('active');
          }
        });
        
        // Toggle active class on clicked card
        clickedCard.classList.toggle('active');
      });
    });
    
    // Cleanup
    return () => {
      cards.forEach(card => {
        card.removeEventListener('click', () => {});
      });
    };
  }, []);

  const cardData = [
    {
      id: "achievement",
      image: "/images/about/history/achievement.jpg",
      title: "ACHIEVEMENT",
      description: "APPIT Software Solutions have always satisfied our existing clients till date with high-performance of our consultants in various IT technologies and with the leadership of our management by exactly understanding their IT requirements create and accelerate success. APPIT Software was able to add value to our clients and they are very much pleased with our prompt services as we were able to scale our service offerings and differentiate our business from competition and give them prompt service which is a very big achievement for us."
    },
    {
      id: "history",
      image: "/images/about/history/history.png",
      title: "HISTORY",
      description: "APPIT is a global IT services company with a high level of specialization in Oracle applications and technologies. In the past, we have been successful in helping our customers envision, plan, and deploy Oracle-based applications, middleware systems, and databases across a wide range of industries. Headquartered in Hyderabad, India, we have served customers across the globe with a wide range of IT solutions and service delivery options according to their business needs. Along with our experience, we have also expanded our services to meet the business and technology challenges in the complete lifecycle of a modern organization."
    },
    {
      id: "mission",
      image: "/images/about/history/mission.png",
      title: "MISSION",
      description: "To accept the coming challenges in the business and overcome them by focusing on integrated application solutions and consulting services thereby enabling our clients to leverage industry-leading technologies to maximize their return and scale business growth."
    },
    {
      id: "vision",
      image: "/images/about/history/vision.png",
      title: "VISION",
      description: "To drive business value through our expertise and effectively contribute to business goals by providing a high quality of service to our clients while delivering innovative technology solutions."
    }
  ];

  return (
    <section className="w-full bg-white py-16 px-[12px] sm:px-6 lg:px-8 overflow-hidden">
      <div className="sm:max-w-[1236px] w-full mx-auto">
        {/* Mobile heading */}
        <h2 className="text-center text-2xl font-semibold mb-6 sm:hidden font-jost">Our Journey</h2>
        
        {/* Mobile view (2x2 grid with text under boxes) */}
        <div className="grid grid-cols-2 gap-3 px-1 sm:hidden">
          {cardData.map((card) => (
            <div key={`mobile-${card.id}`} className="w-full mb-5">
              <MobileHistoryCard 
                image={card.image}
                title={card.title}
                description={card.description}
              />
            </div>
          ))}
        </div>
        
        {/* Desktop view (original layout) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-x-6 sm:gap-y-8 md:gap-y-10 justify-items-center pb-10">
          {cardData.map((card) => (
            <div key={`desktop-${card.id}`} className="w-full sm:max-w-full sm:w-full lg:max-w-[282px] rounded-[16px] overflow-hidden hover-lift-container">
              {/* Card with CSS transitions and active class for mobile */}
              <div 
                className={`card-item card-${card.id} relative w-full h-[430px] sm:h-[370px] flex-shrink-0 rounded-[16px] overflow-hidden border border-black/20`}
              >
                {/* Background image container */}
                {card.id === "history" ? (
                  <div className="card-image absolute inset-0">
                    <div className="absolute inset-0 overflow-hidden">
                      <img 
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover scale-110"
                      />
                    </div>
                  </div>
                ) : (
                  <div 
                    className="card-image absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.image})` }}
                  ></div>
                )}
                
                {/* Title overlay */}
                <div className="card-title absolute inset-0 flex flex-col items-center pt-8 z-10">
                  <h3 className={`text-center font-jost text-[21px] font-semibold leading-[120%] ${card.title === "MISSION" ? 'text-black' : 'text-white'}`}>
                    {card.title}
                  </h3>
                </div>
                
                {/* Content */}
                <div className="card-content absolute inset-0 w-full h-full bg-black flex flex-col items-center justify-start pt-8 p-6 pb-[41px] opacity-0">
                  <h3 className="text-white text-center font-jost text-[21px] font-semibold leading-[120%] mb-4">
                    {card.title}
                  </h3>
                  <p className="text-white text-center font-jost text-xs leading-[120%] font-semibold self-stretch overflow-hidden">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styling with CSS only animations for desktop and .active class for mobile */}
      <style jsx global>{`
        /* Desktop animations (hover) */
        @media (min-width: 640px) {
          .hover-lift-container {
            will-change: transform;
            transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            margin-top: 40px; /* Add space at top to allow for upward movement */
          }
          
          .hover-lift-container:hover {
            transform: translateY(-40px);
          }
          
          .card-item:hover .card-image {
            opacity: 0;
          }
          
          .card-item:hover .card-title {
            opacity: 0;
          }
          
          .card-item:hover .card-content {
            opacity: 1;
          }
        }
        
        /* Mobile styles (click based) */
        @media (max-width: 639px) {
          .card-item {
            transition: transform 0.5s ease-out;
          }
          
          .card-item.active {
            background-color: black;
          }
          
          .card-item.active .card-image {
            opacity: 0;
          }
          
          .card-item.active .card-title {
            opacity: 0;
          }
          
          .card-item.active .card-content {
            opacity: 1;
          }
        }
        
        /* Common transitions for all elements */
        .card-image, .card-title, .card-content {
          transition: opacity 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default OurHistory;