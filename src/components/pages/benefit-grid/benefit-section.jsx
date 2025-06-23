import React from 'react'
import Section from '../../layout/section-box'
import Container from '../../layout/container'
import HeadingPara from '../../layout/heading'
import BenefitCard from './benefit-card'

const Benefits = ({ data = [], heading }) => {
    return (
        <Section>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 w-full">
                        {data.map((item, index) => (
                            <BenefitCard
                                key={index}
                                iconSrc={item.iconSrc}
                                title={item.title}
                                para={item.para}
                                specialLogoStyle={item.specialLogoStyle}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    )
}

export default Benefits