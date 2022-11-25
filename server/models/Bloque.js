import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { PreguntaClon } from "./PreguntaClon.js"

export class Bloque extends Model {}

Bloque.init(
  {
    nroBloque: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Bloque",
    tableName: "Bloques",
    name: {
      singular: "bloque",
      plural: "bloques",
    },
  }
);

Bloque.Preguntas = Bloque.hasMany(PreguntaClon);