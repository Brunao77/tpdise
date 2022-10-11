import { Puesto } from "../models/Puesto.js";
import { Puesto_Competencia } from "../models/Puesto_Competencia.js";

export async function postPuesto(req, res) {
  try {
    const { codigo, nombre, descripcion, empresa, competencias } = req.body;
    const newPuesto = await Puesto.create({
      codigo,
      nombre,
      descripcion,
      empresa,
    });
    const puesto_competencia = competencias.map(async (competencia) => {
      try {
        return await Puesto_Competencia.create({
          puestoCodigo: codigo,
          competenciumCodigo: competencia.codigo,
          ponderacion: competencia.ponderacion,
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    });
    res.json(newPuesto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
