import express from "express";
import postController from "../controllers/postController";

export const postRouter = express.Router();

postRouter.get("/post", postController.getAll.bind(postController));

postRouter.get("/post/:id", postController.getById.bind(postController));

postRouter.post("/post", postController.create.bind(postController));

postRouter.delete("/post/:id", postController.delete.bind(postController));

postRouter.put("/post/:id", postController.update.bind(postController));
