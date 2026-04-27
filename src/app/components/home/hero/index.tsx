"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getImgPath } from "@/utils/pathUtils";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative pt-44 pb-0 dark:bg-darklight bg-no-repeat bg-gradient-to-b from-white from-10% dark:from-darkmode to-herobg to-90% dark:to-darklight overflow-x-hidden">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md relative z-10">
        <div className="grid lg:grid-cols-12 grid-cols-1 items-center gap-8 pb-16">
          <div
            className="flex flex-col lg:col-span-6 justify-center items-start px-4 sm:px-0"
            data-aos="fade-right"
          >
            <div className="mb-6">
              <h1 className="md:text-[60px] leading-[1.1] text-4xl text-midnight_text dark:text-white font-bold mb-6">
                Your Trusted Bridge for <span className="text-primary">China-Nigeria</span> Trade
              </h1>
              <p className="text-lg md:text-xl text-gray mb-8 max-w-xl">
                Driving Nigeria’s industrial and business growth by providing world-class sourcing solutions at factory prices — without the usual headaches.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/rfq" className="btn text-center">
                  Submit Sourcing Request
                </Link>
                <Link href="#services" className="btn_white border-primary text-primary hover:bg-primary hover:text-white text-center">
                  Explore Services
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <Image src={getImgPath(`/images/avatar/avatar_${i}.jpg`)} alt="user" width={40} height={40} />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-midnight_text dark:text-white">Trusted by 500+ Businesses</p>
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative" data-aos="fade-left">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white/20">
              <Image
                src={getImgPath("/images/hero/hero-image.png")}
                alt="Elbildad Services Trade"
                width={800}
                height={600}
                style={{ width: "100%", height: "auto" }}
                className="transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-1"></div>
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-skyBlue/20 rounded-full blur-3xl -z-1"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
