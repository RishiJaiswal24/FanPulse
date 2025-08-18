import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fan Pulse – Empowering Creators Through Fan Support",
  description: "Fan Pulse is a platform where creators connect with their audience, showcase their work, and receive funding to bring ideas to life.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>



          <div className="text-white relative h-full w-full bg-slate-950">
            <Navbar />

            <div className="relative">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] 
                    bg-[size:14px_24px] 
                    [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
              <div className="relative">{children}</div>
            </div>

            <Footer />
          </div>

          {/* <div className="text-white min-h-screen items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
            <Navbar />
            {children}
          <Footer />
          </div> */}
        </SessionWrapper>
      </body>
    </html>
  );
}
