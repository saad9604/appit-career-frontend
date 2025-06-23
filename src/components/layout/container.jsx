import { cn } from "../../lib/utils";
import React, { JSX } from "react";

const Container = ({ children, shrink = false, className }) => {
    return (
        <div
            className={cn(`mx-auto w-full py-8 md:py-14 3xl:py-20 px-4 sm:px-8 xl:px-8`, shrink ? "max-w-[70rem]" : "max-w-full xl:max-w-[1200px] 3xl:max-w-[1440px]", className)}
        >
            {children}
        </div>
    );
};

export default Container;
