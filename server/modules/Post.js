import mongoose from "mongoose";

const Post = mongoose.Schema(
  {
    userId: {
      type: String,
      reqrured: true,
    },
    firstName: {
      type: String,
      reqrured: true,
    },
    lastName: {
      type: String,
      reqrured: true,
    },
    location: String,
    description: String,
    userPicturePath: String,
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default new mongoose.model("Post", Post);
