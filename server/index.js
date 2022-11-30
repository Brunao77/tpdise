import app from "./app.js";
import { sequelize } from "./db/database.js";

async function main() {
  await sequelize.sync({ force: true });
  app.listen(3000);
  console.log("Server on port 3000");
}

main();
