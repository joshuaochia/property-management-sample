import express, { Express } from "express";
import agentRoutes from "./routes/agent";
import { errorHandler } from "./middleware/errorHandler";

const app: Express = express();
const PORT = 3000;

app.use(express.json()); // parse JSON request body
app.use("/agents", agentRoutes);
app.use(errorHandler); // Global error handler

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
