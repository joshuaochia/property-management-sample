import express from "express";
import {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
} from "../controllers/agentController";

const router = express.Router();

router.post("/", createAgent);
router.get("/", getAllAgents);
router.get("/:id", getAgentById);
router.put("/:id", updateAgent);
router.delete("/:id", deleteAgent);

export default router;
