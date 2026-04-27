"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getImgPath } from "@/utils/pathUtils";

const ContactForm = () => {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const reset = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      subject: "",
      message: ""
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setLoader(false);
      reset();
    }, 1000);
  };

  return (
    <>
      <section className="dark:bg-darkmode lg:pb-24 pb-16 px-4">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-8 items-center">  
            <div className="col-span-6">
              <h2 className="max-w-72 text-[40px] leading-[1.2] font-bold mb-9">Get in Touch</h2>
              {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline"> Your message has been sent. We will get back to you soon.</span>
                </div>
              ) : null}
              <form onSubmit={handleSubmit} className="flex flex-wrap w-full m-auto justify-between">
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="firstname" className="pb-3 inline-block text-17">First Name*</label>
                    <input
                      id='firstname'
                      type='text'
                      name='firstname'
                      required
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full text-17 px-4 rounded-lg py-2.5 border-border dark:border-dark_border border-solid dark:text-white  dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="lastname" className="pb-3 inline-block text-17">Last Name*</label>
                    <input
                      id='lastname'
                      type='text'
                      name='lastname'
                      required
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full text-17 px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white  dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                    />
                  </div>
                </div>
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="email" className="pb-3 inline-block text-17">Email address*</label>
                    <input
                      id='email'
                      type='email'
                      name='email'
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full text-17 px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white  dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="subject" className="pb-3 inline-block text-17">Subject</label>
                    <input
                      id='subject'
                      type='text'
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full text-17 px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white  dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                      placeholder="e.g., Sourcing Inquiry"
                    />
                  </div>
                </div>
                <div className="mx-0 my-2.5 w-full">
                  <label htmlFor="message" className="pb-3 inline-block text-17">Message*</label>
                  <textarea
                    id='message'
                    name='message'
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full text-17 px-4 rounded-lg py-2.5 border-border outline-none dark:text-white dark:bg-darkmode border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0"
                  ></textarea>
                </div>
                <div className="mx-0 my-2.5 w-full">
                  <button type="submit" disabled={loader} className="bg-primary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:bg-blue-700 disabled:bg-gray-400">
                    {loader ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
            <div className="col-span-6 h-[600px]">
              <Image
                src={getImgPath("/images/contact-page/contact.jpg")}
                alt="Contact"
                width={1300}
                height={0}
                quality={100}
                className="w-full h-full object-cover bg-no-repeat bg-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
