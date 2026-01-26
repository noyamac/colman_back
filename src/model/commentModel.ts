import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
});

export type CommentDocument = mongoose.InferSchemaType<typeof commentSchema> &
  mongoose.Document;

export const comment = mongoose.model<CommentDocument>(
  "Comment",
  commentSchema,
);
