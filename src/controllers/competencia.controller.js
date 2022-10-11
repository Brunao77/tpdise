import { Competencia } from "../models/Competencia.js";

export async function postCompetencia(req, res) {
  try {
    const { codigo, nombre, descripcion } = req.body;
    const newCompetencia = await Competencia.create({
      codigo,
      nombre,
      descripcion,
    });

    res.json(newCompetencia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
