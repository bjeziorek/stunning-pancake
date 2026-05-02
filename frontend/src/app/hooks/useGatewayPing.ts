import { useCallback, useEffect, useRef, useState } from "react";
import { useGatewayConnection } from "./useGatewayConnection";
import { toast } from "sonner";

interface ServiceModel {
  id: number,
  name: string,
  status: StatusType,
}

type StatusType = "online" | "offline"

export function useGatewayPing() {
  const { enabled, setEnabled } = useGatewayConnection();
  const [online, setOnline] = useState<boolean | null>(null);
  const [services, setServices] = useState<Record<string, boolean>>({});
  const [servicesList, setServicesList] = useState<ServiceModel[]>([]);

  const failCount = useRef(0);


  const ping = useCallback(async () => {
    console.log('ping')
    try {
      const res = await fetch("http://localhost:3001/health");
      if (!res.ok) throw new Error();
      const data = await res.json();

      setOnline(true);
      setServices(data.services);
      setServicesList(data.servicesList);

      failCount.current = 0;
    } catch {
      setOnline(false);
      setServices({});
      setServicesList([]);

      failCount.current += 1;

      if (failCount.current >= 3) {
        setEnabled(false);
        failCount.current = 0;
        toast.error("Nie udało się połączyć z serwerem. Wyłączono tryb online. (no i18n!)");
      }
    }
  }, [setEnabled]);

  useEffect(() => {
    if (!enabled) {
      setOnline(false)
      return
    }

    ping();

    const interval = setInterval(ping, 3000);

    return () => clearInterval(interval);
  }, [enabled, ping]);

  return { online, services, servicesList, ping };
}
