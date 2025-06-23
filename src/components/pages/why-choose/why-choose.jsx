import React from 'react'
import Section from '../../layout/section-box'
import Container from '../../layout/container'
import HeadingPara from '../../layout/heading'
import WhyChooseCard from './choose-card';

const WhyChoose = ({ data, heading }) => {
    return (
        <Section className='bg-grey1'>
            <Container>
                <div className='flex flex-col items-center justify-center text-center gap-8 sm:gap-12 lg:gap-20'>
                    {heading && (
                        <HeadingPara
                            title={heading.title}
                            para={heading.para}
                            highlightText={heading.highlightText}
                            classNamePara='font-semibold'
                            sectionHeading
                        />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                        {data.map((item, index) => (
                            <WhyChooseCard
                                key={index}
                                image={item.image}
                                iconSrc={item.iconSrc}
                                title={item.title}
                                hoverColor={item.hoverColor}
                                textBlack={item.textBlack}
                                description={item.description}
                            />
                        ))}
                    </div>

                </div>
            </Container>
        </Section>
    )
}

export default WhyChoose