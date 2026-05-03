// orchestrator/registry.js

import { ServiceModel } from "../types/ServiceModel.js";

export const services:ServiceModel[] = [
  {
    id: "1",
    name: "gpt-2 simple",
    enabled: false,
    status: "off",
    process: null,
    healthy: false,
    port: "5002",
    cwd: "C:/Users/barba/Desktop/Kod/stunning-pancake/model_servers",
    modelConnectionType: "http",
    frontendConnectionType: "http"
  },
  {
    id: "2",
    name: "gpt-2 streaming",
    enabled: false,
    status: "off",
    process: null,
    healthy: false,
    port: "5003",
    cwd: "C:/Users/barba/Desktop/Kod/stunning-pancake/gpt2_stream_fastapi",
    modelConnectionType: "http",
    frontendConnectionType: "http"
  },
  {
    id: "3",
    name: "ws-test no model",
    enabled: false,
    status: "off",
    process: null,
    healthy: false,
    port: "",
    cwd: "",
    modelConnectionType: "mock",
    frontendConnectionType: "ws"
  }
];
