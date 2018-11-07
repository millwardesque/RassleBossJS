import Interruption from './Interruption'
import InterruptionQueue from './InterruptionQueue'
import MessageHandler from './MessageHandler'

export default class Talent {
    constructor(id, name, contract) {
        this.id = id;
        this.name = name;
        this.contract = contract;
        this.weeksAtCompany = 0;
        this.company = null;
        this.program = null;
        this.satisfaction = 0;

        MessageHandler.addListener('clock-datechange', (name, data) => {
            this.onDateChange(name, data);
        });
    }

    onDateChange(name, data) {
        let quitSatisfactionThreshold = 0.1;
        let quitSatisfactionChance = 0.0001;

        if (data.newDate.week != data.oldDate.week) {
            this.weeksAtCompany++;

            if (this.company != null) {
                let decayDuration = 52;
                this.satisfaction -= 1.0 / decayDuration;
                this.satisfaction = Math.max(0, this.satisfaction);

                if (this.company != null && this.satisfaction < quitSatisfactionThreshold) {
                    if (Math.random() < quitSatisfactionChance) {
                        InterruptionQueue.enqueue(new Interruption(`${this.name} quits!`, `After ${this.weeksAtCompany} weeks here, I'm fed up and leaving. Sayonara!`, () => {
                            this.company.fire(this);
                        }));
                    }
                }
            }
        }
    }

    onHire(company) {
        this.company = company;
        this.weeksAtCompany = 0;
        this.satisfaction = 1.0;
    }

    onFire() {
        this.company = null;
        this.program = null;
        this.weeksAtCompany = 0;
        this.satisfaction = 0;
    }
}
