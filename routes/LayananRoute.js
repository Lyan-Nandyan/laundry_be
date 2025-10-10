import express from "express";
import { apiProtect } from "../middleware/AuthMiddleware.js";
import { getAllLayanan, createLayanan } from "../controllers/LayananController.js";

const router = express.Router();

router.get("/", apiProtect("petugas"), getAllLayanan);
router.post("/", apiProtect("admin"), createLayanan);

export default router;
