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
export const getPelangganById = async (req, res) => {
    try {
        const response = await Pelanggan.findOne({
            where:{
                id_pelanggan: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};
export const updatePelanggan = async (req, res) => {
    try {
        const { nama, no_hp } = req.body;
        await Pelanggan.update({ nama, no_hp }, {
            where: {
                id_pelanggan: req.params.id
            }
        });
        res.status(200).json({msg: "Pelanggan berhasil di update"});
    } catch (error) {
        console.error("Error updating pelanggan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deletePelanggan = async (req, res) => {
    try {
        await Pelanggan.destroy({
            where: {
                id_pelanggan: req.params.id
            }
        });
        res.status(200).json({msg: "Pelanggan berhasil dihapus"});
    } catch (error) {
        console.error("Error deleting pelanggan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
