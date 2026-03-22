import { useEffect, useState } from "react";

export function useGatewayPing() {
  const [online, setOnline] = useState<boolean | null>(null);
  const [services, setServices] = useState<Record<string, boolean>>({});

  const ping = async () => {
    try {
      const res = await fetch("http://localhost:3001/health");
      if (!res.ok) throw new Error();
      const data = await res.json();

      setOnline(true);
      setServices(data.services);
    } catch {
      setOnline(false);
      setServices({});
    }
  };

   useEffect(() => {
    ping();

    const interval = setInterval(ping, 3000);

    return () => clearInterval(interval);
  }, []);

  return { online, services, ping };
}
