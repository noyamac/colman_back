"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
exports.postRouter = express_1.default.Router();
exports.postRouter.get("/post", postController_1.getPost);
exports.postRouter.get("/post/:id", postController_1.getPostById);
exports.postRouter.post("/post", postController_1.addPost);
exports.postRouter.delete("/post/:id", postController_1.deletePost);
exports.postRouter.put("/post/:id", postController_1.updatePost);
//# sourceMappingURL=postRouter.js.map