import { useEffect, useState, useCallback } from "react";
import type { ServiceModel } from "../types/ServiceModel";
import { getServices } from "../api/getServices";

export function useServicesList(enabled: boolean) {
  const [services, setServices] = useState<ServiceModel[]>([]);

  const fetchServices = useCallback(async () => {
    if (!enabled) return;
    const data = await getServices();
    setServices(data);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    fetchServices();
    const interval = setInterval(fetchServices, 5000);

    return () => clearInterval(interval);
  }, [enabled, fetchServices]);

  return { services, refresh: fetchServices };
}
