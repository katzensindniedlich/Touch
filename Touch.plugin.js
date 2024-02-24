/**
 * @name Touch
 * @version 0.0.0
 * @description Open private channels with Ctrl+O
 * @author Ems
 */
const {Plugins} = BdApi;

class Plugin {
    meta;
    constructor(meta) {
        this.meta = meta;
    }
    enable() {
        Plugins.enable(this.meta.id);
    }
    disable() {
        Plugins.disable(this.meta.id);
    }
    toggle() {
        Plugins.toggle(this.meta.id);
    }
    reload() {
        Plugins.reload(this.meta.id);
    }
}

class Keybind {
    target;
    toggled;
    listenerRef;
    check;
    callback;
    constructor(key, callback, target = document, toggled = false) {
        this.callback = callback;
        this.target = target;
        this.toggled = toggled;
        this.listenerRef = this.listener.bind(this);
        if (typeof key === "string") {
            this.check = event => event.key === key;
        } else {
            this.check = key;
        }
    }
    listener(event) {
        if (this.check(event)) this.callback(event, this);
    }
    install() {
        const {target, listenerRef} = this;
        target.addEventListener("keydown", listenerRef);
        if (this.toggled) {
            target.addEventListener("keyup", listenerRef);
        }
    }
    uninstall() {
        const {target, listenerRef} = this;
        target.removeEventListener("keydown", listenerRef);
        if (this.toggled) {
            target.removeEventListener("keyup", listenerRef);
        }
    }
}

const inputRef = BdApi.React.createRef();

const style = {
    inset: 0,
    display: "block",
    margin: "auto",
    marginTop: "15px",
    width: "96.5%",
    overflow: "hidden",
    fontSize: "16px",
    lineHeight: "32px",
    border: "none",
    borderRadius: "var(--radius-xs)",
    padding: "0 var(--spacing-8)",
    color: "var(--text-normal)",
    background: "var(--bg-overlay-4, var(--background-tertiary))"
};

const Input = BdApi.React.createElement("input", {
    ref: inputRef,
    style,
    required: true,
    pattern: "\\d{17,19}",
    placeholder: "User ID",
    onChange: ({target}) => target.value = target.value.replace(/\D/g, "").slice(0, 19)
});

const channelActions = BdApi.Webpack.getByKeys("openPrivateChannel");

function showSuccess(message) {
    BdApi.UI.showToast(message, {
        type: "success"
    });
}

function showError(message) {
    BdApi.UI.showToast(message, {
        type: "error",
        forceShow: true
    });
}

class Touch extends Plugin {
    keybind;
    constructor(meta) {
        super(meta);
        const callback = this.showModal.bind(this);
        this.keybind = new Keybind((e => e.ctrlKey && e.key === "o"), callback);
    }
    showModal() {
        if (inputRef.current) return;
        BdApi.UI.showConfirmationModal("Create DM", Input, {
            confirmText: "Open",
            onConfirm: this.openPrivateChannel.bind(this)
        });
    }
    onSuccess(userID) {
        showSuccess("Successfully created channel");
    }
    onError(error) {
        showError(error.body.message || "An Error occurred");
    }
    openPrivateChannel() {
        const input = inputRef.current;
        if (!input) {
            showError("Input element not found");
        } else if (!input.checkValidity()) {
            showError("Invalid ID format");
        } else {
            channelActions.openPrivateChannel(input.value).then((userID => this.onSuccess(userID)), (error => this.onError(error)));
        }
    }
    start() {
        this.keybind.install();
    }
    stop() {
        this.keybind.uninstall();
    }
}

class Dummy extends Plugin {
    start() {
        showError("Channel actions not found ─ try to reload");
        this.disable();
    }
    stop() {}
}

const plugin = typeof channelActions === "undefined" ? Dummy : Touch;

module.exports = plugin;
