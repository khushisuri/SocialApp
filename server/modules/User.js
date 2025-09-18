import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, required: true, min: 2, max: 50 },
    friends: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true },
    picturePath: { type: String, default: " " },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
