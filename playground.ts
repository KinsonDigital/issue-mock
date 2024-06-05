import { LabelModel } from "./data/models/label-model.ts";
import { IssueMilestonePayload } from "./data/payloads/issue-milestone-payload.ts";


import { IssueLabelPayload } from "./data/payloads/issue-label-payload.ts";
import { Guards } from "./core/guards.ts";


const label = "asdf";

const isObj = Guards.isObject(label);

debugger;
