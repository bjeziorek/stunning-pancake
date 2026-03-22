import { useContext } from "react";
import { GatewayConnectionContext } from "../context/GatewayConnectionContext";


export function useGatewayConnection() {
  const ctx = useContext(GatewayConnectionContext);
  if (!ctx) {
    throw new Error("useGatewayConnection must be used inside GatewayConnectionProvider");
  }
  return ctx;
}
