import Sequelize from "sequelize";

export const sequelize = new Sequelize("tpdise", "postgres", "tpdisepass", {
  host: "localhost",
  dialect: "postgres",
});
