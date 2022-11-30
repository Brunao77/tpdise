import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Competencia } from "./Competencia.js";

export class Ponderacion extends Model {}

Ponderacion.init(
  {
    valor: {
      type: DataTypes.REAL,
    },
    idCompetencia: {
      type: DataTypes.INTEGER,
      unique: "puesto-comp",
    },
    idPuesto: {
      type: DataTypes.INTEGER,
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

Ponderacion.Competencia = Ponderacion.belongsTo(Competencia, { foreignKey: "idCompetencia" });
