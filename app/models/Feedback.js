import mongoose from "mongoose";
const { Schema, model,models } = mongoose;

const FeedbackSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    feedback: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Feedback || model("Feedback", FeedbackSchema);
