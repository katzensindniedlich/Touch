/** 
 * Primitive json values.
 */
export type JsonPrimitive = string | number | boolean | null


/** 
 * A json object may contain json data. 
 */
export type JsonObject = {
    [key: string]: JsonValue
}


/**
 * Everything that can be a json.
 */
export type JsonValue = JsonObject | JsonPrimitive | JsonValue[]


/**
 * Everything that can be trabnsformed into json
 * using `JSON.stringify`.
 */
export type JsonAble = (
    | JsonPrimitive
    | undefined
    | JsonAble[]
    | { [key: string]: JsonAble }
    | { toJSON(): JsonAble }
)