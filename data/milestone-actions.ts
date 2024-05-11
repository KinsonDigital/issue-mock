import { MilestoneModel } from "./models/milestone-model.ts";

export type MilestoneActions = 
    { type: "milestoned", milestone: MilestoneModel } 
  | { type: "demilestoned", milestone: MilestoneModel };
