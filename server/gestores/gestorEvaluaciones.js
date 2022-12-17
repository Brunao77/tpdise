import { EvaluacionDAO } from "../dao/EvaluacionDAO.js";
import { PreguntaDAO } from "../dao/PreguntaDAO.js";
import { Cuestionario } from "../models/Cuestionario.js";
import { Evaluacion } from "../models/Evaluacion.js";
import { PonderacionClon } from "../models/PonderacionClon.js";
import { PuestoClon } from "../models/PuestoClon.js";
import { crearCuestionario } from "./gestorCuestionarios.js";
import { crearPuestoClon } from "./gestorPuesto.js";

export function generarClave(req, res) {
  try {
    const candidatos = req.body;

    const claves = candidatos.map((candidato) => {
      candidato.clave = Array.from(Array(8), () => Math.floor(Math.random() * 36).toString(36)).join('');
      return candidato;
    });
    res.json(claves)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  
}

export async function crearEvaluacion(req, res) {
  try {
    const {codigoPuesto, claves} = req.body;

    const evaluacionDAO = new EvaluacionDAO;
    const preguntaDAO = new PreguntaDAO;
    const evaluacion = new Evaluacion({},{
      include: [{
        association: Evaluacion.Puesto,
        include: [{
          association: PuestoClon.Ponderaciones,
          include: [PonderacionClon.Competencia],
        }],
      },
      {
        association: Evaluacion.Cuestionarios,
        include: Cuestionario.RegistroEjecucion
      }],
    });

    const { puestoClon, factoresClon } = await crearPuestoClon(codigoPuesto);
    const cuestionarios = await Promise.all(
      claves.map(async ({candidato, clave}) => {
        return await crearCuestionario(candidato, clave);
      })
    )
    // console.log(puestoClon);
    evaluacion.asociar('puesto', puestoClon);
    evaluacion.asociar('cuestionarios', cuestionarios);

    evaluacionDAO.guardarEvaluacion({evaluacion: evaluacion, factores: factoresClon});
    
    res.json({evaluacion, puestoClon, factoresClon});
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  
}