import { Puesto } from "../models/Puesto.js";
import { PuestoDAO } from "../dao/PuestoDAO.js";
import { FactorDAO } from "../dao/FactorDAO.js";
import { PreguntaDAO } from "../dao/PreguntaDAO.js";

export async function postPuesto(req, res) {
  try {
    const { codigo, nombre, descripcion, empresa, competencias } = req.body;
    const ponderaciones = competencias.map((competencia) => {
      return {
        idCompetencia: competencia.codigo,
        valor: competencia.ponderacion,
      };
    });
    const newPuesto = new Puesto(
      {
        codigo,
        nombre,
        descripcion,
        empresa,
      },
      {
        include: [
          {
            association: Puesto.Ponderaciones,
          },
        ],
      }
    );
    
    newPuesto.set("ponderaciones", ponderaciones);

    const puestoDAO = new PuestoDAO();
    const result = await puestoDAO.guardarPuesto(newPuesto);
    
    res.json(newPuesto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getPuestos(req, res) {
  try {
    const codigo = req.params.codigo;
    const puestoDAO = new PuestoDAO;

    if(codigo) {
      const puesto = await puestoDAO.getPuesto(codigo);
      res.json(puesto);
    }else {
      const puestos = await puestoDAO.getPuestos();
      res.json(puestos);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// mandar codigoPuesto como parametro
export async function getPonderaciones(req, res){
  const codigo = req.params.codigo;
  const puestoDAO = new PuestoDAO;
  const factorDAO = new FactorDAO;
  const preguntaDAO = new PreguntaDAO;

  const puesto = await puestoDAO.getPuesto(codigo);
  let ponderaciones = puesto.ponderaciones;
  ponderaciones = await Promise.all( 
    ponderaciones.map(async (ponderacion) =>{ 
      ponderacion = await ponderacion.dataValues;
      ponderacion.factores = await factorDAO.getFactores(ponderacion.idCompetencia);
      return ponderacion;
    })
  );
  for(let ponderacion of ponderaciones) {
    await Promise.all(
      ponderacion.factores.map(async (factor) => {
        factor.preguntas = await preguntaDAO.getPreguntas(factor.id);
        if(factor.preguntas.count > 2)ponderacion.esEvaluable = true;
        else if(ponderacion.esEvaluable == undefined) ponderacion.esEvaluable = false;
        return
      })
    )
  }
    
  res.json({ponderaciones});
}
