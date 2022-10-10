import app from "./app.js";
import { sequelize } from "./db/database.js";

import "./models/Puesto.js";
import "./models/Competencia.js";

async function main() {
  await sequelize.sync();
  app.listen(3000);
  console.log("Server on port 3000");
}

main();
