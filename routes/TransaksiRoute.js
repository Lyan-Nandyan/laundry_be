import express from "express";
import {  requireRoles } from "../middleware/AuthMiddleware.js";
import { getAllTransaksi, getTransaksiById, getTransaksiByStatus, createTransaksi, updateStatusTransaksi, updateTransaksi, deleteTransaksi } from "../controllers/TransaksiController.js";

const router = express.Router();

router.get("/", requireRoles(["petugas"]), getAllTransaksi);
router.post("/", requireRoles(["petugas"]), createTransaksi);
router.patch("/:id", requireRoles(["petugas"]), updateStatusTransaksi);
router.put("/:id", requireRoles(["petugas"]), updateTransaksi);
router.delete("/:id", requireRoles(["petugas"]), deleteTransaksi);
router.get("/:id", requireRoles(["petugas"]), getTransaksiById);
router.get("/status/:status", requireRoles(["petugas"]), getTransaksiByStatus);

export default router;
    