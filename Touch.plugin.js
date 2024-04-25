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
    check;
    callback;
    target;
    constructor(key, callback, target = document) {
        this.callback = callback;
        this.target = target;
        if (typeof key === "string") {
            this.check = event => event.key === key;
        } else {
            this.check = key;
        }
    }
    listener=event => {
        if (this.check(event)) {
            this.callback(event, this);
        }
    };
    install() {
        this.target.addEventListener("keydown", this.listener);
    }
    uninstall() {
        this.target.removeEventListener("keydown", this.listener);
    }
}

const inputRef = BdApi.React.createRef();

const style = {
    inset: 0,
    display: "block",
    margin: "auto",
    marginTop: "15px",
    width: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
    fontSize: "1rem",
    lineHeight: 2,
    letterSpacing: ".04rem",
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

const {UI} = BdApi;

const channelActions = BdApi.Webpack.getByKeys("openPrivateChannel");

function showSuccess(message) {
    UI.showToast(message, {
        type: "success"
    });
}

function showError(message) {
    UI.showToast(message, {
        type: "error",
        forceShow: true
    });
}

class Touch extends Plugin {
    keybind;
    constructor(meta) {
        super(meta);
        this.keybind = new Keybind((e => e.ctrlKey && e.key === "o"), this.showModal);
    }
    showModal=() => {
        if (inputRef.current) {
            return;
        }
        UI.showConfirmationModal("Create DM", Input, {
            confirmText: "Open",
            onConfirm: this.openPrivateChannel
        });
    };
    onSuccess=userId => {
        showSuccess("Successfully created channel");
    };
    onError=error => {
        showError(error.body.message || "An error occurred");
    };
    openPrivateChannel=() => {
        const input = inputRef.current;
        if (!input) {
            showError("Input unavailable");
            return;
        }
        if (!input.checkValidity()) {
            showError("Invalid ID format");
            return;
        }
        const {value} = input;
        const {onSuccess, onError} = this;
        channelActions?.openPrivateChannel(value).then(onSuccess, onError);
    };
    start() {
        this.keybind.install();
    }
    stop() {
        this.keybind.uninstall();
    }
}

class Dummy extends Plugin {
    start() {
        showError(`${this.meta.name} ─ Channel actions not found`);
        this.disable();
    }
    stop() {}
}

const plugin = typeof channelActions === "undefined" ? Dummy : Touch;

module.exports = plugin;
