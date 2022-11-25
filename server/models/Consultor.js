import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";

export class Consultor extends Model {}

Consultor.init(
  {
    nombre: {
      type: DataTypes.STRING,
      unique: true,
    },    
    password: {
      type: DataTypes.STRING,
    }, 
  },
  {
    sequelize,
    modelName: "Consultor",
    tableName: "Consultores",
    name: {
      singular: "consultor",
      plural: "consultores",
    },
  }
);