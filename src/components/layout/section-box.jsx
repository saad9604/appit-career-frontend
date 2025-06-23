import React from "react";
import { cn } from "../../lib/utils"; // Adjust the path to your `cn` utility if needed

const Section = ({
  videoSrc,
  imageSrc,
  className,
  children,
  overlayClassName,
  imageSrcClassName,
  ...props
}) => {
  return (
    <section
      className={cn(
        "relative w-full max-w-full flex flex-col items-center justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Background Video */}
      {videoSrc && (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Background Image */}
      {imageSrc && (
        <div
          className={cn(
            `absolute top-0 left-0 w-full h-full bg-center bg-no-repeat z-0`,
            imageSrcClassName
          )}
          style={{ 
            backgroundImage: `url(${imageSrc})`,
            backgroundPosition: '-10.634px -249.33px',
            backgroundSize: '102.752% 136.263%'
          }}
        />
      )}

      {/* Optional overlay (if you want to dim the background) */}
      {(videoSrc || imageSrc) && (
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full bg-black/55",
            overlayClassName
          )}
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default Section;
