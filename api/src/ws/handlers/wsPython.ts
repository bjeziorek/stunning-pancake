import WebSocket, { WebSocketServer } from "ws"
import { services } from "../../orchestrator/registry.js";

export function handleWsLLM(socket: WebSocket) {

  const backend = new WebSocket("ws://localhost:5004/ws/generate");
  let backendReady = false;

  backend.on("open", () => {
    backendReady = true;
    console.log("Connected to FastAPI WS");
  });

  backend.on("error", (err) => {
    console.error("WS backend error:", err);
    socket.send(JSON.stringify({ error: "backend_ws_failed" }));
    services.filter(service => service.id == '4')[0].status = "error"
  });

 socket.on("message", (msg) => {
  if (!backendReady) {
    socket.send(JSON.stringify({ error: "backend_not_ready" }));
    return;
  }
  console.log('front msg',msg.toString())
  backend.send(msg);
});

  backend.on("message", (data) => {
    console.log('python wysłał:',data)
    socket.send(JSON.stringify({ chunk: data.toString() }));
  });

  socket.on("close", () => {
    backend.close();
  });

  backend.on("close", () => {
    socket.close();
  });

}
