import { sequelize } from "../db/database.js";
import { DataTypes, Model } from "sequelize";
import { Puesto } from "./Puesto.js";
import { Competencia } from "./Competencia.js";
import { Consultor } from "./Consultor.js";
import { Pregunta } from "./Pregunta.js";
import { OpcionDeRespuesta } from "./OpcionDeRespuesta.js";
import { Factor } from "./Factor.js";

export class RegistroAuditoria extends Model {}

RegistroAuditoria.init(
  {
    fecha: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "RegistroAuditoria",
    tableName: "RegistrosAuditoria",
    name: {
      singular: "registroAuditoria",
      plural: "registrosAuditoria",
    },
  }
);

RegistroAuditoria.belongsTo(Consultor);

RegistroAuditoria.belongsTo(Puesto);
RegistroAuditoria.belongsTo(Competencia);
RegistroAuditoria.belongsTo(Pregunta);
RegistroAuditoria.belongsTo(OpcionDeRespuesta);
RegistroAuditoria.belongsTo(Factor);
