import express from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

export const userRouter = express.Router();

userRouter.get("/", userController.getAll.bind(userController));

userRouter.get("/:id", userController.getById.bind(userController));

userRouter.post(
  "/",
  authMiddleware,
  userController.create.bind(userController),
);

userRouter.delete(
  "/:id",
  authMiddleware,
  userController.delete.bind(userController),
);

userRouter.put(
  "/:id",
  authMiddleware,
  userController.update.bind(userController),
);
