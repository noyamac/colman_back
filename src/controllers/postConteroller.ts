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

export const addPost = async (req: Request, res: Response) => {
    const newPost = req.body;

    try {
        const response = await post.create(newPost);
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ error: "error.message", err });
    }
}
