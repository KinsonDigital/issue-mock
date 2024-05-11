/**
 * Represents a validation result.
 */
export interface ValidateResult {
    /**
     * Indicates whether the validation was successful.
     */
    isValid: boolean;

    /**
     * The message associated with the validation result.
     */
    message: string;
}
