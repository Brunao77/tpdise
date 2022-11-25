import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Opcion } from "./Opcion.js";
import { OpcionDeRespuestaClon } from "./OpcionDeRespuestaClon.js";

export class OpcionClon extends Model {}

OpcionClon.init(
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
    modelName: "OpcionClon",
    tableName: "OpcionesClon",
    name: {
      singular: "opcion",
      plural: "opciones",
    },
  }
);

OpcionClon.OpcionDeRespuesta = OpcionClon.belongsTo(OpcionDeRespuestaClon);
OpcionClon.belongsTo(Opcion, { foreignKey: "esClonDe" });