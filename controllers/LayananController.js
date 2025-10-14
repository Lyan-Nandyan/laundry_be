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
        console.log(req.body);
        await Layanan.create({ nama_layanan, harga_per_kg });
        res.json({ message: "Layanan ditambahkan" });
    } catch (error) {
        console.error("Error creating layanan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getLayananById = async (req, res) => {
    try {
        const response = await Layanan.findOne({
            where:{
                id_layanan: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

export const updateLayanan = async (req, res) => {
    try {
        const { nama_layanan, harga_per_kg } = req.body;
        await Layanan.update(
            { nama_layanan, harga_per_kg },
            { where: { id_layanan: req.params.id } }
        );
        res.status(200).json({ message: "Layanan diperbarui" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteLayanan = async (req, res) => {
    try {
        await Layanan.destroy({
            where: { id_layanan: req.params.id }
        });
        res.status(200).json({ message: "Layanan dihapus" });
    } catch (error) {
        console.log(error);
    }
};
