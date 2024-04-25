import type { ReactElement, FunctionComponent, ComponentType, Component } from 'react'


export type ChildItemType = (
    | 'text'
    | 'submenu'
    | 'toggle'
    | 'radio'
    | 'custom'
    | 'separator'
    | 'control'
)


interface BaseProps {
    items?: any
    color?: any

    /**
     * Type of the item,
     * options: text, submenu, toggle, radio, custom, separator
     */
    type?: ChildItemType

    /**
     * Specific id used for this item.
     * The item ID should be unique to this item across the entire menu.  
     * If no `id` is provided, the system will use the `label`.
     */
    id?: string

    /** Label to show on the menu item. */
    label?: string

    /** Description to show underneath. */
    subtext?: string

    /** Hint to show on the right hand side (usually keyboard combo). */
    hint?: string

    /** Whenever the item should be disabled/unclickable */
    disabled?: boolean

    /** Whenever the item should show as danger (red). */
    danger?: boolean

    /** Function to perform on click. */
    action?: () => void

    /** Function to perform on click (alias of `action`). */
    onClick?: () => void

    /** Function to run when this is closed. */
    onClose?: () => void


    /** Allows you to prevent closing on click. */
    closeOnClick?: boolean

    /** Allows you to add custom styles. */
    style?: object

    /** React component to render on the side. */
    icon?: ComponentType

    /** Link to image to show on the side. */
    image?: string
}


export interface BasicItemProps extends BaseProps {
    type?: 'text'  | 'custom' | 'separator'
}


export interface ToggleProps extends BaseProps {
    type: 'toggle'

    /** Should the checkbox be checked? Default: false */
    checked?: boolean

    /** Alias of `checked`. */
    active?: boolean
}


export interface RadioProps extends BaseProps {
    type: 'radio'

    /** Should the checkbox be checked? Default: false */
    checked?: boolean

    /** Alias of `checked`. */
    active?: boolean

    /** Whenever the menu should be force-updated after click. Default: true */
    forceUpdate?: boolean
}


export interface SubmenuProps extends BaseProps {
    type: 'submenu'

    /** Array of items to render in the submenu. */
    render?: ItemProps[]

    /** Alias of `render`. */
    items?: ItemProps[]

    /** Already rendered elements. */
    children?: ComponentType[]
}


export interface ControlProps extends BaseProps {
    type: 'control'

    /** Control function that renders the component. */
    control?: () => ComponentType
}


export type ItemProps = (
    | BasicItemProps
    | ToggleProps
    | RadioProps
    | SubmenuProps
    | ControlProps
)

export interface GroupProps {
    type: 'group'
    items: ItemProps[]
}


/**
 * `MenuComponents` are some discord internal Components.  
 * Build them with {@link ContextMenuAPI.buildItem}.
 * @enum {ComponentType}
 */
export interface MenuComponents
{
    readonly Separator: ComponentType
    readonly CheckboxItem: ComponentType
    readonly RadioItem: ComponentType
    readonly ControlItem: ComponentType
    readonly Group: ComponentType
    readonly Item: ComponentType
    readonly Menu: ComponentType
}


/**
 * `ContextMenu` is a module to help patch and create context menus.  
 * Instance is accessible throug {@link BdApi.ContextMenu}.
 *
 * @see https://docs.betterdiscord.app/api/contextmenu
 */
export interface ContextMenuAPI extends MenuComponents {
    /**
     * Builds a single menu item.
     * The only prop shown here is the type, the rest should match the actual component being built.
     * View those to see what options exist for each,
     * they often have less in common than you might think.
     *
     * @param props - Props used to build the item.
     * @returns The created component.
     */
    buildItem(props: ItemProps): ReactElement

    /**
     * Creates the menu *component* including the wrapping `ContextMenu`.  
     * Calls {@link ContextMenuAPI.buildMenuChildren} under the covers.  
     * Used to call in combination with {@link ContextMenuAPI.open}.
     *
     * @param setup - Array of item props used to build children.
     * @returns The unique context menu component.
     */
    buildMenu(
        setup: (ItemProps | GroupProps)[]
    ): FunctionComponent

    /**
     * Creates the all the items **and groups** of a context menu recursively.
     * There is no hard limit to the number of groups within groups or number of items in a menu.
     *
     * @param setup - Array of item props used to build items.
     * @returns Array of created components.
     */
    buildMenuChildren(
        setup: (ItemProps | GroupProps)[]
    ): ReactElement[]

    /**
     * Closes the current opened context menu immediately.
     */
    close(): void

    /**
     * Function that allows you to open an entire context menu.  
     * Recommended to build the menu with this module.
     *
     * @param event - The context menu event. This can be emulated, requires target, and all X, Y locations.
     * @param menuComponent - Component to render. This can be any react component or output of {@link ContextMenuAPI.buildMenu}.
     * @param config - Configuration/props for the context menu.
     * @param [config.position='right'] - Default position for the menu, options: 'left', 'right'.
     * @param [config.align='top'] - Default alignment for the menu, options: 'bottom', 'top'.
     * @param [config.onClose] - Function to run when the menu is closed.
     */
    open(
        event: MouseEvent,
        menuComponent: Component,
        config: {
            position?: 'left' | 'right'
            align?: 'bottom' | 'top'
            onClose?: () => void
            noBlurEvent?: boolean
        }
    ): void

    /**
     * Allows you to patch a given context menu.  
     * Acts as a wrapper around the `Patcher`.
     *
     * @param navId - Discord's internal `navId` used to identify context menus.
     * @param callback - Callback function that accepts the React render tree.
     * @returns A function that automatically unpatches.
     */
    patch(
        navId: string,
        callback: (tree: ReactElement, props: any) => void
    ): () => void

    /**
     * Allows you to remove the patch added to a given context menu.
     *
     * @param navId - The original `navId` from patching.
     * @param callback - The original callback from patching.
     */
    unpatch(
        navId: string,
        callback: (tree: ReactElement, props: any) => void
    ): void
}