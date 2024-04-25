import type React from 'react'
import type { Component } from 'react'
import type ReactDOM from 'react-dom'

import type { UIAPI } from './UI'
import type { DataAPI } from './Data'
import type { UtilsAPI } from './Utils'
import type { WebpackAPI } from './Webpack'
import type { PluginsAPI, ThemesAPI } from './Addon'
import type { DOMAPI } from './DOM'
import type { NetAPI } from './Net'
import type { PatcherAPI } from './Patcher'
import type { ContextMenuAPI } from './ContextMenu'
import type { ReactUtilsAPI } from './ReactUtils'


/**
 * `BdApi` is a globally (window.BdApi) accessible object  
 * for use by plugins and developers to make their lives easier.
 *
 * @global
 * @external BdApi
 * @see https://docs.betterdiscord.app/api/bdapi
 */
export interface BdApi {
    /**
     * An instance of {@link ContextMenuAPI} for interacting with context menus.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/contextmenu
     */
    readonly ContextMenu: ContextMenuAPI

    /**
     * An instance of {@link DOMAPI} to interact with the DOM.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/dom
     */
    readonly DOM: DOMAPI

    /**
     * An instance of {@link DataAPI} to manage data.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/data
     */
    readonly Data: DataAPI

    /**
     * An instance of {@link NetAPI} for networking requests.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/net
     */
    readonly Net: NetAPI

    /**
     * An instance of {@link PatcherAPI} to monkey patch functions.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/patcher
     */
    readonly Patcher: PatcherAPI

    /**
     * An instance of {@link PluginsAPI} to access plugins.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/addonapi#plugins
     */
    readonly Plugins: PluginsAPI

    /**
     * The React module being used inside Discord.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/bdapi#react
     */
    readonly React: typeof React

    /**
     * The ReactDOM module being used inside Discord.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/bdapi#reactdom
     */
    readonly ReactDOM: typeof ReactDOM

    /**
     * An instance of {@link ReactUtilsAPI} to work with React.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/reactutils
     */
    readonly ReactUtils: ReactUtilsAPI

    /**
     * An instance of {@link ThemesAPI} to access themes.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/bdapi#themes
     */
    readonly Themes: ThemesAPI

    /**
     * An instance of {@link UIAPI} to create interfaces.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/ui
     */
    readonly UI: UIAPI

    /**
     * An instance of {@link UtilsAPI} for general utility functions.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/utils
     */
    readonly Utils: UtilsAPI

    /**
     * An instance of {@link WebpackAPI} to search for modules.
     *
     * @readonly
     * @see https://docs.betterdiscord.app/api/webpack
     */
    readonly Webpack: WebpackAPI

    /**
     * A reference string for BD's version.
     * @readonly
     */
    readonly version: string

    /**
     * Mapping of Discord Components.
     * @readonly
     */
    readonly Components: {
        /**
         * Discords internal tooltip react component.
         * @readonly
         */
        readonly Tooltip: Component
    }
}