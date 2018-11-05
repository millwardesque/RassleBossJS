import MessageHandler from './MessageHandler'
import Roster from './Roster'


export default class Company {
    constructor(id, name, rosterSize) {
        this.id = id;
        this.name = name;
        this.roster = new Roster(this, rosterSize);
        this.bank = 0;

        MessageHandler.addListener('clock-datechange', (name, data) => {
            this.onDateChange(name, data);
        });
    }

    canHire(talent) {
        let canAfford = (talent.contract.signingFee <= this.bank);
        return this.roster.hasRoom() && canAfford;
    }

    hire(talent) {
        if (this.canHire(talent)) {
            this.bank -= talent.contract.signingFee;
            return this.roster.hire(talent);
        }
        else {
            return false;
        }
    }

    fire(talent) {
        return this.roster.fire(talent);
    }

    onDateChange(name, data) {
        // Pay annual salaries
        if (data.newDate.year > data.oldDate.year) {
            for (let talent of this.roster.roster) {
                console.log(`[${this.name}] Paying ${talent.name}'s annual salary of ${talent.contract.annualSalary}`);
                this.bank -= talent.contract.annualSalary;
            }
        }
    }

    get satisfaction() {
        let rosterSize = this.roster.roster.length;
        let firstIndex = Math.floor(rosterSize / 2);
        let secondIndex = Math.floor(rosterSize / 2) - 1;

        // Gets the median satisfaction.
        if (rosterSize == 0) {
            return 0;
        }
        else if (rosterSize % 2 == 0) {
            return (this.roster.roster[firstIndex].satisfaction + this.roster.roster[secondIndex].satisfaction) / 2;
        }
        else {
            return this.roster.roster[firstIndex].satisfaction;
        }
    }
}
