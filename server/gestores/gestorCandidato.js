import { CandidatoDAO } from "../dao/CandidatoDAO.js";
import { Candidato } from "../models/Candidato.js";

export async function getCandidatos(req, res) {
  try {
    const candidatoDAO = new CandidatoDAO();
    const candidatos = await candidatoDAO.getCandidatos();

    res.json(candidatos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function newCandidato(req, res) {
  try {
    const { nombre, apellido, tipoDoc, documento, nroCandidato } = req.body;

    const candidatoDAO = new CandidatoDAO();
    const candidato = new Candidato({
      nombre,
      apellido,
      tipoDoc,
      documento,
      nroCandidato,
    });

    const result = await candidatoDAO.guardarCandidato(candidato);
    res.json(candidato);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// mandar lista de nroCandidato como body.
export async function verificarCuestionarios(req, res) {
  try {
    const listaCandidatos = req.body;
    let candidatos = [];
    let eliminados = [];
    const candidatoDAO = new CandidatoDAO();

    await Promise.all(
      listaCandidatos.map(async (candidato) => {
        if ((await candidatoDAO.getCuestionarios(candidato)) != null) {
          eliminados.push(candidato);
        } else {
          candidatos.push(candidato);
        }
      })
    );

    res.json({ candidatos, eliminados });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
