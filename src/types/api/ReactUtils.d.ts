import type { Component, ReactElement } from 'react'
import type { Fiber, FiberRoot } from 'react-reconciler'


interface RenderedWrapper
    extends ReactElement<{ className: 'react-wrapper' }, 'div'>
{
    ref: 'element'
    _owner: null
}

export interface ReactWrapper<Element extends HTMLElement>
    extends Component<Record<string, never>, { hasError: boolean }>
{
    element: Element

    componentDidCatch(): void
    componentDidMount(): void
    render(): null | RenderedWrapper
}


/**
 * `ReactUtils` is a utility class for interacting with React internals.  
 * Instance is accessible through the {@link BdApi.ReactUtils}.  
 * This is extremely useful for interacting with the internals of the UI.
 *
 * @see https://docs.betterdiscord.app/api/reactutils
 */
export interface ReactUtilsAPI {
    /**
     * Returns the internal root object added by react on #app-mount.
     * @readonly
     */
    get rootInstance(): FiberRoot | undefined

    /**
     * Gets the internal react data of a specified node
     *
     * @param node - Node to get the react data from.
     * @returns Either the found data or `undefined`.
     */
    getInternalInstance(node: HTMLElement): Fiber | undefined

    /**
     * Attempts to find the 'owner' node to the current node.
     * This is generally a node with a stateNode--a class component.
     *
     * @param node - Node to obtain React instance of.
     * @param [options] - Options for the search.
     * @param [options.include] - List of items to include in the search.
     * @param [options.exclude=['Popout', 'Tooltip', 'Scroller', 'BackgroundFlash']] - List of items to exclude from the search.
     * @param [options.filter] - Filter to check the current instance with.
     * @return The owner instance or `undefined` if not found.
     */
    getOwnerInstance(
        node: HTMLElement,
        options?: {
            include?: string[]
            exclude?: string[]
            filter?: (owner: Component) => boolean
        }
    ): Component | undefined | null

    /**
     * Creates an unrendered React component that wraps HTML elements.
     *
     * @param element - Element or array of elements to wrap into a react component.
     * @returns Unrendered React component.
     */
    wrapElement<Element extends HTMLElement>(
        element: Element | Element[]
    ): ReactWrapper<Element>
}