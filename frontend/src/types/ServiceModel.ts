import type { ServiceModelStatus } from "./ServiceModelStatus"

export interface ServiceModel {
  id: string,
  name: string,
  enabled: boolean,
  status: ServiceModelStatus,
  process: any | null,
  healthy: boolean,
  port: string,
  cwd: string,
  modelConnectionType: ModelConnectionType,
  frontendConnectionType:FrontendConnectionType
}

export type ModelConnectionType = "ws" | "http" | "sse" | "mock"

export type FrontendConnectionType = "ws" | "http" | "mock"