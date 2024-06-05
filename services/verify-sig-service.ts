import { ParamGuards } from "../core/param-guards.ts";

/**
 * Verifies a signature against a payload of data using a secret.
 */
export class VerifySigService {
    /**
     * Verifies the given {@link signature} using the given {@link secret} against the given {@link payload}.
     * @remarks Do not change the {@link payload} before verifying the signature!
     * @param signature The signature to verify.
     * @param secret The secret to use for verification.
     * @param payload The payload to verify the signature against.
     * @returns A promise that resolves to a boolean indicating whether the signature is valid.
     * @throws If any of the given parameters are `null` or `undefined` or an 'empty string'.
     */
    public async verifySignature(signature: string, secret: string, payload: string): Promise<boolean> {
        ParamGuards.isNothing(signature);
        ParamGuards.isNothing(secret);
        ParamGuards.isNothing(payload);

        let parts = signature.split("=");
        let sigHex = parts[1];
    
        let algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };
    
        let encoder = new TextEncoder();

        let keyBytes = encoder.encode(secret);
        let extractable = false;
        let key = await crypto.subtle.importKey(
            "raw",
            keyBytes,
            algorithm,
            extractable,
            [ "sign", "verify" ],
        );
    
        let sigBytes = this.hexToBytes(sigHex);
        let dataBytes = encoder.encode(payload);
        let equal = await crypto.subtle.verify(
            algorithm.name,
            key,
            sigBytes,
            dataBytes,
        );
    
        return equal;
    }
    
    /**
     * Converts the given {@link hex} value to a byte array.
     * @param hex The hex value to convert.
     * @returns The byte array representation of the given hex value.
     * @throws If any of the given parameter is `null` or `undefined` or an 'empty string'.
     */
    public hexToBytes(hex: string): Uint8Array {
        ParamGuards.isNothing(hex);

        let len = hex.length / 2;
        let bytes = new Uint8Array(len);
    
        let index = 0;

        for (let i = 0; i < hex.length; i += 2) {
            let c = hex.slice(i, i + 2);
            let b = parseInt(c, 16);

            bytes[index] = b;
            index += 1;
        }
    
        return bytes;
    }
    
}
