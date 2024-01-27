import jwt from "jsonwebtoken";

//console.log(process.env.JWT_SECRET_KEY);
const generateToken = (userId: string | number) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT secret key is not defined.");
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" });
};

export default { generateToken };
