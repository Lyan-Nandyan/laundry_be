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
    await Transaksi.create({ id_pelanggan, id_layanan, berat, total_harga });
    res.json({ message: "Transaksi berhasil ditambahkan" });
  } catch (error) {
    console.error("Error creating transaksi:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransaksiById = async (req, res) => {
  try {
    const response = await Transaksi.findOne({
      where: { id_transaksi: req.params.id },
      include: [Pelanggan, Layanan],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransaksiByStatus = async (req, res) => {
  try {
    const response = await Transaksi.findAll({
      where: { status: req.params.status },
      include: [Pelanggan, Layanan],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTransaksi = async (req, res) => {
  try {
    const { id_pelanggan, id_layanan, berat } = req.body;
    const layanan = await Layanan.findByPk(id_layanan);
    const total_harga = layanan.harga_per_kg * berat;

    await Transaksi.update(
      { id_pelanggan, id_layanan, berat, total_harga },
      { where: { id_transaksi: req.params.id } }
    );

    res.json({ message: "Transaksi berhasil diupdate" });
  } catch (error) {
    console.error("Error updating transaksi:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStatusTransaksi = async (req, res) => {
  try {
    const { status } = req.body;
    await Transaksi.update(
      { status },
      { where: { id_transaksi: req.params.id } }
    );
    res.json({ message: "Status transaksi berhasil diupdate" });
  } catch (error) {
    console.error("Error updating status transaksi:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTransaksi = async (req, res) => {
  try {
    await Transaksi.destroy({
      where: { id_transaksi: req.params.id },
    });
    res.json({ message: "Transaksi berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting transaksi:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
