/**
 * Anything that should be used to add classnames.
 * @see https://github.com/JedWatson/classnames
 */
export type classNameAble = (
    string |
    number |
    classNameAble[] |
    // Falsy values are just ignored:
    null |
    false |
    undefined |
    {
        [name: string]: boolean
    }
)


/**
 * `Utils` is a utility containing commonly reused functions.  
 * Instance is accessible through the {@link BdApi.Utils}.
 *
 * @see https://docs.betterdiscord.app/api/utils
 */
export interface UtilsAPI {
    /**
     * Builds a css like classname string from any number of arguments. This includes arrays and objects.  
     * When given an array all values from the array are added to the list.
     * When given an object they keys are added as the classnames if the value is truthy.
     *
     * @see https://github.com/JedWatson/classnames
     *
     * @example
     * classNames('foo', 'bar')  // => 'foo bar'
     * classNames('foo', { bar: true })  // => 'foo bar'
     * classNames({ foo: true, bar: true })  // => 'foo bar'
     *
     * @param args - Anything that should be used to add classnames.
     * @returns The class name string.
     */
    className(...args: classNameAble[]): string

    /**
     * Returns a function, that, as long as it continues to be invoked, will not be triggered.  
     * The function will be called after it stops being called for N milliseconds.
     *
     * @see https://davidwalsh.name/javascript-debounce-function
     *
     * @param executor - The function called to execute, arguments are these of the last return function call.
     * @param delay - The time in ms since the last call of the return function until the executer is called.
     * @returns The function, that need to be called to refresh the timeout.
     */
    debounce<Args extends any[]>(
        executor: (...args: Args) => void,
        delay: number
    ): (...args: Args) => void

    /**
     * Takes a string of HTML and escapes it using the browser's own escaping mechanism.
     *
     * @param html - Html string to be escaped.
     * @return Escaped HTML string.
     */
    escapeHTML(html: string): string

    /**
     * Deep extends an object with a set of other objects.  
     * Objects later in the list of `extenders` have priority, that is to say  
     * if one sets a key to be a primitive, it will be overwritten with the next one with the same key.  
     * If it is an object, and the keys match, the object is extended.
     * This happens recursively.
     *
     * @param extendee - Object to be extended.
     * @param extenders - Objects to extend with.
     * @returns A reference to `extendee`.
     */
    extend(
        extendee: object,
        ...extenders: object[]
    ): object

    /**
     * Finds a value, subobject, or array
     * from a tree that matches a specific filter. This is a DFS.
     *
     * @param tree - Tree that should be walked.
     * @param searchFilter - Filter or an OwnProperty name to check against each object and subobject.
     * @param [options] - Additional options to customize the search.
     * @param [options.walkable=null] - Array of key names to walke on. Null indicates all keys are walkable.
     * @param [options.ignore=[]] - Array of key names to exclude from the search, best when `walkable = null`.
     * @returns The found item or undefined.
     */
    findInTree(
        tree: object,
        searchFilter: string | ((item: any) => boolean),
        options?: {
            walkable?: string[] | null
            ignore?: string[]
        }
    ): any
}