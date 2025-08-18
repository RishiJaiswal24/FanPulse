import { NextResponse, userAgent } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import User from "@/app/models/User";
import Razorpay from "razorpay";
import connectDB from "@/app/db/connectDb";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const POST=async (req)=>{
    await connectDB()
    let body= await req.formData()
    body=Object.fromEntries(body);

    let p=await Payment.findOne({oid:body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success:false,message:"Order Id Not Found"})
    }
    let user=await User.findOne({username: p.to_user});
    const secret=user.razorpaysecret;

    let xx=validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},body.razorpay_signature,secret);
    if(xx){
        const session = await getServerSession(authOptions);
        let payerProfilePic = session?.user?.image || "";

        const updatePayment=await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:true,profiepic: payerProfilePic}, {new:true});
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatePayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success:false,message:"Payment verfication failed"})
    }
} 