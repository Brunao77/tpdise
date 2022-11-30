import { sequelize } from "../db/database.js";
import { Factor } from "../models/Factor.js";

export class FactorDAO {
  async getFactores(competencia) {
    const f = await Factor.findAll({
      where: {
        competenciaId: competencia
      }
    });
    // console.log(f);
    return f;
  }
}