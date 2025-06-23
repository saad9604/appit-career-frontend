'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const ContactForm = () => {
  const { ref: headingRef, isInView: headingIsInView } = useScrollAnimation();
  const { ref: formRef, isInView: formIsInView } = useScrollAnimation();

  return (
    <section className="w-full bg-white py-12 xs:py-14 sm:py-16 md:py-16 pb-0 mb-0" id="contact">
      <div className="mx-auto flex flex-col items-center gap-10 max-w-[1241px] w-full px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Heading */}
        <h2 
          ref={headingRef}
          className={`w-full text-black text-center font-jost text-2xl sm:text-3xl md:text-[40px] font-semibold leading-[120%] transition-all duration-1000 ease-out ${headingIsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Prepare Your Generative AI Assistant for Action Today
        </h2>
        
        {/* Main Container */}
        <div 
          ref={formRef}
          className={`w-full max-w-[1020px] flex flex-col items-center gap-8 p-4 sm:p-6 md:p-8 rounded-[32px] bg-white shadow-[0px_0px_10px_5px_rgba(0,0,0,0.25)] transition-all duration-1000 ease-out delay-300 ${formIsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Subheading */}
          <h3 className="w-full text-black text-center font-jost text-xl sm:text-2xl md:text-[27px] font-semibold leading-[120%]">
            We'd love to hear from you! Just fill in the form and we'll be in touch shortly.
          </h3>
          
          {/* Content Container */}
          <div className="w-full flex flex-col lg:flex-row justify-around items-center gap-3 px-0 sm:px-4 md:px-6">
            {/* Image Container - Hidden on smaller screens */}
            <div className="hidden md:block w-full md:w-[310px] lg:w-[350px] max-w-full aspect-[381/358] relative">
              <Image 
                src="/images/platform/contact.png" 
                alt="Contact Us"
                fill
                className="object-contain"
              />
            </div>
            
            {/* Form Container */}
            <div className="w-full md:w-[470px] lg:w-[500px] flex flex-col items-start gap-6">
              {/* Name Input */}
              <div className="w-full h-12 px-6 flex items-center gap-4 rounded-[50px] border border-black/10 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
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
                <div className="w-full sm:w-1/2 h-12 px-6 flex items-center gap-2 rounded-[50px] border border-black/10 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20.4375 9.23438C20.5406 9.23438 20.625 9.15 20.625 9.04688V7.64062C20.625 7.5375 20.5406 7.45312 20.4375 7.45312H16.5938V3.5625C16.5938 3.45937 16.5094 3.375 16.4062 3.375H14.9062C14.8031 3.375 14.7188 3.45937 14.7188 3.5625V7.45312H9.375V3.5625C9.375 3.45937 9.29063 3.375 9.1875 3.375H7.6875C7.58437 3.375 7.5 3.45937 7.5 3.5625V7.45312H3.5625C3.45937 7.45312 3.375 7.5375 3.375 7.64062V9.04688C3.375 9.15 3.45937 9.23438 3.5625 9.23438H7.5V14.7656H3.5625C3.45937 14.7656 3.375 14.85 3.375 14.9531V16.3594C3.375 16.4625 3.45937 16.5469 3.5625 16.5469H7.5V20.4375C7.5 20.5406 7.58437 20.625 7.6875 20.625H9.1875C9.29063 20.625 9.375 20.5406 9.375 20.4375V16.5469H14.7188V20.4375C14.7188 20.5406 14.8031 20.625 14.9062 20.625H16.4062C16.5094 20.625 16.5938 20.5406 16.5938 20.4375V16.5469H20.4375C20.5406 16.5469 20.625 16.4625 20.625 16.3594V14.9531C20.625 14.85 20.5406 14.7656 20.4375 14.7656H16.5938V9.23438H20.4375ZM14.7188 14.7656H9.375V9.23438H14.7188V14.7656Z" fill="black"/>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Enter Your Mobile Number" 
                    className="w-full text-xs font-jost font-normal leading-[120%] focus:outline-none placeholder:text-black placeholder:font-jost placeholder:text-xs placeholder:font-normal placeholder:leading-[120%] placeholder:w-[137px] placeholder:flex-shrink-0"
                  />
                </div>
                <div className="w-full sm:w-1/2 h-12 px-6 flex items-center gap-2 rounded-[50px] border border-black/10 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20.375 3.75H4.625C3.92904 3.75074 3.26179 4.02755 2.76967 4.51967C2.27755 5.01179 2.00074 5.67904 2 6.375V17.625C2.00074 18.321 2.27755 18.9882 2.76967 19.4803C3.26179 19.9725 3.92904 20.2493 4.625 20.25H20.375C21.071 20.2493 21.7382 19.9725 22.2303 19.4803C22.7225 18.9882 22.9993 18.321 23 17.625V6.375C22.9993 5.67904 22.7225 5.01179 22.2303 4.51967C21.7382 4.02755 21.071 3.75074 20.375 3.75ZM19.7103 8.09203L12.9603 13.342C12.8287 13.4444 12.6667 13.4999 12.5 13.4999C12.3333 13.4999 12.1713 13.4444 12.0397 13.342L5.28969 8.09203C5.21038 8.03214 5.14377 7.95709 5.09372 7.87123C5.04367 7.78537 5.01118 7.69042 4.99815 7.5919C4.98511 7.49338 4.99179 7.39325 5.01778 7.29733C5.04378 7.20142 5.08858 7.11162 5.14958 7.03316C5.21058 6.95471 5.28656 6.88916 5.37312 6.84032C5.45967 6.79149 5.55506 6.76034 5.65376 6.74869C5.75245 6.73704 5.85248 6.74513 5.94802 6.77247C6.04357 6.79981 6.13272 6.84587 6.21031 6.90797L12.5 11.7998L18.7897 6.90797C18.947 6.7892 19.1447 6.73711 19.34 6.76296C19.5354 6.78881 19.7128 6.89053 19.8338 7.04612C19.9547 7.20171 20.0096 7.39866 19.9865 7.59439C19.9634 7.79011 19.8642 7.96888 19.7103 8.09203Z" fill="black"/>
                  </svg>
                  <input 
                    type="email" 
                    placeholder="Enter Your Mail ID" 
                    className="w-full text-xs font-jost font-normal leading-[120%] focus:outline-none placeholder:text-black placeholder:font-jost placeholder:text-xs placeholder:font-normal placeholder:leading-[120%]"
                  />
                </div>
              </div>
              
              {/* Company Name Input */}
              <div className="w-full h-12 px-6 flex items-center gap-4 rounded-[50px] border border-black/10 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21.5 19H23.5V21H1.5V19H3.5V4C3.5 3.73478 3.60536 3.48043 3.79289 3.29289C3.98043 3.10536 4.23478 3 4.5 3H14.5C14.7652 3 15.0196 3.10536 15.2071 3.29289C15.3946 3.48043 15.5 3.73478 15.5 4V19H17.5V9H20.5C20.7652 9 21.0196 9.10536 21.2071 9.29289C21.3946 9.48043 21.5 9.73478 21.5 10V19ZM7.5 11V13H11.5V11H7.5ZM7.5 7V9H11.5V7H7.5Z" fill="black"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Enter Your Company Name" 
                  className="w-full text-xs font-jost font-normal leading-[120%] focus:outline-none placeholder:text-black placeholder:font-jost placeholder:text-xs placeholder:font-normal placeholder:leading-[120%]"
                />
              </div>
              
              {/* Message Input */}
              <div className="w-full h-12 px-6 flex items-center gap-4 rounded-[50px] border border-black/10 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.5 3C19.5609 3 20.5783 3.42143 21.3284 4.17157C22.0786 4.92172 22.5 5.93913 22.5 7V15C22.5 16.0609 22.0786 17.0783 21.3284 17.8284C20.5783 18.5786 19.5609 19 18.5 19H13.776L9.014 21.857C8.87059 21.9431 8.70788 21.9918 8.54077 21.9987C8.37366 22.0056 8.20749 21.9705 8.05746 21.8966C7.90743 21.8227 7.77833 21.7123 7.68199 21.5756C7.58565 21.4389 7.52514 21.2802 7.506 21.114L7.5 21V19H6.5C5.47376 19 4.48677 18.6056 3.74319 17.8983C2.9996 17.191 2.55631 16.225 2.505 15.2L2.5 15V7C2.5 5.93913 2.92143 4.92172 3.67157 4.17157C4.42172 3.42143 5.43913 3 6.5 3H18.5ZM14.5 12H8.5C8.23478 12 7.98043 12.1054 7.79289 12.2929C7.60536 12.4804 7.5 12.7348 7.5 13C7.5 13.2652 7.60536 13.5196 7.79289 13.7071C7.98043 13.8946 8.23478 14 8.5 14H14.5C14.7652 14 15.0196 13.8946 15.2071 13.7071C15.3946 13.5196 15.5 13.2652 15.5 13C15.5 12.7348 15.3946 12.4804 15.2071 12.2929C15.0196 12.1054 14.7652 12 14.5 12ZM16.5 8H8.5C8.23478 8 7.98043 8.10536 7.79289 8.29289C7.60536 8.48043 7.5 8.73478 7.5 9C7.5 9.26522 7.60536 9.51957 7.79289 9.70711C7.98043 9.89464 8.23478 10 8.5 10H16.5C16.7652 10 17.0196 9.89464 17.2071 9.70711C17.3946 9.51957 17.5 9.26522 17.5 9C17.5 8.73478 17.3946 8.48043 17.2071 8.29289C17.0196 8.10536 16.7652 8 16.5 8Z" fill="black"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Your Message................." 
                  className="w-full text-xs font-jost font-normal leading-[120%] focus:outline-none placeholder:text-black placeholder:font-jost placeholder:text-xs placeholder:font-normal placeholder:leading-[120%]"
                />
              </div>
              
              {/* Submit Button */}
              <button className="w-full h-12 mt-2 flex justify-center items-center rounded-[16px] bg-gradient-to-r from-[#002C4D] to-[#0066B3] shadow-[2px_4px_4px_2px_rgba(0,0,0,0.25)_inset] text-white font-jost font-semibold text-base leading-[120%]">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* No nested components here */}
    </section>
  );
};

export default ContactForm;
