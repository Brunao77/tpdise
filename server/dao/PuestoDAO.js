import { sequelize } from "../db/database.js";
import { Ponderacion } from "../models/Ponderacion.js";
import { Puesto } from "../models/Puesto.js";

export class PuestoDAO {
  async guardarPuesto(puesto) {
    return await sequelize.transaction(async (t) => {
      await puesto.save({ 
        transaction: t,
      });
    });
  }

  async getPuesto(codigo) {
    return await Puesto.findOne({
      where: {codigo: codigo.toString()},
      include: [{
        association: Puesto.Ponderaciones,
        include: [Ponderacion.Competencia]
      }]
    });
  }

  async getPuestos() {
    return await Puesto.findAll();
  }
}
