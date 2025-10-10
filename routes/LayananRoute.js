import express from "express";
import { getAllLayanan, createLayanan } from "../controllers/LayananController.js";

const router = express.Router();

router.get("/", getAllLayanan);
router.post("/", createLayanan);

export default router;
