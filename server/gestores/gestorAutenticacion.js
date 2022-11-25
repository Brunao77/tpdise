import { Consultor } from "../models/Consultor.js";
import { Candidato } from "../models/Candidato.js";
import { Op } from "sequelize";

export async function loginCandidato(req, res) {
  try {
    const { tipoDoc, documento, clave} = req.body;
    
    const candidato = await Candidato.findOne({
      where: {
        tipoDoc,
        documento
      },
      include: {
        association: Candidato.Cuestionarios,
        where: {
          clave,
          estado: {
            [Op.or]: ["activo", "enProceso"]
          }
        }
      },
    });
    console.log(candidato);
    if(!candidato) throw new Error("datos incorrectos o no hay cuestionarios asociados.");
    else {
      req.session.isLoggedIn = true;
      req.session.usuario = candidato;
      
      res.status(200).json(candidato);
    }
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
      res.status(200).send();
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
