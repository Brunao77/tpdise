import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { PreguntaClon } from "./PreguntaClon.js"
import { Cuestionario } from "./Cuestionario.js";

export class Bloque extends Model {}

Bloque.init(
  {
    nroBloque: {
      type: DataTypes.INTEGER,
    },
    estado: {
      type: DataTypes.STRING,
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

Cuestionario.Bloques = Cuestionario.hasMany(Bloque);
Bloque.Cuestionario = Bloque.belongsTo(Cuestionario);