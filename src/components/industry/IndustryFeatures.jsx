'use client';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function IndustryFeatures() {
  const { ref: sectionRef, isInView } = useScrollAnimation();
  return (
    <section ref={sectionRef} className="w-full py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col items-center gap-5 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-[32px] max-w-[1240px]">
        {/* Heading Container */}
        <h2 className={`w-full text-center font-jost text-xl xs:text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-semibold leading-[120%] px-2 transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          How Oracle EBS R12 Customizations <span className="text-[#EC1C26] block xs:inline">Support Your Business</span>
        </h2>
        
        {/* Container with 4 Features */}
        <div className={`w-full flex flex-col overflow-hidden transition-all duration-1000 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* First Feature - Image Left, Text Right */}
          <div className="flex flex-col lg:flex-row items-stretch w-full group">
            {/* Image Container */}
            <div 
              className="w-full lg:w-1/2 h-[180px] xs:h-[200px] sm:h-[220px] md:h-[250px] lg:h-auto bg-cover bg-center bg-no-repeat overflow-hidden"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: "url('/images/industry/first.jpg')" }}
              ></div>
            </div>
            
            {/* Text Container */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-[16px] p-4 xs:p-5 sm:p-6 md:p-7 lg:p-[30px_24px]">
              <h3 className="text-[#055087] text-center font-jost text-xl xs:text-2xl sm:text-[24px] md:text-[27px] font-semibold leading-[120%]">
                High Sea Bond Management
              </h3>
              
              <p className="text-[#252525] font-jost text-xs xs:text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-[120%] self-stretch">
                In the oil and gas industry, importing equipment and chemicals often involves goods being in transit under bond before they clear customs. With our Oracle EBS R12 customization, companies can easily track these "in-transit" items, automate bond approvals, manage expiration dates, calculate duties, and update inventory and accounts as soon as the goods are cleared.
              </p>
            </div>
          </div>
          
          {/* Second Feature - Text Left, Image Right */}
          <div className="flex flex-col lg:flex-row items-stretch w-full group">
            {/* Text Container */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-[16px] p-4 xs:p-5 sm:p-6 md:p-7 lg:p-[30px_24px] order-2 lg:order-1">
              <h3 className="text-[#055087] text-center font-jost text-xl xs:text-2xl sm:text-[24px] md:text-[27px] font-semibold leading-[120%]">
                Collateral Finance Agreement
              </h3>
              
              <p className="text-[#252525] font-jost text-xs xs:text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-[120%] self-stretch">
                Large oil and gas projects often use financing backed by assets or equipment. Our solution helps track these collateral items, manage repayment terms, and ensure compliance with financial agreements. It also provides alerts for risks or breaches and connects with your treasury or banking systems for smooth operations.
              </p>
            </div>
            
            {/* Image Container */}
            <div 
              className="w-full lg:w-1/2 h-[180px] xs:h-[200px] sm:h-[220px] md:h-[250px] lg:h-auto bg-cover bg-center bg-no-repeat overflow-hidden order-1 lg:order-2"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: "url('/images/industry/second.jpg')" }}
              ></div>
            </div>
          </div>
          
          {/* Third Feature - Image Left, Text Right */}
          <div className="flex flex-col lg:flex-row items-stretch w-full group">
            {/* Image Container */}
            <div 
              className="w-full lg:w-1/2 h-[180px] xs:h-[200px] sm:h-[220px] md:h-[250px] lg:h-auto bg-cover bg-center bg-no-repeat overflow-hidden"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: "url('/images/industry/third.png')" }}
              ></div>
            </div>
            
            {/* Text Container */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-[16px] p-4 xs:p-5 sm:p-6 md:p-7 lg:p-[30px_24px]">
              <h3 className="text-[#055087] text-center font-jost text-xl xs:text-2xl sm:text-[24px] md:text-[27px] font-semibold leading-[120%]">
                Online Tendering System
              </h3>
              
              <p className="text-[#252525] font-jost text-xs xs:text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-[120%] self-stretch">
                Oil and gas companies frequently issue tenders for services, supplies, or transportation. Our customized online tendering system allows vendors to register, submit bids, and go through a clear evaluation process. It automatically compares bids and connects with your purchasing system when contracts are awarded.
              </p>
            </div>
          </div>
          
          {/* Fourth Feature - Text Left, Image Right */}
          <div className="flex flex-col lg:flex-row items-stretch w-full group">
            {/* Text Container */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-[16px] p-4 xs:p-5 sm:p-6 md:p-7 lg:p-[30px_24px] order-2 lg:order-1">
              <h3 className="text-[#055087] text-center font-jost text-xl xs:text-2xl sm:text-[24px] md:text-[27px] font-semibold leading-[120%]">
                Landed Cost Estimation
              </h3>
              
              <p className="text-[#252525] font-jost text-xs xs:text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-[120%] self-stretch">
                Understanding the total cost of imported goods is crucial. Our customization helps estimate all expenses—like freight, insurance, customs, and transport—so you know the actual landed cost. It compares estimated and real costs and integrates with your financial systems for accurate accounting.
              </p>
            </div>
            
            {/* Image Container */}
            <div 
              className="w-full lg:w-1/2 h-[180px] xs:h-[200px] sm:h-[220px] md:h-[250px] lg:h-auto bg-cover bg-center bg-no-repeat overflow-hidden order-1 lg:order-2"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: "url('/images/industry/fourth.png')" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
