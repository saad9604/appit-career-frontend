import React from 'react'
import Section from '../../layout/section-box'
import Container from '../../layout/container'
import HeadingPara from '../../layout/heading'
import UMForm from '../../../components/form'

const ContactForm = () => {

    return (
        <Section>
            <Container className='!py-8 !pt-10'>
                <div className='flex flex-col items-center justify-center text-center gap-8 sm:gap-12 lg:gap-20'>
                    <div className="text-center font-jost text-[40px] font-semibold leading-[120%] text-[#252525]">
                        Start Your <span className="text-[#EC1C26]">New Project</span> With APPIT
                    </div>
                    <p className="font-semibold">Let's Try! Get A Call From Support Team!</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center" >

                        <div className="flex flex-col w-full h-full justify-center" >
                            <HeadingPara
                                title="We Love What We Do — And It Shows"
                                para="At APPIT Software, we're passionate about helping businesses save time, streamline operations, and boost performance.
                                With our custom software solutions, cloud capabilities, and AI-driven innovations, we transform your ideas into scalable, future-ready applications. Backed by deep expertise across IT services and digital transformation, we work as your technology partner to unlock growth, enhance efficiency, and drive measurable outcomes.
                                Let's connect and explore how APPIT Software can help move your business forward — smarter, faster, and stronger."
                                className="gap-4 items-start"
                                classNamePara="text-base sm:text-xl text-start"
                            />
                        </div>

                        <UMForm />

                    </div>

                </div>
            </Container>
        </Section >
    )
}

export default ContactForm