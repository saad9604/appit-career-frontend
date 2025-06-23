"use client";

import React from "react";
import { cn } from "../../../lib/utils";
import Image from "next/image";

const KeyFeaturedCard = ({
    title,
    imageSrc,
    para,
    className,
    height,
    simpleBG = false
}) => {
    return (
        <div
            className={cn(
                "relative w-full border-2 rounded-4xl shadow-xl p-4 sm:p-5 text-black group bg-white transition-all duration-500 ease-in-out group-hover:duration-500",
                simpleBG ? "hover:bg-[#0066B3] hover:text-white" : "hover:bg-gradient-to-b hover:from-[#0066B3] hover:to-[#002C4D] hover:text-white",
                height ? "h-fit" : "h-full",
                className
            )}
        >
            {/* Image */}
            <div className="w-full h-full max-h-44 overflow-hidden sm:max-h-60 xl:max-h-80 mb-5">
                <Image
                    src={imageSrc}
                    alt={title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>

            {/* Text Content */}
            <div className="flex flex-col px-2 sm:px-4 transition-colors h-full max-h-40 duration-500 ease-in-out">
                <h3 className="text-base sm:text-xl font-semibold text-start">{title}</h3>
                <p className="text-sm sm:text-base text-start pointer-events-none">{para}</p>
            </div>
        </div>
    );
};

export default KeyFeaturedCard;