import express from "express";
import {  requireRoles } from "../middleware/AuthMiddleware.js";
import { getAllTransaksi,getTransaksiByPelanggan, getTransaksiById, getTransaksiByStatus, createTransaksi, updateStatusTransaksi, updateTransaksi, deleteTransaksi } from "../controllers/TransaksiController.js";

const router = express.Router();

router.get("/", requireRoles(["petugas", "pemilik"]), getAllTransaksi);
router.post("/", requireRoles(["petugas", "pemilik"]), createTransaksi);

router.get("/pelanggan", requireRoles(["pelanggan"]), getTransaksiByPelanggan);
router.get("/status/:status", requireRoles(["petugas", "pemilik"]), getTransaksiByStatus);


router.get("/:id", requireRoles(["petugas", "pemilik"]), getTransaksiById);
router.patch("/:id", requireRoles(["petugas", "pemilik"]), updateStatusTransaksi);
router.put("/:id", requireRoles(["petugas", "pemilik"]), updateTransaksi);
router.delete("/:id", requireRoles(["petugas", "pemilik"]), deleteTransaksi);

export default router;
    