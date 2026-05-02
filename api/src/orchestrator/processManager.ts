// orchestrator/processManager.js
import { spawn } from "child_process";
import type { ServiceModel } from "../types/ServiceModel.js";

export function startService(service:ServiceModel) {
  if (service.process) {
    console.log(`[${service.id}] Already running`);
    return;
  }

  console.log(`[${service.id}] Starting...`);
  service.status = "starting";

  const proc = spawn("python", ["app.py"], {
    cwd: service.cwd,
    env: { ...process.env, PORT: service.port }
  });

  service.process = proc;

  proc.stdout.on("data", data => {
    console.log(`[${service.id}] ${data.toString()}`);
  });

  proc.stderr.on("data", data => {
    console.error(`[${service.id} ERROR] ${data.toString()}`);
  });

  proc.on("close", code => {
    console.log(`[${service.id}] exited with code ${code}`);
    service.process = null;
    service.healthy = false;
    service.status = "off";
  });
}

export function stopService(service:ServiceModel) {
  if (!service.process) {
    console.log(`[${service.id}] Not running`);
    return;
  }

  console.log(`[${service.id}] Stopping...`);
  service.status = "stopping";

  service.process.kill();
  service.process = null;
  service.healthy = false;
  service.status = "off";
}
