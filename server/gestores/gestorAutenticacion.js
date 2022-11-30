import { Consultor } from "../models/Consultor.js";
import { CandidatoDAO } from "../dao/CandidatoDAO.js";

export async function loginCandidato(req, res) {
  try {    
    if(!req.session.isLoggedIn){
      const candidatoDAO = new CandidatoDAO;
      const candidato = await candidatoDAO.getCandidato(req.body);

      if(!candidato) throw new Error("datos incorrectos o no hay cuestionarios asociados.");
      else {
        req.session.isLoggedIn = true;
        req.session.usuario = candidato;
        
        res.status(200).json(req.session);
      }
    }else res.status(200).json({message: "ya estas autenticado en el sistema"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function loginConsultor(req, res) {
  try {
    const { nombre, password} = req.body;
    const consultor = await Consultor.findOne({
      where: {
        nombre: nombre,
      },
    });
    if(consultor && consultor.password === password){
      req.session.isLoggedIn = true;
      req.session.usuario = consultor;
      console.log(req.session);
      res.status(200).json(req.session);
    } else {
      res.status(200).json({"error": "login incorrecto"});
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function addConsultor(req, res) {
  try {
    const { nombre, password} = req.body;
    const newConsultor = Consultor.create({
      nombre,
      password,
    });
    res.json(newConsultor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
}
