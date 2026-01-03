"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.addPost = exports.getPost = void 0;
const postModel_1 = require("../model/postModel");
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query;
    try {
        if (filter) {
            const posts = yield postModel_1.post.find(filter);
            res.json(posts);
        }
        else {
            const posts = yield postModel_1.post.find();
            res.json(posts);
        }
    }
    catch (err) {
        res.status(500).json({ error: "error.message", err });
    }
});
exports.getPost = getPost;
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = req.body;
    try {
        const response = yield postModel_1.post.create(newPost);
        res.status(201).json(response);
    }
    catch (err) {
        res.status(500).json({ error: "error.message", err });
    }
});
exports.addPost = addPost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const data = yield postModel_1.post.findById(postId);
        if (!data) {
            return res.status(404).json({ error: "Data not found" });
        }
        else {
            res.json(data);
        }
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const updatedPost = req.body;
    try {
        const response = yield postModel_1.post.findByIdAndUpdate(postId, updatedPost, { new: true });
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const response = yield postModel_1.post.findByIdAndDelete(postId);
        res.send(response);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=postController.js.map