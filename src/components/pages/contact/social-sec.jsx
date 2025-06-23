import Container from "../../../components/layout/container"
import Section from "../../../components/layout/section-box"
import Image from "next/image"
import Link from "next/link"

export default function SocialSection() {
    const socialLinks = [
        {
            name: "FACEBOOK",
            handle: "Appit Solutions",
            url: "https://facebook.com",
            src: "/images/svgs/facebook.svg",
        },
        {
            name: "X",
            handle: "Appit Solutions",
            url: "https://x.com",
            src: "/images/svgs/x.svg",

        },
        {
            name: "YOUTUBE",
            handle: "Appit Solutions",
            url: "https://youtube.com",
            src: "/images/svgs/youtube.svg",

        },
        {
            name: "INSTAGRAM",
            handle: "Appit Solutions",
            url: "https://instagram.com",
            src: "/images/svgs/instagram.svg",

        },
        {
            name: "LINKEDIN",
            handle: "Appit Solutions",
            url: "https://linkedin.com",
            src: "/images/svgs/linkedin.svg",

        },
    ]

    return (
        <Section>
            <Container className="container mx-auto !py-8 !pb-0">
                <div className="mb-6">
                    <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">SOCIAL</h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Follow us for the latest updates</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {socialLinks.map((social) => (
                        <Link
                            key={social.name}
                            href={social.url}
                            className="flex items-center space-x-3 group hover:bg-gray-50 p-3 rounded-lg transition-colors"
                        >
                            <Image
                                src={social.src}
                                alt={social.name}
                                width={100}
                                height={100}
                                className="sm:w-10 w-6 sm:h-10 h-6"
                            />
                            <div>
                                <p className="font-semibold text-gray-900">{social.name}</p>
                                <p className="text-sm text-gray-600">{social.handle}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
