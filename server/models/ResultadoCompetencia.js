import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Competencia } from "./Competencia.js";

export class ResultadoCompetencia extends Model {}

ResultadoCompetencia.init(
  {
    puntaje: {
      type: DataTypes.REAL,
    },    
    idCompetencia: {
      type: DataTypes.INTEGER,
      unique: "competencia-cuestionario",
    }, 
    idCuestionario: {
      type: DataTypes.INTEGER,
      unique: "competencia-cuestionario",
    }, 
  },
  {
    sequelize,
    modelName: "ResultadoCompetencia",
    tableName: "ResultadosCompetencias",
    name: {
      singular: "resultadoCompetencia",
      plural: "resultadosCompetencias",
    },
  }
);

ResultadoCompetencia.belongsTo(Competencia, {foreignKey: "idCompetencia"});