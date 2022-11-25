import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Cuestionario } from "./Cuestionario.js";
import { PuestoClon } from "./PuestoClon.js";

export class Evaluacion extends Model {}

Evaluacion.init(
  {
  },
  {
    sequelize,
    modelName: "Evaluacion",
    tableName: "Evaluaciones",
    name: {
      singular: "evaluacion",
      plural: "evaluaciones",
    },
  }
);

Evaluacion.Cuestionarios = Evaluacion.hasMany(Cuestionario);
Evaluacion.Puesto = Evaluacion.belongsTo(PuestoClon);