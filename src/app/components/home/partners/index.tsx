'use client';
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Icon } from '@iconify/react';

const partners = [
  { name: "Alibaba", icon: "simple-icons:alibaba" },
  { name: "Made in China", icon: "simple-icons:china" },
  { name: "Global Sources", icon: "simple-icons:global" },
  { name: "DHL", icon: "simple-icons:dhl" },
  { name: "FedEx", icon: "simple-icons:fedex" },
  { name: "Maersk", icon: "simple-icons:maersk" },
  { name: "Cosco", icon: "simple-icons:cosco" },
];

export default function Partners() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <section className="py-12 bg-section dark:bg-semidark border-y border-border dark:border-dark_border">
      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4">
        <h3 className="text-center text-gray dark:text-gray text-lg font-medium mb-10 uppercase tracking-widest">
          Trusted by Industry Leaders & Logistics Partners
        </h3>
        <div className="partners-slider">
          <Slider {...settings}>
            {partners.map((partner, index) => (
              <div key={index} className="px-8 outline-none">
                <div className="flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                  <Icon icon={partner.icon} className="text-5xl md:text-6xl text-midnight_text dark:text-white mb-2" />
                  <span className="text-sm font-semibold text-midnight_text dark:text-white">{partner.name}</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
