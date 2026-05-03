import WebSocket, { WebSocketServer } from "ws"

export function handleWsTest(socket:WebSocket) {
  let counter = 0;

  const textArr = 'Mock test... This is a mock test for the implementation of the "predictor" command in the Command Prompt. The command is defined as follows: $ echo "Predictor is ready to go!" If the command fails, then the command is not supported in the command prompt. If the command fails, then the command is not supported in the command prompt. $ echo "The Predictor is not ready to go!" The'.split(' ')

  const interval = setInterval(() => {
    
    socket.send(JSON.stringify({ number: textArr[counter] }));

    if (counter > textArr.length) {
      clearInterval(interval);
      socket.send(JSON.stringify({ done: true }));
      socket.close();
    }

    counter++;
  }, 500);

  socket.on("close", () => {
    clearInterval(interval);
    console.log("WS test connection closed");
  });
}
