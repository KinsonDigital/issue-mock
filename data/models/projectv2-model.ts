import { ProjectV2ContentTypes } from "../projectv2-content-types.ts";

export interface ProjectV2Model {
    id: number,
    node_id: string,
    project_node_id: string,
    content_node_id: string,
    content_type: ProjectV2ContentTypes,
    created_at: Date,
    updated_at: Date,
    archived_at: string
}
