/*
pacages purpose
Server & Middleware: express, body-parser, cors, dotenv, helmet, morgan

Auth & Security: bcrypt, jsonwebtoken

Database: mongoose

File Uploads: multer, multer-gridfs-storage, gridfs-stream
*/

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { register } from "./controllers/auth.js";
import multer from "multer";
import authRoutes from "./routes/auth.js";
import User from "./modules/User.js";
import Post from "./modules/Post.js";
import { users, posts } from "./data/data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
dotenv.config();
// body parser basically allows the json and form submission data to be accesible
// using the req.body.<property_name> object and extended true allows nested objects
// and arrays to be received
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// helmet allows to set the headers object for HTTP request
app.use(helmet());
// here setting the crossOriginResourcePolicy header and setting to cross-origin
// which is by default same-origin which prevents blocking other origins
// from loading your resources (like images, scripts) and not for API requests.
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
// Lets other origins make API requests to your server.
app.use(cors());
//express.static(...) → middleware that serves static files (images, PDFs, etc.) from a directory.
// This line says: “Serve everything inside /public/assets folder when someone visits
// /assets/... route on my server.”
const uploadDir = path.join(__dirname, "public", "assets");

// 2) Serve that exact folder
app.use("/assets", express.static(uploadDir));

// express.static only serves static files but we cannot make post/put request
// to upload to folder we use multer

//configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // provide the folder path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const PORT = process.env.PORT || 6001;
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(` Server listening on port ${PORT}`);
      User.insertMany(users);
      Post.insertMany(posts);
    });
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  }
};

startServer();

app.post("/auth/register", upload.single("picture"), register);
app.use("/auth", authRoutes);
