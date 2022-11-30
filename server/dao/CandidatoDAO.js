import { Candidato } from "../models/Candidato.js";
import { Op } from "sequelize"; 
import { sequelize } from "../db/database.js";

export class CandidatoDAO {
  async getCandidatos(params){
    try {
      const { nombre, apellido, nroCandidato } = params
      let filtro = [];
      if(nombre)filtro.push({
        nombre: {
          [Op.like]: "%" + nombre + "%"
        }
      });
      if(apellido)filtro.push({
        apellido: {
          [Op.like]: "%" + apellido + "%"
        }
      });
      if(nroCandidato)filtro.push({nroCandidato});

      const candidatos = await Candidato.findAll({
        where: {
          [Op.or]: filtro
        },
      });

      return candidatos;
    } catch (error) {
      return error;
    }
    
  }

  async getCandidato(params){
    const { tipoDoc, documento, clave} = params;

    return await Candidato.findOne({
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
  }

  async guardarCandidato(candidato){
    return await sequelize.transaction(async (t) => {
      await candidato.save({ 
        transaction: t,
      });
    });
  }

  async getCuestionarios(nroCandidato){
    try {
      return await Candidato.findOne({
        where: {
          nroCandidato
        },
        include: {
          association: Candidato.Cuestionarios,
          where: {
            estado: {
              [Op.or]: ["activo", "enProceso"]
            }
          }
        },
      })
      
    }catch (error) {
      return error;
    }
  }

}