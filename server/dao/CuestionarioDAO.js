import { sequelize } from "../db/database.js";

export class CuestionarioDAO {
  async guardarCuestionario(cuestionario){
    return await sequelize.transaction(async (t) => {
      await cuestionario.save({ 
        transaction: t,
      });
    });
  }
}