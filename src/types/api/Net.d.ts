export type fetchMethod = (
    'GET' | 'PUT' | 'POST' | 'DELETE' |
    'PATCH' | 'OPTIONS' | 'HEAD' | 'CONNECT' | 'TRACE'
)


/**
 * 'A custom fetch response that extends the web Response with additional properties.'  
 * Returned from {@link NetAPI.fetch}.
 */
export interface FetchResponse extends Response {
     /**
      * The final resolved url.
      * @readonly
      */
    get url(): string

     /**
      * Whenever the request got redirected.
      * @readonly
      */
     get redirected(): boolean

     /**
      * Object containing {@link NetAPI.fetch} options and response data.
      */
    _options: {
        method: fetchMethod
        content: Uint8Array
        headers: Record<string, string>
        status: number
        statusCode: number  // Alias of .status
        statusText: string

        // Source for the main getter
        url: string
        redirected: boolean

        // Available when specified in {@link NetAPI.fetch} options:
        maxRedirects?: number
        redirect?: 'manual' | 'follow'
        timeout?: number
        signal?: AbortSignal
        body?: Uint8Array | string
    }
}


/**
 * `Net` is a namespace for networking related utility functions.  
 * Instance is accessible through {@link BdApi.Net}.
 *
 * @see https://docs.betterdiscord.app/api/net
 */
export interface NetAPI {
    /**
     * Fetches network resources from the server side which avoids CORs.
     * This works similar to {@link https://github.com/node-fetch/node-fetch | node-fetch}.
     *
     * @param url - URL to be requested.
     * @param [options] - Additional options to customize the request.
     * @param [options.method='GET'] - HTTP method to use for the request.
     * @param [options.headers] - Mapping of headers to be sent with the request.
     * @param [options.redirect='follow'] - Whether to follow redirects.
     * @param [options.maxRedirects=20] - Maximum number of redirects to be automatically followed.
     * @param [options.signal] - Signal to abruptly cancel the request.
     * @param [options.timeout=3000] - Maximum number of seconds to wait for the request before timing out.
     * @param [options.body] - Serializable body data to be sent with the request.
     * @returns A promise resolving a custom fetch response with additional properties.
     */
    fetch(
        url: string,
        object?: {
            method?: fetchMethod
            headers?: Headers | Record<string, string>
            redirect?: 'manual' | 'follow'
            maxRedirects?: number
            signal?: AbortSignal
            timeout?: number
            body?: Uint8Array | string
        }
    ): Promise<FetchResponse>
}