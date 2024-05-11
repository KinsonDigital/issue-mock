import { BasePayload } from "./base-payload.ts";
import { MilestoneActions } from "../milestone-actions.ts";

export interface MilestonePayload extends BasePayload {
    action: MilestoneActions["type"];
    milestone: MilestoneActions["milestone"];
}
