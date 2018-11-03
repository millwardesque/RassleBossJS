export default class Interruption {
    constructor(title, body, onClose) {
        this.title = title;
        this.body = body;
        this._onClose = onClose;
    }

    onClose() {
        if (this._onClose) {
            this._onClose();
        }
    }

    getOnClose() {
        return this._onClose;
    }

    setOnClose(v) {
        this._onClose = v;
    }
}
