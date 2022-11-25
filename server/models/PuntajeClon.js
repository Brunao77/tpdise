import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { OpcionClon } from "./OpcionClon.js";
import { Puntaje } from "./Puntaje.js";

export class PuntajeClon extends Model {}

PuntajeClon.init(
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
    modelName: "PuntajeClon",
    tableName: "PuntajesClon",
    name: {
      singular: "puntaje",
      plural: "puntajes",
    },
  }
);

PuntajeClon.belongsTo(Puntaje, { foreignKey: "esClonDe"});
PuntajeClon.belongsTo(OpcionClon, { foreignKey: "idOpcion" });