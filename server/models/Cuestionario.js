import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Bloque } from "./Bloque.js";
import { ResultadoCompetencia } from "./ResultadoCompetencia.js";
import { Candidato } from "./Candidato.js";

export class Cuestionario extends Model {}

Cuestionario.init(
  {
    estado: {
      type: DataTypes.STRING,
    },
    fechaFin: {
      type: DataTypes.DATE,
    },
    fechaInicio: {
      type: DataTypes.DATE,
    },
    clave: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Cuestionario",
    tableName: "Cuestionarios",
    name: {
      singular: "cuestionario",
      plural: "cuestionarios",
    },
  }
);

Cuestionario.Bloques = Cuestionario.hasMany(Bloque);
Cuestionario.Resultados = Cuestionario.hasMany(ResultadoCompetencia, {foreignKey: "idCuestionario"});
