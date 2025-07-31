import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connection.js";
import userRoutes from "./routes/userRoutes/user.routes.js";
import healthCheckRoutes from "./routes/healthCheck.routes.js";
dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use("/api/v1/healthCheck", healthCheckRoutes);

app.use("/api/v1/users", userRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.info(
      `😂✔👌 click here to go to the Server : http://127.0.0.1:${port}`
    );
  });
};

await startServer();
