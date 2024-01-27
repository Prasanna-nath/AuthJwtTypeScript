import express from "express";
import userRoutes from "./routes/userRout";
import "dotenv/config";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 6060;

app.use(bodyParser.json());
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on : http://localhost:${PORT}`);
});
