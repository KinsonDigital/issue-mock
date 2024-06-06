import { IssueAssignPayload } from "./data/payloads/issue-assign-payload.ts";
import { BasePayload } from "./data/payloads/base-payload.ts";
import { IssueLabelPayload } from "./data/payloads/issue-label-payload.ts";
import { IssueMilestonePayload } from "./data/payloads/issue-milestone-payload.ts";
import { ProjectV2Payload } from "./data/payloads/projectv2-payload.ts";
import { Guards } from "./core/guards.ts";
import { ActionObj } from "./data/action-obj.ts";
import { IssueModel } from "./data/models/issue-model.ts";
import { LabelModel } from "./data/models/label-model.ts";
import { AssigneeModel } from "./data/models/assignee-model.ts";
import { PulLRequestAssignPayload } from "./data/payloads/pr-assign-payload.ts";
import { PullRequestLabelPayload } from "./data/payloads/pr-label-payload.ts";
import { PullRequestMilestonePayload } from "./data/payloads/pr-milestone-payload.ts";
import { ProjectV2Model } from "./data/models/projectv2-model.ts";

export class PayloadProcessor {
    public async processPayload(payload: BasePayload): Promise<void> {
        const guid = crypto.randomUUID().split("-")[0];
        // Deno.writeTextFileSync(`${guid}-pr-${payload.action}-payload.json`, JSON.stringify(payload, null, 2));

        if (this.isIssueAssignPayload(payload)) {
            console.log(`isIssueAssignPayload - ${payload.action}`);
        } else if (this.isIssueLabelPayload(payload)) {
            console.log(`isIssueLabelPayload - ${payload.action}`);
        } else if (this.isIssueMilestonePayload(payload)) {
            console.log(`isIssueMilestonePayload - ${payload.action}`);
        } else if (this.isIssueProjectV2Payload(payload)) {
            console.log(`isIssueProjectV2Payload - ${payload.action}`);
        } else if (this.isPrReviewerPayload(payload)) {
            console.log(`isPrReviewerPayload - ${payload.action}`);
        } else if (this.isPrAssignPayload(payload)) {
            console.log(`isPrAssignPayload - ${payload.action}`);
        } else if (this.isPrLabelPayload(payload)) {
            console.log(`isPrLabelPayload - ${payload.action}`);
        } else if (this.isPrProjectV2Payload(payload)) {
            console.log(`isPrProjectV2Payload - ${payload.action}`);
        } else if (this.isPrMilestonePayload(payload)) {
            console.log(`isPrMilestonePayload - ${payload.action}`);
        } else {
            console.log(`Payload Skipped - ${payload.action}`);
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

    private containsProp<T>(obj: any, prop: keyof T): obj is T {
        return Guards.isObject(obj) && prop in obj;
    }

    private doesNotContainProp<T>(obj: any, prop: keyof T): obj is T {
        return !(prop in obj);
    }

    private containsActionProp(obj: unknown): obj is ActionObj {
        return Guards.isNotNothing(obj) && Guards.isObject(obj) && "action" in obj;
    }

    private hasIssueProp(model: unknown): model is IssueModel {
        return this.containsProp(model, "issue") && Guards.isNotNothing(model["issue"]);
    }

    private hasPrProp(model: unknown): model is IssueModel {
        return this.containsProp(model, "pull_request") && Guards.isNotNothing(model["pull_request"]);
    }

    private isAssigneeProp(model: unknown): model is AssigneeModel {
        return this.containsProp(model, "assignee") && Guards.isNotNothing(model["assignee"]);
    }

    private hasLabelProp(model: unknown): model is LabelModel {
        return this.containsProp(model, "label") && Guards.isNotNothing(model["label"]);
    }

    private hasMilestoneProp(model: unknown): model is LabelModel {
        return this.containsProp(model, "milestone") && Guards.isNotNothing(model["milestone"]);
    }

    private hasRequestedReviewerProp(model: unknown): model is LabelModel {
        return this.containsProp(model, "requested_reviewer") && Guards.isNotNothing(model["requested_reviewer"]);
    }

    private isIssueProjectV2Item(model: any): model is ProjectV2Model {
        return this.containsProp(model, "projects_v2_item") &&
            Guards.isNotNothing(model["projects_v2_item"]) &&
            this.containsProp<ProjectV2Model>(model["projects_v2_item"], "content_type") &&
            model["projects_v2_item"]["content_type"] === "Issue";
    }

    private isPrProjectV2Item(model: any): model is ProjectV2Model {
        return this.containsProp(model, "projects_v2_item") &&
            Guards.isNotNothing(model["projects_v2_item"]) &&
            this.containsProp<ProjectV2Model>(model["projects_v2_item"], "content_type") &&
            model["projects_v2_item"]["content_type"] === "PullRequest";
    }

    private isIssueObj(obj: any): obj is IssueModel {
        return this.containsProp(obj, "issue") && Guards.isNotNothing(obj["issue"]) &&
            this.doesNotContainProp(obj["issue"], "pull_request");
    }

    private isIssueAssignPayload(payload: unknown): payload is IssueAssignPayload {
        return this.containsActionProp(payload) &&
            this.doesNotContainProp(payload, "number") &&
            (payload["action"] === "assigned" || payload["action"] === "unassigned") &&
            this.hasIssueProp(payload) && this.isAssigneeProp(payload);
    }

    private isIssueLabelPayload(payload: unknown): payload is IssueLabelPayload {
        return this.containsActionProp(payload) &&
            this.doesNotContainProp(payload, "number") &&
            (payload["action"] === "labeled" || payload["action"] === "unlabeled") &&
            this.hasIssueProp(payload) && this.hasLabelProp(payload);
    }

    private isIssueProjectV2Payload(payload: unknown): payload is ProjectV2Payload {
        return this.containsActionProp(payload) &&
            (payload["action"] === "created" || payload["action"] === "deleted") &&
            this.isIssueProjectV2Item(payload);
    }

    private isIssueMilestonePayload(payload: unknown): payload is IssueMilestonePayload {
        return this.containsActionProp(payload) &&
            this.doesNotContainProp(payload, "number") &&
            (payload["action"] === "milestoned" || payload["action"] === "demilestoned") &&
            this.hasIssueProp(payload) && this.isIssueObj(payload) &&
            this.hasMilestoneProp(payload);
    }

    private isPrReviewerPayload(payload: unknown): boolean {
        return this.containsActionProp(payload) &&
            this.containsProp(payload, "number") &&
            (payload["action"] === "review_requested" || payload["action"] === "review_request_removed") &&
            this.hasPrProp(payload) && this.hasRequestedReviewerProp(payload);
    }
    
    private isPrAssignPayload(payload: unknown): payload is PulLRequestAssignPayload {
        return this.containsActionProp(payload) &&
            this.containsProp(payload, "number") &&
            (payload["action"] === "assigned" || payload["action"] === "unassigned") &&
            this.hasPrProp(payload) && this.isAssigneeProp(payload);
    }

    private isPrLabelPayload(payload: unknown): payload is PullRequestLabelPayload {
        return this.containsActionProp(payload) &&
            this.containsProp(payload, "number") &&
            (payload["action"] === "labeled" || payload["action"] === "unlabeled") &&
            this.hasPrProp(payload) && this.hasLabelProp(payload);
    }

    private isPrProjectV2Payload(payload: unknown): payload is ProjectV2Payload {
        return this.containsActionProp(payload) &&
            (payload["action"] === "created" || payload["action"] === "deleted") &&
            this.isPrProjectV2Item(payload);
    }

    private isPrMilestonePayload(payload: unknown): payload is PullRequestMilestonePayload {
        return this.containsActionProp(payload) &&
            this.containsProp(payload, "number") &&
            (payload["action"] === "milestoned" || payload["action"] === "demilestoned") &&
            this.hasPrProp(payload) && this.doesNotContainProp(payload, "issue") &&
            this.hasMilestoneProp(payload);
    }
}
