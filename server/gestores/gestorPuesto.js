import { Puesto } from "../models/Puesto.js";
import { PuestoDAO } from "../dao/PuestoDAO.js";
import { Ponderacion } from "../models/Ponderacion.js";

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

    if (codigo) {
      const puesto = await Puesto.findOne({
        where: {
          codigo,
        },
        include: Ponderacion,
      });
      console.log(puesto.ponderaciones);
      res.json(puesto);
    } else res.json(codigo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getPuesto(req, res) {
  try {
    const codigo = req.params.codigo;
    const response = await Puesto.findByPk(codigo.toString());
    console.log(response);
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
