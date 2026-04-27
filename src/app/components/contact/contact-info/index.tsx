import React from "react";
import Link from "next/link";
import { getImgPath } from "@/utils/pathUtils";
import { Icon } from "@iconify/react";

const ContactInfo = () => {
  return (
    <>
      <section className="dark:bg-darkmode pt-8 pb-0 px-4">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
          <div className="flex md:flex-row flex-col lg:items-center items-start justify-center md:gap-28 gap-8">
            <div className="flex sm:flex-row flex-col items-start sm:gap-8 gap-4">
              <div className="bg-primary/20 w-3.75 h-3.75 flex items-center justify-center rounded-full">
                <Icon icon="ion:logo-whatsapp" className="text-3xl text-primary" />
              </div>
              <div className="flex md:flex-col sm:flex-row flex-col md:items-start sm:items-center items-start h-full justify-between">
                <div>
                  <span className="text-midnight_text dark:text-white text-xl font-bold">
                    WhatsApp Us
                  </span>
                  <p className="text-midnight_text/70 font-normal text-xl max-w-80 pt-3 pb-7 dark:text-gray">
                    Chat with us at 08032775756 for immediate support.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col items-start sm:gap-8 gap-4">
              <div className="bg-primary/20 w-3.75 h-3.75 flex items-center justify-center rounded-full">
                <Icon icon="ion:location-outline" className="text-3xl text-primary" />
              </div>
              <div className="flex md:flex-col sm:flex-row flex-col md:items-start sm:items-center items-start h-full justify-between">
                <div>
                  <span className="text-midnight_text dark:text-white text-xl font-bold">
                    Office Address
                  </span>
                  <p className="text-midnight_text/70 font-normal text-xl max-w-80 pt-3 pb-7 dark:text-gray">
                    No. 117 Unguwar Wambai, Inna Plaza, Gwarzo Road, Kano, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:pt-32 pt-11 md:pb-28 pb-8">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249801.69584327898!2d8.087994056422085!3d11.964010977613459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae7fa11a804ab5%3A0x932ce64ad57b47e1!2sInna%20Plaza!5e0!3m2!1sen!2sng!4v1777203949046!5m2!1sen!2sng" width="1114" height="477" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg w-full shadow-xl"></iframe>
          </div>
        </div>
        <div className="border-b border-solid border-border dark:border-dark_border"></div>
      </section>
    </>
  );
};

export default ContactInfo;
