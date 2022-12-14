import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Cuestionario } from "./Cuestionario.js";

export class RegistroEjecucion extends Model {}

RegistroEjecucion.init(
  {
    fechaInicio: {
      type: DataTypes.DATE,
    },
    fechaFin: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "RegistroEjecucion",
    tableName: "RegistrosEjecucion",
    name: {
      singular: "registroEjecucion",
      plural: "registrosEjecucion",
    },
  }
);