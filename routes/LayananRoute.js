import express from "express";
import { requireRoles } from "../middleware/AuthMiddleware.js";
import { getAllLayanan, createLayanan } from "../controllers/LayananController.js";

const router = express.Router();

router.get("/", requireRoles(["petugas"]), getAllLayanan);
router.post("/", requireRoles(["admin"]), createLayanan);

export default router;
