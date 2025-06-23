"use client";

import Container from "../../../../components/layout/container"
import HeadingPara from "../../../../components/layout/heading"
import Section from "../../../../components/layout/section-box"

const AILawyerHero = () => {
    return (
        <Section
            imageSrc='/images/balancer.jpg' 
            className='min-h-screen'
            overlayClassName="bg-transparent">
            <div className="w-full pt-24 md:pt-32 xl:pt-36">
                <Container>
                <HeadingPara title='AI Lawyer' para='Say goodbye to routine legal tasks. AI Lawyer automates research, document drafting, and administrative work—giving you more time to focus on what matters most.' classNameHeading='text-4xl sm:text-5xl md:text-6xl xl:text-7xl 3xl:text-[100px] text-white' classNamePara='font-semibold text-base md:text-lg xl:text-2xl 3xl:text-[27px]' className='max-w-[600px] text-white mt-20 sm:mt-10 mb-6 3xl:mb-10' />
                
                {/* Header-style button with appropriate sizing */}
                <button className="group flex items-center rounded-[32px] bg-[#0066B3] text-white font-semibold leading-[120%] font-jost border-none cursor-pointer transition-all duration-300 hover:bg-[#A50F15] p-[10px_18px] gap-[12px] text-[17px]">
                    <span>Try For Free</span>
                    <div className="relative flex items-center justify-center w-[30px] h-[30px]">
                        {/* Default state - original logo */}
                        <img 
                            src="/images/navbar_icon.svg" 
                            alt="Arrow icon" 
                            className="w-[28px] h-[28px] group-hover:opacity-0 transition-opacity duration-300"
                        />
                        
                        {/* Hover state - circle with arrow */}
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg width="20" height="20" className="w-5 h-5 transform rotate-[-45deg] text-[#A50F15]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </button>
                </Container>
            </div>
        </Section>
    )
}

export default AILawyerHero