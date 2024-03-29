import { Competencia } from "../models/Competencia.js";

export class CompetenciaDAO {
  async guardarCompetencia(competencia) {
    return await competencia.save();
  }
  async obtenerCompetencias() {
    return await Competencia.findAll({});
  }

  async getCompetencia(idCompetencia){
    return await Competencia.findByPk(idCompetencia);
  }
}
