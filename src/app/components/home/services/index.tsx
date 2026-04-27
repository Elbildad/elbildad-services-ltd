'use client';
import Image from 'next/image';
import Link from 'next/link';
import { getImgPath } from '@/utils/pathUtils';
import { Icon } from '@iconify/react';

const services = [
  {
    title: "Procurement & Sourcing",
    description: "High-quality products directly from trusted Chinese manufacturers (1688, Alibaba).",
    icon: "ion:cart-outline",
    delay: 100
  },
  {
    title: "Supplier Vetting",
    description: "Thorough audits, production capacity assessment, and quality assurance checks.",
    icon: "ion:shield-checkmark-outline",
    delay: 200
  },
  {
    title: "Cross-Border Payments",
    description: "Secure payments in CNY, USD, or HKD. Pay comfortably in Naira.",
    icon: "ion:card-outline",
    delay: 300
  },
  {
    title: "Visa & Study in China",
    description: "Professional assistance with visa processing and guidance for studying in China.",
    icon: "ion:school-outline",
    delay: 400
  },
  {
    title: "Business Development",
    description: "Strategic support to optimize operations and scale your import/export business.",
    icon: "ion:trending-up-outline",
    delay: 500
  }
];

export default function Services() {
  return (
    <section id="services" className='dark:bg-darkmode bg-section'>
      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-midnight_text dark:text-white" data-aos="fade-up">Our Services</h2>
          <p className="text-gray text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            We deliver a complete suite of solutions that support every stage of your China-Nigeria trade journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 bg-white dark:bg-darklight rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50 dark:border-dark_border/50 group"
              data-aos="fade-up" 
              data-aos-delay={service.delay}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Icon icon={service.icon} className="text-3xl text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-midnight_text dark:text-white group-hover:text-primary transition-colors duration-300">{service.title}</h3>
              <p className="text-gray text-base leading-relaxed">{service.description}</p>
            </div>
          ))}
          {/* RFQ Card */}
          <div 
            className="p-8 bg-primary rounded-2xl shadow-lg flex flex-col justify-center items-center text-center text-white"
            data-aos="fade-up" 
            data-aos-delay="600"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to Source?</h3>
            <p className="mb-8 opacity-90">Submit your request today and get a professional quote within 48 hours.</p>
            <Link href="/rfq" className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all">
              Submit RFQ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
