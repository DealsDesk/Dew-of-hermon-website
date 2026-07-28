import type { Metadata } from "next";
import { display, body } from "./fonts";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dew of Hermon | Health & Wellness",
  description:
    "Precision body scans and personalised Green World supplement packages, inspired by the pure dew of Mount Hermon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Nav />
        <main className="pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
