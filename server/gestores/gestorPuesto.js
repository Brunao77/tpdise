import { PuestoDAO } from "../dao/PuestoDAO.js";
import { PonderacionDAO } from "../dao/PonderacionDAO.js";
import { Puesto } from "../models/Puesto.js";
import { Ponderacion } from "../models/Ponderacion.js";
import { sequelize } from "../db/database.js";

export async function postPuesto(req, res) {
  try {
    const { codigo, nombre, descripcion, empresa, competencias } = req.body;
    
    // Crea instancias de Puesto y Ponderación.
    const newPuesto = new Puesto(codigo, nombre, descripcion, empresa);
    const ponderaciones = competencias.map((competencia) => {
        return new Ponderacion(codigo, competencia.codigo, competencia.valor);
    });

    // Inserta las instancias creadas en la base de datos, en una transacción.
    await sequelize.transaction(async (t) => {
      await PuestoDAO.create(newPuesto, { transaction: t });
      await PonderacionDAO.bulkCreate(ponderaciones, { transaction: t });
    })

    res.json(newPuesto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}