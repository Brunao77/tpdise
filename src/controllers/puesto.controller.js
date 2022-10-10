export async function postPuesto(req, res) {
  try {
    const { codigo, nombre, descripcion, empresa } = req.body;
    console.log();
    /*const newTask = await Task.create({
        projectId,
        name,
        done,
      });
      res.json(newTask);*/
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
