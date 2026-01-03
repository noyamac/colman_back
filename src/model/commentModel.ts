import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: { type: String, require: true },
  sender: { type: String, require: true },
  content: { type: String, require: true },
  date: { type: Date, require: true },
});

export const comment = mongoose.model("Comment", commentSchema);
