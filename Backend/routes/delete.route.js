import express from "express";
import deleteItem from "../controllers/itemDelete.controller.js";

const router = express.Router();

// Route that handles file deltes
router.post("/", deleteItem);

export default router;
