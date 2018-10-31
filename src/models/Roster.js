export default class Roster {
    constructor(company, maxSize) {
        this.company = company;

        this.maxSize = maxSize;
        if (this.maxSize === undefined) {
            this.maxSize = null;
        }

        this.roster = [];
    }

    hasRoom() {
        return this.roster.length < this.maxSize || this.maxSize === null;
    }

    hire(talent) {
        if (this.hasRoom() && !this.roster.includes(talent)) {
            this.roster.push(talent);
            talent.onHire(this.company);
            return true;
        }
        return false;
    }

    fire(talent) {
        let index = this.roster.indexOf(talent);
        if (index !== -1) {
            this.roster.splice(index, 1);
            talent.onFire();
            return true;
        }
        return false;
    }
}
