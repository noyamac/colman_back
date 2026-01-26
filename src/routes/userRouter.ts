import express from 'express';
import userController from '../controllers/userController';

export const userRouter = express.Router();

userRouter.get('/user', userController.getAll.bind(userController));

userRouter.get('/user/:id', userController.getById.bind(userController));

userRouter.post('/user', userController.create.bind(userController));

userRouter.delete('/user/:id', userController.delete.bind(userController));

userRouter.put('/user/:id', userController.update.bind(userController));
