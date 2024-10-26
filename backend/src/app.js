import express from "express";
import { swaggerDocs, swaggerUi } from './swagger.js';
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/sesion_routes/auth.routes.js";
import userRoutes from "./routes/api_routes/user.routes.js";
import roleRoutes from "./routes/api_routes/role.routes.js";
import permissionRoutes from "./routes/api_routes/permission.routes.js";
import coursesRoutes from "./routes/api_routes/course.routes.js";
import chaptersRoutes from "./routes/api_routes/chapter.routes.js";
import instructorsRoutes from "./routes/api_routes/instructor.routes.js";
import modalitiesRoutes from "./routes/api_routes/modality.routes.js";
import participantTypeRoutes from "./routes/api_routes/participantType.routes.js";
import scheduleRoutes from "./routes/api_routes/schedule.routes.js";
import infoUtnRoutes from "./routes/api_routes/infoUtn.routes.js";
import certificateRoutes from "./routes/api_routes/certificate.routes.js";
import detailValuesRoutes from "./routes/api_routes/detailValues.routes.js";

const app = express();

// !middlewares
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// !routes
app.use("/api", authRoutes); 
app.use("/api", userRoutes);
app.use("/api", roleRoutes);
app.use("/api", permissionRoutes);
app.use("/api", coursesRoutes);
app.use("/api", chaptersRoutes);
app.use("/api", instructorsRoutes);
app.use("/api", modalitiesRoutes);
app.use("/api", participantTypeRoutes);
app.use("/api", scheduleRoutes);
app.use("/api", infoUtnRoutes);
app.use("/api", certificateRoutes);
app.use("/api", detailValuesRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
