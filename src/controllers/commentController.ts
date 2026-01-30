import { comment, CommentDocument } from "../model/commentModel";
import { Response } from "express";
import baseController from "./baseController";
import { AuthRequest } from "../utils/types/auth";

class CommentsController extends baseController<CommentDocument> {
  constructor() {
    super(comment);
  }

  async create(req: AuthRequest, res: Response) {
    const userId = (req as any).user?._id;

    req.body.sender = userId;
    return super.create(req, res);
  }

  async update(req: AuthRequest, res: Response) {
    const userId = (req as any).user?._id;
    const currComment = await comment.findById(req.params.id);
    if (currComment?.sender.toString() !== userId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    return super.update(req, res);
  }

  async delete(req: AuthRequest, res: Response) {
    const userId = (req as any).user?._id;
    const currComment = await comment.findById(req.params.id);
    if (currComment?.sender.toString() !== userId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    return super.delete(req, res);
  }
}

export default new CommentsController();
