import { sequelize } from "../db/database.js";

export class PuestoDAO {
  async guardarPuesto(puesto) {
      return await sequelize.transaction(async (t) => {
        await puesto.save({ 
          transaction: t,
        });
      });
  }
}
