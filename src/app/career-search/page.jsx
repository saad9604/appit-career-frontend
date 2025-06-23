'use client';

import { Suspense } from 'react';
import ScrollToTopButton from '../../components/home/ScrollToTopButton';
import CareerSearchHero from '../../components/career/CareerSearchHero';
import AboveFooterSection from '../../components/home/AboveFooterSection';
import Footer from '../../components/home/Footer';
import Header from '../../components/home/Header';
import SearchBreadcrumb from '../../components/career/SearchBreadcrumb';
import MoreJobCards from '../../components/career/MoreJobCards';
import CareerFirstSection from '../../components/career/CareerFirstSection';
import CareerSearchBar from '../../components/career/CareerSearchBar';
import React from 'react';

// Main page component (doesn't use useSearchParams)
const CareerSearchPage = () => {
  return (
    <>
      <Header />
      <CareerSearchHero />
      <div className="w-full bg-[#FFFF] min-h-screen flex flex-col items-center font-['Jost']">
        <div className="w-full mt-8 sm:mt-10 md:mt-12">
          <SearchBreadcrumb />
        </div>
        
        {/* Wrap the component that uses useSearchParams in Suspense */}
        <Suspense fallback={<div className="p-8 text-center">Loading search functionality...</div>}>
          <SearchContentWithParams />
        </Suspense>
        
        <CareerFirstSection />
        <AboveFooterSection />
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

// This component uses useSearchParams and is wrapped in Suspense
const SearchContentWithParams = () => {
  // Import useSearchParams inside the component that's wrapped in Suspense
  const { useSearchParams } = require('next/navigation');
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  return (
    <>
      <CareerSearchBar />
      
      {searchQuery && (
        <Suspense fallback={<div className="p-8 text-center">Loading search results...</div>}>
          <SearchResults searchQuery={searchQuery} />
        </Suspense>
      )}
      
      <MoreJobCards className="bg-white" />
    </>
  );
};

// Import SearchResults here to avoid error
import SearchResults from '../../components/career/SearchResults';

export default CareerSearchPage;