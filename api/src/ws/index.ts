import http from 'http';
import { WebSocketServer } from "ws";
import { handleWsTest } from "./handlers/wsTest.js";

export function setupWebSocket(server:http.Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (socket, request) => {
    const url = request.url; // np. "/ws/wsTest"
    if(url){
         const modelId = url.split("/").pop();

    console.log("WS connected:", modelId);

    if (modelId === "3") { // == wsTest
      handleWsTest(socket);
      return;
    }

    socket.send(JSON.stringify({ error: "Unknown WS model" }));
    socket.close();
    }
   console.log("unknown url:",url)
  });
}
