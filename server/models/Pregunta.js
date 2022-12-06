import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Factor } from "./Factor.js";
import { Puntaje } from "./Puntaje.js";
import { OpcionDeRespuesta } from "./OpcionDeRespuesta.js";

export class Pregunta extends Model {}

Pregunta.init(
  {
    codigo: {
      type: DataTypes.STRING,
      unique: true,
    },
    enunciado: {
      type: DataTypes.STRING,
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
    modelName: "Pregunta",
    tableName: "Preguntas",
    name: {
      singular: "pregunta",
      plural: "preguntas"
    }
  }
);

Pregunta.Factor = Pregunta.belongsTo(Factor);
Pregunta.Opciones = Pregunta.hasMany(Puntaje, {as: "opciones", foreignKey: "idPregunta"});
Pregunta.OpcionDeRespuesta = Pregunta.belongsTo(OpcionDeRespuesta);
