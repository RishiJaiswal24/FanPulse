import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
        
        {/* Left side */}
        <div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left">
          <span className="text-sm">
            &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Fan Pulse</span>. All rights reserved.
          </span>
          <span className="text-xs text-gray-500">
            Empowering creators through fan support
          </span>
        </div>

        {/* Right side */}
        <div className="flex space-x-6">
          <Link href="/about" className="hover:text-purple-400 transition text-sm">About</Link>
          <Link href="/feedback" className="hover:text-purple-400 transition text-sm">Feedback</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
