import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";

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

