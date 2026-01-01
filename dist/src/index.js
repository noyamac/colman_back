"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const initApp = () => {
    const promise = new Promise((resolve, reject) => {
        const DBUrl = process.env.MONGODB_URI;
        console.log(DBUrl);
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