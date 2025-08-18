"use client"
import { React, useState, useEffect } from 'react'
import { fetchFeedback, addFeedback } from '../actions/useraction'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from "react-toastify"

const Page = () => {
    const { data: session } = useSession()
    const [feedbackform, setFeedbackform] = useState({ feedback: "" })
    const [Feedback, setFeedback] = useState([])
    const [submitting, setsubmitting] = useState(false)

    useEffect(() => {
        loadFeedbacks()
    }, [])

    const loadFeedbacks = async () => {
        const data = await fetchFeedback()
        setFeedback(data)
    }

    const handlechange = (e) => {
        setFeedbackform({ ...feedbackform, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        setsubmitting(true)
        const result = await addFeedback(
            session.user.name,
            session.user.email,
            feedbackform.feedback
        )

        if (result.success) {
            setFeedbackform({ feedback: "" })
            setsubmitting(false)
            toast.success('Thank you for Feedback!', {
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
            await loadFeedbacks()
        }
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
            <div className='min-h-screen flex flex-col w-full'>
                <div className='flex justify-center items-center w-full mt-12 text-4xl font-bold text-white'>
                    Fan Pulse — Developer Feedback
                </div>

                <div className='flex justify-center items-center w-full mt-12 mb-10'>
                    <div className="p-10 bg-slate-900 shadow-lg shadow-gray-500 rounded-xl w-[90vw] md:w-[70vw] h-[90vh] flex flex-col min-h-0">

                        {session ? (
                            <>
                                <div className="font-bold text-2xl text-white">Share Your Feedback with the Developer</div>
                                <div className="flex my-3">
                                    <textarea
                                        className="w-[60vw] h-[80px] md:h-[120px] md:max-h-[300px] py-2 text-gray-200 bg-slate-800 rounded-lg p-3 resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        name="feedback"
                                        value={feedbackform.feedback}
                                        onChange={handlechange}
                                        placeholder="Write your feedback for Fan Pulse..."
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={feedbackform.feedback.trim().length === 0 || submitting}
                                        className={`w-fit h-fit mx-2 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center
        ${feedbackform.feedback.trim().length === 0 || submitting
                                                ? 'bg-gray-600 cursor-not-allowed'
                                                : 'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
                                            }`}
                                    >
                                        {submitting ? 'Sending...' : 'Send Feedback'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="bg-slate-800 text-white text-center text-xl font-semibold px-6 py-4 rounded-xl shadow-md">
                                Login to <span className="text-red-400 font-bold">Share Your Feedback</span> with the Developer
                            </div>
                        )}

                        <div className="font-bold text-xl mb-2 mt-7 text-white">Feedback Received</div>

                        {/* 👇 Scrollable container */}
                        <div className="flex-1 min-h-0 overflow-y-auto pr-2 overscroll-contain slate-scrollbar">
                            <ul className="space-y-4">
                                {Feedback.map((feedback, i) => (
                                    <li
                                        key={feedback._id || i}
                                        className="flex items-start space-x-3 bg-slate-800 shadow-md rounded-xl p-4 hover:bg-slate-700 transition"
                                    >
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold">
                                            {feedback.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-200 text-lg">{feedback.username}</div>
                                            <div className="text-gray-300 text-sm mt-1">{feedback.feedback}</div>
                                            <div className="text-gray-400 text-xs mt-2">
                                                {new Date(feedback.createdAt).toLocaleDateString('en-GB', { timeZone: 'UTC' })}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
