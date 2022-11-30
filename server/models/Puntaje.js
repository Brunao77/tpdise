import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Opcion } from "./Opcion.js";

export class Puntaje extends Model {}

Puntaje.init(
  {
    valor: {
      type: DataTypes.REAL,
    },    
    idPregunta: {
      type: DataTypes.INTEGER,
      unique: "pregunta-opcion",
    }, 
    idOpcion: {
      type: DataTypes.INTEGER,
      unique: "pregunta-opcion",
    }, 
  },
  {
    sequelize,
    modelName: "Puntaje",
    tableName: "Puntajes",
    name: {
      singular: "puntaje",
      plural: "puntajes",
    },
  }
);

Puntaje.Opcion = Puntaje.belongsTo(Opcion, { foreignKey: "idOpcion" });