export function generarClave(req, res) {
  const candidatos = req.body;

  const claves = candidatos.map((candidato) => {
    const clave = Array.from(Array(8), () => Math.floor(Math.random() * 36).toString(36)).join('');
    return {candidato, clave};
  });
  res.json(claves)
}

export async function crearEvaluacion(req, res) {
  const {idPuesto, candidatos, claves} = req.body;

  
}