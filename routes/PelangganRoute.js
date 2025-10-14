import express from "express";
import { apiProtect } from "../middleware/AuthMiddleware.js";
import { getAllPelanggan, createPelanggan } from "../controllers/PelangganController.js";

const router = express.Router();

router.get("/", apiProtect(["admin", "petugas"]), getAllPelanggan);
router.post("/", apiProtect(["petugas"]), createPelanggan);

export default router;
