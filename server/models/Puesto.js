import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";
import { Puesto_Competencia } from "./Puesto_Competencia.js";

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
Puesto.hasMany(Puesto_Competencia);
