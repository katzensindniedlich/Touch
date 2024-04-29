import type { ReactElement } from 'react'


type Sides = 'top' | 'right' | 'bottom' | 'left'

/**
 * Correlates to the Discord styling/colors.
 */
type Styles = 'primary' | 'info' | 'success' | 'warn' | 'danger'


/**
 * BetterDiscord UI class for tooltips.  
 * Create them with {@link UIAPI.createTooltip} or use the global available class.
 */
export interface Tooltip {
    /**
     * DOM node to monitor and show the tooltip on.
     */
    node: HTMLElement

    /**
     * Content to show in the Tooltip.
     */
    label: string | HTMLElement

    /**
     * Whenever to not filp the tooltip to the opposite side,
     * if it has not enough space.
     */
    preventFlip: boolean

    /**
     * Whenever the tooltip will not show up.
     */
    disabled: boolean

    /**
     * Whenever the tooltip is currently visible.
     */
    active: boolean

    /**
     * Tooltip parent element: `div.bd-layer`.  
     * Containing tooltipElement.
     */
    element: HTMLElement

    /**
     * Tooltip element: `div.bd-tooltip.bd-tooltip-${tooltip.style}`.  
     * With two child nodes: `div.bd-tooltip-pointer` and `this.labelElement`
     */
    tooltipElement: HTMLElement

    /**
     * Tooltip lable element containing the label  
     * as childNode or as textContent when label is a string: `div.bd-tooltip-content`.
     */
    labelElement: HTMLElement

    /**
     * Observer calling {@link Tooltip.hide} when (parent) node got removed.  
     * Created when called {@link Tooltip.show} the first time.
     */
    observer?: MutationObserver

    side: Sides
    style: Styles

    /**
     * Container where the tooltip will be appended.
     * @readonly
     */
    get container(): HTMLElement

    /**
     * Boolean representing if the tooltip will fit on screen above the element.
     * @readonly
     */
    get canShowAbove(): boolean

    /**
     * Boolean representing if the tooltip will fit on screen below the element.
     * @readonly
     */
    get canShowBelow(): boolean

    /**
     * Boolean representing if the tooltip will fit on screen to the left of the element.
     * @readonly
     */
    get canShowLeft(): boolean

    /**
     * Boolean representing if the tooltip will fit on screen to the right of the element.
     * @readonly
     */
    get canShowRight(): boolean

    /**
     * Alias for the constructor.
     * @static
     * @alias {@link BdAPI.UI.createTooltip}
     */
    create(
        node: HTMLElement,
        content: string | HTMLElement,
        options?: {
            style?: Styles
            side?: Sides
            preventFlip?: boolean
            disabled?: boolean
        }
    ): Tooltip

    /** Hides the tooltip. Automatically called on mouseleave. */
    hide(): void

    /**
     * Shows the tooltip.  
     * Automatically called on mouseenter.  
     * Will attempt to flip if position was wrong.
     */
    show(): void

    /** Force showing the tooltip above the node. */
    showAbove(): void

    /** Force showing the tooltip below the node. */
    showBelow(): void

    /** Force showing the tooltip to the left of the node. */
    showLeft(): void

    /** Force showing the tooltip to the right of the node. */
    showRight(): void

    centerHorizontally(): void
    centerVertically(): void
}


/**
 * Filters to show as options in {@link UIAPI.openDialog}.
 *
 * @see https://www.electronjs.org/docs/latest/api/structures/file-filter
 */
export interface FileFilter {
    /**
     * Name of the filter.
     */
    name: string

    /**
     * List of file extensions to filter the files when selected.  
     * @example
     * extensions: ['jpg', 'png', 'gif']  // (use '*' for all extensions)
     */
    extensions: string[]
}


/**
 * Button to show up in {@link UIAPI.showNotice}.
 */
export interface Button {
    label: string | Node | (string | Node)[]
    onClick: () => void
}


interface DialogResult {
    /**
     * Whenever the user canceled the dialog selection.
     */
    canceled: boolean
}


export interface OpenDialogResult extends DialogResult {
    /**
     * The selected path(s).
     * Empty array when the dialog got canceled.
     */
    filePaths: string[]
}


export interface SaveDialogResult extends DialogResult {
    /**
     * The selected path.
     * Empty string when the dialog got canceled.
     */
    filePath: string
}


/**
 * `UI` is a utility class for getting internal webpack modules.  
 * Instance is accessible through the {@link BdApi}.  
 * This is extremely useful for interacting with the internals of Discord.
 *
 * @see https://docs.betterdiscord.app/api/ui
 */
export interface UIAPI {
    /**
     * Shows a generic but very customizable modal.
     *
     * @uses {@link UIAPI.showConfirmationModal}
     * @param title - Title of the modal.
     * @param content - Content to display in the modal.
     */
    alert(
        title: string,
        content: string | ReactElement | (string | ReactElement)[]
    ): void

    /**
     * Creates a tooltip to automatically show on hover.
     *
     * @alias {@link Tooltip.create}
     * @param node - DOM node to monitor and show the tooltip on.
     * @param content - Content to show in the tooltip.
     * @param [options] - Additional options for the tooltip.
     * @param [options.style='primary'] - Correlates to the Discord styling/colors.
     * @param [options.side='top'] - Can be any of top, right, bottom, left.
     * @param [options.preventFlip=false] - Prevents moving the tooltip to the opposite side if it is too big or goes offscreen.
     * @param [options.disabled=false] - Whether the tooltip should be disabled from showing on hover.
     * @returns The tooltip that was generated.
     */
    createTooltip(
        node: HTMLElement,
        content: string | HTMLElement,
        options?: {
            style?: Styles
            side?: Sides
            preventFlip?: boolean
            disabled?: boolean
        }
    ): Tooltip

    /**
     * Gives access to the {@link https://www.electronjs.org/docs/latest/api/dialog/ | dialog} api.  
     * Returns a `Promise` that resolves to an `(Open/Save)DialogResult`  
     * that has a `boolean` cancelled and a `filePath` string for saving and a `filePaths` string array for opening.
     *
     * @param options - Options object to configure the dialog.
     * @param [options.mode='open'] - Determines whether the dialog should open or save files.
     * @param [options.defaultPath=~] - Path the dialog should show on launch.
     * @param [options.filters=[]] - An array of {@link FileFilter}.
     * @param [options.title] - Title for the titlebar.
     * @param [options.message] - Message for the dialog.
     * @param [options.showOverwriteConfirmation=false] - Whether the user should be prompted when overwriting a file.
     * @param [options.showHiddenFiles=false] - Whether hidden files should be shown in the dialog.
     * @param [options.promptToCreate=false] - Whether the user should be prompted to create non-existant folders.
     * @param [options.openDirectory=false] - Whether the user should be able to select a directory as a target.
     * @param [options.openFile=true] - Whether the user should be able to select a file as a target.
     * @param [options.multiSelections=false] - Whether the user should be able to select multiple targets.
     * @param [options.modal=false] - Whether the dialog should act as a modal to the main window.
     * @returns Promise resolving the file paths chosen by the user.
     */
    openDialog<Mode extends ('open' | 'save') = 'open'>(
        options: {
            mode?: Mode
            defaultPath?: string
            filters?: FileFilter[]
            title?: string
            message?: string
            showOverwriteConfirmation?: boolean
            showHiddenFiles?: boolean
            promptToCreate?: boolean
            openDirectory?: boolean
            openFile?: boolean
            multiSelections?: boolean
            modal?: boolean
        }
    ): Promise<
        Mode extends 'open' ? OpenDialogResult : SaveDialogResult
    >

    /**
     * Shows a generic but very customizable confirmation modal with optional confirm and cancel callbacks.
     *
     * @param title - Title of the modal.
     * @param content - Single or mixed array of React elements and strings. Everything is wrapped in Discord's `TextElement` component so strings will show and render properly.
     * @param [options] - Options to modify the modal.
     * @param [options.danger=false] - Whether the main button should be red or not.
     * @param [options.confirmText='Okay'] - Text for the confirmation/submit button.
     * @param [options.cancelText='Cancel'] - Text for the cancel button.
     * @param [options.onConfirm] - Callback to occur when clicking the submit button.
     * @param [options.onCancel] - Callback to occur when clicking the cancel button.
     * @param [options.onClose] - Callback to occur when exiting the modal without clicking confirm or cancel.
     * @param [options.key] - key used to identify the modal. If not provided, one is generated and returned
     * @returns The key used for this modal.
     */
    showConfirmationModal(
        title: string,
        content: string | ReactElement | (string | ReactElement)[],
        options?: {
            key?: string
            danger?: boolean
            confirmText?: string
            cancelText?: string
            onConfirm?: () => void
            onCancel?: () => void
            onClose?: () => void
        }
    ): string

    /**
     * Shows a notice above Discord's chat layer.
     *
     * @param content - Content of the notice
     * @param [options] - Options for the notice.
     * @param [options.type] - Type for the notice. Will affect the color.
     * @param [options.timeout=0] - Timeout until the notice is closed. Won't fire if it's set to 0.
     * @param [options.buttons] - Buttons that should be added next to the notice text.
     * @param [options.onClose] - A function called when the notification get closed.
     * @returns A function to close the notification in 300ms or immediately when the first parameter is true.
     */
    showNotice(
        content:  string | Node | (string | Node)[],
        options?: {
            type?: 'info' | 'error' | 'warning' | 'success'
            timeout?: number
            buttons?: Button[]
            onClose?: () => void
        }
    ): (immediately?: boolean) => void

    /**
     * This shows a toast similar to android towards the bottom of the screen.
     *
     * @param content - The string to show in the toast, added with `.innerText = ...`.
     * @param [options] - Options object.
     * @param [options.type=''] - Style of the toast. Choices: '', info, success, danger/error, warning/warn. Default: ''.
     * @param [options.icon=true] - Whether the corresponding icon should show. Default: true.
     * @param [options.timeout=3000] - Time in ms the toast should be shown. Default: 3000.
     * @param [options.forceShow=false] - Whether to force showing the toast and ignore the bd setting.
     */
    showToast(
        content: string,
        options?: {
            type?: '' | 'info' | 'success' | 'danger' | 'error' | 'warning' | 'warn'
            icon?: boolean
            timeout?: number
            forceShow?: boolean
        }
    ): void
}