import express from "express";
import morgan from "morgan";

const app = express();

// Import routes
import puestoRoutes from "./routes/puesto.routes.js";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/puesto", puestoRoutes);

export default app;
