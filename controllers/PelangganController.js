import Pelanggan from "../models/PelangganModel.js";

export const getAllPelanggan = async (req, res) => {
    try {
        const data = await Pelanggan.findAll();
        res.json(data);
    } catch (error) {
        console.error("Error fetching pelanggan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createPelanggan = async (req, res) => {
    try {
        const { nama, no_hp } = req.body;
        await Pelanggan.create({ nama, no_hp });
        res.json({ message: "Pelanggan ditambahkan" });
    } catch (error) {
        console.error("Error creating pelanggan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

