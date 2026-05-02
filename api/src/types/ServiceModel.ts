export interface ServiceModel {
  id: string,
  name: string,
  enabled: boolean,
  status: ServiceModelStatus,
  process: any | null,
  healthy: boolean,
  port: string,
  cwd: string
}

export type ServiceModelStatus = "on" | "off" | "starting" | "error" | "stopping"