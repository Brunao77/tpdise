import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Competencia } from "./Competencia.js";
import { FactorClon } from "./FactorClon.js";

export class CompetenciaClon extends Model {}

CompetenciaClon.init(
  {
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "CompetenciaClon",
    tableName: "CompetenciasClon",
    name: {
      singular: "competencia",
      plural: "competencias"
    }
  }
);

CompetenciaClon.belongsTo(Competencia, {foreignKey: "esClonDe"});
CompetenciaClon.Factores = CompetenciaClon.hasMany(FactorClon);