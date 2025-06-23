'use client';

import { Suspense, useEffect, useState } from 'react';
import ScrollToTopButton from '../../../components/home/ScrollToTopButton';
import AboveFooterSection from '../../../components/home/AboveFooterSection';
import Footer from '../../../components/home/Footer';
import Header from '../../../components/home/Header';
import CareerApplyHero from '../../../components/career/CareerApplyHero';
import CareerApplyBreadcrumb from '../../../components/career/CareerApplyBreadcrumb';
import JobApplicationSection from '../../../components/career/JobApplicationSection';
import Benefits from '../../../components/career/Benefits';
import { useParams } from "next/navigation";
import axios from 'axios';

const CareerApplyContent = () => {
  const [jobData, setJobData] = useState(null);
  const { id } = useParams();
  console.log("Job ID Test:", id);
  console.log("test...")
  useEffect(() => {
    console.log('useEffect running');
    console.log('id inside useEffect:', id);
    const fetchJobData = async () => {
      console.log('Inside fetchJobData');
      if (!id) return;
      try {
        const response = await axios.get(`https://appit-backend-wb0d.onrender.com/get-job-id/${id}`);
        console.log('response', response.data);
        setJobData(response.data.job);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };
    fetchJobData();
  }, [id]);
  return (
    <>
      <Header />
      <CareerApplyHero />
      <div className="w-full bg-[#FFFF] min-h-screen flex flex-col items-center font-['Jost']">
        <div className="w-full pl-3 sm:pl-6 md:pl-10 lg:pl-16 mt-2 sm:mt-4 md:mt-6">
          <CareerApplyBreadcrumb />
        </div>
        {jobData ? (
          <JobApplicationSection jobData={jobData} />
        ) : (
          <div className="py-10 text-center text-gray-500">Loading job details...</div>
        )}
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