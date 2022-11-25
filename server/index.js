import app from "./app.js";
import { sequelize } from "./db/database.js";

// import "./models/Bloque.js"
// import "./models/Candidato.js"
// import "./models/CompetenciaClon.js"
// import "./models/Consultor.js"
// import "./models/Evaluacion.js"
// import "./models/Factor.js"
// import "./models/FactorClon.js"
// import "./models/Opcion.js"
// import "./models/OpcionClon.js"
// import "./models/OpcionDeRespuesta.js"
// import "./models/OpcionDeRespuestaClon.js"
// import "./models/PonderacionClon.js"
// import "./models/Pregunta.js"
// import "./models/PreguntaClon.js"
// import "./models/PuestoClon.js"
// import "./models/Puntaje.js"
// import "./models/PuntajeClon.js"
// import "./models/RegistroAuditoria.js"
// import "./models/ResultadoCompetencia.js"
// import "./models/Cuestionario.js"

async function main() {
  await sequelize.sync({ force: false });
  app.listen(3000);
  console.log("Server on port 3000");
}

main();
