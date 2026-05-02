// orchestrator/heartbeat.js
import { services } from "./registry.js";
import { checkHealth } from "./healthcheck.js";
import type { ServiceModel } from "../types/ServiceModel.js";

export function startHeartbeat() {
  console.log("Heartbeat started");

  setInterval(() => {
    services.forEach((service) => {
      if (service.enabled) {
        checkHealth(service as ServiceModel);
      } else {
        service.healthy = false;
        service.status = "off";
      }
    });
  }, 5000);
}
