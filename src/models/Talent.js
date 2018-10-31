import MessageHandler from './MessageHandler'

export default class Talent {
    constructor(id, name, contract) {
        this.id = id;
        this.name = name;
        this.contract = contract;
        this.weeksAtCompany = 0;
        this.company = null;

        MessageHandler.addListener('clock-datechange', (name, data) => {
            this.onDateChange(name, data);
        });
    }

    onDateChange(name, data) {
        if (data.newDate.week != data.oldDate.week) {
            this.weeksAtCompany++;
        }
    }

    onHire(company) {
        this.company = company;
        this.weeksAtCompany = 0;
    }

    onFire(company) {
        this.company = null;
        this.weeksAtCompany = 0;
    }

    get satisfaction() {
        let decayDuration = 52;
        return Math.max(decayDuration - this.weeksAtCompany, 0) / decayDuration;
    }
}
