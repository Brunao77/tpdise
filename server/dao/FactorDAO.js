import { sequelize } from "../db/database.js";
import { Factor } from "../models/Factor.js";

export class FactorDAO {
  async getFactores(competencia) {
    const f = await Factor.findAll({
      where: {
        competenciaId: competencia
      }
    });
    return f;
  }
  async guardarFactorClon(factorClon, t){
    return await factorClon.save({
      transaction: t,
    });
  }
}