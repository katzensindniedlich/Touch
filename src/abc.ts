import type { PluginMetadata } from './types/api/Addon'


/**
 * The base class for plugin implementations
 * with useful features eh.
 */
abstract class Plugin {
    /**
     * Plugin metadata
     * passed to the constructor from Betterdiscord on plugin load.
     * @readonly
     */
    readonly meta

    constructor(meta: PluginMetadata) {
        this.meta = meta
    }

    /**
     * Called when this plugin gets activated (including after reloads).
     */
    abstract start(): void

    /**
     * Called when this plugin gets deactivated.
     */
    abstract stop(): void

    /**
     * Disables this plugin.
     * Such methods should only be used in a user-friendly way.
     */
    disable() {
        BdApi.Plugins.disable(this.meta.id)
    }
}


export default Plugin
