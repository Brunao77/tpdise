import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";

export const Puesto = sequelize.define("puesto", {
  codigo: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  empresa: {
    type: DataTypes.STRING,
  },
});
