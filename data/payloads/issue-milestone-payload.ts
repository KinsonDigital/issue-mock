import { BasePayload } from "./base-payload.ts";
import { IssueModel } from "../models/issue-model.ts";
import { MilestoneModel } from "../models/milestone-model.ts";
import { MilestoneActions } from "../milestone-actions.ts";

export interface IssueMilestonePayload extends BasePayload {
    action: MilestoneActions;
    issue: IssueModel,
    milestone: MilestoneModel;
}
