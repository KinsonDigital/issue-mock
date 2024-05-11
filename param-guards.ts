export class ParamGuards {
    public static isNothing(value: unknown): value is null | undefined | "" {
        const invalid =  value === null || value === undefined || value === "";

        if (invalid) {
            throw new Error("A parameter is null, undefined, or an empty string");
        }
    }
}
