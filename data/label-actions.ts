import { LabelModel } from "./models/label-model.ts";

export type LabelActions = 
    { type: "labeled", label: LabelModel } 
  | { type: "unlabeled", label: LabelModel };
