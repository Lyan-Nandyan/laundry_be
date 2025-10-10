import express from "express";
import { apiProtect } from "../middleware/AuthMiddleware.js";
import { getAllTransaksi, createTransaksi, updateTransaksiStatus, deleteTransaksi } from "../controllers/TransaksiController.js";

const router = express.Router();

router.get("/", apiProtect("petugas"), getAllTransaksi);
router.post("/", apiProtect("petugas"), createTransaksi);
router.put("/:id/status", apiProtect("petugas"), updateTransaksiStatus);
router.delete("/:id", apiProtect("petugas"), deleteTransaksi);

export default router;
    