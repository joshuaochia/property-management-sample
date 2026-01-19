import type { Request, Response } from "express";
import { agents, type PropertyAgent } from "../models/agent";
import { generateId } from "../utils/generateId";
import { z, ZodError } from "zod";

const AgentSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Invalid email format"),
  mobileNumber: z.string().regex(/^\+?[\d\s-()]+$/, "Invalid phone number"),
});

// Create a new agent
export const createAgent = (req: Request, res: Response) => {
  try {
    const validatedData = AgentSchema.parse(req.body);

    // Check for duplicate email
    if (agents.find((a) => a.email === validatedData.email)) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newAgent: PropertyAgent = {
      id: generateId(),
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    agents.push(newAgent);
    res.status(201).json(newAgent);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all agents
export const getAllAgents = (req: Request, res: Response) => {
  let filtered = [...agents];

  const { search, email } = req.query;

  if (search && typeof search === "string") {
    filtered = filtered.filter(
      (a) =>
        a.firstName.toLowerCase().includes(search.toLowerCase()) ||
        a.lastName.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (email && typeof email === "string") {
    filtered = filtered.filter((a) => a.email.includes(email));
  }

  res.json(filtered);
};

// Get single agent by ID
export const getAgentById = (req: Request, res: Response) => {
  const agent = agents.find((a) => a.id === req.params.id);
  if (!agent) return res.status(404).json({ message: "Agent not found" });
  res.json(agent);
};

// Update agent
export const updateAgent = (req: Request, res: Response) => {
  const agent = agents.find((a) => a.id === req.params.id);
  if (!agent) return res.status(404).json({ message: "Agent not found" });

  const { firstName, lastName, email, mobileNumber } = req.body;
  agent.firstName = firstName ?? agent.firstName;
  agent.lastName = lastName ?? agent.lastName;
  agent.email = email ?? agent.email;
  agent.mobileNumber = mobileNumber ?? agent.mobileNumber;
  agent.updatedAt = new Date();

  res.json(agent);
};

// Delete agent
export const deleteAgent = (req: Request, res: Response) => {
  const index = agents.findIndex((a) => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Agent not found" });

  const deletedAgent = agents.splice(index, 1)[0];
  res.json(deletedAgent);
};
