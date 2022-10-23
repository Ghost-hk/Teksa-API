import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import passport from "passport";

import postRoutes from "./routes/post.rout.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT;

app.use(passport.initialize());

app.use("/posts", postRoutes);

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
