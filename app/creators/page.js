"use client"
import React from "react";
import Link from "next/link";

const Page = () => {
  
  const extraCreators = [
    { id: "ZupiDoop", name: "Zupi Doop", role: "Youtuber" },
    { id: "KarioBeat", name: "Kario Beat", role: "Dancer" },
    { id: "Sketchora", name: "Sketchora", role: "Artist" },
    { id: "Oryan", name: "Oryan", role: "Music" },
    { id: "SolsticeGray", name: "SolsticeGray", role: "Writer" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold text-white mb-10 text-center">
        Meet Our <span className="text-purple-400">Creators</span>
      </h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        
        
        <div className="relative group bg-slate-900 hover:bg-slate-800 transition rounded-2xl shadow-lg p-6 flex flex-col justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-500 text-white font-bold text-xl shadow-md">
              R
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Rishi Jaiswal</h2>
              <p className="text-sm text-gray-400">Full Stack Developer</p>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-green-400 bg-green-900/40 px-3 py-1 w-fit rounded-lg">
            Eligible for Demo Payment
          </p>
          <Link
            href={`/RishiJaiswal`}
            className="mt-6 text-center w-full py-2 px-4 rounded-xl font-medium text-white bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 transition"
          >
            View Profile
          </Link>
        </div>

        <div className="relative group bg-slate-900 hover:bg-slate-800 transition rounded-2xl shadow-lg p-6 flex flex-col justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-xl shadow-md">
              F
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">FanPulseDev</h2>
              <p className="text-sm text-gray-400">Community Project</p>
            </div>
          </div>
          <Link
            href={`/FanPulseDev`}
            className="mt-6 text-center w-full py-2 px-4 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition"
          >
            View Profile
          </Link>
        </div>

        {extraCreators.map((creator) => (
          <div
            key={creator.id}
            className="relative group bg-slate-900 hover:bg-slate-800 transition rounded-2xl shadow-lg p-6 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-xl shadow-md">
                {creator.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{creator.name}</h2>
                <p className="text-sm text-gray-400">{creator.role}</p>
              </div>
            </div>
            <Link
              href={`/${creator.id}`}
              className="mt-6 text-center w-full py-2 px-4 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
