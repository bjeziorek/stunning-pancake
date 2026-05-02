import type { ServiceModel } from "../types/ServiceModel.js";

export async function checkHealth(service: ServiceModel) {
  try {
    const res = await fetch(`http://localhost:${service.port}/health`, {
      method: "GET"
    });

    service.healthy = res.ok;
    if (res.ok) service.status = "on";
  } catch {
    service.healthy = false;
    if (service.enabled) service.status = "error";
  }
}
