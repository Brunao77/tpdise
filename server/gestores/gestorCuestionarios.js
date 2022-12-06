import { CuestionarioDAO } from "../dao/CuestionarioDAO.js";
import { Cuestionario } from "../models/Cuestionario.js";

export async function getCandidatos(req, res) {
  try {    
    const candidatoDAO = new CandidatoDAO;
    const candidatos = await candidatoDAO.getCandidatos(req.body);

    res.json(candidatos);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function crearCuestionario(candidato, clave) {
  try {
    const cuestionario = new Cuestionario({
      nroCandidato: candidato,
      estado: "activo",
      clave: clave,
      fechaInicio: Date.now(),
    });
    return cuestionario;
  } catch (error) {
    return error;
  }
}
