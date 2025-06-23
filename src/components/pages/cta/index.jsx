import { OutlineButton } from '../../../components/layout/buttons/custom.button'
import Container from '../../../components/layout/container'
import HeadingPara from '../../../components/layout/heading'
import Section from '../../../components/layout/section-box'
import React from 'react'

const CTA = () => {
    return (
        <Section>
            <Container className='py-8 md:py-8 3xl:py-16'>
                <div className='flex flex-col items-center justify-center text-center gap-8 xl:gap-16'>
                    <HeadingPara title='Start Your Digital Transformation'
                        highlightText='Digital Transformation'
                        sectionHeading
                    />

                    <div className="flex items-center flex-col sm:flex-row max-w-3xl w-full justify-center gap-4 sm:gap-10">
                        <OutlineButton className='w-full sm:w-1/2'>
                            Contact Us
                        </OutlineButton>
                        <OutlineButton className='w-full sm:w-1/2'>
                            Email
                        </OutlineButton>
                    </div>

                </div>
            </Container>
        </Section>
    )
}

export default CTA