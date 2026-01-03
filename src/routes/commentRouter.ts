import express from "express";
import commentController from "../controllers/commentController";

export const commentRouter = express.Router();

commentRouter.get("/comment", commentController.getAll.bind(commentController));

commentRouter.get(
  "/comment/:id",
  commentController.getById.bind(commentController)
);

commentRouter.post(
  "/comment",
  commentController.create.bind(commentController)
);

commentRouter.delete(
  "/comment/:id",
  commentController.delete.bind(commentController)
);

commentRouter.put(
  "/comment/:id",
  commentController.update.bind(commentController)
);
