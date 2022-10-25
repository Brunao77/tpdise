import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";
import { PonderacionDAO } from "./PonderacionDAO.js";

export const PuestoDAO = sequelize.define("puesto", {
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
PuestoDAO.hasMany(PonderacionDAO);
