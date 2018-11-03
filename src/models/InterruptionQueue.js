import MessageHandler from './MessageHandler'

class InterruptionQueue {
    constructor() {
        this.queue = [];
        this.clock = null;
        this.isShowing = false;
        this.activeInterruption = null;

        MessageHandler.addListener('clock-datechange', (name, data) => {
            this.onDateChange(name, data);
        });
    }

    onDateChange(name, data) {
        if (data.newDate.week != data.oldDate.week) {
            if (this.queue.length > 0) {
                this.dequeue();
            }
        }
    }

    enqueue(interruption) {
        this.queue.unshift(interruption);
    }

    dequeue() {
        let interruption = this.queue.pop();

        // Wrap the interruption's onClose handler with our own to restart the clock.
        let onCloseHandler = interruption.getOnClose();
        interruption.setOnClose(() => {
            if (onCloseHandler) {
                onCloseHandler();
            }

            this.isShowing = false;
            this.activeInterruption = null;

            this.clock.start();
        });

        // Stop the clock.
        this.clock.stop();

        // Trigger the interruption.
        this.activeInterruption = interruption;
        this.isShowing = true;

        return interruption;
    }
}

export default new InterruptionQueue();
