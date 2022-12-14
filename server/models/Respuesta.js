import { sequelize } from "../db/database.js";
import { Model } from "sequelize";
import { Bloque } from "./Bloque.js";
import { PreguntaClon } from "./PreguntaClon.js";
import { PuntajeClon } from "./PuntajeClon.js";

export class Respuesta extends Model {}

Respuesta.init(
  {
  },
  {
    sequelize,
    modelName: "Respuesta",
    tableName: "Respuestas",
    name: {
      singular: "respuesta",
      plural: "respuestas",
    },
  }
);

Respuesta.Bloque = Respuesta.belongsTo(Bloque);
Respuesta.Opcion = Respuesta.belongsTo(PuntajeClon);