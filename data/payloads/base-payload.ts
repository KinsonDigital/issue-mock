import { AssigneeActions } from "../assignee-actions.ts";
import { LabelActions } from "../label-actions.ts";
import { MilestoneActions } from "../milestone-actions.ts";
import { RepoModel } from "../models/repo-model.ts";
import { ProjectV2Actions } from "../projectv2-actions.ts";

export interface BasePayload {
    /**
     * The action that was performed.
     */
    action: LabelActions["type"] | MilestoneActions["type"] |
        AssigneeActions["type"] | ProjectV2Actions["type"];

    repository: RepoModel;
}
