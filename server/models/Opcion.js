import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { OpcionDeRespuesta } from "./OpcionDeRespuesta.js";

export class Opcion extends Model {}

Opcion.init(
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
    modelName: "Opcion",
    tableName: "Opciones",
    name: {
      singular: "opcion",
      plural: "opciones",
    },
  }
);

Opcion.OpcionDeRespuesta = Opcion.belongsTo(OpcionDeRespuesta);