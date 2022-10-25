import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";
import { CompetenciaDAO } from "./CompetenciaDAO.js";

export const PonderacionDAO = sequelize.define("ponderaciones", {
  ponderacion: DataTypes.INTEGER,
});

PonderacionDAO.belongsTo(CompetenciaDAO);