import { Competencia } from "../models/Competencia.js";
import { CompetenciaDAO } from "../dao/CompetenciaDAO.js";
import { CompetenciaClon } from "../models/CompetenciaClon.js";
import { crearFactoresClon } from "./gestorFactores.js";

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

export async function getCompetencia(req, res) {
  try {
    const codigo = req.params.codigo;
    const response = await Competencia.findByPk(codigo.toString());
    console.log(response);
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function crearCompetenciaClon(idCompetencia){
  try {
    const competenciaDAO = new CompetenciaDAO;
    const competencia = await competenciaDAO.getCompetencia(idCompetencia);

    const competenciaClon = new CompetenciaClon({
      esClonDe: competencia.id,
      nombre: competencia.nombre,
      descripcion: competencia.descripcion,
    });

    const factores = await crearFactoresClon(idCompetencia, competenciaClon);

    return {competencia: competenciaClon, factores: factores};  
  } catch (error) {
    return new Error(error.message);
  }
  
}