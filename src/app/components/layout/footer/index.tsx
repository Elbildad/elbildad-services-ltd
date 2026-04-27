"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from 'react';
import { PropertyContext } from '@/context-api/PropertyContext';
import { getImgPath } from '@/utils/pathUtils';
import { Icon } from '@iconify/react';

const Footer = () => {
  const { updateFilter } = useContext(PropertyContext)!;
  return (
    <footer className="relative z-10 bg-midnight_text dark:bg-semidark">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md pt-10 pb-5 px-0 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-4 col-span-12 flex items-center px-4 sm:px-0">
            <Link href="/" className="mb-6 flex items-center gap-2">
              <Image
                src={getImgPath("/images/logo/elbildad-logo.png")}
                alt="Elbildad Services Logo"
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-bold text-white tracking-tight">Elbildad</span>
                <span className="text-xs font-medium text-primary uppercase tracking-widest">Services</span>
              </div>
            </Link>
          </div>
          <div className="md:col-span-8 col-span-12 grid grid-cols-12 gap-4 px-4 sm:px-0">
            <div className="w-full lg:col-span-4 col-span-12">
              <h4 className="mb-4 text-lg text-white dark:text-white">
                Office Address
              </h4>
              <p className="mb-4 text-gray text-base">
                No. 117 Unguwar Wambai, Inna Plaza, Gwarzo Road, Kano, Nigeria
              </p>
              <div className="flex gap-4">
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray hover:bg-primary hover:text-white transition-all">
                  <Icon icon="ion:logo-facebook" className="text-xl" />
                </Link>
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray hover:bg-primary hover:text-white transition-all">
                  <Icon icon="ion:logo-instagram" className="text-xl" />
                </Link>
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray hover:bg-primary hover:text-white transition-all">
                  <Icon icon="ion:logo-twitter" className="text-xl" />
                </Link>
                <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray hover:bg-primary hover:text-white transition-all">
                  <Icon icon="ion:logo-linkedin" className="text-xl" />
                </Link>
              </div>
            </div>
            <div className="w-full lg:col-span-4 col-span-12">
              <h4 className="mb-4 text-lg text-white dark:text-white">
                Quick Links
              </h4>
              <ul>
                <li>
                  <Link href="/#services" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/rfq" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Request Quote (RFQ)
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full lg:col-span-4 col-span-12">
              <h4 className="mb-4 text-lg text-white dark:text-white">
                Our Services
              </h4>
              <ul>
                <li>
                  <Link href="/#services" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Procurement & Sourcing
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Supplier Vetting
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Cross-Border Payments
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border dark:border-dark_border py-8">
        <div className="container flex flex-col lg:flex-row justify-between items-center mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="lg:max-w-45 max-w-full text-center lg:text-left mb-4 lg:mb-0">
            <div className="flex lg:flex-nowrap flex-wrap lg:flex-row lg:gap-11 gap-4 text-base sm:text-lg md:text-xl text-black text-opacity-50">
              <p className="text-white">
                WhatsApp :
                <Link href="https://wa.me/2348032775756" target="_blank" className="text-gray hover:text-white"> 08032775756</Link>
              </p>
              <p className="text-white">
                Email :
                <Link href="mailto:info@elbildad.com" className="text-gray hover:text-white"> info@elbildad.com</Link>
              </p>
            </div>
          </div>
          <div className="max-w-lg w-full">
            <div className="flex justify-center lg:justify-end">
              <p className="items-center flex mr-3 text-base sm:text-lg md:text-xl font-bold text-white">Newsletter</p>
              <input
                type="text"
                className="py-3 dark:bg-darkmode dark:text-gray !rounded-r-none border border-transparent dark:border-dark_border dark:focus:border-primary focus-visible:outline-none rounded-l-lg px-3 w-full sm:w-auto "
                placeholder="Email address"
              />
              <button className="py-2 px-5 sm:px-9 bg-primary text-base text-white rounded-r-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border dark:border-dark_border py-4">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray text-sm">
            © {new Date().getFullYear()} Elbildad Services LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;