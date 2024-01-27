"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//console.log(process.env.JWT_SECRET_KEY);
const generateToken = (userId) => {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT secret key is not defined.");
    }
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" });
};
exports.default = { generateToken };
