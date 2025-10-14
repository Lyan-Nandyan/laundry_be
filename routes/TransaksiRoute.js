import express from "express";
import {  requireRoles } from "../middleware/AuthMiddleware.js";
import { getAllTransaksi, createTransaksi, updateTransaksiStatus, deleteTransaksi } from "../controllers/TransaksiController.js";

const router = express.Router();

router.get("/", requireRoles(["petugas"]), getAllTransaksi);
router.post("/", requireRoles(["petugas"]), createTransaksi);
router.put("/:id/status", requireRoles(["petugas"]), updateTransaksiStatus);
router.delete("/:id", requireRoles(["petugas"]), deleteTransaksi);

export default router;
    