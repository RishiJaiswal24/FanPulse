import React from 'react'
import PaymentPage from '../models/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '../db/connectDb';
import User from '../models/User';

export default async function Page({ params }) {
  const { username } =await params;

  await connectDB();
  let u = await User.findOne({ username });
  if (!u) {
    return notFound();
  }

  return <PaymentPage username={username} />;
}

export async function generateMetadata({ params }) {
  const { username } =await params;
  return {
    title: `${username} – Fan Pulse`,
    description: `${username}'s official Fan Pulse page. Showcase your work, connect with fans, and receive direct support.`,
  };
}
