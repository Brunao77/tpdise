import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Cuestionario } from "./Cuestionario.js";

export class Candidato extends Model {}

Candidato.init(
  {
    tipoDoc: {
      type: DataTypes.STRING,
      unique: "tipoNroDocumento",
    },
    documento: {
      type: DataTypes.INTEGER,
      unique: "tipoNroDocumento",
    },
    apellido: {
      type: DataTypes.STRING,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    nroCandidato: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Candidato",
    tableName: "Candidatos",
    name: {
      singular: "candidato",
      plural: "candidatos",
    },
  }
);

Candidato.Cuestionarios = Candidato.hasMany(Cuestionario, {sourceKey: "nroCandidato", foreignKey: "nroCandidato"});