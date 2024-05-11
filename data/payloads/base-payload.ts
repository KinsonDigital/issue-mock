import { RepoModel } from "../models/repo-model.ts";

export interface BasePayload {
    /**
     * The action that was performed.
     */
    action: string;

    repository: RepoModel;
}
