import Plugin from './abc'
import Keybind from './keybind'
import Input, { inputRef } from './components/Input'

import type { ErrorResponse } from './types/Discord'
import type { PluginMetadata } from './types/api/Addon'


/**
 * Pseudo interface
 * of discords internal private channel actions Webpack module.
 */
interface ChannelActions {
    /**
     * Discords internal method to open private channels.
     * @param userID - The id of the user to open the private channel to.
     */
    openPrivateChannel(userID: string): Promise<string>
}


/**
 * Discords internal Webpack module for private channel actions.  
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
    BdApi.UI.showToast(
        message,
        { type: 'success' }
    )
}


/**
 * Shows an error toast with the given message.
 * Will always be shown regardless of the BetterDiscord setting.
 */
function showError(message: string) {
    BdApi.UI.showToast(
        message,
        { type: 'error', forceShow: true }
    )
}


/**
 * A BetterDiscord plugin to open private channels!
 */
class Touch extends Plugin {
    /**
     * Our Ctrl+O keybind to open the confirmation modal.  
     * Potentially more pleasant than injecting elements into the app ui.
     * @readonly
     */
    readonly keybind

    constructor(meta: PluginMetadata) {
        super(meta)

        const callback = this.showModal.bind(this)
        this.keybind = new Keybind(e => e.ctrlKey && e.key === 'o', callback)
    }

    /**
     * Shows a confirmation modal with an user id input.
     * On confrim, we try to open the private channel with that user.
     */
    showModal() {
        if (inputRef.current) return

        BdApi.UI.showConfirmationModal(
            'Create DM',
            Input,
            {
                confirmText: 'Open',
                onConfirm: this.openPrivateChannel.bind(this)
            }
        )
    }

    /**
     * Called whenever the private channel could be opened successfully.
     */
    onSuccess(userID: string) {
        showSuccess('Successfully created channel')
    }

    /**
     * Shows the error that occurred 
     * when Discord tried to open the private channels with the specific user.
     */
    onError(error: ErrorResponse) {
        showError(error.body.message || 'An Error occurred')
    }

    /**
     * Gather the input value from our input element,  
     * validate by user ID and try to open the private channel with that user.
     */
    openPrivateChannel() {
        const input = inputRef.current

        if (!input) {
            showError('Input element not found')
        }
        else if (!input.checkValidity()) {
            showError('Invalid ID format')
        }
        else {
            channelActions?.openPrivateChannel(input.value)
            .then(
                userID => this.onSuccess(userID),
                (error: ErrorResponse) => this.onError(error)
            )
        }
    }

    start() {
        this.keybind.install()
    }

    stop() {
        this.keybind.uninstall()
    }
}


/**
 * A dummy plugin to use instead, when we didnt found the channel actions.  
 * At this point, discord has most likely changed its structure
 * and we wouldnt be able to find the channel actions without adjustments anyway.
 */
class Dummy extends Plugin {
    start() {
        showError('Channel actions not found ─ try to reload')
        this.disable()
    }

    stop() {}
}

export default (
    typeof channelActions === 'undefined'? Dummy: Touch
)
