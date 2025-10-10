import express from "express";
import { getAllTransaksi, createTransaksi, updateTransaksiStatus, deleteTransaksi } from "../controllers/TransaksiController.js";

const router = express.Router();

router.get("/", getAllTransaksi);
router.post("/", createTransaksi);
router.put("/:id/status", updateTransaksiStatus);
router.delete("/:id", deleteTransaksi);

export default router;
