import { RepoModel } from "../models/repo-model.ts";

export interface BasePayload {
    action: string,
    repository: RepoModel;
}
