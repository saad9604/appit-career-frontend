import React from "react";
import Image from "next/image";
import Section from "./section-box";
import Container from "./container";
import ImageWithText from "./imgae-with-text";
import { cn } from "../../lib/utils";

const ImageWithTextSection = ({
  sectionsData,
  backgroundImages = [],
  className,
  contentClassName,
  mediaClassName,
  sameWidth = false,
}) => {
  return (
    <Section className={className}>
      {/* Optional background images */}
      {backgroundImages.map((img, index) => (
        <Image
          key={index}
          src={img.src}
          alt={img.alt}
          width={500}
          height={500}
          className={cn(img.className)}
          priority
        />
      ))}

      <Container className="space-y-6 xl:space-y-10">
        {sectionsData.map((section, idx) => (
          <ImageWithText
            key={idx}
            {...section}
            contentClassName={contentClassName}
            mediaClassName={mediaClassName}
            sameWidth={sameWidth}
          />
        ))}
      </Container>
    </Section>
  );
};

export default ImageWithTextSection;
