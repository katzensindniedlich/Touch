import Plugin from './abc'
import Keybind from './keybind'
import Input, { inputRef } from './components/Input'

import type { ErrorResponse } from './types/Discord'
import type { PluginMetadata, PluginExport } from './types/api/Addon'


const { UI } = BdApi


/**
 * Pseudo interface
 * of discords internal private channel actions Webpack module.
 */
interface ChannelActions {
    /**
     * Discords internal method to open private channels.
     *
     * @param userId - The id of the user to open the private channel to.
     * @returns A Promise resolving to the id of the opened channel.
     */
    openPrivateChannel(userId: string): Promise<string>
}


/**
 * Discords Webpack module for private channel actions.  
 * The internal structure could change any time, so we may not find it.
 */
const channelActions = (
    BdApi.Webpack.getByKeys('openPrivateChannel') as ChannelActions | undefined
)


/**
 * Shows an success toast with the given message.  
 * Will only be shown when the BetterDiscord setting is turned on.
 */
function showSuccess(message: string) {
    UI.showToast(
        message,
        { type: 'success' }
    )
}


/**
 * Shows an error toast with the given message.  
 * Will always be shown regardless of the BetterDiscord setting.
 */
function showError(message: string) {
    UI.showToast(
        message,
        { type: 'error', forceShow: true }
    )
}


/**
 * A BetterDiscord plugin to open private channels!
 */
class Touch extends Plugin {
    /**
     * Our keybind to open the confirmation modal.  
     * Potentially more pleasant than injecting elements into the app ui.
     * @readonly
     */
    readonly keybind

    constructor(meta: PluginMetadata) {
        super(meta)

        this.keybind = new Keybind(e => e.ctrlKey && e.key === 'o', this.showModal)
    }

    /**
     * Shows a confirmation modal with an user id input.  
     * On confrim, request to open the private channel with that user.
     */
    showModal = () => {
        if (inputRef.current) {
            return
        }

        UI.showConfirmationModal(
            'Create DM',
            Input,
            {
                confirmText: 'Open',
                onConfirm: this.openPrivateChannel
            }
        )
    }

    /**
     * Called whenever the private channel could be opened successfully.
     */
    onSuccess = () => {
        showSuccess('Successfully created channel')
    }

    /**
     * Called whenever the private channel could not be opened successfully by discord.
     */
    onError = (error: ErrorResponse) => {
        showError(error.body.message || 'An error occurred')
    }

    /**
     * Get the id from our input element,  
     * validate and request to open the private channel with that user.
     */
    openPrivateChannel = () => {
        const input = inputRef.current

        if (!input) {
            showError('Input unavailable')
            return
        }

        if (!input.checkValidity()) {
            showError('Invalid ID format')
            return
        }

        const { value } = input
        const { onSuccess, onError } = this

        channelActions?.openPrivateChannel(value).then(onSuccess, onError)
    }

    start() {
        this.keybind.install()
    }

    stop() {
        this.keybind.uninstall()
    }
}


/**
 * A dummy plugin to use instead, when we didnt find the channel actions.  
 * At this point, discord has most likely changed its structure,
 * and we wouldnt be able to find the channel actions without adjustments anyway.
 */
class Dummy extends Plugin {
    start() {
        showError(`${this.meta.name} ─ Channel actions not found`)
        this.disable()
    }

    stop() {}
}

export default (
    typeof channelActions === 'undefined' ? Dummy : Touch
) satisfies PluginExport