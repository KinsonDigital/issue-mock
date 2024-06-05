import { BasePayload } from "./base-payload.ts";
import { IssueModel } from "../models/issue-model.ts";
import { LabelModel } from "../models/label-model.ts";
import { LabelActions } from "../label-actions.ts";

export interface IssueLabelPayload extends BasePayload {
    action: LabelActions;
    issue: IssueModel,
    label: LabelModel;
}
