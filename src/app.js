import express from "express";
import morgan from "morgan";

const app = express();

// Import routes
import puestosRoutes from "./routes/puestos.routes.js";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/puesto", puestosRoutes);

export default app;
