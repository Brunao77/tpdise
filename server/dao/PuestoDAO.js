import { sequelize } from "../db/database.js";
import { Ponderacion } from "../models/Ponderacion.js";
import { Puesto } from "../models/Puesto.js";

export class PuestoDAO {
  async guardarPuesto(puesto) {
    console.log(await puesto.toJSON());
    return await sequelize.transaction(async (t) => {
      const p = await puesto.save({ 
        transaction: t,
      });
      console.log("p: ", await p.toJSON());
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
