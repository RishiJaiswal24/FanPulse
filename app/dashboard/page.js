"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { updateProfile, fetchUser } from '../actions/useraction'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from "react-toastify"

const Page = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({})

  useEffect(() => {
    document.title = "Dashboard – Fan Pulse"
    if (!session) {
      router.push('/')
    } else {
      getData()
    }
  }, [session])

  const getData = async () => {
    let u = await fetchUser(session.user.username || session.user.name || session.user.email)
    setForm(u || {})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "username") {
      const validPattern = /^[a-zA-Z0-9._]*$/
      if (!validPattern.test(value)) {
        return
      }
    }
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const currentUsername = form.username

    if (!currentUsername) {
      toast.error('Username Cannot be Empty', {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      })
      return
    }

    let a = await updateProfile(form, session.user.name, session.user.email)
    if (a && a.error) {
      toast.error(a.error, {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      })
    } else {
      toast.success('Your Profile has been Updated!', {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      })
      getData()
    }

    if (a.namechanged) {
      window.location.reload()
    }
  }
  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />

      <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>
      {session?.user?.role !== "guest" ? (
        <div className='md:w-1/3 w-[90vw] mx-auto opacity-80 shadow-2xl shadow-slate-500 bg-slate-900 rounded-2xl p-4 my-10'>
          <div className='mx-auto'>
            <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>

              <div className='my-2'>
                <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                  Name
                </label>
                <input value={form.name || ""} onChange={handleChange} type="text" name='name' id="name"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs 
                         focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                         dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>

              <div className='my-2'>
                <label htmlFor="username" className="block mb-2 text-sm font-bold pt-3 text-gray-900 dark:text-white">
                  Username
                </label>
                <input value={form.username || ""} onChange={handleChange} type="text" name='username' id="username"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs 
                         focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                         dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>

              <div className="my-2">
                <label htmlFor="profilepic" className="block mb-2 text-sm font-bold pt-3 text-gray-900 dark:text-white">
                  Profile Picture
                </label>
                <input value={form.profilepic || ""} onChange={handleChange} type="text" name='profilepic' id="profilepic"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs 
                         focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                         dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>

              <div className="my-2">
                <label htmlFor="coverpic" className="block mb-2 text-sm font-bold pt-3 text-gray-900 dark:text-white">
                  Cover Picture
                </label>
                <input value={form.coverpic || ""} onChange={handleChange} type="text" name='coverpic' id="coverpic"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs 
                         focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                         dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>

              <div className="my-2">
                <label htmlFor="razorpayid" className="block mb-2 text-sm font-bold pt-3 text-gray-900 dark:text-white">
                  Razorpay Id
                </label>
                <input value={form.razorpayid || ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs 
                         focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                         dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>

              <div className="my-2">
                <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-bold pt-3 text-gray-900 dark:text-white">
                  Razorpay Secret
                </label>
                <input value={form.razorpaysecret || ""} onChange={handleChange} type="password" name='razorpaysecret' id="razorpaysecret"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs 
                         focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                         dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>

              <div className="bg-red-100 text-red-800 p-3 rounded text-sm my-3">
                ⚠️ <strong>Security Warning:</strong> Please <u>do not</u> share your <b>Live Mode Razorpay Secret</b>.
                For your safety, only enter your <b>Test Mode Secret</b> here.
              </div>

              <div className="my-6">
                <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  text-center w-full p-2 rounded-2xl font-bold cursor-pointer">
                  Save
                </button>
              </div>

            </form>
          </div>
        </div>
      ) : (
        <div className="text-center text-white mt-10 min-h-screen">
          <p className="text-xl">Guest users cannot access the dashboard.</p>
          <p className="text-gray-400 mt-2">Please sign in with GitHub to access all features.</p>
        </div>
      )}
    </>
  )
}

export default Page