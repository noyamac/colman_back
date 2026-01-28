import { Response } from "express";
import { AuthRequest } from "../utils/types/auth";
import { post, PostDocument } from "../model/postModel";
import baseController from "./baseController";

class PostsController extends baseController<PostDocument> {
  constructor() {
    super(post);
  }

  async create(req: AuthRequest, res: Response) {
    const userId = (req as any).user?._id;
    req.body.sender = userId;
    return super.create(req, res);
  }

  async update(req: AuthRequest, res: Response) {
    const userId = (req as any).user?._id;
    const currPost = await post.findById(req.params.id);
    if (currPost?.sender.toString() !== userId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    return super.update(req, res);
  }

  async delete(req: AuthRequest, res: Response) {
    const userId = (req as any).user?._id;
    const currPost = await post.findById(req.params.id);
    if (currPost?.sender.toString() !== userId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    return super.delete(req, res);
  }
}

export default new PostsController();
