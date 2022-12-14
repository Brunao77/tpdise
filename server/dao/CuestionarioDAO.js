import { Op } from "sequelize";
import { sequelize } from "../db/database.js";
import { Bloque } from "../models/Bloque.js";
import { Cuestionario } from "../models/Cuestionario.js";
import { Evaluacion } from "../models/Evaluacion.js";
import { PreguntaClon } from "../models/PreguntaClon.js";
import { PuntajeClon } from "../models/PuntajeClon.js";
import { PreguntaDAO } from "./PreguntaDAO.js";

export class CuestionarioDAO {
  async guardarCuestionario(cuestionario){
    return await sequelize.transaction(async (t) => {
      await cuestionario.save({ 
        transaction: t,
      });
      await cuestionario.registroEjecucion.save({
        transaction: t,
      })
    });
  }

  async getCuestionario(candidato){
    return await Cuestionario.findOne({
      where: {
        nroCandidato: candidato,
        estado: {
          [Op.or]: ["activo", "enProceso"]
        }
      },
      include: [{
        association: Cuestionario.Evaluacion,
        include: Evaluacion.Puesto,
      },{
        association: Cuestionario.RegistroEjecucion,
      }],
    })
  }

  async updateCuestionario(cuestionario, bloques) {
    try {
      let c, b, r;
      const preguntaDAO = new PreguntaDAO;
      await sequelize.transaction(async (t) => {
        c = await cuestionario.save({ 
          transaction: t,
        });
        console.log(cuestionario.registroEjecucion)
        for(const bloque of bloques) {
          b = await bloque.bloque.save({
            transaction: t,
          });
          for(const respuesta of bloque.respuestas) {
            respuesta.set("bloqueId", b.id);
            r = await preguntaDAO.insertRespuesta(respuesta, t);
          }
        }
      });  
      return {c, b, r};
    } catch (error) {
      return error;
    }
  }

  async getBloque(cuestionario) {
    try {
      // let bloque = await Bloque.findOne({
      //   where: {
      //     cuestionarioId: cuestionario,
      //     estado: 'enProceso',
      //   },
      //   include: [{
      //     association: Bloque.Preguntas,
      //     include: {
      //       association: PreguntaClon.Opciones,
      //       include: PuntajeClon.Opcion,
      //     }
      //   }]
      // });
      // if(bloque != null) return bloque;
      // else {
        let bloque = await Bloque.findOne({
          where: {
            cuestionarioId: cuestionario,
            estado: 'porContestar',
          },
          order: [["nroBloque"]],
          // limit: 1,
          include: [{
            association: Bloque.Preguntas,
            include: {
              association: PreguntaClon.Opciones,
              include: PuntajeClon.Opcion,
            }
          }],
        });
        console.log(bloque);
        return bloque;
      // }
    } catch (error) {
      return error
    }
  }
}