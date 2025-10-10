import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Pelanggan = db.define(
    "pelanggan", {
  id_pelanggan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  no_hp: {
    type: DataTypes.STRING(15),
    allowNull: false,
  }
}, {
  freezeTableName: true
});

db.sync().then(() => console.log("Database synced"));

export default Pelanggan;
