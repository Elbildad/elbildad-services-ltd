export const metadata = {
  title: "Elbildad Services LTD — Procurement & Global Sourcing",
  description:
    "Nigeria's premier China sourcing and procurement company. We handle factory sourcing, import clearing, freight logistics, and visa services — from Kano to the world.",
  keywords: "procurement Nigeria, China sourcing, import Nigeria, Kano procurement, visa services Nigeria",
  openGraph: {
    title: "Elbildad Services LTD",
    description: "Global Sourcing. Delivered.",
    url: "https://elbildadservices.com",
    siteName: "Elbildad Services",
    locale: "en_NG",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
    <meta name="facebook-domain-verification" content="jbnm26jm3i5j7n2h00dv6tg5e064zz" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#0A0F1E" }}>
        {children}
      </body>
    </html>
  );
}
