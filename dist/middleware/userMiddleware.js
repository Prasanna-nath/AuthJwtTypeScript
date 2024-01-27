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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "jdfvshimfcgrfacy";
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    let userId;
    const { authorization } = req.headers;
    //console.log(authorization);
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            userId = jsonwebtoken_1.default.verify(token, secret);
            //const user = await db.query("SELECT * FROM users WHERE id = $1", [userId,]);
            res.locals.userId = userId;
            //console.log(res.locals.userId);
            next();
        }
        catch (error) {
            res.send({ status: "error", error: "Internal server error." });
        }
    }
});
exports.default = { authenticate };
