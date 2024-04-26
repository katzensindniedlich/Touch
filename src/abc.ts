import type { PluginMetadata, PluginInterface } from './types/api/Addon'


const { Plugins } = BdApi


/**
 * The plugin base class, with useful features.
 */
abstract class Plugin implements PluginInterface {
    /**
     * Plugin metadata,
     * passed to the constructor from BetterDiscord on plugin load.
     * @readonly
     */
    readonly meta

    constructor(meta: PluginMetadata) {
        this.meta = meta
    }

    /**
     * Enables this plugin, also calls this.start() on BetterDiscords side.
     */
    enable() {
        Plugins.enable(this.meta.id)
    }

    /**
     * Disables this plugin, also calls this.stop() on BetterDiscords side.
     */
    disable() {
        Plugins.disable(this.meta.id)
    }

    /**
     * Disables this plugin when it is enabled and vice versa.
     */
    toggle() {
        Plugins.toggle(this.meta.id)
    }

    /**
     * Reloads this plugin when it is enabled, and enables it again.
     */
    reload() {
        Plugins.reload(this.meta.id)
    }

    /**
     * Called from BetterDiscord when the plugin is activated (including after reloads).
     */
    abstract start(): void

    /**
     * Called from BetterDiscord when the plugin is deactivated.
     */
    abstract stop(): void
}


export default Plugin