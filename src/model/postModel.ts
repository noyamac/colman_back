import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  imageUrl: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
});

export type PostDocument = mongoose.InferSchemaType<typeof postSchema> &
  mongoose.Document;

export const post = mongoose.model<PostDocument>("Post", postSchema);
