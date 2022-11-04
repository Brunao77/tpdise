import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Competencia } from "./Competencia.js";

export class Ponderacion extends Model {}

Ponderacion.init(
  {
    ponderacion: {
      type: DataTypes.STRING,
    },
    competenciaCodigo: {
      type: DataTypes.STRING,
      unique: "puesto-comp",
    },
    puestoCodigo: {
      type: DataTypes.STRING,
      unique: "puesto-comp",
    },
  },
  {
    sequelize,
    modelName: "Ponderacion",
    tableName: "Ponderaciones",
    name: {
      singular: "ponderacion",
      plural: "ponderaciones",
    },
  }
);

Ponderacion.belongsTo(Competencia, { foreignKey: "competenciaCodigo" });
