import { cn } from '../../lib/utils';
import React from 'react';

const HeadingPara = ({
    className,
    classNameHeading,
    classNamePara,
    para,
    title = '',
    sectionHeading = false,
    highlightText = '',
}) => {
    const defaultHeading = sectionHeading
        ? 'text-2xl md:text-3xl xl:text-[40px]'
        : 'text-xl md:text-2xl xl:text-[27px]';

    // ✅ Highlight logic
    const getHighlightedTitle = () => {
        // If title isn't a plain string, render as-is (e.g. an <Image> node)
        if (typeof title !== 'string' || !highlightText || !title.includes(highlightText)) {
            return title;
        }

        const parts = title.split(highlightText);
        return (
            <>
                {parts[0]}
                <span className="text-[#EC1C26] font-jost text-[40px] font-semibold leading-[120%] text-center">{highlightText}</span>
                {parts[1]}
            </>
        );
    };

    return (
        <div className={cn('flex flex-col text-black gap-3 sm:gap-5', className)}>
            <h2 className={cn('capitalize font-semibold font-jost text-[40px] leading-[120%] text-[#252525]', defaultHeading, classNameHeading)}>
                {getHighlightedTitle()}
            </h2>
            <p className={cn('text-base md:text-lg xl:text-xl', classNamePara)}>{para}</p>
        </div>
    );
};

export default HeadingPara;
