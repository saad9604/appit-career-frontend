import { officeAddresses } from '../../../assets/data'
import Container from '../../../components/layout/container'
import Section from '../../../components/layout/section-box'
import Image from 'next/image'
import React from 'react'

const Locations = () => {
    return (
        <Section>
            <Container className='!pt-0'>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {officeAddresses.slice(1, 4).map((office, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-gradient-to-b from-[#0066B3] to-[#002C4D] text-white p-6 3xl:p-8 rounded-4xl shadow-lg py-12 3xl:py-14">
                            <Image
                                src={office.flag}
                                alt={office.country}
                                width={50}
                                height={50}
                                className="w-12 h-full"
                            />
                            <p className="text-base 3xl:text-xl">
                                {office.country}: {office.address}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    )
}

export default Locations