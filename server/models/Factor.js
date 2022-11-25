import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Competencia } from "./Competencia.js";

export class Factor extends Model {}

Factor.init(
  {
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    orden: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Factor",
    tableName: "Factores",
    name: {
      singular: "factor",
      plural: "factores",
    },
  }
);

Factor.belongsTo(Competencia);