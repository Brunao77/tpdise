import { CandidatoDAO } from "../dao/CandidatoDAO.js";
import { Candidato } from "../models/Candidato.js";

export async function getCandidatos(req, res) {
  try {    
    const candidatoDAO = new CandidatoDAO;
    const candidatos = await candidatoDAO.getCandidatos(req.body);

    res.json(candidatos);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function newCandidato(req, res) {
  try {
    const {nombre, apellido, tipoDoc, documento, nroCandidato} = req.body;

    const candidatoDAO = new CandidatoDAO;
    const candidato = new Candidato({
      nombre,
      apellido,
      tipoDoc,
      documento,
      nroCandidato
    });

    const result = await candidatoDAO.guardarCandidato(candidato);
    res.json(candidato);

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function verificarCuestionarios(req, res){ 
  try {
    let candidatos = [];
    const candidatoDAO = new CandidatoDAO;
    
    await req.body.map(async (candidato) => {
      const c = await candidatoDAO.getCuestionarios(candidato.nroCandidato);
      candidatos.push(c);
      console.log(c);
    });

    res.json(candidatos);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
  
}