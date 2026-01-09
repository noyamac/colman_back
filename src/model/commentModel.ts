import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: { type: String, require: true },
  sender: { type: String, require: true },
  content: { type: String, require: true },
  date: { type: Date, require: true },
});

export type CommentDocument = mongoose.InferSchemaType<typeof commentSchema> &
  mongoose.Document;

export const comment = mongoose.model<CommentDocument>(
  "Comment",
  commentSchema
);
