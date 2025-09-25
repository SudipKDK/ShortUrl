import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./connection.js";
import urlRouter from "./routes/url.js";
import staticRouter from "./routes/static.js";
import userRouter from "./routes/user.js";
import { restrictTologgedInUserOnly } from "./middleware/auth.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/short-Url";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("/", staticRouter);
app.use("/auth", userRouter);
app.use("/", restrictTologgedInUserOnly, urlRouter);

connectDB(dbUrl);

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
