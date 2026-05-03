// orchestrator/processManager.js
import { spawn } from "child_process";
import type { ServiceModel } from "../types/ServiceModel.js";


async function testInference(service: ServiceModel) {
  console.log(`[${service.id}] Testing inference...`);

  try {
    const res = await fetch(`http://localhost:${service.port}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "Cats are..." })
    });

    const data = await res.json();
    console.log(`[${service.id}] Inference result:`, data.response);
  } catch (err) {
    console.error(`[${service.id}] Inference test failed:`, err);
  }
}



export function startService(service:ServiceModel) {
  if (service.process) {
    console.log(`[${service.id}] Already running`);
    return;
  }

  console.log(`[${service.id}] Starting...`);
  service.status = "starting";

// console.log("PATH:", process.env.PATH);
// console.log("USER:", process.env.USERNAME || process.env.USER);
// console.log("CWD:", process.cwd());

const pythonDir = "C:/Users/barba/AppData/Local/Programs/Python/Python314/";
// const pythonDir = "pythonExe = C:/Users/barba/Desktop/Kod/stunning-pancake/model_servers/venv/Scripts/";
const pythonExe = pythonDir + "python.exe";

console.log("PYTHON EXE:", pythonExe);

console.log(service.cwd)
// const proc = spawn(pythonExe, ["--version"], {
//   env: { PATH: process.env.PATH + ";" + pythonDir }
// });

  const proc = spawn(pythonExe, ["app.py"], {
    cwd: service.cwd,
    env: { 
      ...process.env, 
      PATH: process.env.PATH + ";" + pythonDir,
      PORT: service.port 
    }
  });

// proc.stdout.on("data", d => console.log("stdout:", d.toString()));
// proc.stderr.on("data", d => console.log("stderr:", d.toString()));

  service.process = proc;

  // proc.stderr.on("data", data => {
  //   console.log('daaaata',`[${service.id}] ${data.toString()}`);



  // if (data.toString().includes("Running on")) {
  //     testInference(service);
  //   }



  // });

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
