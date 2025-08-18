"use client"
import React, { useEffect } from "react"
import { useState } from "react"
import Script from "next/script"
import { initiate, fetchPayments, fetchUser } from "../actions/useraction"
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from "react-toastify"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

const PaymentPage = ({ username }) => {
    const [canPay, setCanPay] = useState(false)
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    const getData = async (params) => {
        let u = await fetchUser(username);
        setcurrentUser(u)
        if (u?.razorpayid && u?.razorpaysecret) {
            setCanPay(true)
        }
        else {
            setCanPay(false)
        }
        let dbPayments = await fetchPayments(username)
        setPayments(dbPayments)
    }
    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast.success('Payment received successfully. Thank you for your support!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)
    }, [])

    const handelchange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let order_id = a.id
        var options = {
            "key": currentUser.razorpayid,
            "amount": amount,
            "currency": "INR",
            "name": username,
            "description": "Support Contribution",
            "image": "https://example.com/your_logo",
            "order_id": order_id,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }

        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='banner w-full relative'>
                <img
                    className='w-full h-[30vh] md:h-[60vh] object-cover'
                    src={currentUser.coverpic || "/Default_Banner.jpg"}
                    alt="cover"
                />
                <div
                    className="logo absolute -bottom-14 md:-bottom-20 left-1/2 transform -translate-x-1/2"
                >
                    <img
                        className='rounded-lg border-2 border-white w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-cover'
                        src={currentUser.profilepic || "/Default_User.jpg"}
                        alt="profile"
                    />
                </div>
            </div>
            <div className='info flex justify-center items-center mt-24 mb-10 flex-col gap-2'>
                <div className="font-bold ">
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Support @{username} in achieving their goals
                </div>
                <div className='text-slate-400'>
                    {payments.length} Contributions · Total Raised: ₹
                    {payments.reduce((a, b) => a + b.amount, 0) / 100}
                </div>
            </div>
            <div className='w-[80%] mx-auto mb-20 items-center flex md:flex-row flex-col gap-4'>
                <div className=' suppoeters md:w-1/2 w-[90vw] bg-slate-900  shadow-slate-800 shadow-2xl  relative rounded-lg h-[40vh]  md:h-[60vh] overflow-auto slate-scrollbar'>
                    <h2 className='font-bold text-xl sticky w-full bg-slate-900 p-6 top-0'>Supporters</h2>
                    <ul className='px-7 oy-2 flex flex-col gap-1' >
                        {payments.length == 0 && <li>Be the first to contribute and show your support</li>}
                        {payments.map((p, i) => {
                            return <li key={i} className='flex items-center gap-2'>
                                <img src="/avatar.gif " width={33} alt="avatar" />
                                {p.name} contributed ₹{p.amount / 100} with the message: "{p.message}"
                            </li>
                        })}
                    </ul>
                </div>
                <div className='payment md:w-1/2 w-[90vw] bg-slate-900 relative  shadow-slate-800 shadow-2xl rounded-lg p-4 h-[45vh] md:h-[60vh]'>
                    <h2 className='font-bold text-lg sticky w-full bg-slate-900 p-2 top-0'>Make a Contribution</h2>
                    <div className="flex gap-2 flex-col pt-2.5" >
                        <input onChange={handelchange} value={paymentform.name} name="name" type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter your name' />
                        <input onChange={handelchange} value={paymentform.message} name="message" type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Write a message' />
                        <input onChange={handelchange} value={paymentform.amount} name="amount" type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter the amount (₹)' />
                        <button onClick={() => { pay(paymentform.amount) }} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer disabled:from-gray-400 disabled:to-gray-500 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-none" disabled={!canPay || paymentform?.name.length === 0 || paymentform.amount.length < 1 || paymentform.message.length === 0}>Contribute</button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
