import { IssueAssignPayload } from "./data/payloads/issue-assign-payload.ts";
import { BasePayload } from "./data/payloads/base-payload.ts";
import { IssueLabelPayload } from "./data/payloads/issue-label-payload.ts";
import { IssueMilestonePayload } from "./data/payloads/issue-milestone-payload.ts";
import { ProjectV2Payload } from "./data/payloads/projectv2-payload.ts";
import { Guards } from "./core/guards.ts";
import { ActionObj } from "./data/payloads/action-obj.ts";
import { IssueModel } from "./data/models/issue-model.ts";
import { LabelModel } from "./data/models/label-model.ts";
import { AssigneeModel } from "./data/models/assignee-model.ts";
import { PulLRequestAssignPayload } from "./data/payloads/pr-assign-payload.ts";
import { PullRequestLabelPayload } from "./data/payloads/pr-label-payload.ts";
import { PullRequestMilestonePayload } from "./data/payloads/pr-milestone-payload.ts";

export class PayloadProcessor {
    public async processPayload(payload: BasePayload): Promise<void> {
        console.log(`Payload Action: ${payload.action}`);

        const guid = crypto.randomUUID().split("-")[0];
        Deno.writeTextFileSync(`${guid}-pr-${payload.action}-payload.json`, JSON.stringify(payload, null, 2));

        if (this.isIssueAssignPayload(payload)) {

        } else if (this.isIssueLabelPayload(payload)) {

        } else if (this.isIssueMilestonePayload(payload)) {

        } else if (this.isPrReviewerPayload(payload)) {

        } else if (this.isPrAssignPayload(payload)) {
            
        } else if (this.isPrLabelPayload(payload)) {

        } else if (this.isPrMilestonePayload(payload)) {

        }
    }

    private async processLabelPayload(payload: IssueLabelPayload): Promise<void> {
        console.log(`Processing Label Payload (${payload.action})`);
    }

    private async processMilestonePayload(payload: IssueMilestonePayload): Promise<void> {
        console.log(`Processing Milestone Payload (${payload.action})`);
    }
    
    private async processAssigneePayload(payload: IssueAssignPayload): Promise<void> {
        console.log(`Processing Assignee Payload (${payload.action})`);
    }
 
    private async processProjectV2Payload(payload: ProjectV2Payload): Promise<void> {
        console.log(`Processing ProjectV2 Payload (${payload.action})`);
    }

    private containsActionProp(payload: unknown): payload is ActionObj {
        return Guards.isNothing(payload) && Guards.isObject(payload) && "action" in payload;
    }

    private hasIssueProp(payload: unknown): payload is IssueModel {
        return Guards.isObject(payload) && "issue" in payload && Guards.isNotNothing(payload["issue"]);
    }
    
    private hasPrProp(payload: unknown): payload is IssueModel {
        return Guards.isObject(payload) && "pull_request" in payload && Guards.isNotNothing(payload["pull_request"]);
    }
    
    private isAssigneeProp(payload: unknown): payload is AssigneeModel {
        return Guards.isObject(payload) && "assignee" in payload && Guards.isNotNothing(payload["assignee"]);
    }
    
    private hasLabelProp(payload: unknown): payload is LabelModel {
        return Guards.isObject(payload) && "label" in payload && Guards.isNotNothing(payload["label"]);
    }
    
    private hasMilestoneProp(payload: unknown): payload is LabelModel {
        return Guards.isObject(payload) && "milestone" in payload && Guards.isNotNothing(payload["milestone"]);
    }

    private hasRequestedReviewerProp(payload: unknown): payload is LabelModel {
        return Guards.isObject(payload) && "requested_reviewer" in payload && Guards.isNotNothing(payload["requested_reviewer"]);
    }

    private isIssueAssignPayload(payload: unknown): payload is IssueAssignPayload {
        return this.containsActionProp(payload) &&
            (payload["action"] === "assigned" || payload["action"] === "unassigned") &&
            this.hasIssueProp(payload) && this.isAssigneeProp(payload);
    }

    private isIssueLabelPayload(payload: unknown): payload is IssueLabelPayload {
        return this.containsActionProp(payload) &&
            (payload["action"] === "labeled" || payload["action"] === "unlabeled") &&
            this.hasIssueProp(payload) && this.hasLabelProp(payload);
    }
    
    private isIssueMilestonePayload(payload: unknown): payload is IssueMilestonePayload {
        return this.containsActionProp(payload) &&
            (payload["action"] === "milestoned" || payload["action"] === "demilestoned") &&
            this.hasIssueProp(payload) && this.hasMilestoneProp(payload);
    }

    private isPrReviewerPayload(payload: unknown): boolean {
        return this.containsActionProp(payload) &&
            "number" in payload && Guards.isNumber(payload["number"]) &&
            (payload["action"] === "review_requested" || payload["action"] === "review_request_removed") &&
            this.hasPrProp(payload) && this.hasRequestedReviewerProp(payload);
    }
    
    private isPrAssignPayload(payload: unknown): payload is PulLRequestAssignPayload {
        return this.containsActionProp(payload) &&
            "number" in payload && Guards.isNumber(payload["number"]) &&
            (payload["action"] === "assigned" || payload["action"] === "unassigned") &&
            this.hasPrProp(payload) && this.isAssigneeProp(payload);
    }

    private isPrLabelPayload(payload: unknown): payload is PullRequestLabelPayload {
        return this.containsActionProp(payload) &&
            "number" in payload && Guards.isNumber(payload["number"]) &&
            (payload["action"] === "labeled" || payload["action"] === "unlabeled") &&
            this.hasPrProp(payload) && this.hasLabelProp(payload);
    }

    private isPrMilestonePayload(payload: unknown): payload is PullRequestMilestonePayload {
        return this.containsActionProp(payload) &&
            "number" in payload && Guards.isNumber(payload["number"]) &&
            (payload["action"] === "milestoned" || payload["action"] === "demilestoned") &&
            this.hasPrProp(payload) && this.hasMilestoneProp(payload);
    }
}
