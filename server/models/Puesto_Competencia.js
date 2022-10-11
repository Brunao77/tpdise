import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";
import { Puesto } from "./Puesto.js";
import { Competencia } from "./Competencia.js";

export const Puesto_Competencia = sequelize.define("puesto_competencia", {
  ponderacion: DataTypes.INTEGER,
});

Puesto.belongsToMany(Competencia, { through: Puesto_Competencia });
Competencia.belongsToMany(Puesto, { through: Puesto_Competencia });
