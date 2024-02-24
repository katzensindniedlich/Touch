import type { BdApi as _BdApi } from './api/Bd'


declare global {
    /**
     * BdApi is a globally (window.BdApi) accessible object  
     * for use by plugins and developers to make their lives easier.
     *
     * @global
     * @constant
     * @external BdApi
     * @see https://docs.betterdiscord.app/api/bdapi
     */
    const BdApi: _BdApi
}