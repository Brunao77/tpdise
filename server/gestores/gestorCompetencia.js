import { Competencia } from "../models/Competencia.js";
import { CompetenciaDAO } from "../dao/CompetenciaDAO.js";

export async function postCompetencia(req, res) {
  try {
    const { codigo, nombre, descripcion } = req.body;
    const newCompetencia = new Competencia({ codigo, nombre, descripcion });

    const compDAO = new CompetenciaDAO();

    const saveCompetencia = await compDAO.guardarCompetencia(newCompetencia);

    res.json(saveCompetencia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getCompetencias(req, res) {
  try {
    const compDAO = new CompetenciaDAO();
    const competencias = await compDAO.obtenerCompetencias();
    res.json(competencias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
