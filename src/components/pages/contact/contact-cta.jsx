import { OutlineButton } from '../../../components/layout/buttons/custom.button'
import Container from '../../../components/layout/container'
import Section from '../../../components/layout/section-box'
import React from 'react'

const ContactCTA = () => {
    return (
        <Section>
            <Container className='md:py-8 3xl:py-16 !py-8'>
                <div className='flex flex-col items-start justify-center text-start gap-8 xl:gap-10'>
                    <div className="w-[587px] max-w-full text-left">
                        <h2 className="font-jost text-[40px] font-semibold leading-[120%] text-[#252525] text-left">
                            Let's Talk About The <span className="text-[#EC1C26]">Next Big Thing</span>
                        </h2>
                    </div>

                    <div className="flex items-center flex-col sm:flex-row max-w-xl w-full justify-start gap-4 sm:gap-10">
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

export default ContactCTA