import { Request, Response } from "express";
import { post } from "../model/postModel";

export const getPost = async (req: Request, res: Response) => {
  const filter = req.query;
  try {
    if (filter) {
      const posts = await post.find(filter);
      res.json(posts);
    } else {
      const posts = await post.find();
      res.json(posts);
    }
  } catch (err) {
    res.status(500).json({ error: "error.message", err });
  }
};

