import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { Header } from "../_components/Header";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Voca",
  description: "Generated by create next app",
};


config.autoAddCss = false

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed top-0 right-0 left-0">
          <Header></Header>
        </div>
        <div className="mt-14 container mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
