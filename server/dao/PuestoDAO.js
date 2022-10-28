import { sequelize } from "../db/database.js";

export class PuestoDAO {
  async guardarPuesto(puesto, ponderaciones) {
    try {
      await puesto.save();
      ponderaciones.map(async (ponderacion) => await ponderacion.save());
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
