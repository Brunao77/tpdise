import { sequelize } from "../db/database.js";

export class CeusetionarioDAO {
  async guardarCuestionario(cuestionario){
    return await sequelize.transaction(async (t) => {
      await cuestionario.save({ 
        transaction: t,
      });
    });
  }
}