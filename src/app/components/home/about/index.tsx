'use client';
import Image from 'next/image';
import { getImgPath } from '@/utils/pathUtils';

export default function About() {
  return (
    <section id="about" className='dark:bg-darklight bg-white'>
      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 items-center">
          <div className="relative" data-aos="fade-right">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
              <Image
                src={getImgPath("/images/about/about-image.jpg")}
                alt="Elbildad Services Office"
                width={600}
                height={600}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-4xl font-bold text-white mb-1">Fast-Growing</p>
              <p className="text-white opacity-90">Sourcing Partner</p>
            </div>
          </div>
          <div data-aos="fade-left">
            <h2 className="text-4xl font-bold mb-6 text-midnight_text dark:text-white">About Elbildad Services</h2>
            <p className="text-lg text-gray mb-6 leading-relaxed">
              Elbildad Services LTD is a fast-growing China-to-Nigeria procurement, sourcing, and business development company that makes global trade simple, reliable, and profitable for Nigerian businesses and individuals.
            </p>
            <p className="text-lg text-gray mb-8 leading-relaxed">
              Founded by Muhammad Elbildad Isah, we serve as a trusted bridge between high-quality Chinese manufacturers and the Nigerian market. Whether you need vehicles, EVs, electronics, machinery, or industrial equipment, we handle the entire process so you don’t have to.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-section dark:bg-darkmode rounded-xl">
                <p className="text-3xl font-bold text-primary mb-1">Factory</p>
                <p className="text-midnight_text dark:text-white font-medium">Prices Only</p>
              </div>
              <div className="p-4 bg-section dark:bg-darkmode rounded-xl">
                <p className="text-3xl font-bold text-primary mb-1">Secure</p>
                <p className="text-midnight_text dark:text-white font-medium">Payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
