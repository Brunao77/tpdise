import { Puesto } from "../models/Puesto.js";
import { PuestoDAO } from "../dao/PuestoDAO.js";
import { Ponderacion } from "../models/Ponderacion.js";

export async function postPuesto(req, res) {
  try {
    const { codigo, nombre, descripcion, empresa, competencias } = req.body;

    if(await Puesto.findByPk(codigo.toString())) throw new Error('Puesto Existente')
    else {

      const ponderaciones = competencias.map((competencia) => {
        // return new Ponderacion(
          return {
            competenciaCodigo: competencia.codigo,
            ponderacion: competencia.puntos,
          }
        // )
      })
      const newPuesto = new Puesto({
        codigo,
        nombre,
        descripcion,
        empresa,
      }, 
      {
        include: [{
          association: Puesto.Ponderaciones
        }] 
      }
      );

      // No se puede asociar directamente con objetos Ponderación, sino que los crea en el metodo set().
      newPuesto.set("ponderaciones", ponderaciones);
      
      // Esto devuelve un array de objetos Ponderacion:
      console.log(newPuesto.ponderaciones);

      const puestoDAO = new PuestoDAO();
      const result = await puestoDAO.guardarPuesto(newPuesto);
      res.json(newPuesto);
    }
   
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getPuestos(req, res) {
  try {
    const codigo = req.params.codigo;

    if(codigo) {
      const puesto = await Puesto.findOne({
        where: {
          codigo,
        },
        include: Ponderacion
      })
      console.log(puesto.ponderaciones)
      res.json(puesto);
    } else res.json(codigo);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
