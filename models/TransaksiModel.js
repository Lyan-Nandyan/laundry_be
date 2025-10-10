import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Pelanggan from "./PelangganModel.js";
import Layanan from "./LayananModel.js";

const Transaksi = db.define("transaksi", {
  id_transaksi: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
  berat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total_harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Proses", "Selesai", "Diambil"),
    defaultValue: "Proses",
  },
}, {
  freezeTableName: true
});

// Relasi
Pelanggan.hasMany(Transaksi, { foreignKey: "id_pelanggan" });
Transaksi.belongsTo(Pelanggan, { foreignKey: "id_pelanggan" });

Layanan.hasMany(Transaksi, { foreignKey: "id_layanan" });
Transaksi.belongsTo(Layanan, { foreignKey: "id_layanan" });

db.sync().then(() => console.log("Database synced model or table Transaksi"));

export default Transaksi;
