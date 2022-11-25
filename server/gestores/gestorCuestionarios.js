import { CeusetionarioDAO } from "../dao/CuestionarioDAO.js";
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

export async function newCuestionario(req, res) {
  try {
    const {estado, nroCandidato} = req.body;

    const cuestionarioDAO = new CeusetionarioDAO;
    const cuestionario = new Cuestionario({
      estado,
      nroCandidato,
      clave: generarClave()
    });

    const result = await cuestionarioDAO.guardarCuestionario(cuestionario);
    res.json(cuestionario);

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

function generarClave(){
  return 12345678;
}