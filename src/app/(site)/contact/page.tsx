
import React from "react";
import { Metadata } from "next";
import HeroSub from "@/app/components/shared/hero-sub";
import ContactInfo from "@/app/components/contact/contact-info";
import ContactForm from "@/app/components/contact/form";
import Location from "@/app/components/contact/office-location";
export const metadata: Metadata = {
  title: "Contact Us | Elbildad Services LTD",
  description: "Get in touch with Elbildad Services LTD for all your China-Nigeria sourcing and procurement needs.",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <>
      <HeroSub
        title="Contact Us"
        description="We're here to help you bridge the gap between China and Nigeria. Reach out to us for sourcing, procurement, or business development inquiries."
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactInfo />
      <ContactForm />
      <Location />
    </>
  );
};

export default page;
