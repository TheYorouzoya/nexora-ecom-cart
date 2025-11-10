import express from "express";
import itemRoutes from "./routes/itemRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";


const app: express.Application = express();

app.use(express.json());

app.use(cors({ origin: "http://127.0.0.1:5173" }));

// Routes
app.use("/api/products", itemRoutes);

// Global error handler
app.use(errorHandler);

export default app;