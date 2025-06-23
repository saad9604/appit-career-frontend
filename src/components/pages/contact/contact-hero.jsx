import Container from "../../../components/layout/container"
import HeadingPara from "../../../components/layout/heading"
import Section from "../../../components/layout/section-box"

const ContactHero = () => {
    return (
        <Section
            videoSrc='/videos/contact-us.mp4' 
            className='h-[543px] w-full mx-auto flex-shrink-0'>
            <Container>
                <HeadingPara 
                    title='CONTACT US' 
                    para="Let's Build Something Great Together" 
                    classNameHeading='text-4xl sm:text-5xl md:text-6xl xl:text-7xl 3xl:text-[100px] text-white' 
                    classNamePara='font-semibold text-base md:text-lg xl:text-2xl 3xl:text-[27px]' 
                    className='text-center text-white mt-10' 
                />
            </Container>
        </Section>
    )
}

export default ContactHero