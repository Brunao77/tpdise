import Sequelize from "sequelize";

export const sequelize = new Sequelize("tpdise", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});
