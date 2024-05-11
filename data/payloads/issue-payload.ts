import { LabelPayload } from "./label-payload.ts";
import { MilestonePayload } from "./milestone-payload.ts";

/**
 * Represents the payload of an issue event.
 */
export type IssuePayload = LabelPayload | MilestonePayload;
