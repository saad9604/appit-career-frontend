import { Inter, Poppins, Jost } from 'next/font/google'
import './globals.css'
import '@/styles/animations.css'
// import EmailJSInitializer from '@/components/email/EmailJSInitializer'
import ChatbotWithPathCheck from '@/components/layout/ChatbotWithPathCheck'
import ClientLayout from './clientLayout'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap'
})

const jost = Jost({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-jost',
  display: 'swap'
})

export const metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: {
    default: 'AppitSoftware - Leading Software Development Company',
    template: '%s | AppitSoftware'
  },
  description: 'Transform your digital vision with AppitSoftware. We create innovative web applications, mobile apps, and enterprise solutions that drive business growth and deliver exceptional user experiences.',
  keywords: [
    'software development',
    'web development',
    'mobile app development',
    'custom software',
    'enterprise solutions',
    'UI/UX design',
    'cloud solutions',
    'DevOps',
    'digital transformation'
  ],
  authors: [{ name: 'AppitSoftware' }],
  creator: 'AppitSoftware',
  publisher: 'AppitSoftware',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'AppitSoftware',
    title: 'AppitSoftware - Leading Software Development Company',
    description: 'Transform your digital vision with innovative software solutions. Web development, mobile apps, and enterprise solutions that drive business growth.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AppitSoftware - Software Development Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@appitsoftware',
    creator: '@appitsoftware',
    title: 'AppitSoftware - Leading Software Development Company',
    description: 'Transform your digital vision with innovative software solutions. Web development, mobile apps, and enterprise solutions.',
    images: ['/twitter-image.png'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${jost.variable}`}>
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AppitSoftware",
              "description": "Leading software development company specializing in web applications, mobile apps, and enterprise solutions.",
              "url": "/",
              "logo": "/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "hello@appitsoftware.com"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Tech Avenue",
                "addressLocality": "Silicon Valley",
                "addressRegion": "CA",
                "postalCode": "94043",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://linkedin.com/company/appitsoftware",
                "https://twitter.com/appitsoftware",
                "https://github.com/appitsoftware"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} font-jost antialiased`}>
        {/* <EmailJSInitializer /> */}
        <ClientLayout>
          {children}
        </ClientLayout>
        <ChatbotWithPathCheck />
      </body>
    </html>
  )
}