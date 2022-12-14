import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Cuestionario } from "./Cuestionario.js";
import { PuestoClon } from "./PuestoClon.js";

export class Evaluacion extends Model {}

Evaluacion.init(
  {
    // puesto: {
    //   type: DataTypes.VIRTUAL,
    //   set(puestoClon) {
    //     this.setDataValue('puesto', puestoClon.dataValues);
    //   }
    // }
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

Evaluacion.Puesto = Evaluacion.belongsTo(PuestoClon, {foreignKey: "id"});