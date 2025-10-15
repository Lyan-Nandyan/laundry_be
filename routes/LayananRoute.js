import express from "express";
import { requireRoles } from "../middleware/AuthMiddleware.js";
import { getAllLayanan, createLayanan, getLayananById, updateLayanan, deleteLayanan } from "../controllers/LayananController.js";

const router = express.Router();

router.get("/", requireRoles(["pemilik", "petugas", "pelanggan"]), getAllLayanan);
router.post("/", requireRoles(["pemilik", "petugas"]), createLayanan);
router.get("/:id", requireRoles(["pemilik", "petugas"]), getLayananById);
router.put("/:id", requireRoles(["pemilik", "petugas"]), updateLayanan);
router.delete("/:id", requireRoles(["pemilik", "petugas"]), deleteLayanan);

export default router;
