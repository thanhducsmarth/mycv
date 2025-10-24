import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Thanh Duc Photo | Award-Winning Photographer",
  description: "Professional photography services specializing in portraits, weddings, and events. Award-winning photographer Thanh Duc captures life's precious moments with artistry and passion.",
  keywords: "photographer, photography, portraits, weddings, events, professional photography, Thanh Duc, Vietnam photographer",
  authors: [{ name: "Thanh Duc" }],
  openGraph: {
    title: "Thanh Duc Photo | Professional Photographer",
    description: "Award-winning photography services in Vietnam. Specializing in portraits, weddings, and corporate events.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
