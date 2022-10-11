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

export async function getCompetencias(req, res) {
  try {
    const competencias = await Competencia.findAll({});
    res.json(competencias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
