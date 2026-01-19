import express, { Express } from "express";
import agentRoutes from "./routes/agent";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors"; // <-- import cors

const app: Express = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors()); // <-- add this line

app.use(express.json()); // parse JSON request body
app.use("/agents", agentRoutes);
app.use(errorHandler); // Global error handler

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
