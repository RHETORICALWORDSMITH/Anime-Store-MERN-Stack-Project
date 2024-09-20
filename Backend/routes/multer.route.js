import express from "express";
import uploadItem from "../controllers/multer.controller.js";
import upload from "../config/multer.js";

const router = express.Router();

// Route that handles file uploads
router.post("/", upload.single("profileImage"), uploadItem);

export default router;
