"use client";

import React from "react";
import { cn } from "../../../lib/utils";
import Image from "next/image";

const WhyChooseCard = ({
  image,
  title,
  iconSrc,
  description,
  hoverColor,
  className,
  textBlack,
}) => {
  const textColor = textBlack ? "text-black" : "text-white";

  return (
    <div
      className={cn(
        "relative h-44 sm:h-[260px] w-full bg-cover bg-center rounded-4xl shadow-xl overflow-hidden",
        className
      )}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Main content */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center justify-center h-full p-4 sm:p-5 text-center",
          textColor
        )}
      >
        <Image
          src={iconSrc}
          alt={title}
          width={100}
          height={100}
          className="w-20 sm:w-28 md:w-32 h-20 sm:h-28 md:h-32 mb-3"
        />
        <p className="text-xl font-semibold">{title}</p>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 top-0 left-0 z-10 flex items-center justify-center p-6 rounded-4xl opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{ backgroundColor: hoverColor }}
      >
        <p className={cn("text-base sm:text-xl text-center", textColor)}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default WhyChooseCard;