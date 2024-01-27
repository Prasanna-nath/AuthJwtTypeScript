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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInfo = exports.loginUser = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = __importDefault(require("../middleware/utils"));
// import jwt from "jsonwebtoken";
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = yield dbConfig_1.default.query("SELECT * FROM users WHERE email = $1", [
                email,
            ]);
            if (user.rows.length > 0) {
                const retriveUser = user.rows[0];
                const isMatch = yield bcrypt_1.default.compare(password, retriveUser.password);
                if (retriveUser.email === email && isMatch) {
                    const token = utils_1.default.generateToken(user.rows[0].id);
                    //console.log(user.rows[0].id);
                    res.status(200).json({
                        status: "success",
                        message: "User loged in successfully",
                        token: token,
                    });
                }
                else {
                    res.send({ status: "failed", message: "Invalid email or password" });
                }
            }
            else {
                res.send({ status: "failed", message: "Not a registered user." });
            }
        }
        else {
            res.send({ status: "failed", message: "All fields are required." });
        }
    }
    catch (error) {
        res.send({ status: "error", error: "Internal server error." });
    }
});
exports.loginUser = loginUser;
const getAllInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const obj = res.locals.userId;
        if (email && password) {
            const user = yield dbConfig_1.default.query("SELECT * FROM users WHERE email = $1", [
                email,
            ]);
            if (user.rows.length > 0) {
                const retriveUser = yield dbConfig_1.default.query("SELECT * FROM users WHERE id = $1", [obj.userId]);
                res.status(200).json({
                    id: retriveUser.rows[0].id,
                    name: retriveUser.rows[0].name,
                    email: retriveUser.rows[0].email,
                });
            }
            else {
                res.send({ status: "failed", message: "Not a registered user." });
            }
        }
        else {
            res.send({ status: "failed", error: "All fields are required" });
        }
    }
    catch (error) {
        res.send({ status: "error", error: "Internal server error." });
    }
});
exports.getAllInfo = getAllInfo;
