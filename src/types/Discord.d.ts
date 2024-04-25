/**
 * A json object with an discord server error code
 * and the corresponding error message.
 *
 * @see https://discord.com/developers/docs/topics/opcodes-and-status-codes#json
 */
export interface ErrorObject {
    code: number,
    message: string
}


/**
 * An error response from discords server.
 */
export interface ErrorResponse {
    ok: false
    body: Partial<ErrorObject>
    text: string
    headers: Record<string, string>
    status: number
}