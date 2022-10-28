import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Competencia } from "./Competencia.js";

export class Ponderacion extends Model {}

Ponderacion.init(
  {
    ponderacion: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Ponderacion",
  }
);
Ponderacion.belongsTo(Competencia);
