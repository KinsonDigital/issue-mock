import { UserModel } from "../models/user-model.ts";
import { PulLRequestModel } from "../models/pull-request-model.ts";
import { ReviewerActions } from "../reviewer-actions.ts";

export interface PullRequestReviewPayload {
    action: ReviewerActions;
    number: number;
    pull_request: PulLRequestModel;
    requested_reviewer: UserModel;
}
