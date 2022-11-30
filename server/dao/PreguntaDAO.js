import { Pregunta } from "../models/Pregunta.js";

export class PreguntaDAO {
  async getPreguntas(factor) {
    return await Pregunta.findAndCountAll({
      where: {
        factorId: factor
      }
    });
  }
}