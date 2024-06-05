import { BasePayload } from "./base-payload.ts";
import { MilestoneActions } from "../milestone-actions.ts";
import { PulLRequestModel } from "../models/pull-request-model.ts";
import { MilestoneModel } from "../models/milestone-model.ts";

export interface PullRequestMilestonePayload extends BasePayload {
    action: MilestoneActions;
    number: number;
    pull_request: PulLRequestModel,
    milestone: MilestoneModel;
}
