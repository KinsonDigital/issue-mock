import { AssigneeModel } from "./models/assignee-model.ts";

export type AssigneeActions = 
    { type: "assigned", assignee: AssigneeModel } 
  | { type: "unassigned", assignee: AssigneeModel };
