import { BasePayload } from "./base-payload.ts";
import { LabelActions } from "../label-actions.ts";

export interface LabelPayload extends BasePayload {
    action: LabelActions["type"];
    label: LabelActions["label"];
}

