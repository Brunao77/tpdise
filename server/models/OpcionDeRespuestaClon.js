import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { OpcionDeRespuesta } from "./OpcionDeRespuesta.js";

export class OpcionDeRespuestaClon extends Model {}

OpcionDeRespuestaClon.init(
  {
    nombre: {
      type: DataTypes.STRING,
    },    
    descripcion: {
      type: DataTypes.STRING,
    }, 
  },
  {
    sequelize,
    modelName: "OpcionDeRespuestaClon",
    tableName: "OpcionesDeRespuestaClon",
    name: {
      singular: "opcionDeRespuesta",
      plural: "opcionesDeRespuesta",
    },
  }
);

OpcionDeRespuestaClon.belongsTo(OpcionDeRespuesta, {foreignKey: "esClonDe"});