import express from "express";
import { requireRoles } from "../middleware/AuthMiddleware.js";
import { getAllLayanan, createLayanan, getLayananById, updateLayanan, deleteLayanan } from "../controllers/LayananController.js";

const router = express.Router();

router.get("/", requireRoles(["admin", "petugas", "pelanggan"]), getAllLayanan);
router.post("/", requireRoles(["admin", "petugas"]), createLayanan);
router.get("/:id", requireRoles(["admin", "petugas"]), getLayananById);
router.put("/:id", requireRoles(["admin", "petugas"]), updateLayanan);
router.delete("/:id", requireRoles(["admin", "petugas"]), deleteLayanan);

export default router;
