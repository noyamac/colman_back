import express from "express";
import commentController from "../controllers/commentController";
import authMiddleware from "../middlewares/authMiddleware";

export const commentRouter = express.Router();

commentRouter.get("/", commentController.getAll.bind(commentController));

commentRouter.get("/:id", commentController.getById.bind(commentController));

commentRouter.post(
  "/",
  authMiddleware,
  commentController.create.bind(commentController),
);

commentRouter.delete(
  "/:id",
  authMiddleware,
  commentController.delete.bind(commentController),
);

commentRouter.put(
  "/:id",
  authMiddleware,
  commentController.update.bind(commentController),
);
