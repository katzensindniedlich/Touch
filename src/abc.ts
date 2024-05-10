import type { PluginMetadata, PluginInterface } from './types/api/Addon'


const { Plugins } = BdApi


/**
 * The base class for plugin implementations
 * with useful features.
 */
abstract class Plugin implements PluginInterface {
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
     * Enables this plugin.
     */
    enable() {
        Plugins.enable(this.meta.id)
    }

    /**
     * Disables this plugin.
     */
    disable() {
        Plugins.disable(this.meta.id)
    }

    /**
     * Disables this plugin when it is enabled
     * and vice versa.
     */
    toggle() {
        Plugins.toggle(this.meta.id)
    }

    /**
     * Reloads this plugin if it is enabled.
     */
    reload() {
        Plugins.reload(this.meta.id)
    }

    /**
     * Called when this plugin gets activated (including after reloads).
     */
    abstract start(): void

    /**
     * Called when this plugin gets deactivated.
     */
    abstract stop(): void
}


export default Plugin