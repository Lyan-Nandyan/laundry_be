import express from "express";
import {  requireRoles } from "../middleware/AuthMiddleware.js";
import { getAllPelanggan, createPelanggan } from "../controllers/PelangganController.js";

const router = express.Router();

router.get("/", requireRoles(["admin", "petugas"]), getAllPelanggan);
router.post("/", requireRoles(["petugas"]), createPelanggan);

export default router;
