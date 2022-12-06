import { FactorDAO } from "../dao/FactorDAO.js";
import { FactorClon } from "../models/FactorClon.js";
import { crearPreguntasClon } from "./gestorPreguntas.js";

export async function crearFactoresClon(idCompetencia, competenciaClon){
  try {
    const factorDAO = new FactorDAO;
    const factores = await factorDAO.getFactores(idCompetencia);

    const factoresClon = [];
    const preguntasClon = [];
    for(const factor of factores){

      const factorClon = new FactorClon({
        esClonDe: factor.id,
        nombre: factor.nombre,
        descripcion: factor.descripcion,
        orden: factor.orden,
      },{
        // include: [{
        //   association: FactorClon.Competencia,
        // }]
      })

      factorClon.asociar("competencia", competenciaClon);

      const preguntas = await crearPreguntasClon(factor.id, factorClon);

      factoresClon.push({factor: factorClon, preguntas: preguntas});
      // preguntasClon.push(preguntas);
    }

    return factoresClon;  
  } catch (error) {
    return new Error(error.message);
  }
  
}