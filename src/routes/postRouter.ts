import express from "express";
import { getPost } from "../controllers/postConteroller";

export const postRouter = express.Router();

postRouter.get("/post", getPost);

postRouter.get("post/:id", );

postRouter.post("/post", );

postRouter.delete("post/:id", );

postRouter.put("post/:id", );