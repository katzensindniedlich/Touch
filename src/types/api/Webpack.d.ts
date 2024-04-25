/**
 * A discord Webpack Module.
 */
export interface Module {
    id: string
    loaded: true

    /**
     * The exports object (Module) or the direct exported thing.
     */
    exports: any
}


/**
 * A function to filter for a module.  
 * The `exports` is sometimes the module object or the default exported object.
 */
export type ModuleFilter = (exports: any, module: Module, id: string) => boolean

/**
 * Only uses the module exports as argument to filter modules.   
 * The `exports` is sometimes the module object or the default exported object.
 */
export type ModuleExportFilter = (exports: any) => boolean


/**
 * Series of {@link Filters} to be used for finding webpack modules.
 *
 * @memberof WebpackAPI
 * @see https://docs.betterdiscord.app/api/filters
 */
export interface Filters {
    /**
     * Generates a function that filters by a set of properties.
     *
     * @param keys - List of property names.
     * @returns A filter that checks for a set of properties.
     */
    byKeys(...keys: string[]): ModuleExportFilter

    /**
     * Generates a function that filters by a set of properties on the object's prototype.
     *
     * @param props - List of property names.
     * @returns A filter that checks for a set of properties on the object's prototype.
     */
    byPrototypeKeys(...props: string[]): ModuleExportFilter

    /**
     * Generates a function that filters by a regex.
     *
     * @param search - A RegExp to check on the module.
     * @returns A filter that checks for a regex match.
     */
    byRegex(regex: RegExp): ModuleExportFilter

    /**
     * Generates a function that filters by strings.
     * module.toString have to include on of these strings.
     *
     * @param strings - A list of strings.
     * @returns A filter that checks for a set of strings.
     */
    byStrings(...strings: string[]): ModuleExportFilter

    /**
     * Generates a function that filters by the `displayName` property.
     *
     * @param name - Name the module should have.
     * @returns A filter that checks for a `displayName` match.
     */
    byDisplayName(name: string): ModuleExportFilter

    /**
     * Generates a function that filters by a specific internal Store name.
     *
     * @param name - Name the store should have. (usually includes the word Store)
     * @returns A filter that checks for a Store name match.
     */
    byStoreName(name: string): ModuleExportFilter

    /**
     * Generates a combined function from a list of filters.
     *
     * @param filters - A list of filters.
     * @returns Combinatory filter of all arguments.
     */
    combine(
        ...filters: ModuleExportFilter[]
    ): ModuleExportFilter
}


interface ModuleQuery<First extends boolean = boolean> {
    filter: ModuleFilter
    first?: First
    defaultExport?: boolean
    searchExports?: boolean
}

type BulkResult<Queries extends ModuleQuery[]> = {
    [Query in keyof Queries]: (
		Queries[Query]['first'] extends false ? any[] : any
	)
}

/**
 * `Webpack` is a utility class for getting internal webpack modules.  
 *  Instance is accessible through the {@link BdApi}.  
 * This is extremely useful for interacting with the internals of Discord.
 *
 * @see https://docs.betterdiscord.app/api/webpack
 * @borrows Filters as Filters
 */
export interface WebpackAPI {
    /**
     * A Proxy that returns the module source by ID.
     * @readonly
     */
    readonly modules: Record<Module['id'], (...args: any[]) => any>

    /**
     * Series of {@link Filters} to be used for finding webpack modules.
     * @readonly
     */
    readonly Filters: Filters

	/**
     * Finds multiple modules using multiple filters.
     *
     * @param queries - Object representing the query to perform.
     * @param queries.filter - A function to use to filter modules.
     * @param [queries.first=true] - Whether to return only the first matching module.
     * @param [queries.defaultExport=true] - Whether to return default export when matching the default export.
     * @param [queries.searchExports=false] - Whether to execute the filter on webpack exports.
     * @return An array containing the result of every query. When not found: empty array when first == false else undefined.
     */
	getBulk<Queries extends ModuleQuery[]>(
        ...queries: Queries
    ): BulkResult<Queries>

    /**
     * Finds a module using a filter function.
     *
     * @param filter - A function to use to filter modules. It is given exports, module, and moduleID. Return `true` to signify match.
     * @param [options] - Options to configure the search.
     * @param [options.first=true] - Whether to return only the first matching module.
     * @param [options.defaultExport=true] - Whether to return default export when matching the default export.
     * @param [options.searchExports=false] - Whether to execute the filter on webpack exports.
     * @return The Webpack module(s) if found.
     */
	getModule<First extends boolean = true>(
        filter: ModuleFilter,
        options?: {
            first?: First
            defaultExport?: boolean
            searchExports?: boolean
        }
    ): (First extends true ? any : any[]) | undefined

    /**
     * Attempts to find a lazy loaded module,
     * resolving when it is loaded.
     *
     * @param filter - A function to use to filter modules. It is given exports. Return `true` to signify match.
     * @param [options] - Options for configuring the listener.
     * @param [options.signal] - AbortSignal of an AbortController to cancel the promise.
     * @param [options.defaultExport=true] - Whether to return default export when matching the default export.
     * @param [options.searchExports=false] - Whether to execute the filter on webpack exports.
     * @returns Promise resolving the module, the default export or undefinded when not found.
     */
	waitForModule(
        filter: ModuleExportFilter,
        options? : {
            signal?: AbortSignal
            defaultExport?: boolean
            searchExports?: boolean
        }
    ): Promise<any>

    /**
     * Searches for a module by value, returns module & matched key.  
     * Useful in combination with the Patcher.
     *
     * @generator
     * @uses {@link WebpackAPI.getModule}
     * @param filter - A function to use to filter the module.
     * @param [options] - Set of options to customize the search.
     * @param [options.target=null] - Optional module (exports) target to look inside.
     * @param [options.defaultExport=true] - Whether to return default export when matching the default export.
     * @param [options.searchExports=false] - Whether to execute the filter on webpack export getters.
     * @return The found module / default export or undefined - then the key name or undefined.
     */
    getWithKey(
        filter: ModuleExportFilter,
        options?: {
            target?: any
            defaultExport?: boolean
            searchExports?: boolean
        }
    ): [any, string | undefined]

    /**
     * Finds all modules matching a filter function.
     *
     * @param filter - A function to use to filter modules.
     * @param [options] - Options to configure the search.
     * @param [options.defaultExport = true] - Whether to return default export when matching the default export.
     * @param [options.searchExports = false] - Whether to execute the filter on webpack exports.
     * @return An array of modules or default exports when any found else undefined.
     */
    getModules(
        filter: ModuleFilter,
        options?: {
            defaultExport?: boolean
            searchExports?: boolean
        }
    ): any[] | undefined

    /**
     * Finds a module using its code.
     *
     * @param regex - A regular expression to use to filter modules.
     * @param [options] - Options to configure the search.
     * @param [options.first=true] - Whether to return only the first matching module.
     * @param [options.defaultExport = true] - Whether to return default export when matching the default export.
     * @param [options.searchExports = false] - Whether to execute the filter on webpack exports.
     * @return The module or the default export when found else undefined.
     */
    getByRegex(
        regex: RegExp,
        options?: {
            first?: boolean
            defaultExport?: boolean
            searchExports?: boolean
        }
    ): any

    /**
     * Finds all modules using its code.
     * use {@link Webpack.getByRegex} instead.
     *
     * @param regex - A regular expression to use to filter modules.
     * @param [options] - Options to configure the search.
     * @param [options.defaultExport=true] - Whether to return default export when matching the default export.
     * @param [options.searchExports=false] - Whether to execute the filter on webpack exports.
     * @return This is supposed to return a array of found module exports, but it uses first: true, so one module.
     */
    getAllByRegex(
        regex: RegExp,
        options?: {
            defaultExport?: boolean
            searchExports?: boolean
        }
    ): any

    /**
     * Finds a single module using properties on its prototype.  
     * The last argument in strings can be used as config object like in {@link WebpackAPI.getModule}.
     *
     * @param prototypes - Property names to use to filter modules.
     * @return The default export of the module found else undefined.
     */
    getByPrototypeKeys(...prototypes: string[]): any

    /**
     * Finds all modules with a set of properties of its prototype.  
     * The last argument in strings can be used as config object like in {@link WebpackAPI.getModule}.
     *
     * @param prototypes - Property names to use to filter modules.
     * @return The default export of the module found else undefined.
     */
    getAllByPrototypeKeys(...prototypes: string[]): any[] | undefined

    /**
     * Finds a single module using its own properties.  
     * The last argument in strings can be used as config object like in {@link WebpackAPI.getModule}.
     *
     * @param props - Property names to use to filter modules.
     * @return The default export of the module found else undefined.
     */
    getByKeys(...props: string[]): any

    /**
     * Finds all modules with a set of properties.  
     * The last argument in strings can be used as config object like in {@link WebpackAPI.getModule}.
     *
     * @param keys - Property names to use to filter modules.
     * @return The default export of the module found else undefined.
     */
    getAllByKeys(...keys: string[]): any[] | undefined

    /**
     * Finds a single module using a set of strings.  
     * The last argument in strings can be used as config object like in {@link WebpackAPI.getModule}.
     *
     * @param strings - Strings to use to filter modules. (the modules toString string should contain one of these).
     * @return The default export of the module found else undefined.
     */
    getByStrings(...strings: string[]): any

    /**
     * Finds all modules with a set of (sub) strings.  
     * The last argument in strings can be used as config object like in {@link WebpackAPI.getModule}.
     *
     * @param strings - Strings to use to filter modules (the modules toString string should contain one of these).
     * @return The default exports of the modules found else undefined.
     */
    getAllByStrings(...strings: string[]): any[] | undefined

    /**
     * Finds an internal Store module using the name.
     *
     * @param name - Name of the store to find (usually includes 'Store').
     * @return The default export of the module found else undefined.
     */
    getStore(name: string): any
}