import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";

export const Competencia = sequelize.define("competencia", {
  codigo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
});
