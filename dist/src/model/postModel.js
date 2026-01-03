"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    sender: { type: String, require: true },
    imageUrl: { type: String, require: true },
    description: { type: String },
    date: { type: Date, require: true }
});
exports.post = mongoose_1.default.model("Post", postSchema);
//# sourceMappingURL=postModel.js.map