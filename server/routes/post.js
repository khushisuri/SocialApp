import express from "express";
import { verifyToken } from "../middlewear/auth";

const router = express.Router();

router.get("/", verifyToken, getAllPosts);

router.get("/:id/posts", verifyToken, getUserPosts);

router.patch("/:postId/like", verifyToken, likePost);

export default router;