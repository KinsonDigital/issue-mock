import { AssigneeActions } from "../assignee-actions.ts";
import { AssigneeModel } from "../models/assignee-model.ts";
import { PulLRequestModel } from "../models/pull-request-model.ts";
import { BasePayload } from "./base-payload.ts";

export interface PulLRequestAssignPayload extends BasePayload {
    action: AssigneeActions;
    number: number;
    pull_request: PulLRequestModel,
    assignee: AssigneeModel;
}
