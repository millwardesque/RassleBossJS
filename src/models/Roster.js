export default class Roster {
    constructor(maxSize) {
        this.roster = [];
        this.maxSize = maxSize;
        if (this.maxSize === undefined) {
            this.maxSize = null;
        }
    }

    hasRoom() {
        return this.roster.length < this.maxSize || this.maxSize === null;
    }

    hire(talent) {
        if (this.hasRoom() && !this.roster.includes(talent)) {
            this.roster.push(talent);
            return true;
        }
        return false;
    }

    fire(talent) {
        let index = this.roster.indexOf(talent);
        if (index !== -1) {
            this.roster.splice(index, 1);
            return true;
        }
        return false;
    }
}
