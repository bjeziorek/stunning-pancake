import { useEffect, useState } from "react";

export function useProgressWS() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3002");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.progress !== undefined) {
        setProgress(data.progress);
      }

      if (data.done) {
        setDone(true);
      }
    };

    return () => ws.close();
  }, []);

  return { progress, done };
}
