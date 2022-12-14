import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Factor } from "./Factor.js";

export class FactorClon extends Model {}

FactorClon.init(
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
    modelName: "FactorClon",
    tableName: "FactoresClon",
    name: {
      singular: "factor",
      plural: "factores",
    },
  }
);

FactorClon.belongsTo(Factor, {foreignKey: "esClonDe"}); 