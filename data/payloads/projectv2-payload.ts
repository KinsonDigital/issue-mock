import { BasePayload } from "./base-payload.ts";
import { ProjectV2Actions } from "../projectv2-actions.ts";

export interface ProjectV2Payload extends BasePayload {
    action: ProjectV2Actions;
    // projects_v2_item: ProjectV2Actions["projects_v2_item"];
}
