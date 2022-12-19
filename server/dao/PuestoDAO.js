import { Op } from "sequelize";
import { sequelize } from "../db/database.js";
import { deletePuesto } from "../gestores/gestorPuesto.js";
import { Competencia } from "../models/Competencia.js";
import { Ponderacion } from "../models/Ponderacion.js";
import { Puesto } from "../models/Puesto.js";
import { PuestoClon } from "../models/PuestoClon.js";

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
      where: { codigo: codigo.toString() },
      include: [
        {
          association: Puesto.Ponderaciones,
          include: {
            association: Ponderacion.Competencia,
            include: [Competencia.Factores],
          },
        },
      ],
    });
  }

  async getPuestoClon(id) {
    return await PuestoClon.findOne({
      where: { id: id },
      include: [
        {
          association: Puesto.Ponderaciones,
          include: {
            association: Ponderacion.Competencia,
            include: [Competencia.Factores],
          },
        },
      ],
    });
  }

  async getPuestos() {
    return await Puesto.findAll();
  }

  async deletePuesto(id) {
    return await Puesto.destroy({
      where: {
        id: id,
      },
    });
  }

  async buscarPuestos(params) {
    try {
      const { codigo, nombre, empresa } = params;
      let filtro = [];
      if (nombre)
        filtro.push({
          nombre: {
            [Op.like]: "%" + nombre + "%",
          },
        });
      if (empresa)
        filtro.push({
          empresa: {
            [Op.like]: "%" + empresa + "%",
          },
        });
      if (codigo) filtro.push({ codigo: codigo });

      const puestos = await Puesto.findAll({
        where: {
          [Op.or]: filtro,
        },
      });

      return puestos;
    } catch (error) {
      return error;
    }
  }
}
