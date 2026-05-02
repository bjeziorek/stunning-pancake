// routes/services.js
import express from "express";
import { services } from "../orchestrator/registry.js";
import { startService, stopService } from "../orchestrator/processManager.js";
import type { ServiceModel } from "../types/ServiceModel.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.json(services);
});

router.post("/:id/state", (req, res) => {
  const service = services.find(s => s.id === req.params.id);
  if (!service) return res.status(404).json({ error: "Service not found" });

  const { enabled } = req.body;
  if (typeof enabled !== "boolean") {
    return res.status(400).json({ error: "enabled must be boolean" });
  }

  service.enabled = enabled;

//   if (enabled) startService(service as ServiceModel);
//   else stopService(service as ServiceModel);

  res.json({ success: true, service });
});
