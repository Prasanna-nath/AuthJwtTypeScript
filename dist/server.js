"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRout_1 = __importDefault(require("./routes/userRout"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 6060;
app.use(body_parser_1.default.json());
app.use("/", userRout_1.default);
app.listen(PORT, () => {
    console.log(`Server running on : http://localhost:${PORT}`);
});
