import { LabelModel } from "./data/models/label-model.ts";
import { IssueMilestonePayload } from "./data/payloads/issue-milestone-payload.ts";
import { IssueLabelPayload } from "./data/payloads/issue-label-payload.ts";
import { Guards } from "./core/guards.ts";



type MyObj = {
    name: string;
}

function containsProp<T>(obj: any, prop: keyof T): obj is T {
    return prop in obj;
}

const validObj = { name: "kinson" };
const inValidObj = { stuff: "asdf" };

console.log(`Valid: ${containsProp<MyObj>(validObj, "name")}`);
console.log(`Invalid: ${containsProp<MyObj>(inValidObj, "name")}`);

debugger;
