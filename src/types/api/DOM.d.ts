/**
 * `DOM` is a simple utility class for dom manipulation.  
 * An instance is available with {@link BdApi.DOM}.
 *
 * @see https://docs.betterdiscord.app/api/dom
 */
export interface DOMAPI {
    /**
     * Current height of the user's screen.
     * @readonly
     */
    get screenHeight(): number

    /**
     * Current width of the user's screen.
     * @readonly
     */
    get screenWidth(): number

    /**
     * Adds a `<style>` to the document with the given ID.  
     * Or overwrites it when already given.
     *
     * @param id - ID to use for style element.
     * @param css - CSS to apply to the document.
     */
    addStyle(id: string, css: string): void

    /**
     * Removes a `<style>` from the document corresponding to the given ID.
     *
     * @param id - ID used for the style element.
     */
    removeStyle(id: string): void

    /**
     * Utility to help smoothly animate using JavaScript.
     *
     * @param update - Render function indicating the style should be updated, gets the result from the timing func as parameter.
     * @param duration - Duration in ms to animate for.
     * @param [options] - Options to customize the animation.
     * @param [options.timing] - Optional function calculating progress based on current time fraction (0 to 1). Linear by default.
     */
    animate<Progress>(
        update: (progress: Progress) => void,
        duration: number,
        options?: {
            timing?: (timeFraction: number) => Progress
        }
    ): void

    /**
     * Utility function to make creating DOM elements easier.  
     * Acts similar to `React.createElement`.
     *
     * @param tag - HTML tag name to create.
     * @param [options] - Options object to customize the element.
     * @param [options.className] - Class name to add to the element.
     * @param [options.id] - ID to set for the element.
     * @param [options.target] - Target element to automatically append to.
     * @param [child] - Child node to add.
     * @returns The created HTML element.
     */
    createElement(
        tag: string,
        options?: {
            className?: string,
            id?: string,
            target?: HTMLElement
        },
        child?: HTMLElement
    ): HTMLElement

    /**
     * Adds a listener for when the node is removed from the document body.
     *
     * @param node - Node to be observed.
     * @param callback - Function to run when fired.
     * @returns A function to tell to stop watching for mutations.
     */
    onRemoved(
        node: HTMLElement,
        callback: () => void
    ): () => void

    /**
     * Parses a string of HTML and returns the results.  
     * If the second parameter is true,
     * the parsed HTML will be returned as a document fragment.  
     * This is extremely useful if you have a list of elements at the top level,  
     * they can then be appended all at once to another node.
     *
     * If the second parameter is false, then the return value will be the list of parsed  
     * nodes and there were multiple top level nodes, otherwise the single node is returned.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
     * @param html - HTML to be parsed.
     * @param [fragment=false] - Whether or not the return should be the raw `DocumentFragment`.
     * @returns The result of HTML parsing.
     */
    parseHTML(html: string, fragment?: false): NodeList | HTMLElement
    parseHTML(html: string, fragment: true): DocumentFragment
}