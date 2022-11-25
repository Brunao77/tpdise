import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";

export class Competencia extends Model {}

Competencia.init(
  {
    codigo: {
      type: DataTypes.STRING,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Competencia",
    tableName: "Competencias",
    name: {
      singular: "competencia",
      plural: "competencias"
    }
  }
);
