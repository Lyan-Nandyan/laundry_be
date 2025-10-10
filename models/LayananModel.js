import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Layanan = db.define("layanan", {
  id_layanan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama_layanan: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  harga_per_kg: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true
});

db.sync().then(() => console.log("Database synced model or table Layanan"));

export default Layanan;
