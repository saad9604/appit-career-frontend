'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function About() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      title: "Our Mission",
      content: {
        heading: "Empowering Businesses Through Innovation",
        description: "We're on a mission to transform how businesses operate in the digital age. Our goal is to create software solutions that not only solve today's challenges but anticipate tomorrow's opportunities.",
        points: [
          "Deliver cutting-edge technology solutions",
          "Foster innovation and digital transformation",
          "Build long-term partnerships with our clients",
          "Maintain the highest standards of quality and security"
        ]
      }
    },
    {
      title: "Our Vision",
      content: {
        heading: "Leading the Future of Software Development",
        description: "To be the most trusted software development partner globally, known for our innovative solutions, exceptional quality, and unwavering commitment to client success.",
        points: [
          "Pioneer next-generation technologies",
          "Set industry standards for quality and innovation",
          "Expand our global reach and impact",
          "Build a sustainable and inclusive tech ecosystem"
        ]
      }
    },
    {
      title: "Our Values",
      content: {
        heading: "Principles That Drive Everything We Do",
        description: "Our core values shape our culture, guide our decisions, and ensure we deliver exceptional value to our clients while fostering a positive work environment.",
        points: [
          "Excellence in every project we undertake",
          "Integrity and transparency in all our dealings",
          "Innovation as a driving force for progress",
          "Collaboration and teamwork as our foundation"
        ]
      }
    }
  ]

  const achievements = [
    {
      icon: "/images/fluent-color_star-20.svg",
      title: "ISO 27001 Certified",
      description: "Internationally recognized security management system"
    },
    {
      icon: "/images/mage_heart-health-fill.svg",
      title: "SOC 2 Compliant",
      description: "Strict data security and availability standards"
    },
    {
      icon: "/images/fluent_arrow-growth-20-filled.svg",
      title: "AWS Advanced Partner",
      description: "Recognized expertise in cloud solutions"
    },
    {
      icon: "/images/fluent_people-team-16-filled.svg",
      title: "Agile Certified Team",
      description: "Scrum Masters and certified agile practitioners"
    }
  ]

  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/images/71d73f9ee4f5eb5732e0572006f24d4a61e972b4.jpg",
      description: "Visionary leader with 10+ years in software development"
    },
    {
      name: "Sarah Johnson", 
      role: "CTO & Co-Founder",
      image: "/images/01ea97f081f3ee5fa13dbe4e0fc1890927399878.jpg",
      description: "Technical expert in scalable architecture"
    },
    {
      name: "Mike Chen",
      role: "Lead Developer",
      image: "/images/71d73f9ee4f5eb5732e0572006f24d4a61e972b4.jpg",
      description: "Full-stack specialist with modern frameworks"
    },
    {
      name: "Emily Davis",
      role: "Head of Design", 
      image: "/images/01ea97f081f3ee5fa13dbe4e0fc1890927399878.jpg",
      description: "Creative designer focused on user experience"
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-6">
            <Image
              src="/images/fluent_people-team-16-filled.svg"
              alt="Team"
              width={20}
              height={20}
              className="mr-2"
            />
            <span className="text-primary-600 text-sm font-semibold">About Us</span>
          </div>
          <h2 className="heading-secondary mb-6">
            Building Tomorrow's <span className="text-gradient">Software Today</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            At AppitSoftware, we are passionate about creating innovative software solutions that transform businesses and enhance user experiences worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {tabs[activeTab].content.heading}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {tabs[activeTab].content.description}
              </p>
              <ul className="space-y-3">
                {tabs[activeTab].content.points.map((point, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Image
                        src="/images/fluent-color_star-20.svg"
                        alt="Check"
                        width={16}
                        height={16}
                      />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">
                Learn More About Us
              </button>
              <button className="btn-outline">
                View Our Portfolio
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
              </div>

              <div className="relative z-10 space-y-8">
                {/* Header */}
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2">5+ Years</h3>
                  <p className="text-primary-100">of Software Excellence</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold">100+</div>
                    <div className="text-primary-200 text-sm">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-primary-200 text-sm">Clients</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">25+</div>
                    <div className="text-primary-200 text-sm">Team Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">99%</div>
                    <div className="text-primary-200 text-sm">Success Rate</div>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Client Satisfaction</span>
                      <span>98%</span>
                    </div>
                    <div className="w-full bg-primary-400 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>On-Time Delivery</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-primary-400 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl animate-float">
              <Image
                src="/images/fluent_arrow-growth-20-filled.svg"
                alt="Growth"
                width={40}
                height={40}
                className="filter brightness-0 invert"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl animate-float" style={{animationDelay: '2s'}}>
              <Image
                src="/images/mage_heart-health-fill.svg"
                alt="Quality"
                width={32}
                height={32}
                className="filter brightness-0 invert"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Our Expert Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card text-center group hover:shadow-xl transition-all duration-300">
                <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Our Certifications & Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-all duration-300">
                  <Image
                    src={achievement.icon}
                    alt={achievement.title}
                    width={32}
                    height={32}
                    className="group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}