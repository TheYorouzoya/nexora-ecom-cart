import express, { application } from "express";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";


const app: express.Application = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// Global error handler
app.use(errorHandler);

export default app;