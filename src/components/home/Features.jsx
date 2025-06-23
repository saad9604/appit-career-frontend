'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Features() {
  const [hoveredFeature, setHoveredFeature] = useState(null)

  const features = [
    {
      icon: "/images/fluent_arrow-growth-20-filled.svg",
      title: "Lightning Fast Development",
      description: "Rapid prototyping and development using modern frameworks, agile methodologies, and cutting-edge technologies to deliver solutions faster than ever.",
      color: "from-blue-500 to-cyan-500",
      stats: "50% Faster Delivery"
    },
    {
      icon: "/images/mage_heart-health-fill.svg",
      title: "Enterprise Security",
      description: "Bank-level security protocols with advanced encryption, multi-factor authentication, and compliance with industry standards like GDPR and SOC 2.",
      color: "from-green-500 to-emerald-500",
      stats: "99.9% Secure"
    },
    {
      icon: "/images/mingcute_ai-fill.svg",
      title: "AI-Powered Solutions",
      description: "Leverage artificial intelligence and machine learning to create smart applications that adapt, learn, and provide intelligent insights for your business.",
      color: "from-purple-500 to-indigo-500",
      stats: "AI-Enhanced"
    },
    {
      icon: "/images/fluent-color_star-20.svg",
      title: "Quality Assurance",
      description: "Comprehensive testing including automated unit tests, integration testing, performance testing, and manual QA to ensure bug-free applications.",
      color: "from-orange-500 to-red-500",
      stats: "99.5% Bug-Free"
    },
    {
      icon: "/images/icon-park-solid_time.svg",
      title: "24/7 Expert Support",
      description: "Round-the-clock technical support with dedicated account managers, real-time monitoring, and proactive maintenance to keep your systems running.",
      color: "from-pink-500 to-rose-500",
      stats: "< 1 Hour Response"
    },
    {
      icon: "/images/material-symbols_search-rounded.svg",
      title: "Performance Optimized",
      description: "Highly optimized applications with advanced caching, lazy loading, code splitting, and performance monitoring to ensure exceptional user experience.",
      color: "from-teal-500 to-cyan-500",
      stats: "98% Performance Score"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-6">
            <Image
              src="/images/fluent-color_star-20.svg"
              alt="Star"
              width={20}
              height={20}
              className="mr-2"
            />
            <span className="text-primary-600 text-sm font-semibold">Our Capabilities</span>
          </div>
          <h2 className="heading-secondary mb-6">
            Why Choose <span className="text-gradient">AppitSoftware</span>?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We deliver exceptional software solutions with cutting-edge technology, proven methodologies, and unmatched expertise that drives real business results.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`card h-full transform transition-all duration-500 group-hover:scale-105 ${
                hoveredFeature === index ? 'shadow-2xl' : ''
              }`}>
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={32}
                      height={32}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-20 blur-xl transition-opacity duration-300 ${
                    hoveredFeature === index ? 'opacity-40' : 'opacity-0'
                  }`}></div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Stats Badge */}
                  <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${feature.color} rounded-full`}>
                    <span className="text-white text-sm font-semibold">{feature.stats}</span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Image
                src="/images/ic_round-work-outline.svg"
                alt="Projects"
                width={40}
                height={40}
                className="mb-3 filter brightness-0 invert opacity-80"
              />
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-primary-100">Projects Delivered</div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/fluent_people-team-16-filled.svg"
                alt="Clients"
                width={40}
                height={40}
                className="mb-3 filter brightness-0 invert opacity-80"
              />
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-primary-100">Happy Clients</div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/icon-park-solid_time.svg"
                alt="Experience"
                width={40}
                height={40}
                className="mb-3 filter brightness-0 invert opacity-80"
              />
              <div className="text-4xl font-bold text-white mb-2">5+</div>
              <div className="text-primary-100">Years Experience</div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/mage_heart-health-fill.svg"
                alt="Support"
                width={40}
                height={40}
                className="mb-3 filter brightness-0 invert opacity-80"
              />
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-primary-100">Support Available</div>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Technologies We Master</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'React', image: '/images/a37f2d45e319a33a058ddc7c7ffb56af3516007a.png' },
              { name: 'Node.js', image: '/images/ac7baec1206974446f97a2d3b69315fa63b3ca86.png' },
              { name: 'TypeScript', image: '/images/0e7c1515c9e64245a6f1795f221c6a9b4b26ce4f.png' },
              { name: 'AI/ML', image: '/images/mingcute_ai-fill.svg' },
              { name: 'Next.js', image: '/images/a394a80b6146fdcfa34e183f44227958468de098.png' },
              { name: 'Python', image: '/images/b1fc7a7009d257b35448437ef89ad513df977c2c.png' }
            ].map((tech, index) => (
              <div key={index} className="flex items-center space-x-3 px-4 py-3 bg-gray-100 rounded-lg hover:bg-primary-100 hover:text-primary-600 transition-colors duration-300 group">
                <Image
                  src={tech.image}
                  alt={tech.name}
                  width={24}
                  height={24}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-gray-700 font-medium group-hover:text-primary-600">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}