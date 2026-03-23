import { createContext } from "react";

export type GatewayConnectionContextType = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
};

export const GatewayConnectionContext =
  createContext<GatewayConnectionContextType | null>(null);
