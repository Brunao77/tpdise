import { sequelize } from "../db/database.js";
import { FactorDAO } from "./FactorDAO.js";
import { PreguntaDAO } from "./PreguntaDAO.js";


export class EvaluacionDAO {
  async guardarEvaluacion({evaluacion, factores}){
    const factorDAO = new FactorDAO;
    const preguntaDAO = new PreguntaDAO;
    const result = await sequelize.transaction(async (t) => {
      const ev = await evaluacion.save({ 
        transaction: t,
      });
      for(const pond of ev.puesto.ponderaciones){
        for(const f of factores){
          if(f.competencia.esClonDe == pond.competencia.esClonDe){
            for(const factor of f.factores){
              factor.factor.set("competenciaId", pond.competencia.id);
              const fac = await factorDAO.guardarFactorClon(factor.factor, t);
              for(const pregunta of factor.preguntas){
                pregunta.set("factorId", fac.id);
                await preguntaDAO.guardarPreguntaClon(pregunta, t);
              }
            }
          }
        }
      }
    });
    return result;
  }
}