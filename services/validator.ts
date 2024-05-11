import { ValidateResult } from "./validate-result.ts";
import { VerifySigService } from "./verify-sig-service.ts";

export class Validator {
    private static readonly verifySigService = new VerifySigService();

    public static async validateRequest(headers: Headers, payload: string): Promise<ValidateResult> {
        const hookId = headers.get("X-GitHub-Hook-ID");

        if (hookId === null) {
            return Promise.resolve({
                isValid: false,
                message: "Missing X-GitHub-Hook-ID header"
            });
        }

        const githubEventHeaderName = "X-GitHub-Event";
        const githubEvent = headers.get(githubEventHeaderName);

        if (githubEvent ===  null) {
            return Promise.resolve({
                isValid: false,
                message: `Missing '${githubEventHeaderName}' header`
            });
        }

        const deliveryHeaderName = "X-GitHub-Delivery";
        const deliveryId = headers.get(deliveryHeaderName);

        if (deliveryId === null) {
            return Promise.resolve({
                isValid: false,
                message: `Missing '${deliveryHeaderName}' header`
            });
        }

        const userAgentHeaderName = "User-Agent";
        const userAgent = headers.get(userAgentHeaderName) ?? "";
        const expectedUserAgent = "GitHub-Hookshot/";

        if (!userAgent.startsWith(expectedUserAgent)) {
            return Promise.resolve({
                isValid: false,
                message: `Missing or incorrect '${userAgentHeaderName}' header value of '${expectedUserAgent}'.`
            });
        }

        const sigHeaderName = "X-Hub-Signature-256";
        const signature = headers.get(sigHeaderName) ?? "";

        if (signature === null) {
            return Promise.resolve({
                isValid: false,
                message: `Missing '${sigHeaderName}' header`
            });
        }

        const secret = Deno.env.get("WEBHOOK_SECRET");

        if (secret === undefined) {
            return Promise.resolve({
                isValid: false,
                message: "Missing 'WEBHOOK_SECRET' environment variable"
            });
        }

        const signatureNotValid = !(await this.verifySigService.verifySignature(signature, secret, payload));
        
        if (signatureNotValid) {
            return Promise.resolve({
                isValid: false,
                message: "Signature verification failed"
            });
        }

        return Promise.resolve({
            isValid: true,
            message: "Request Valid"
        });
    }
}
