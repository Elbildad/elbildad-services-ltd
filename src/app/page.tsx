import React from 'react';
import { Metadata } from "next";
import Hero from './components/home/hero';
import Services from './components/home/services';
import About from './components/home/about';
import Promise from './components/home/promise';
import WhyChoose from './components/home/why-choose';
import Partners from './components/home/partners';

export const metadata: Metadata = {
  title: "Elbildad Services LTD | China-Nigeria Procurement & Sourcing",
  description: "Your trusted bridge for high-quality Chinese manufacturers and the Nigerian market. Factory prices, secure payments, and reliable delivery.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Promise />
      <WhyChoose />
      <Partners />
    </main>
  )
}
