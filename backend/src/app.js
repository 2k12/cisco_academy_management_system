import express from "express";
import { swaggerDocs, swaggerUi } from "./swagger.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/sesion_routes/auth.routes.js";
import apiRoutes from "./routes/api_routes/index.routes.js"; 

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes); 

apiRoutes.forEach(route => {
  app.use("/api", route);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
