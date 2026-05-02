export interface ServiceModel {
  id: string,
  name: string,
  enabled: boolean,
  status: ServiceModelStatus
}

export type ServiceModelStatus = "online" | "offline" | "starting" | "error"