/**
 * Provides various type guards.
 */
export class Guards {
	/**
	 * Returns a value indicating if the given {@link value} is undefined.
	 * @param value The value to check.
	 * @returns True if the value is undefined, otherwise false.
	 */
	public static isUndefined(value: unknown): value is undefined {
		return value === undefined;
	}

	/**
	 * Returns a value indicating if the given {@link value} is not undefined.
	 * @param value The value to check.
	 * @returns True if the value is not undefined, otherwise false.
	 */
	public static isNotUndefined(value: unknown): value is undefined {
		return !this.isUndefined(value);
	}

	/**
	 * Returns a value indicating if the given {@link value} is null.
	 * @param value The value to check.
	 * @returns True if the value is null, otherwise false.
	 */
	public static isNull(value: unknown): value is null {
		return value === null;
	}

	/**
	 * Returns a value indicating if the given {@link value} is not null.
	 * @param value The value to check.
	 * @returns True if the value is not null, otherwise false.
	 */
	public static isNotNull(value: unknown): value is null {
		return !this.isNull(value);
	}
	
	/**
	 * Returns a value indicating if the given {@link value} is an empty string or array.
	 * @param value The value to check.
	 * @returns True if the value is an empty string or array, otherwise false.
	 */
	public static isEmpty<T>(value: string | T[]): value is "" | [] {
		if (this.isString(value)) {
			return value === "";
		}

		return value.length === 0;
	}

	/**
	 * Returns a value indicating if the given {@link value} is not an empty string or array.
	 * @param value The value to check.
	 * @returns True if the value is not an empty string or array, otherwise false.
	 */
	public static isNotEmpty<T>(value: string | T[]): value is "" | [] {
		return !this.isEmpty(value);
	}

	/**
	 * Returns a value indicating whether the given {@link value} is a number.
	 * @param value The value to check.
	 * @returns True if the value is a number, otherwise false.
	 */
	public static isNumber(value: unknown): value is number {
		if (typeof value === "number") {
			 return true;
		}
  
		if (this.isString(value)) {
			 if (value === "") {
				  return false;
			 }
  
			 const intValue = parseInt(value);
			 const floatValue = parseFloat(value);
			 const isNotInt = isNaN(intValue);
			 const isNotFloat = isNaN(floatValue);
  
			 return isNotInt && isNotFloat;
		}
  
		return false;
  }
  
  	/**
	 * Returns a value indicating whether the given {@link value} is not a number.
	 * @param value The value to check.
	 * @returns True if the value is not a number, otherwise false.
	 */
	public static isNotNumber(value: unknown): value is number {
		return !this.isNumber(value);
  }

	/**
	 * Returns a value indicating if the given {@link value} is a function.
	 * @param func The value to check.
	 * @returns True if the value is a function, otherwise false.
	 */
	public static isFunction(func: unknown): func is Function {
		return typeof func === "function";
	}
	
	/**
	 * Returns a value indicating if the given {@link value} is not a function.
	 * @param func The value to check.
	 * @returns True if the value is not a function, otherwise false.
	 */
	public static isNotFunction(func: unknown): func is Function {
		return !this.isFunction(func);
	}

	/**
	 * Returns a value indicating if the given {@link value} is undefined or null.
	 * @param value The value to check.
	 * @returns True if the value is undefined or null, otherwise false.
	 */
	public static isUndefinedOrNull(value: unknown): value is undefined | null {
		return this.isUndefined(value) || this.isNull(value);
	}

	/**
	 * Returns a value indicating if the given {@link value} is undefined, null, or an empty string or array.
	 * @param value The value to check.
	 * @returns True if the value is undefined, null, or an empty string or array, otherwise false.
	 */
	public static isUndefinedOrNullOrEmpty(value: any | string | []): value is undefined | null | "" {
		if (typeof value === "string") {
			return this.isEmpty(value);
		} else if (Array.isArray(value)) {
			return value.length === 0;
		}

		return this.isUndefinedOrNull(value);
	}

	/**
	 * Returns true if the given {@link value} is nothing (undefined, null, or an empty string or array).
	 * @param value The value to check.
	 * @returns True if the value is nothing.
	 */
	public static isNothing(value: unknown): value is undefined | null | "" {
		return this.isUndefinedOrNullOrEmpty(value);
	}
	
	/**
	 * Returns true if the given {@link value} is not nothing (undefined, null, or an empty string or array).
	 * @param value The value to check.
	 * @returns True if the value is not nothing.
	 */
	public static isNotNothing(value: unknown): value is undefined | null | "" {
		return !this.isNothing(value);
	}

    /**
     * Returns true if the given {@link value} is an object.
     * @param value The value to check.
     * @returns True if the value is an object.
     */
    public static isObject(value: unknown): value is object {
        return typeof value === "object";
    }

	/**
	 * Returns true if the given {@link value} is a string.
	 * @param value The value to check.
	 * @returns True if the value is a string.
	 */
	public static isString(value: unknown): value is string {
		return typeof value === "string";
	}

	/**
	 * Returns a value indicating if the given {@link value} is not a string.
	 * @param value The value to check.
	 * @returns True if the value is not a string.
	 */
	public static isNotString(value: unknown): value is string {
		return !this.isString(value);
	}

	/**
	 * Returns a value indicating if the given {@link value} is an error.
	 * @param value The value to check.
	 * @returns True if the value is an error.
	 */
	public static isError(value: unknown): value is Error {
		return value instanceof Error;
	}

	/**
	 * Returns a value indicating if the given {@link value} is not an error.
	 * @param value The value to check.
	 * @returns True if the value is not an error.
	 */
	public static isNotError(value: unknown): value is Error {
		return !this.isError(value);
	}

	/**
	 * Returns a value indicating whether or not the given {@link value} starts with a new line character.
	 * @param value The value to check.
	 * @returns True if the value starts with a new line character of '\n'.
	 */
	public static startsWithNL(value: string): value is string {
		if (this.isString(value)) {
			return value.startsWith("\n");
		}

		return false;
	}
	
	/**
	 * Returns a value indicating whether or not the given {@link value} starts with a carriage return character.
	 * @param value The value to check.
	 * @returns True if the value starts with a carriage return character of '\r'.
	 */
	public static startsWithCR(value: string): value is string {
		if (this.isString(value)) {
			return value.startsWith("\r");
		}

		return false;
	}
	
	/**
	 * Returns a value indicating whether or not the given {@link value} starts with a new line
	 * character or a carriage return character.
	 * @param value The value to check.
	 * @returns True if the value starts with a new line character of '\n' or a carriage return character of '\r'.
	 */
	public static startsWithNLOrCR(value: string): value is string {
		if (this.isString(value)) {
			return this.startsWithNL(value) || this.startsWithCR(value);
		}

		return false;
	}

	/**
	 * Returns a value indicating whether or not the given {@link value} ends with a new line character.
	 * @param value The value to check.
	 * @returns True if the value ends with a new line character of '\n'.
	 */
	public static endsWithNL(value: string): value is string {
		if (this.isString(value)) {
			return value.endsWith("\n");
		}

		return false;
	}
	
	/**
	 * Returns a value indicating whether or not the given {@link value} ends with a carriage return character.
	 * @param value The value to check.
	 * @returns True if the value ends with a carriage return character of '\r'.
	 */
	public static endsWithCR(value: string): value is string {
		if (this.isString(value)) {
			return value.endsWith("\r");
		}

		return false;
	}
	
	/**
	 * Returns a value indicating whether or not the given {@link value} ends with a new line
	 * character or a carriage return character.
	 * @param value The value to check.
	 * @returns True if the value ends with a new line character of '\n' or a carriage return character of '\r'.
	 */
	public static endsWithNLOrCR(value: string): value is string {
		if (this.isString(value)) {
			return this.endsWithNL(value) || this.endsWithCR(value);
		}

		return false;
	}
}
