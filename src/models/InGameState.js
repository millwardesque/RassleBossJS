import Company from './Company'
import GameClock from './GameClock'
import InterruptionQueue from './InterruptionQueue'
import MessageHandler from './MessageHandler'
import Talent from './Talent'
import TalentContract from './TalentContract'

export default class InGameState {
    constructor() {
        this.clock = new GameClock(1, 1, 1, 1000);
        this.company = new Company('WWF', 4);
        this.talent = [];

        this.talent.push(new Talent("ricky-steamboat", "Ricky Steamboat", new TalentContract(10000, 80000)));
        this.talent.push(new Talent("arn-anderson", "Arn Anderson", new TalentContract(20000, 150000)));
        this.talent.push(new Talent("ric-flair", "Ric Flair", new TalentContract(100000, 250000)));
        this.talent.push(new Talent("sting", "Sting", new TalentContract(0, 40000)));
        this.talent.push(new Talent("tully-blanchard", "Tully Blanchard", new TalentContract(20000, 125000)));
        this.talent.push(new Talent("barry-windham", "Barry Windham", new TalentContract(40000, 70000)));

        MessageHandler.addListener('clock-datechange', (name, data) => {
            this.onDateChange(name, data);
        });

        InterruptionQueue.clock = this.clock;

        // @DEBUG Temporary config and setup.
        this.company.bank = 1000000;
        this.company.hire(this.talent[0]);
    }

    get freeAgents() {
        return this.talent.filter((x) => {
            return x.company == null;
        });
    }

    onDateChange(name, data) {
        if (data.newDate.week == 1 && data.oldDate.week != 1) {
            this.company.bank += 100000;
        }
    }

    enter() {
        this.clock.start();
    }

    exit() {
        this.clock.stop();
    }
}
