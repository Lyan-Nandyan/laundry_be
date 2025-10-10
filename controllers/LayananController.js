import Layanan from "../models/LayananModel.js";

export const getAllLayanan = async (req, res) => {
    try {
        const data = await Layanan.findAll();
        res.json(data);
    } catch (error) {
        console.error("Error fetching layanan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createLayanan = async (req, res) => {
    try {
        const { nama_layanan, harga_per_kg } = req.body;
        await Layanan.create({ nama_layanan, harga_per_kg });
        res.json({ message: "Layanan ditambahkan" });
    } catch (error) {
        console.error("Error creating layanan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

