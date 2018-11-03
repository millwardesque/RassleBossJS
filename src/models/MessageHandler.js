class MessageHandler {
    constructor() {
        this.listeners = {};
    }

    sendMessage(messageName, messageData) {
        if (messageName in this.listeners) {
            // console.log(`[MessageHandler] Caught ${messageName}: ${this.listeners[messageName].length} listeners.`);
            for (let listener of this.listeners[messageName]) {
                listener(messageName, messageData);
            }
        }
    }

    addListener(messageName, callback) {
        if (!(messageName in this.listeners)) {
            this.listeners[messageName] = [];
        }

        this.listeners[messageName].push(callback);
    }
}

export default new MessageHandler();
