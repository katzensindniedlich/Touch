import type { JsonValue, JsonAble } from '../Json'


/**
 * `Data` is a simple utility class for the management of plugin data.  
 * An instance is available on {@link BdApi.Data}.
 *
 * @see https://docs.betterdiscord.app/api/data
 */
export interface DataAPI {
	/**
	 * Deletes a piece of stored data,  
	 * this is different than saving as `null` or `undefined`.
	 *
	 * @param pluginName - Name of the plugin deleting data.
	 * @param key - Which piece of data to delete.
	 */
	delete(pluginName: string, key: string): void

	/**
	 * Loads previously stored data.
	 *
	 * @param pluginName - Name of the plugin loading data.
	 * @param key - Which piece of data to load.
	 * @returns The stored data when found.
	 */
	load(pluginName: string, key: string): JsonValue | undefined

	/**
	 * Saves JSON-serializable data to the plugins folder.  
	 * File format: `<pluginName>.config.json`
	 *
	 * @param pluginName - Name of the plugin saving data.
	 * @param key - Which piece of data to store.
	 * @param data - The data to be saved.
	 */
	save(pluginName: string, key: string, data: JsonAble): void
}