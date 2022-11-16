import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import postRoutes from "./routes/post.rout.js";
import authRoutes from "./routes/user.rout.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
// app.use(cors());

const PORT = 8080 || process.env.PORT;

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.clear();
      console.log(`Server Running on Port: http://localhost:${PORT}`);
    })
  )
  .catch((error) => console.log(`${error} did not connect`));
