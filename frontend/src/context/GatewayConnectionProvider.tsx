import { useState } from "react";
import { GatewayConnectionContext } from "./GatewayConnectionContext";

export function GatewayConnectionProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <GatewayConnectionContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </GatewayConnectionContext.Provider>
  );
}
