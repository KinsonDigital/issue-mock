import { BasePayload } from "./base-payload.ts";
import { AssigneeActions } from "../assignee-actions.ts";

export interface AssigneePayload extends BasePayload {
    action: AssigneeActions["type"];
    assignee: AssigneeActions["assignee"];
}
