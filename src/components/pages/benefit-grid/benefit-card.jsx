"use client";

import React from "react";
import { cn } from "../../../lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { useResponsiveScreen } from "../../../hooks/use-mobile";

const BenefitCard = ({ title, iconSrc, para, className, specialLogoStyle = false }) => {
  const { isMobile } = useResponsiveScreen();

  return (
    <motion.div
      whileHover={isMobile ? "rest" : "hover"}
      initial="rest"
      animate="rest"
      className={cn(
        "relative h-full sm:h-56 lg:h-[210px] w-full bg-card-black rounded-4xl shadow-xl p-5 text-white overflow-hidden transition-all duration-300 group flex flex-col items-start justify-center gap-5",
        className
      )}
    >
      {/* Icon + Title */}
      {isMobile ? (
        <div className="flex items-center gap-5">
          <div className={specialLogoStyle ? 
            "flex items-center justify-center w-[40px] h-[40px] p-[10px] aspect-square rounded-[50px] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]" :
            ""}
          >
            <Image
              src={iconSrc}
              alt={title}
              width={100}
              height={100}
              className={specialLogoStyle ? "w-full h-full" : "w-12 h-12"}
            />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-start">
            {title}
          </h3>
        </div>
      ) : (
        <motion.div
          variants={{
            rest: { y: 0 },
            hover: { y: -24 },
          }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-5 h-full"
        >
          <div className={specialLogoStyle ? 
            "flex items-center justify-center w-[40px] h-[40px] p-[10px] aspect-square rounded-[50px] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]" :
            ""}
          >
            <Image
              src={iconSrc}
              alt={title}
              width={100}
              height={100}
              className={specialLogoStyle ? "w-full h-full" : "w-12 h-12"}
            />
          </div>
          <h3 className="text-base sm:text-xl font-semibold text-start">
            {title}
          </h3>
        </motion.div>
      )}

      {/* Description */}
      {isMobile ? (
        <p className="text-base text-start pointer-events-none">{para}</p>
      ) : (
        <motion.p
          variants={{
            rest: { opacity: 0, y: -6 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.4 }}
          className="sm:absolute bottom-5 left-5 right-5 text-xs sm:text-sm md:text-base text-start pointer-events-none max-h-[120px] overflow-y-auto"
        >
          {para}
        </motion.p>
      )}
    </motion.div>
  );
};

export default BenefitCard;