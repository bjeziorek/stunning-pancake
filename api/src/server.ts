import express from "express";
import cors from "cors";
import WebSocket, { WebSocketServer } from "ws"
import http from "http";

import { router as servicesRouter } from "./routes/services.js";
import { router as healthRouter } from "./routes/health.js";
import { startHeartbeat } from "./orchestrator/heartbeat.js";
import { setupWebSocket } from "./ws/index.js";

const httpApp = express();
httpApp.use(express.json());
httpApp.use(cors());

// routes
httpApp.use("/health", healthRouter);
httpApp.use("/services", servicesRouter);

const server = http.createServer(httpApp);

setupWebSocket(server);

server.listen(3001, () => {
  console.log("API Gateway running on http://localhost:3001");
   startHeartbeat();
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});

// httpApp.listen(3001, () => {
//   console.log("API Gateway running on http://localhost:3001");

//   startHeartbeat();
// });


// import express from "express";
// import cors from "cors";
// import { spawn } from "child_process";

// export interface ServiceModel {
//   id: string,
//   name: string,
//   enabled: boolean,
//   status: ServiceModelStatus,
//   process: any | null,
//   healthy: boolean,
//   port: string,
//   cwd: string
// }

// export type ServiceModelStatus = "on" | "off" | "starting" | "error" | "stopping"

// const services: ServiceModel[] = [
//   {
//     id: "1",
//     name: 'gpt-2 simple',
//     enabled: false,
//     status: "off",
//     process: null,
//     healthy: false,
//     port: "5002",
//     cwd: "/absolute/path/to/flask/project"
//   },
//   {
//     id: "2",
//     name: 'gpt-2 streaming',
//     enabled: false,
//     status: "off",
//     process: null,
//     healthy: false,
//     port: "5003",
//     cwd: "/absolute/path/to/flask/project"
//   },
// ]

// const app = express();
// app.use(express.json()); // a key thing to parse json, else req.body is seen as undefined
// app.use(cors());

// // function orchastrating flasks:
// function startService(service: ServiceModel) {
//   if (service.process) {
//     console.log(`[${service.id}] Already running`);
//     return;
//   }

//   console.log(`[${service.id}] Starting...`);

//   const proc = spawn("python", ["app.py"], {
//     cwd: service.cwd,
//     env: { ...process.env, PORT: service.port }
//   });

//   service.process = proc;

//   proc.stdout.on("data", data => {
//     console.log(`[${service.id}] ${data.toString()}`);
//   });

//   proc.stderr.on("data", data => {
//     console.error(`[${service.id} ERROR] ${data.toString()}`);
//   });

//   proc.on("close", code => {
//     console.log(`[${service.id}] exited with code ${code}`);
//     service.process = null;
//     service.healthy = false;
//   });
// }
// function stopService(service: ServiceModel) {
//   if (!service.process) {
//     console.log(`[${service.id}] Not running`);
//     return;
//   }

//   console.log(`[${service.id}] Stopping...`);
//   service.process.kill();
//   service.process = null;
//   service.healthy = false;
// }



// app.get("/health", (req, res) => {
//   res.json({
//     status: "ok", // leave only this one
//     services: { // remove from health, and remove at all
//       gateway: true,
//       gpt2: true,
//       training: false,
//       inference: true,
//     },
//     servicesList: services // remove from health and move to dedicated servicesHealth endpoint
//   });
// });

// app.get("/services", (req, res) => { // here is ready endpoint for services but frontend still used the data from /health
//   res.json(services);
// });

// app.post("/services/:id/state", (req, res) => {
//   const service = services.find(s => s.id === req.params.id);
//   // console.log(service,req.params.id, req.body)
//   if (!service) {
//     return res.status(404).json({ error: "Service not found" });
//   }

//   const { enabled } = req.body;
//   if (typeof enabled !== "boolean") {
//     return res.status(400).json({ error: "enabled must be boolean" });
//   }

//   service.enabled = enabled;

//    if (enabled) startService(service);
//   else stopService(service);

//   res.json({ success: true, service });
// });

// app.listen(3001, () => {
//   console.log("API Gateway running on http://localhost:3001");
// });
