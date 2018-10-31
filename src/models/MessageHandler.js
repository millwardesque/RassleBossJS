class MessageHandler {
    constructor() {
        this.listeners = {};
    }

    sendMessage(messageName, messageData) {
        if (messageName in this.listeners) {
            for (let listener of this.listeners[messageName]) {
                listener(messageName, messageData);
            }
        }
        else {
            console.log(`[MessageHandler] No listeners for ${messageName}`);
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
