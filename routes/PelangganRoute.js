import express from "express";
import {  requireRoles } from "../middleware/AuthMiddleware.js";
import { getAllPelanggan, createPelanggan, getPelangganById, updatePelanggan, deletePelanggan } from "../controllers/PelangganController.js";

const router = express.Router();

router.get("/", requireRoles(["petugas"]), getAllPelanggan);
router.post("/", requireRoles(["petugas"]), createPelanggan);
router.get("/:id", requireRoles(["petugas", "pelanggan"]), getPelangganById);
router.put("/:id", requireRoles(["pelanggan"]), updatePelanggan);
router.delete("/:id", requireRoles(["petugas"]), deletePelanggan);

export default router;
