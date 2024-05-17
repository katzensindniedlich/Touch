/**
 * Primitive json data types.
 */
export type JsonPrimitive = (
    | null
    | string
    | number
    | boolean
)


/**
 * A json list.
 * May contain json items.
 */
export type JsonList = JsonValue[]


/**
 * A json object.
 * Can contain json data or is empty.
 */
export type JsonObject = { [key: string]: JsonValue }


/**
 * Everything that can be json.
 */
export type JsonValue = (
    | JsonList
    | JsonObject
    | JsonPrimitive
)


/**
 * Everything that can be trabnsformed into json
 * using JSON.stringify
 */
export type JsonAble = (
    | undefined
    | JsonPrimitive
    | JsonAble[]
    | { [key: string]: JsonAble }
    | { toJSON(): JsonAble }
)
