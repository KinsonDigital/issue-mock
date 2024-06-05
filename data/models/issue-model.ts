import { AssigneeModel } from "./assignee-model.ts";
import { LabelModel } from "./label-model.ts";
import { MilestoneModel } from "./milestone-model.ts";

export interface IssueModel {
    url: string,
    repository_url: string,
    labels_url: string,
    comments_url: string,
    events_url: string,
    html_url: string,
    id: number,
    node_id: string,
    number: number,
    title: string,
    labels: LabelModel[],
    state: string,
    locked: boolean,
    assignee?: AssigneeModel,
    assignees: AssigneeModel[],
    milestone: MilestoneModel,
    comments: number,
    created_at: Date,
    updated_at: Date,
    closed_at?: Date,
    author_association: string,
    active_lock_reason?: string,
    body: string,
    timeline_url: string,
    performed_via_github_app?: boolean,
    state_reason?: string,
}
