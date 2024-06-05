import { AssigneeActions } from "../assignee-actions.ts";
import { AssigneeModel } from "../models/assignee-model.ts";
import { IssueModel } from "../models/issue-model.ts";
import { BasePayload } from "./base-payload.ts";

export interface IssueAssignPayload extends BasePayload {
    action: AssigneeActions;
    issue: IssueModel,
    assignee: AssigneeModel;
}
