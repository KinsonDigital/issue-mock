import { AssigneeModel } from "./assignee-model.ts";
import { BranchModel } from "./branch-model.ts";
import { LabelModel } from "./label-model.ts";
import { MilestoneModel } from "./milestone-model.ts";

export interface PulLRequestModel {
    url: string,
    id: number,
    node_id: string,
    html_url: string,
    diff_url: string,
    patch_url: string,
    issue_url: string,
    number: number,
    state: string,
    locked: boolean,
    title: string,
    body: string,
    created_at: Date,
    updated_at: Date,
    closed_at?: Date,
    merged_at?: Date,
    merge_commit_sha: string,
    assignee: AssigneeModel,
    labels: LabelModel[],
    milestone: MilestoneModel,
    draft: boolean,
    commits_url: string,
    review_comments_url: string,
    review_comment_url: string,
    comments_url: string,
    statuses_url: string,
    head: BranchModel,
    base: BranchModel,
    author_association: string,
    auto_merge?: true,
    active_lock_reason?: string,
    merged: boolean,
    mergeable: boolean,
    rebaseable: boolean,
    mergeable_state: string,
    comments: number,
    review_comments: number,
    maintainer_can_modify: boolean,
    commits: number,
    additions: number,
    deletions: number,
    changed_files: number,
}
