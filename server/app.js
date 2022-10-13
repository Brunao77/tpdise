import express from "express";
import morgan from "morgan";

const app = express();

// Import routes
import puestoRoutes from "./routes/puesto.routes.js";
import competenciaRoutes from "./routes/competencia.routes.js";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/puesto", puestoRoutes);
app.use("/api/competencia", competenciaRoutes);

export default app;