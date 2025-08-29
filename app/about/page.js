"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function About() {
  useEffect(() => {
    document.title = "About – Fan Pulse"
  }, [])

  return (
    <>
      <div className="min-h-screen flex flex-col items-center py-12 px-4">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">
          About Us
        </h1>

        <div className="bg-slate-900 shadow-lg shadow-gray-500 rounded-xl w-[90vw] md:w-[70vw] p-8 text-white">

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center mb-10">
            FanPulse is a personal project built using the{" "}
            <span className="text-purple-400">MERN stack</span> and{" "}
            <span className="text-purple-400">Next.js</span> with{" "}
            <span className="text-purple-400">Tailwind CSS</span>. It&apos;s designed
            to be a simple yet powerful crowdfunding platform for creators —
            whether you’re a musician, gamer, artist, or educator. Your fans can
            directly contribute to your work and help fuel your creative journey.
          </p>

          <div className="bg-white h-1 opacity-10 w-full mb-10"></div>

          <h2 className="text-2xl flex justify-center underline font-bold mb-4">
            Test It Out
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center">
            You can try FanPulse by visiting the usernames{" "}
            <span className="text-purple-400 font-semibold">
              <Link href="/RishiJaiswal" target="_blank">RishiJaiswal</Link>
            </span>{" "}or{" "}
            <span className="text-purple-400 font-semibold">
              <Link href="/FanPulseDev" target="_blank">FanPulseDev</Link>
            </span>{" "}— these pages are set up for dummy payments.
            <span className="text-green-400 font-bold"> FanPulseDev is only for testing dynamic content and interface behavior, so it cannot receive money.</span> Use the UPI ID{" "}
            <span className="text-purple-400 font-semibold">test@razorpay</span>{" "}in Razorpay&apos;s <span className="font-semibold">Test Mode</span>.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center">
            If you want to receive test payments yourself, you can get your own
            Razorpay test credentials (key_id and key_secret) by following this guide:{" "}
            <a
              href="https://youtu.be/qbS_AFSUze4?si=wjKYcCqjwK6QF5Uz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 font-semibold underline"
            >
              Watch Tutorial
            </a>
          </p>

          <div className="bg-white h-1 opacity-10 w-full mb-10"></div>

          <h2 className="text-2xl flex justify-center underline font-bold mb-4">
            Important Note
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed text-center mb-8">
            Always use your <span className="text-purple-400 font-semibold">Razorpay Test Mode</span> credentials for testing.
            Never share your live secret key publicly. This ensures your financial details remain safe while exploring FanPulse’s features.
          </p>

          <div className="bg-white h-1 opacity-10 w-full mb-10"></div>

          <h2 className="text-2xl flex justify-center underline font-bold mb-4">
            Built with Passion
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed text-center mb-10">
            FanPulse is more than just a demo project — it&apos;s a learning journey in
            full-stack development, payment gateway integration, and modern UI
            design. As a creator myself, I understand how valuable direct audience
            support can be, and FanPulse is my way of making that process easier
            for everyone.
          </p>

          <div className="bg-white h-1 opacity-10 w-full mb-10"></div>

          {/* Connect Section */}
          <h2 className="text-2xl flex justify-center underline font-bold mb-4">
            Connect with Me
          </h2>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/RishiJaiswal24/FanPulse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-400 text-3xl transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/rishi-jaiswal-037615229/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-400 text-3xl transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
