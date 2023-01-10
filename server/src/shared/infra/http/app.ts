import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../../swagger.json";
import { appRoutes } from "./routes/index.routes";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  cors({
    origin: "*",
  })
);

app.use(appRoutes);

export { app };
