import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  sender: { type: String, require: true },
  imageUrl: { type: String, require: true },
  description: { type: String },
  date: { type: Date, require: true },
});

export type PostDocument = mongoose.InferSchemaType<typeof postSchema> &
  mongoose.Document;

export const post = mongoose.model<PostDocument>("Post", postSchema);
