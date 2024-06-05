import { ProjectV2Model } from "./models/projectv2-model.ts";

export type ProjectV2Actions = 
    { type: "created", projects_v2_item: ProjectV2Model } 
  | { type: "deleted", projects_v2_item: ProjectV2Model };
