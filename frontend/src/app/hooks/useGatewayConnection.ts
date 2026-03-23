import { useContext } from "react";
import { GatewayConnectionContext } from "../providers/GatewayConnectionContext";


export function useGatewayConnection() {
  const ctx = useContext(GatewayConnectionContext);
  if (!ctx) {
    throw new Error("useGatewayConnection must be used inside GatewayConnectionProvider");
  }
  return ctx;
}
