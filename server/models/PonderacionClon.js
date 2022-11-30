import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { CompetenciaClon } from "./CompetenciaClon.js";
import { Ponderacion } from "./Ponderacion.js";

export class PonderacionClon extends Model {}

PonderacionClon.init(
  {
    valor: {
      type: DataTypes.REAL,
    },
    idCompetencia: {
      type: DataTypes.INTEGER,
      unique: "puesto-comp",
    },
    idPuesto: {
      type: DataTypes.INTEGER,
      unique: "puesto-comp",
    },
    
  },
  {
    sequelize,
    modelName: "PonderacionClon",
    tableName: "PonderacionesClon",
    name: {
      singular: "ponderacion",
      plural: "ponderaciones",
    },
  }
);

PonderacionClon.Competencia = PonderacionClon.belongsTo(CompetenciaClon, { foreignKey: "idCompetencia" });
PonderacionClon.belongsTo(Ponderacion, { foreignKey: "esClonDe" });