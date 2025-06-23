'use client';

import { Suspense, useEffect } from 'react';
import ScrollToTopButton from '../../components/home/ScrollToTopButton';
import AboveFooterSection from '../../components/home/AboveFooterSection';
import Footer from '../../components/home/Footer';
import Header from '../../components/home/Header';
import CareerApplyHero from '../../components/career/CareerApplyHero';
import CareerApplyBreadcrumb from '../../components/career/CareerApplyBreadcrumb';
import JobApplicationSection from '../../components/career/JobApplicationSection';
import Benefits from '../../components/career/Benefits';

const CareerApplyContent = () => {

  return (
    <>
      <Header />
      <CareerApplyHero />
      <div className="w-full bg-[#FFFF] min-h-screen flex flex-col items-center font-['Jost']">
        <div className="w-full pl-3 sm:pl-6 md:pl-10 lg:pl-16 mt-2 sm:mt-4 md:mt-6">
          <CareerApplyBreadcrumb />
        </div>
        <JobApplicationSection />
        <Benefits />
        <AboveFooterSection />
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default function CareerApplyPage() {
  return <CareerApplyContent />;
}