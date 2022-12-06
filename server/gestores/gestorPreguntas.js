import { PreguntaDAO } from "../dao/PreguntaDAO.js";
import { PreguntaClon } from "../models/PreguntaClon.js";
import { OpcionDeRespuestaClon } from "../models/OpcionDeRespuestaClon.js";
import { PuntajeClon } from "../models/PuntajeClon.js";

export async function crearPreguntasClon(idFactor, factorClon){
  try {
    const preguntaDAO = new PreguntaDAO;
    const preguntas = await preguntaDAO.getPreguntas(idFactor);

    const preguntasClon = [];
    for(const pregunta of preguntas){
      const opciones = await preguntaDAO.getOpciones(pregunta.id);
      const opcionDeRespuesta = await preguntaDAO.getOpcionDeRespuesta(pregunta.opcionDeRespuestaId);
      const preguntaClon = new PreguntaClon(
        {
          enunciado: pregunta.enunciado,
          nombre: pregunta.nombre,
          descripcion: pregunta.descripcion,
        },
        {
          include: [
            {
              association: PreguntaClon.Opciones,
              include: [PuntajeClon.Opcion]
            },
            {
              association: PreguntaClon.OpcionDeRespuesta,
            }
          ]
        }
      );
      const opRespuestaClon = new OpcionDeRespuestaClon({
        esClonDe: opcionDeRespuesta.id,
        nombre: opcionDeRespuesta.nombre,
        descripcion: opcionDeRespuesta.descripcion,
      });
      const opcionesClon = opciones.map((o) =>{
        return new PuntajeClon({
          esClonDe: o.id,
          valor: o.valor,
          opcion: {
            esClonDe: o.opcion.id,
            nombre: o.opcion.nombre,
            descripcion: o.opcion.descripcion,
          }
        }, {
          include: [{
            association: PuntajeClon.Opcion,
          }]
        })
      });
      preguntaClon.asociar("factor", factorClon);
      preguntaClon.asociar("opciones", opcionesClon);
      preguntaClon.asociar("opcionDeRespuesta", opRespuestaClon);

      preguntasClon.push(preguntaClon);
    }

    return preguntasClon;  
  } catch (error) {
    return new Error(error.message);
  }
  
}