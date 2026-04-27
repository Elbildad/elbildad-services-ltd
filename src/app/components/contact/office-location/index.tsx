import React from "react";
import Link from "next/link";

const Location = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <>
      <section className="bg-primary lg:py-24 py-16 px-4">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
            <div className="">
                <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 border-b border-solid border-white border-opacity-50 pb-11">
                    <div className="col-span-3">
                        <h2 className="text-white text-4xl leading-[1.2] font-bold">Kano Office (HQ)</h2>
                    </div>
                    <div className="col-span-3">
                        <p className="text-xl text-IceBlue font-normal max-w-64 text-white text-opacity-80">No. 117 Unguwar Wambai, Inna Plaza, Gwarzo Road, Kano, Nigeria</p>
                    </div>
                    <div className="col-span-3">
                        <Link href="mailto:elbildadservicesltd@gmail.com" className="text-xl text-white font-medium underline">elbildadservicesltd@gmail.com</Link>
                        <Link href="tel:+2348032775756" className="text-xl text-white text-opacity-80 flex items-center gap-2 hover:text-opacity-100 w-fit"><span className="text-white !text-opacity-40">Call</span>+234 803 277 5756</Link>
                    </div>
                </div>
                <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 pt-12">
                    <div className="col-span-3">
                        <h2 className="text-white text-4xl leading-[1.2] font-bold">China Presence</h2>
                    </div>
                    <div className="col-span-3">
                        <p className="text-xl text-white text-opacity-80 font-normal max-w-64">Sourcing hubs in Guangzhou and Yiwu, connecting you directly to factories.</p>
                    </div>
                    <div className="col-span-3">
                        <p className="text-xl text-white font-medium">Global Procurement Solutions</p>
                        <p className="text-xl text-white text-opacity-80">Factory Vetting & Inspection</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Location;
