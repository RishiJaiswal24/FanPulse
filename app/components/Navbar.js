"use client"
import { React, useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const [find, setFind] = useState({ search: "" })
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)

  const handlechange = (e) => {
    const value = e.target.value
    const validPattern = /^[a-zA-Z0-9._]*$/
    if (!validPattern.test(value)) {
      return
    }
    setFind({ ...find, [e.target.name]: e.target.value })
  }

  return (
    <nav className='bg-slate-950 cursor-pointer z-50 shadow-black shadow-2xl text-white px-4 h-16 flex items-center justify-between'>
      <Link className='logo flex items-center text-lg font-bold' href={"/"}>
        <img
          src="/logo.png"
          alt="Logo"
          className="w-12 h-12 rounded-full object-contain"
        />
      </Link>

      <div className="flex">
        <div className="flex-1 max-w-md mx-4">
          <form className="relative w-full">
            <input
              type="search"
              id="default-search"
              className="block w-full p-2.5 pr-10 text-sm text-white border border-slate-700 rounded-lg bg-slate-800 cursor-pointer focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
              onChange={handlechange}
              name="search"
              value={find.search}
              placeholder="Search creators..."
            />
            <div className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3">
              <Link href={`${process.env.NEXT_PUBLIC_URL}/${find.search}`} >
                <svg
                  className="w-4 h-4 cursor-pointer text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </Link>
            </div>
          </form>
        </div>

        <div className="relative flex items-center gap-2">
          {session ? (
            <>
              <div className="md:block hidden">
                <ul className="flex" >
                  <li><Link href={`/`} className="block px-4 py-2 hover:bg-slate-800 cursor-pointer hover:font-bold">Home</Link></li>

                  {session.user.role !== "guest" ? (<>
                    <li><Link href={"/dashboard"} className="block px-4 py-2 hover:bg-slate-800 cursor-pointer hover:font-bold">Dashboard</Link></li>
                    {session?.user?.name && (
                      <li><Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-slate-800 cursor-pointer hover:font-bold">Your Page</Link></li>
                    )}
                  </>) : null}

                  {session.user.role !== "guest" ? (<li>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="block px-4 py-2 hover:bg-slate-800 cursor-pointer hover:font-bold">Sign out
                    </button>
                  </li>) :
                    (<li>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="block px-4 py-2 hover:bg-slate-800 cursor-pointer hover:font-bold">Leave
                      </button>
                    </li>)}
                </ul>
              </div>
              <button
                onBlur={() => setTimeout(() => setShowdropdown(false), 150)}
                onClick={() => setShowdropdown(!showdropdown)}
                className="md:hidden  text-white cursor-pointer bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
              focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium 
              rounded-lg text-sm px-5 py-2.5 flex items-center"
              >
                {session.user.name}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="m1 1 4 4 4-4" />
                </svg>
              </button>


              <div
                className={`absolute top-14 right-0 z-40 ${showdropdown ? "block" : "hidden"}
              bg-slate-900 cursor-pointer text-white rounded-lg shadow-lg w-44`}
              >
                <ul className="py-2 text-sm">
                  <li><Link href="/" className="block px-4 py-2 hover:bg-slate-800 cursor-pointer hover:font-bold">Home</Link></li>
                  {session.user.role !== "guest" ? (
                    <>
                      <li><Link href="/dashboard" className="block px-4 py-2 hover:bg-slate-800 hover:font-bold">Dashboard</Link></li>
                      <li><Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-slate-800 hover:font-bold">Your Page</Link></li>
                    </>
                  ) : null}
                  <li><Link href="/feedback" className="block px-4 py-2 hover:bg-slate-800 cursor-pointer hover:font-bold">Feedbacks</Link></li>
                  <li>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left px-4 py-2 hover:bg-slate-800 cursor-pointer"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link href={"/login"}>
              <button className="text-white cursor-pointer bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
            focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium 
            rounded-lg text-sm px-5 py-2.5">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
