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

export const getPostById = async (req: Request, res: Response) => {
    const postId = req.params.id;

    try {
        const data = await post.findById(postId);
        if (!data) {
            return res.status(404).json({ error: "Data not found" });
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
}

export const updatePost = async (req: Request, res: Response) => {
    const postId: string = req.params.id;
    const updatedPost = req.body

    try {
        const response = await post.findByIdAndUpdate(postId, updatedPost, { new: true });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
}

export const deletePost = async (req: Request, res: Response) => {
    const postId: string = req.params.id;

    try {
        const response = await post.findByIdAndDelete(postId);
        res.send(response);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
}
