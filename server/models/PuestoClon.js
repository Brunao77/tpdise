import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { PonderacionClon } from "./PonderacionClon.js";
import { Puesto } from "./Puesto.js";

export class PuestoClon extends Model {}

PuestoClon.init(
  {
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
    modelName: "PuestoClon",
    tableName: "PuestosClon",
    name: {
      singular: "puesto",
      plural: "puestos"
    }
  }
);

PuestoClon.Ponderaciones = PuestoClon.hasMany(PonderacionClon, {foreignKey: "idPuesto"});
PuestoClon.belongsTo(Puesto, {foreignKey: "esClonDe"});