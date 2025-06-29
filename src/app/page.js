'use client';

import { useRef } from 'react';
import Header from "@/components/Header";
import SpecialityMenu from "@/components/SpecialityMenu";
import TopDoctors from "@/components/TopDoctors";
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';

export default function Home() {
  const topDoctorsRef = useRef(null);

  const scrollToTopDoctors = () => {
    topDoctorsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Header onScrollClick={scrollToTopDoctors} />
      <SpecialityMenu />
      <div ref={topDoctorsRef}>
        <TopDoctors />
      </div>
      <Banner/>
      <Footer/>
    </div>
  );
}
