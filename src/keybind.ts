type Check = (
    (event: KeyboardEvent) => boolean
)

type Callback = (
    (event: KeyboardEvent, keybind: Keybind) => void
)

type Listener = (
    (event: KeyboardEvent) => void
)

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
     * The target element, where the Keyboard-Events should occur.
     * @readonly
     */
    readonly target

    /**
     * Whenever the callback should also be called when the key got released.
     * @readonly
     */
    readonly toggled

    /**
     * Internal listener reference build with .bind(this)
     * @readonly
     */
    protected readonly listenerRef

    /**
     * A function to check whenever the callback should be called.
     * Takes the KeyboardEvent as single parameter.
     */
    check: Check

    /**
     * The callback to call when our key got pressed / released.
     * Takes the KeyboardEvent and the Keybind instance as parameters.
     */
    callback: Callback

    /**
     * Creates a new Keybind!
     *
     * @param key - The KeyboardEvent.key to listen to or a custom check.
     * @param callback - The callback to call when the key got pressed / released.
     * @param target - The target element, where the Keyboard-Events should occur.
     * @param toggled - Whenever the callback should also be called when the key got released.
     */
    constructor(
        key: Check | string,
        callback: Callback,
        target: Target = document,
        toggled: boolean = false
    ) {
        this.callback = callback
        this.target = target
        this.toggled = toggled
        this.listenerRef = this.listener.bind(this)

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
    listener(event: KeyboardEvent) {
        if (this.check(event)) this.callback(event, this)
    }

    /**
     * Installs the keybinding to the target element.
     */
    install() {
        const { target, listenerRef } = this

        target.addEventListener('keydown', listenerRef)

        if (this.toggled) {
            target.addEventListener('keyup', listenerRef)
        }
    }

    /**
     * Uninstalls the keybinding from the target element.
     */
    uninstall() {
        const { target, listenerRef } = this

        target.removeEventListener('keydown', listenerRef)

        if (this.toggled) {
            target.removeEventListener('keyup', listenerRef)
        }
    }
}
