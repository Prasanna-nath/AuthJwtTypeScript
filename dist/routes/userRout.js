"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userMiddleware_1 = __importDefault(require("../middleware/userMiddleware"));
const router = express_1.default.Router();
router.use("/getinfo", userMiddleware_1.default.authenticate);
router.post("/login", userController_1.loginUser);
router.get("/getinfo", userController_1.getAllInfo);
exports.default = router;
