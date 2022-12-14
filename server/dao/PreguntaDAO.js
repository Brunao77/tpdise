import { sequelize } from "../db/database.js";
import { OpcionDeRespuesta } from "../models/OpcionDeRespuesta.js";
import { Pregunta } from "../models/Pregunta.js";
import { PreguntaClon } from "../models/PreguntaClon.js";
import { Puntaje } from "../models/Puntaje.js";

export class PreguntaDAO {
  async getPreguntas(factor) {
    return await Pregunta.findAll({
      where: {
        factorId: factor
      }
    });
  }
  async getOpciones(idPregunta){
    return await Puntaje.findAll({
      where: {
        idPregunta: idPregunta,
      },
      include: {
        association: Puntaje.Opcion,
      },
    });
  }
  async getOpcionDeRespuesta(idOpcionDeRespuesta){
    return await OpcionDeRespuesta.findByPk(idOpcionDeRespuesta);
  }
  async guardarPreguntaClon(preguntaClon, t) {
    return await preguntaClon.save({ 
        transaction: t,
      });
  }
  async getPreguntasClon(factor){
    return await PreguntaClon.findAll({
      where: {
        factorId: factor
      }
    });
  }
  async insertRespuesta(respuesta, t){
    try {
      return await respuesta.save({
        transaction: t,
      });  
    } catch (error) {
      return error;
    }
    
  }
}