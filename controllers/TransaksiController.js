import Transaksi from "../models/TransaksiModel.js";
import Pelanggan from "../models/PelangganModel.js";
import Layanan from "../models/LayananModel.js";

export const getAllTransaksi = async (req, res) => {
    try {
        const data = await Transaksi.findAll({
            include: [Pelanggan, Layanan],
        });
        res.json(data);
    } catch (error) {
        console.error("Error fetching transaksi:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createTransaksi = async (req, res) => {
    try {
        const { id_pelanggan, id_layanan, berat } = req.body;
        const layanan = await Layanan.findByPk(id_layanan);
        const total_harga = layanan.harga_per_kg * berat;
        const tanggal = new Date().toISOString().split('T')[0];

        await Transaksi.create({ id_pelanggan, id_layanan, berat, total_harga, tanggal });
        res.json({ message: "Transaksi berhasil ditambahkan" });
    } catch (error) {
        console.error("Error creating transaksi:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateTransaksiStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const transaksi = await Transaksi.findByPk(id);
        if (!transaksi) {
            return res.status(404).json({ message: "Transaksi not found" });
        }

        await Transaksi.update({ status }, { where: { id_transaksi: id } });

        res.json({ message: "Transaksi status berhasil diubah" });
    } catch (error) {
        console.error("Error updating transaksi status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteTransaksi = async (req, res) => {
    try {
        const { id } = req.params;
        const transaksi = await Transaksi.findByPk(id);
        if (!transaksi) {
            return res.status(404).json({ message: "Transaksi not found" });
        }

        await Transaksi.destroy({ where: { id_transaksi: id } });

        res.json({ message: "Transaksi berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting transaksi:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
