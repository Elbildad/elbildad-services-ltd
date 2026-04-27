'use client';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const features = [
  {
    title: "Expert Guidance",
    description: "With years of experience in the Nigeria-China trade corridor, we provide unparalleled insights to help you navigate complex markets and sourcing challenges.",
    icon: "ion:briefcase-outline"
  },
  {
    title: "Verified Suppliers",
    description: "We bridge the gap between you and high-quality Chinese manufacturers, ensuring every product meets your standards through rigorous factory vetting.",
    icon: "ion:checkmark-circle-outline"
  },
  {
    title: "End-to-End Support",
    description: "From initial product sourcing and secure payments to shipping and customs clearing, we handle every detail so you can focus on growing your business.",
    icon: "ion:shield-checkmark-outline"
  }
];

export default function WhyChoose() {
  return (
    <section id="why-choose" className="py-20 bg-white dark:bg-midnight overflow-hidden">
      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2" data-aos="fade-right">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-midnight_text dark:text-white leading-tight">
              Why People Choose <span className="text-primary">Elbildad Services</span>
            </h2>
            
            <div className="space-y-10">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon icon={feature.icon} className="text-3xl text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-midnight_text dark:text-white group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Content */}
          <div className="lg:w-1/2 relative" data-aos="fade-left">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="/images/why-choose.png" 
                alt="International Trade and Logistics" 
                width={800} 
                height={900}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Decorative Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent"></div>
            </div>
            
            {/* Floating Experience Card */}
            <div className="absolute -bottom-10 -left-10 bg-primary p-8 rounded-3xl text-white shadow-xl hidden md:block" data-aos="zoom-in" data-aos-delay="300">
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold">10+</div>
                <div className="text-lg leading-tight opacity-90">Years of <br/> Excellence</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
