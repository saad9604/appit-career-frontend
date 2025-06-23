"use client";

import { tabData } from '../../../../assets/tabs-data';
import React, { useState } from 'react'
import Section from '../../../layout/section-box';
import Container from '../../../layout/container';
import HeadingPara from '../../../layout/heading';
import { Tabs, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Card, CardContent } from '../../../ui/card';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const VerticalTabs = () => {
    const [activeTab, setActiveTab] = useState("internet-powered")
    const [imageLoading, setImageLoading] = useState(false)

    const handleTabChange = (value) => {
        setImageLoading(true)
        setActiveTab(value)
        // Simulate image loading delay for smooth transition
        setTimeout(() => setImageLoading(false), 300)
    }

    const currentTab = tabData.find((tab) => tab.id === activeTab) || tabData[0]

    return (
        <Section>
            <Container>
                <div className="flex flex-col items-center justify-center text-center gap-8 3xl:gap-20">
                    <div className="max-w-2xl">
                        <h2 className="text-[40px] font-semibold leading-[120%] font-jost text-[#252525]">
                            <span className="text-[#EC1C26]">Features</span> of legal AI
                        </h2>
                        <p className="mt-4 font-semibold">
                            Explore features that boost your productivity. From document automation
                            to advanced research, we've got the hard work covered.
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col w-full lg:flex-row gap-6 xl:gap-8 items-start">
                        {/* Tabs Navigation */}
                        <Tabs value={activeTab} onValueChange={handleTabChange} orientation="vertical" className="w-full lg:w-[30%] 3xl:w-[25%]">
                            <TabsList className="flex flex-col sm:flex-row lg:flex-col flex-wrap justify-start h-auto w-full p-0 gap-4">
                                {tabData.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <TabsTrigger
                                            key={tab.id}
                                            value={tab.id}
                                            onMouseEnter={() => handleTabChange(tab.id)}
                                            className={`
                                                h-[80px] w-full px-[40px] py-0 flex items-center justify-between rounded-[24px]
                                                ${isActive ? 'bg-[#0066B3] text-white' : 'bg-white text-black'} 
                                                hover:bg-[#0066B3] hover:text-white shadow-sm
                                            `}
                                        >
                                            <span className="text-left">{tab.label}</span>
                                            <ChevronRight size={24} className="flex-shrink-0" />
                                        </TabsTrigger>
                                    )
                                })}
                            </TabsList>
                        </Tabs>

                        {/* Content Area */}
                        <Card className="overflow-hidden shadow-equal rounded-3xl bg-white w-full lg:w-[70%] 3xl:w-[75%]">
                            <CardContent className="p-4 pt-0">
                                {/* Image Section */}
                                <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-700">
                                    <div
                                        className={`absolute inset-0 transition-opacity duration-300 ${imageLoading ? "opacity-50" : "opacity-100"}`}
                                    >
                                        <Image
                                            src={currentTab.image || "/placeholder.svg"}
                                            alt={currentTab.title}
                                            width={800}
                                            height={800}
                                            className="object-cover h-full w-full"
                                        />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="px-2 md:px-4">
                                    <HeadingPara para={currentTab.description} className='items-start'
                                        classNamePara='text-start font-semibold' />

                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Container>
        </Section>
    )
}

export default VerticalTabs