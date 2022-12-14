import { CuestionarioDAO } from "../dao/CuestionarioDAO.js";
import { PreguntaDAO } from "../dao/PreguntaDAO.js";
import { PuestoDAO } from "../dao/PuestoDAO.js";
import { Bloque } from "../models/Bloque.js";
import { Cuestionario } from "../models/Cuestionario.js";
import { RegistroEjecucion } from "../models/RegistroEjecucion.js";
import { Respuesta } from "../models/Respuesta.js";
import { CandidatoDAO } from "../dao/CandidatoDAO.js"

export async function getCandidatos(req, res) {
  try {    
    const candidatoDAO = new CandidatoDAO;
    const candidatos = await candidatoDAO.getCandidatos(req.body);

    res.json(candidatos);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function crearCuestionario(candidato, clave) {
  try {
    const fechaFin = new Date;
    fechaFin.setMonth(fechaFin.getMonth() + 1);
    console.log(fechaFin);

    const cuestionario = new Cuestionario({
      nroCandidato: candidato,
      estado: "activo",
      clave: clave,
      fechaFin: fechaFin,
    }, {
      include: Cuestionario.RegistroEjecucion,
    });
    const registroEjecucion = new RegistroEjecucion;
    cuestionario.asociar("registroEjecucion", registroEjecucion);
    return cuestionario;
  } catch (error) {
    return error;
  }
}

export async function getCuestionario(req, res) {
  try {
    const candidato = req.session.usuario;
    if(candidato == null)return res.json({msg: "acceso invalido, por favor autenticarse."});
    
    const cuestionarioDAO = new CuestionarioDAO;
    const cuestionario = await cuestionarioDAO.getCuestionario(candidato.nroCandidato);

    //el cuestionario puede estar 1 mes activo antes de ser marcado como sinContestar
    if(cuestionario.estado == "activo" && cuestionario.fechaFin <= Date.now()){
      cuestionario.set("estado", "sinContestar");
      cuestionario.registroEjecucion.set("fechaFin", Date.now());
      await cuestionarioDAO.guardarCuestionario(cuestionario);
      //se cierra la sesion del candidato (ya no tiene cuestionarios)
      req.session.isLoggedIn = false;
      req.session.usuario = undefined;
      return res.json({msg: "tiempo maximo activo"});
    }
    //el cuestionario puede estar 15 dias enProceso antes de ser marcado como incompleto
    else if(cuestionario.estado == "enProceso"){
      const fecha = new Date(cuestionario.registroEjecucion.fechaInicio);
      if(fecha.setDate(fecha.getDate() + 15) < Date.now()){
        cuestionario.set("estado", "incompleto");
        cuestionario.registroEjecucion.set("fechaFin", Date.now());
        await cuestionarioDAO.guardarCuestionario(cuestionario);
        //se cierra la sesion del candidato (ya no tiene cuestionarios)
        req.session.isLoggedIn = false;
        req.session.usuario = undefined;
        return res.json({msg: "tiempo maximo enProceso"});  
      }
      else {
        const bloque = recuperarCuestionario(cuestionario);
        return res.json(bloque);
      }
    }

    res.json({msj: "mostrar instrucciones", cuestionario});
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function inicializarCuestionario(req, res) {
  try {
    const candidato = req.session.usuario;
    if(candidato == null)return res.json({msg: "acceso invalido, por favor autenticarse."});
    
    const cuestionarioDAO = new CuestionarioDAO;
    const puestoDAO = new PuestoDAO;
    const preguntaDAO = new PreguntaDAO;

    const cuestionario = await cuestionarioDAO.getCuestionario(candidato.nroCandidato);
    
    const puesto = await puestoDAO.getPuestoClon(cuestionario.evaluacion.puesto.id);
    const ponderaciones = puesto.ponderaciones;
    const preguntasCuestionario = [];
    const bloques = [];
    const N = 2;

    for(const ponderacion of ponderaciones) {
      for(const factor of ponderacion.competencia.factores) {
        const preguntas = await preguntaDAO.getPreguntasClon(factor.id);
        if(preguntas.length >= 2) {
          const p = preguntas.splice(Math.floor(Math.random()*(preguntas.length-1)), 2)
          preguntasCuestionario.push(p[0], p[1]);
        }
      }
    }

    // Creacion de Bloques
    const cantBloques = Math.ceil(preguntasCuestionario.length/N)
    for(let i = 1; i <= cantBloques; i++){
      const bloque = new Bloque({
        cuestionarioId: cuestionario.id,
        nroBloque: cantBloques - i,
      });

      // Creación de clases de asociacion "Respuesta"
      const respuestas = [];
      let n = preguntasCuestionario.length < N ? preguntasCuestionario.length : N;
      for(let j = 0; j < n; j++){
        let x = Math.round(Math.random()*preguntasCuestionario.length) 
        x = x === 0 ? 0 : x - 1;

        const respuesta = new Respuesta({
          idPregunta: preguntasCuestionario.splice(x, 1)[0].id,
        });

        respuestas.push(respuesta);
      }

      if(i === cantBloques)bloque.set("estado", "enProceso");
      else bloque.set("estado", "porContestar");

      bloques.push({bloque, respuestas});
    }

    cuestionario.registroEjecucion.set("fechaInicio", Date.now());
    cuestionario.set("estado", "enProceso");

    const r = await cuestionarioDAO.updateCuestionario(cuestionario, bloques);
    const bloque = recuperarCuestionario(cuestionario);
    res.json(bloque);  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
  
}

function recuperarCuestionario(cuestionario) {
  // const cuestionarioDAO = new CuestionarioDAO;
  // console.log(cuestionario.id);
  // return await cuestionarioDAO.getBloque(cuestionario.id);
  return {msg: "el Cuestionario esta en proceso"}
}
