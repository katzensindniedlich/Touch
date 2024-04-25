type Func  = (...args: any[]) => any


/**
 * Try to find more precise type of a member function, if it exist.
 */
type MayFuncOf<Parent, Name extends string> = (
    Name extends keyof Parent
        ? (Parent[Name] extends Func ? Parent[Name] : Func)
        : Func
)


/**
 * Callbacktype for patch callbacks called before.  
 * Needed in {@link PatcherAPI.before} register function parameters.
 *
 * @param originalThis - The this context of the original function.
 * @param orginalArguments - The arguments passed to the original function.
 */
export type beforeCallback<Original extends Func = Func> =  (
    originalThis: ThisParameterType<Original>,
    orginalArguments: Parameters<Original>
) => void

/**
 * Callbacktype for patch callbacks called instead.
 * The returnvalue replaces the orginal return.  
 * Needed in {@link PatcherAPI.instead} register function parameters.
 *
 * @param originalThis - The this context of the original function.
 * @param orginalArguments - The arguments passed to the original function.
 * @param original - The original function.
 * @returns The new return value (replaces the old one when not undefined).
 */
export type insteadCallback<Original extends Func = Func> =  (
    originalThis: ThisParameterType<Original>,
    orginalArguments: Parameters<Original>,
    original: Original
) => any

/**
 * Callbacktype for patch callbacks called after.  
 * Needed in {@link PatcherAPI.after} register function parameters.
 *
 * @param originalThis - The this context of the original function.
 * @param orginalArguments - The arguments passed to the original function.
 * @param originalReturn - The original return value may be replaced by a registered callback before.
 * @returns The new return value (replaces the old one when not undefined).
 */
export type afterCallback<Original extends Func = Func> = (
    originalThis: ThisParameterType<Original>,
    orginalArguments: Parameters<Original>,
    originalReturn: ReturnType<Original>
) => any


type DefineChildPatches<
	CallbackMapping extends Record<string, Func>
> = {
    [Type in keyof CallbackMapping]: {
        /**
         * The name of the caller.
         */
        caller: string

        /**
         * The type of the patch.
         * Indicates how the callback would be called.
         */
        type: Type

        /**
         * The id of the patch,
         * ascending from zero per child patch of parent patch.
         */
        id: number

        /**
         * The callback of the patch,
         * depending on the {@link ChildPatch.type}.
         */
        callback: CallbackMapping[Type]

        /**
         * A function to unpack this patch.
         */
        unpatch: () => void
    }
}[keyof CallbackMapping]

/**
 * ChildPatch is an object containing patch metadata used by BetterDiscord.  
 * Instances are accessible through the {@link PatcherAPI.getPatchesByCaller} method.
 */
export type ChildPatch = DefineChildPatches<
    {
        before: beforeCallback,
        instead: insteadCallback,
        after: afterCallback
    }
>


/**
 * A custom module with the specific function we are patching.  
 * Can be used as moduleToPatch argument in {@link PatcherAPI} methodes.
 */
export interface PseudoModule {
    /**
     * Custom display name for the module,
     * used for creating patch names and ids.  
     * BetterDiscord uses `module.name || module.constructor.name` as fallback.
     */
    displayName?: string

    /**
     * All other module properties, including the function to patch.
     */
    [other: string]: any
}

/**
 * A discord module name.
 */
type ModuleName = string

/**
 * Properties of a discord module.
 */
type ByModuleProps = string[]
type ModuleToPatch = ModuleName | ByModuleProps | PseudoModule


/**
 * `Patcher` is a utility class for modifying existing functions.  
 * Instance is accessible through the {@link BdApi.Patcher}.
 *
 * This is extremely useful for modifying the internals of Discord  
 * by adjusting return value or React renders, or arguments of internal functions.
 *
 * @see https://docs.betterdiscord.app/api/patcher
 */
export interface PatcherAPI {
    /**
     * This method patches onto another function, allowing your code to run beforehand.  
     * Using this, you are also able to modify the incoming arguments before the original method is run.
     * 
     * @param caller - Costom name of the caller of the patch function. (for grouping)
     * @param moduleToPatch - Object with the function to be patched or the name / an array of props to search for it.
     * @param functionName - Name of the function to be patched.
     * @param callback - Function to run before the original method.
     * @returns Function that cancels the original patch or null when module or function wasnt found.
     */
	before<Module extends ModuleToPatch, Name extends string>(
        caller: string,
        moduleToPatch: Module,
        functionName: Name,
        callback: beforeCallback<MayFuncOf<Module, Name>>
    ): null | (() => void)

    /**
     * This method patches onto another function, allowing your code to run instead.  
     * Using this, you are also able to modify the return value, using the return of your code instead.
     * 
     * @param caller - Costom name of the caller of the patch function. (for grouping)
     * @param moduleToPatch - Object with the function to be patched or the name / an array of props to search for it.
     * @param functionName - Name of the function to be patched.
     * @param callback - Function to run instead the original method.
     * @returns Function that cancels the original patch or null when module or function wasnt found.
     */
	instead<Module extends ModuleToPatch, Name extends string>(
        caller: string,
        moduleToPatch: Module,
        functionName: Name,
        callback: insteadCallback<MayFuncOf<Module, Name>>
    ): null | (() => void)

    /**
     * This method patches onto another function, allowing your code to run instead.  
     * Using this, you are also able to modify the return value, using the return of your code instead.
     * 
     * @param caller - Costom name of the caller of the patch function. (for grouping)
     * @param moduleToPatch - Object with the function to be patched or the name / an array of props to search for it.
     * @param functionName - Name of the function to be patched.
     * @param callback - Function to run after the original method.
     * @returns Function that cancels the original patch or null when module or function wasnt found.
     */
	after<Module extends ModuleToPatch, Name extends string>(
        caller: string,
        moduleToPatch: Module,
        functionName: Name,
        callback: afterCallback<MayFuncOf<Module, Name>>
    ): null | (() => void)

    /**
     * Returns all patches by a particular caller.  
     * The patches all have an {@link ChildPatch.unpatch | unpatch} method.
     *
     * @param caller - Name of the caller of the patch function.
     * @returns Array of all the patch objects.
     */
	getPatchesByCaller(caller: string): ChildPatch[]

    /**
     * Automatically cancels all patches created with a specific ID.
     *
     * @param caller - Name of the caller of the patch function.
     */
	unpatchAll(caller: string): void
}