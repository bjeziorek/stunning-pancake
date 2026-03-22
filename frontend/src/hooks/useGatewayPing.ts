import { useCallback, useEffect, useRef, useState } from "react";
import { useGatewayConnection } from "./useGatewayConnection";

export function useGatewayPing() {
  const { enabled ,setEnabled} = useGatewayConnection();
  const [online, setOnline] = useState<boolean | null>(null);
  const [services, setServices] = useState<Record<string, boolean>>({});

const failCount = useRef(0);


  const ping = useCallback(async () => {
    console.log('ping')
    try {
      const res = await fetch("http://localhost:3001/health");
      if (!res.ok) throw new Error();
      const data = await res.json();

      setOnline(true);
      setServices(data.services);
      failCount.current = 0;
    } catch {
      setOnline(false);
      setServices({});
      failCount.current += 1;

      if (failCount.current >= 10) {
      setEnabled(false);
      failCount.current = 0;
    }
    }
  },[setEnabled]);

  useEffect(() => {
    if (!enabled)  return
    
    ping();

    const interval = setInterval(ping, 3000);

    return () => clearInterval(interval);
  }, [enabled, ping]);

  return { online, services, ping };
}
