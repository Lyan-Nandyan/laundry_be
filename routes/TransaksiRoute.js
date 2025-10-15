import express from "express";
import {  requireRoles } from "../middleware/AuthMiddleware.js";
import { getAllTransaksi,getTransaksiByPelanggan, getTransaksiById, getTransaksiByStatus, createTransaksi, updateStatusTransaksi, updateTransaksi, deleteTransaksi } from "../controllers/TransaksiController.js";

const router = express.Router();

router.get("/", requireRoles(["petugas"]), getAllTransaksi);
router.post("/", requireRoles(["petugas"]), createTransaksi);

router.get("/pelanggan", requireRoles(["pelanggan"]), getTransaksiByPelanggan);
router.get("/status/:status", requireRoles(["petugas"]), getTransaksiByStatus);


router.get("/:id", requireRoles(["petugas"]), getTransaksiById);
router.patch("/:id", requireRoles(["petugas"]), updateStatusTransaksi);
router.put("/:id", requireRoles(["petugas"]), updateTransaksi);
router.delete("/:id", requireRoles(["petugas"]), deleteTransaksi);

export default router;
    