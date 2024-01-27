import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = "jdfvshimfcgrfacy";
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  let userId;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      userId = jwt.verify(token, secret);
      //const user = await db.query("SELECT * FROM users WHERE id = $1", [userId,]);
      res.locals.userId = userId;
      next();
    } catch (error) {
      res.send({ status: "error", error: "Internal server error." });
    }
  }
};

export default { authenticate };
