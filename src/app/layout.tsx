if (typeof window === 'undefined') {
  (global as any).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0
  };
}
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Aoscompo from "@/utils/aos";
const dmsans = DM_Sans({ subsets: ["latin"] });
import NextTopLoader from 'nextjs-toploader';
import { AppContextProvider } from "../context-api/PropertyContext";
import Footer from "./components/layout/footer";
import ScrollToTop from "./components/scroll-to-top";
import Header from "./components/layout/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elbildad Services LTD | China-Nigeria Procurement & Sourcing",
  description: "Your trusted bridge for high-quality Chinese manufacturers and the Nigerian market. Factory prices, secure payments, and reliable delivery.",
  verification: {
    other: {
      "facebook-domain-verification": ["ucbngzeglaekv2tdvo01l21q5n6ukh"],
    },
  },
  openGraph: {
    title: "Elbildad Services LTD | China-Nigeria Procurement & Sourcing",
    description: "Your trusted bridge for high-quality Chinese manufacturers and the Nigerian market.",
    url: "https://elbildad.com",
    siteName: "Elbildad Services",
    images: [
      {
        url: "/images/why-choose.png",
        width: 1200,
        height: 630,
        alt: "Elbildad Services - China-Nigeria Procurement",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elbildad Services LTD | China-Nigeria Procurement & Sourcing",
    description: "Your trusted bridge for high-quality Chinese manufacturers and the Nigerian market.",
    images: ["/images/why-choose.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmsans.className}`}>
      <AppContextProvider>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <Aoscompo>
            <Header />
            <NextTopLoader />
            {children}
            <Footer />
          </Aoscompo>
          <ScrollToTop />
        </ThemeProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
