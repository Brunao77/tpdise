import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { CompetenciaClon } from "./CompetenciaClon.js";
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

FactorClon.Competencia = FactorClon.belongsTo(CompetenciaClon);
FactorClon.belongsTo(Factor, {foreignKey: "esClonDe"}); 