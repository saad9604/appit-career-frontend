'use client';
import { useRef, useEffect } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function PlatformAdvantages() {
  const { ref: sectionRef, isInView } = useScrollAnimation();
  const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Play videos when they're in view
  const handleVideoInView = (index) => {
    if (videoRefs[index]?.current) {
      // Try to play the video and handle autoplay restrictions
      videoRefs[index].current.play().catch(error => {
        console.error(`Video ${index} playback failed:`, error);
      });
    }
  };
  
  // Make sure videos keep playing when in view
  useEffect(() => {
    if (isInView) {
      videoRefs.forEach((ref, index) => {
        if (ref.current) {
          // Add an event listener to restart the video if it ends
          const handleEnded = () => {
            ref.current.play().catch(e => console.error(`Video ${index} restart failed:`, e));
          };
          
          // Start playing the video
          ref.current.play().catch(e => console.error(`Video ${index} play failed:`, e));
          
          // Add event listener for when video ends
          ref.current.addEventListener('ended', handleEnded);
          
          // Clean up event listener
          return () => {
            if (ref.current) {
              ref.current.removeEventListener('ended', handleEnded);
            }
          };
        }
      });
    }
  }, [isInView, videoRefs]);

  return (
    <section className="w-full bg-[#252525] py-6 xs:py-10 sm:py-12 md:py-16 lg:py-[93px] px-2 xs:px-4 sm:px-6 md:px-8 lg:px-[100px] overflow-hidden">
      <div 
        ref={sectionRef}
        className={`w-full max-w-full lg:max-w-[1241px] mx-auto flex flex-col items-center gap-6 xs:gap-8 sm:gap-10 md:gap-[40px] transition-all duration-1000 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Header Container */}
        <div className="w-full max-w-full md:max-w-[90%] lg:max-w-[1152px] flex flex-col items-center gap-2 xs:gap-3 sm:gap-4 md:gap-[16px] px-1 xs:px-3 sm:px-4">
          <h2 className="text-white text-center font-jost text-lg xs:text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-semibold leading-[120%]">
            The <span className="text-[#EC1C26]">Advantage</span> of Generative AI
          </h2>
          <p className="w-full text-white text-center font-jost text-xs xs:text-base sm:text-lg md:text-xl lg:text-[21px] font-semibold leading-[120%]">
            Acquire a premium assistant designed for conversational FAQ support, developed from your existing support materials
          </p>
        </div>

        {/* Cards Container */}
        <div className="w-full flex flex-col gap-2.5 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-[24px]">
          {/* Card 1 */}
          <div className="w-full flex flex-col md:flex-row p-2 xs:p-4 sm:p-5 md:p-6 lg:p-[20px_48px] justify-between items-center rounded-[10px] xs:rounded-[16px] sm:rounded-[24px] md:rounded-[32px] bg-white">
            <div className="w-full md:w-1/2 lg:w-[559px] flex flex-col items-start gap-2 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-[32px] mb-3 md:mb-0">
              <button className="flex px-1.5 py-0.5 xs:px-3 xs:py-2 sm:px-4 sm:py-[8px] md:px-5 md:py-[10px] justify-center items-center rounded-[8px] xs:rounded-[12px] sm:rounded-[16px] md:rounded-[24px] border border-black">
                <span className="text-[#252525] text-center font-jost text-xs xs:text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
                  Advantages
                </span>
              </button>
              
              <div className="w-full flex flex-col items-start gap-2 xs:gap-3 sm:gap-4 md:gap-[24px]">
                <h3 className="w-full text-black font-jost text-base xs:text-xl sm:text-2xl md:text-[27px] font-semibold leading-[120%]">
                  Enhanced Management of Unstructured Data
                </h3>
                <p className="w-full text-black font-jost text-sm xs:text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
                  Enhance the bot's ability to comprehend and address a wide range of inquiries while elevating the overall quality of its responses.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-[462px] h-[180px] xs:h-[220px] sm:h-[250px] md:h-[293px] relative rounded-[10px] xs:rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden">
              <video 
                ref={videoRefs[0]}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                onCanPlay={() => handleVideoInView(0)}
              >
                <source src="/videos/platform/first.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full flex flex-col md:flex-row p-2 xs:p-4 sm:p-6 md:p-8 lg:p-[20px_48px] justify-between items-center rounded-[10px] xs:rounded-[16px] sm:rounded-[24px] md:rounded-[32px] bg-white">
            <div className="w-full md:w-1/2 lg:w-[559px] flex flex-col items-start gap-2 xs:gap-4 sm:gap-6 md:gap-[32px] mb-3 md:mb-0">
              <button className="flex px-1.5 py-0.5 xs:px-3 xs:py-2 sm:px-4 sm:py-[8px] md:px-5 md:py-[10px] justify-center items-center rounded-[8px] xs:rounded-[16px] md:rounded-[24px] border border-black">
                <span className="text-[#252525] text-center font-jost text-xs xs:text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
                  Advantages
                </span>
              </button>
              
              <div className="w-full flex flex-col items-start gap-2 xs:gap-3 sm:gap-4 md:gap-[24px]">
                <h3 className="w-full text-black font-jost text-base xs:text-xl sm:text-2xl md:text-[27px] font-semibold leading-[120%]">
                  A budget-friendly alternative
                </h3>
                <p className="w-full text-black font-jost text-sm xs:text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
                  The combination of Appit's unique models with Generative AI enhances the efficiency of bot interactions, resulting in a more cost-effective solution.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-[462px] h-[180px] xs:h-[220px] sm:h-[250px] md:h-[293px] relative rounded-[10px] xs:rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden">
              <video 
                ref={videoRefs[1]}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                onCanPlay={() => handleVideoInView(1)}
              >
                <source src="/videos/platform/second.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full flex flex-col md:flex-row p-2 xs:p-4 sm:p-6 md:p-8 lg:p-[20px_48px] justify-between items-center rounded-[10px] xs:rounded-[16px] sm:rounded-[24px] md:rounded-[32px] bg-white">
            <div className="w-full md:w-1/2 lg:w-[559px] flex flex-col items-start gap-2 xs:gap-4 sm:gap-6 md:gap-[32px] mb-3 md:mb-0">
              <button className="flex px-1.5 py-0.5 xs:px-3 xs:py-2 sm:px-4 sm:py-[8px] md:px-5 md:py-[10px] justify-center items-center rounded-[8px] xs:rounded-[16px] md:rounded-[24px] border border-black">
                <span className="text-[#252525] text-center font-jost text-xs xs:text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
                  Advantages
                </span>
              </button>
              
              <div className="w-full flex flex-col items-start gap-2 xs:gap-3 sm:gap-4 md:gap-[24px]">
                <h3 className="w-full text-black font-jost text-base xs:text-xl sm:text-2xl md:text-[27px] font-semibold leading-[120%]">
                  The interface is simple to construct
                </h3>
                <p className="w-full text-black font-jost text-sm xs:text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
                  Accelerate the deployment of your AI Assistant by designing and personalizing it without needing technical skills. Seamlessly launch it across platforms like WhatsApp, Facebook, Instagram, and others.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-[462px] h-[180px] xs:h-[220px] sm:h-[250px] md:h-[293px] relative rounded-[10px] xs:rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden">
              <video 
                ref={videoRefs[2]}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                onCanPlay={() => handleVideoInView(2)}
              >
                <source src="/videos/platform/third.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Card 4 */}
          <div className="w-full flex flex-col md:flex-row p-2 xs:p-4 sm:p-6 md:p-8 lg:p-[20px_48px] justify-between items-center rounded-[10px] xs:rounded-[16px] sm:rounded-[24px] md:rounded-[32px] bg-white">
            <div className="w-full md:w-1/2 lg:w-[559px] flex flex-col items-start gap-2 xs:gap-4 sm:gap-6 md:gap-[32px] mb-3 md:mb-0">
              <button className="flex px-1.5 py-0.5 xs:px-3 xs:py-2 sm:px-4 sm:py-[8px] md:px-5 md:py-[10px] justify-center items-center rounded-[8px] xs:rounded-[16px] md:rounded-[24px] border border-black">
                <span className="text-[#252525] text-center font-jost text-xs xs:text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
                  Advantages
                </span>
              </button>
              
              <div className="w-full flex flex-col items-start gap-2 xs:gap-3 sm:gap-4 md:gap-[24px]">
                <h3 className="w-full text-black font-jost text-base xs:text-xl sm:text-2xl md:text-[27px] font-semibold leading-[120%]">
                  Precise Answers
                </h3>
                <p className="w-full text-black font-jost text-sm xs:text-base sm:text-lg md:text-[21px] font-normal leading-[120%]">
                  Our Generative AI Assistants employ strong safeguards to ensure that the information generated is directly aligned with the provided responses.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-[462px] h-[180px] xs:h-[220px] sm:h-[250px] md:h-[293px] relative rounded-[10px] xs:rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden">
              <video 
                ref={videoRefs[3]}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                onCanPlay={() => handleVideoInView(3)}
              >
                <source src="/videos/platform/fourth.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}