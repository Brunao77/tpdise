import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";

export class OpcionDeRespuesta extends Model {}

OpcionDeRespuesta.init(
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
    modelName: "OpcionDeRespuesta",
    tableName: "OpcionesDeRespuesta",
    name: {
      singular: "opcionDeRespuesta",
      plural: "opcionesDeRespuesta",
    },
  }
);
