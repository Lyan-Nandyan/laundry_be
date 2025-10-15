import Pelanggan from "../models/PelangganModel.js";
import {
  createKeycloakUser,
  deleteKeycloakUser,
  changeOwnPasswordLogic
} from "./KeycloakController.js";

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

    const pelanggan = await Pelanggan.create({ nama, no_hp });
    await createKeycloakUser(nama, no_hp);

    res
      .status(201)
      .json({
        message: "Pelanggan dan akun Keycloak berhasil dibuat",
        pelanggan,
      });
  } catch (error) {
    console.error("Error creating pelanggan:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getPelangganById = async (req, res) => {
  try {
    const response = await Pelanggan.findOne({
      where: {
        id_pelanggan: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const changeOwnPassword = async (req, res) => {
  try {
    const message = await changeOwnPasswordLogic(req);
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error changing password:", error.message);
    const status = error.message === "Password lama salah" ? 401 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const updatePelanggan = async (req, res) => {
  try {
    const { no_hp } = req.body;
    await Pelanggan.update(
      { no_hp },
      {
        where: {
          id_pelanggan: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Pelanggan berhasil di update" });
  } catch (error) {
    console.error("Error updating pelanggan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePelanggan = async (req, res) => {
  try {
    const pelanggan = await Pelanggan.findOne({ where: { id_pelanggan: req.params.id } });
    if (!pelanggan) return res.status(404).json({ message: "Pelanggan tidak ditemukan" });

    await deleteKeycloakUser(pelanggan.nama);
    await Pelanggan.destroy({ where: { id_pelanggan: req.params.id } });

    res.status(200).json({ message: "Pelanggan dan akun Keycloak berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting pelanggan:", error.message);
    res.status(500).json({ message: error.message });
  }
};