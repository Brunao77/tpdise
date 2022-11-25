import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Pregunta } from "./Pregunta.js";
import { PuntajeClon } from "./PuntajeClon.js";
import { FactorClon } from "./FactorClon.js";
import { OpcionDeRespuestaClon } from "./OpcionDeRespuestaClon.js";

export class PreguntaClon extends Model {}

PreguntaClon.init(
  {
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
    modelName: "PreguntaClon",
    tableName: "PreguntasClon",
    name: {
      singular: "pregunta",
      plural: "preguntas"
    }
  }
);

PreguntaClon.Respuesta = PreguntaClon.hasOne(PuntajeClon, {as: "respuesta", foreignKey: "idPregunta"});
PreguntaClon.Opciones = PreguntaClon.hasMany(PuntajeClon, {as: "opciones", foreignKey: "idPregunta"});
PreguntaClon.Factor = PreguntaClon.belongsTo(FactorClon);
PreguntaClon.OpcionDeRespuesta = PreguntaClon.belongsTo(OpcionDeRespuestaClon);

PreguntaClon.belongsTo(Pregunta, {foreignKey: "esClonDe"});