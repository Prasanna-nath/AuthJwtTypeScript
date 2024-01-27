import { Request, Response } from "express";
import db from "../config/dbConfig";
import bcrypt from "bcrypt";
import userMiddleware from "../middleware/utils";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (user.rows.length > 0) {
        const retriveUser = user.rows[0];
        const isMatch = await bcrypt.compare(password, retriveUser.password);
        if (retriveUser.email === email && isMatch) {
          const token = userMiddleware.generateToken(user.rows[0].id);
          res.status(200).json({
            status: "success",
            message: "User loged in successfully",
            token: token,
          });
        } else {
          res.send({ status: "failed", message: "Invalid email or password" });
        }
      } else {
        res.send({ status: "failed", message: "Not a registered user." });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required." });
    }
  } catch (error) {
    res.send({ status: "error", error: "Internal server error." });
  }
};

const getAllInfo = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const obj = res.locals.userId;
    if (email && password) {
      const user = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      
      if (user.rows.length > 0) {
        const retriveUser = await db.query(
          "SELECT * FROM users WHERE id = $1",
          [obj.userId]
        );
        res.status(200).json({
          id: retriveUser.rows[0].id,
          name: retriveUser.rows[0].name,
          email: retriveUser.rows[0].email,
        });
      } else {
        res.send({ status: "failed", message: "Not a registered user." });
      }
    } else {
      res.send({ status: "failed", error: "All fields are required" });
    }
  } catch (error) {
    res.send({ status: "error", error: "Internal server error." });
  }
};

export { loginUser, getAllInfo };
