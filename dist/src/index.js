"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const postRouter_1 = require("./routes/postRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(postRouter_1.postRouter);
const initApp = () => {
    const promise = new Promise((resolve, reject) => {
        const DBUrl = process.env.MONGODB_URI;
        if (!DBUrl) {
            reject("database url is undefied");
            return;
        }
        mongoose_1.default
            .connect(DBUrl, {})
            .then(() => {
            resolve(app);
        });
        const db = mongoose_1.default.connection;
        db.on("error", (error) => {
            console.error("connection error", error);
        });
        db.once("open", () => {
            console.log("Connected to MongoDB");
        });
    });
    return promise;
};
exports.initApp = initApp;
//# sourceMappingURL=index.js.map