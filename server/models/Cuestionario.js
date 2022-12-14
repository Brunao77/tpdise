import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Bloque } from "./Bloque.js";
import { ResultadoCompetencia } from "./ResultadoCompetencia.js";
import { Evaluacion } from "./Evaluacion.js";
import { RegistroEjecucion } from "./RegistroEjecucion.js";

export class Cuestionario extends Model {}

Cuestionario.init(
  {
    estado: {
      type: DataTypes.STRING,
    },
    fechaFin: {
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

Cuestionario.Resultados = Cuestionario.hasMany(ResultadoCompetencia, {foreignKey: "idCuestionario"});
Cuestionario.Evaluacion = Cuestionario.belongsTo(Evaluacion);
Evaluacion.Cuestionarios = Evaluacion.hasMany(Cuestionario);
Cuestionario.RegistroEjecucion = Cuestionario.hasOne(RegistroEjecucion, {foreignKey: "cuestionarioId"});