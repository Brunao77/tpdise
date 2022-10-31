import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Ponderacion } from "./Ponderacion.js";

export class Puesto extends Model {}

Puesto.init(
  {
    codigo: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    empresa: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Puesto",
    tableName: "Puestos",
    name: {
      singular: "puesto",
      plural: "puestos"
    }
  }
);

Puesto.Ponderaciones = Puesto.hasMany(Ponderacion, {foreignKey: 'puestoCodigo'});
