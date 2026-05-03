// routes/services.js
import express from "express";
import { services } from "../orchestrator/registry.js";
import { startService, stopService } from "../orchestrator/processManager.js";
import type { ServiceModel } from "../types/ServiceModel.js";

export const router = express.Router();

// gets services list
router.get("/", (req, res) => {
  res.json(services);
});

// checks state of singular service by id
router.post("/:id/state", (req, res) => {
  const service = services.find(s => s.id === req.params.id);
  if (!service) return res.status(404).json({ error: "Service not found" });

  const { enabled } = req.body;
  if (typeof enabled !== "boolean") {
    return res.status(400).json({ error: "enabled must be boolean" });
  }

  service.enabled = enabled;

  if (enabled) startService(service as ServiceModel);
  else stopService(service as ServiceModel);

  res.json({ success: true, service });
});

// gets prompt form React, sends it to flask, when flask responds, it's sent back to React 
router.post("/:id/chat", async (req, res) => {
  const service = services.find(s => s.id === req.params.id);

  if (!service) {
    return res.status(404).json({ error: "Service not found" });
  }

  if (!service.enabled || service.status !== "on") {
    return res.status(400).json({ error: "Service is offline" });
  }

  const prompt = req.body.prompt;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt must be a string" });
  }

  try {
    const flaskRes = await fetch(`http://localhost:${service.port}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: prompt })
    });

    const data = await flaskRes.json();
    return res.json({ response: data.response });

  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ error: "Model inference failed" });
  }
});
