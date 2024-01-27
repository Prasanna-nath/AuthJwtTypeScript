import express from "express";
import { loginUser, getAllInfo } from "../controller/userController";
import authenticateUser from "../middleware/userMiddleware";

const router = express.Router();

router.use("/getinfo", authenticateUser.authenticate);

router.post("/login", loginUser);

router.get("/getinfo", getAllInfo);

export default router;
