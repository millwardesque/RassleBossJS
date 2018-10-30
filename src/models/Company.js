import Roster from './Roster'

export default class Company {
    constructor(name, rosterSize) {
        this.name = name;
        this.roster = new Roster(rosterSize);
        this.bank = 0;
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
}
