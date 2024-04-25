type Check = (
    (event: KeyboardEvent) => boolean
)

type Callback = (
    (event: KeyboardEvent, keybind: Keybind) => void
)

type Listener = Keybind['listener']

interface Target {
    addEventListener(type: string, listener: Listener): void
    removeEventListener(type: string, listener: Listener): void
}


/**
 * Implements a keybinding.
 * Calls the given callback when a specific key got pressed.
 */
export default class Keybind {
    /**
     * A function to check whenever the callback should be called.
     * Takes the KeyboardEvent as single parameter.
     */
    check: Check

    /**
     * The callback to call when our key got pressed.
     * Takes the KeyboardEvent and the Keybind instance as parameters.
     */
    callback: Callback

    /**
     * The target element, where the Keyboard-Events should occur.
     * @readonly
     */
    readonly target: Target

    /**
     * Creates a new Keybind!
     *
     * @param key - The KeyboardEvent.key to listen to or a custom check.
     * @param callback - The callback to call when the key got pressed.
     * @param target - The DOM element, where the Keyboard-Events should occur.
     */
    constructor(key: Check | string, callback: Callback, target: Target = document) {
        this.callback = callback
        this.target = target

        if (typeof key === 'string') {
            this.check = event => event.key === key
        }
        else {
            this.check = key
        }
    }

    /**
     * The keyboard event listener,
     * to check if the specific key has been pressed and the callback should be called.
     */
    readonly listener = (event: KeyboardEvent) => {
        if (this.check(event)) {
            this.callback(event, this)
        }
    }

    /**
     * Installs the keybind to the target element.
     */
    install() {
        this.target.addEventListener('keydown', this.listener)
    }

    /**
     * Uninstalls the keybind from the target element.
     */
    uninstall() {
        this.target.removeEventListener('keydown', this.listener)
    }
}