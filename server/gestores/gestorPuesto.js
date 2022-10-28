import { sequelize } from "../db/database.js";
import { Puesto } from "../models/Puesto.js";
import { Ponderacion } from "../models/Ponderacion.js";
import { PuestoDAO } from "../dao/PuestoDAO.js";

export async function postPuesto(req, res) {
  try {
    const { codigo, nombre, descripcion, empresa, competencias } = req.body;

    const newPuesto = new Puesto({
      codigo,
      nombre,
      descripcion,
      empresa,
    });

    const ponderaciones = competencias.map((competencia) => {
      return new Ponderacion({
        PuestoCodigo: codigo,
        CompetenciumCodigo: competencia.competencia,
        ponderacion: competencia.puntos,
      });
    });

    const puestoDAO = new PuestoDAO();
    await puestoDAO.guardarPuesto(newPuesto, ponderaciones);

    res.json(newPuesto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
