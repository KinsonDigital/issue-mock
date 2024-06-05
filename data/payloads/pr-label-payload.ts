import { LabelActions } from "../label-actions.ts";
import { LabelModel } from "../models/label-model.ts";
import { PulLRequestModel } from "../models/pull-request-model.ts";
import { BasePayload } from "./base-payload.ts";

export interface PullRequestLabelPayload extends BasePayload {
    action: LabelActions;
    number: number;
    pull_request: PulLRequestModel,
    label: LabelModel;
}
