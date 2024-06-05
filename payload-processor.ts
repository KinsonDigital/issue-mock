import { AssigneePayload } from "./data/payloads/assignee-payload.ts";
import { BasePayload } from "./data/payloads/base-payload.ts";
import { LabelPayload } from "./data/payloads/label-payload.ts";
import { MilestonePayload } from "./data/payloads/milestone-payload.ts";
import { ProjectV2Payload } from "./data/payloads/projectv2-payload.ts";

export class PayloadProcessor {
    public async processPayload(payload: BasePayload): Promise<void> {
        console.log(`Payload Action: ${payload.action}`);

        switch (payload.action) {
            case "labeled":
            case "unlabeled":
                this.processLabelPayload(payload as LabelPayload);
                break;
            case "milestoned":
            case "demilestoned":
                this.processMilestonePayload(payload as MilestonePayload);
                break;
            case "assigned":
            case "unassigned":
                this.processAssigneePayload(payload as AssigneePayload);
                break;
            case "created":
            case "deleted":
                this.processProjectV2Payload(payload as ProjectV2Payload);
                break;
            default:
                Deno.writeTextFileSync(`new-payload-${payload.action}`, JSON.stringify(payload, null, 2));
                break;
        }
    }

    private async processLabelPayload(payload: LabelPayload): Promise<void> {
        console.log(`Processing Label Payload (${payload.action})`);
    }

    private async processMilestonePayload(payload: MilestonePayload): Promise<void> {
        console.log(`Processing Milestone Payload (${payload.action})`);
    }
    
    private async processAssigneePayload(payload: AssigneePayload): Promise<void> {
        console.log(`Processing Assignee Payload (${payload.action})`);
    }
 
    private async processProjectV2Payload(payload: ProjectV2Payload): Promise<void> {
        console.log(`Processing ProjectV2 Payload (${payload.action})`);
    }
}
