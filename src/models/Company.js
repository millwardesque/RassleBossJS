import MessageHandler from './MessageHandler'
import Roster from './Roster'


export default class Company {
    constructor(name, rosterSize) {
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
        if (data.newDate.year > data.oldDate.year) {
            for (let talent of this.roster.roster) {
                console.log(`Paying ${talent.name}'s annual salary of ${talent.contract.annualSalary}`);
                this.bank -= talent.contract.annualSalary;
            }
        }
    }
}
