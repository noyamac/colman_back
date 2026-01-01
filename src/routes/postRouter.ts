import express from "express";
import { addPost, getPost } from "../controllers/postConteroller";

export const postRouter = express.Router();

postRouter.get("/post", getPost);

postRouter.get("post/:id", );

postRouter.post("/post", addPost);

postRouter.delete("post/:id", );

postRouter.put("post/:id", );