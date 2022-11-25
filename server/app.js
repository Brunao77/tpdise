import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session"

const app = express();

app.use(cors());

// Import routes
import puestoRoutes from "./routes/puesto.routes.js";
import competenciaRoutes from "./routes/competencia.routes.js";
import loginRoutes from "./routes/login.routes.js";
import candidatoRoutes from "./routes/candidato.routes.js";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(session({
  secret: "tp diseño",
  saveUninitialized: false,
  resave: true,
}))

// Routes
app.use("/api/puesto", puestoRoutes);
app.use("/api/competencia", competenciaRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/candidato", candidatoRoutes);

// app.get("/", (req, res) => {
//   if(!req.session.isLoggedIn){
//     res.redirect("/login");
//   }
// })

export default app;
