export async function postPuesto(req, res) {
  try {
    const { codigo, nombre, descripcion, empresa } = req.body;
    const puesto = {
      codigo,
      nombre,
      descripcion,
      empresa,
    };

    res.json(puesto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
