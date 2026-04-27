'use client';
import { Icon } from '@iconify/react';

const promises = [
  {
    title: "Quality First",
    description: "Every client receives the same level of care and attention, regardless of order size.",
    icon: "ion:ribbon-outline"
  },
  {
    title: "Speed & Efficiency",
    description: "We handle the entire process to ensure your goods arrive as quickly as possible.",
    icon: "ion:flash-outline"
  },
  {
    title: "Full Transparency",
    description: "Transparent service fee model with factory prices and no hidden charges.",
    icon: "ion:eye-outline"
  },
  {
    title: "Customer Satisfaction",
    description: "Committed to building long-term trust through personalized and reliable support.",
    icon: "ion:happy-outline"
  }
];

export default function Promise() {
  return (
    <section id="promise" className='dark:bg-semidark bg-light'>
      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-midnight_text dark:text-white" data-aos="fade-up">Our Promise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise, index) => (
            <div 
              key={index} 
              className="group"
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon icon={promise.icon} className="text-4xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-midnight_text dark:text-white group-hover:text-primary transition-colors duration-300">{promise.title}</h3>
              <p className="text-gray text-base leading-relaxed">{promise.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 p-8 md:p-12 bg-primary rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden" data-aos="zoom-in">
          <div className="relative z-10 text-left">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to source smarter?</h3>
            <p className="text-white opacity-80 text-lg">Expand your business or explore opportunities in China today.</p>
          </div>
          <div className="relative z-10">
            <a href="https://wa.me/2348032775756" target="_blank" className="bg-white text-primary px-10 py-4 rounded-full font-bold text-xl hover:shadow-xl transition-all inline-flex items-center gap-2">
              <Icon icon="ion:logo-whatsapp" /> Chat on WhatsApp
            </a>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
        </div>
      </div>
    </section>
  );
}
