import express from "express";
//import { keycloak } from "../keycloak.js";
import { getAllPelanggan, createPelanggan } from "../controllers/PelangganController.js";

const router = express.Router();

router.get("/", /*keycloak.protect("realm:admin"),*/ getAllPelanggan);
router.post("/", /*keycloak.protect("realm:petugas"),*/ createPelanggan);

export default router;
