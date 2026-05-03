import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3009 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  let progress = 0;

  const interval = setInterval(() => {
    progress += 1;

    ws.send(JSON.stringify({ progress }));

    if (progress >= 100) {
      clearInterval(interval);
      ws.send(JSON.stringify({ done: true }));
      ws.close();
    }
  }, 100); // co 100 ms

  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
