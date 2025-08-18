"use server"
import Razorpay from "razorpay"
import Payment from "../models/Payment"
import connectDB from "../db/connectDb"
import User from "../models/User"
import Feedback from "../models/Feedback"
export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();
    let user = await User.findOne({ username: to_username });

    const instance = new Razorpay({
        key_id: user.razorpayid,
        key_secret: user.razorpaysecret,
    });
    let options = {
        amount: Number.parseInt(amount) * 100,
        currency: "INR",
    }
    let x = await instance.orders.create(options)
    await Payment.create({
        oid: x.id,
        amount: x.amount,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message
    })
    return { id: x.id, amount: x.amount }
}

export const fetchUser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username })
    if (!u) {
        return null;
    }
    let user = u.toObject({ flattenObjectIds: true })
    if (user.createdAt) user.createdAt = user.createdAt.toISOString();
    if (user.updatedAt) user.updatedAt = user.updatedAt.toISOString();
    return user;
}
export const fetchPayments = async (username) => {
    await connectDB()
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()
    const serializedPayments = p.map(payment => ({
        ...payment,
        _id: payment._id.toString(),
        createdAt: payment.createdAt ? payment.createdAt.toISOString() : null,
        updatedAt: payment.updatedAt ? payment.updatedAt.toISOString() : null
    }));
    return serializedPayments;
}

export const updateProfile = async (data, oldUsername, email) => {
    await connectDB();
    let ndata = data;
    if (oldUsername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username is Taken!" }
        }
        await User.updateOne(
            { email: email },
            {
                $set: {
                    name: ndata.name,
                    username: ndata.username,
                    profilepic: ndata.profilepic,
                    coverpic: ndata.coverpic,
                    razorpayid: ndata.razorpayid,
                    razorpaysecret: ndata.razorpaysecret
                }
            },
            { runValidators: true }
        );
        await Payment.updateMany({ to_user: oldUsername },
            { $set: { to_user: ndata.username } });
        return { success: true, namechanged: true }
    }
    else {
        await User.updateOne(
            { email: email },
            {
                $set: {
                    name: ndata.name,
                    username: ndata.username,
                    profilepic: ndata.profilepic,
                    coverpic: ndata.coverpic,
                    razorpayid: ndata.razorpayid,
                    razorpaysecret: ndata.razorpaysecret
                }
            },
            { runValidators: true }
        );
        return { success: true, namechanged: false }
    }
}
export const fetchFeedback = async () => {
    await connectDB()
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 }).lean()

    const serializedFeedbacks = feedbacks.map(feedback => ({
        ...feedback,
        _id: feedback._id.toString(),
        createdAt: feedback.createdAt.toISOString(),
        updatedAt: feedback.updatedAt.toISOString()
    }))

    return serializedFeedbacks
}
export const addFeedback = async (username, email, feedbackText) => {
    await connectDB()

    const newFeedback = new Feedback({
        username,
        email,
        feedback: feedbackText
    })

    await newFeedback.save()
    return { success: true, message: 'Feedback saved successfully' }

}