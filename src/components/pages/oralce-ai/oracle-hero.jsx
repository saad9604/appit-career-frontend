import React from 'react'
import Section from '../../layout/section-box'
import Container from '../../layout/container'
import HeadingPara from '../../layout/heading'

const OracleHero = () => {
    return (
        <Section videoSrc='/videos/hero_technology.mp4' className='min-h-screen'>
            <Container>
                <HeadingPara title='Oracle AI' para='Revolutionize your operations with AI-driven insights, intelligent automation, and enhanced customer experiences.' classNameHeading='text-4xl sm:text-5xl md:text-6xl xl:text-7xl 3xl:text-[100px] text-white' classNamePara='font-semibold text-base md:text-lg xl:text-2xl 3xl:text-[27px]' className='max-w-[600px] text-white mt-10 sm:mt-0' />
            </Container>
        </Section>
    )
}

export default OracleHero