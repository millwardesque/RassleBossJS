import Company from './Company'
import GameClock from './GameClock'
import Roster from './Roster'
import Talent from './Talent'
import TalentContract from './TalentContract'

export default class InGameState {
    constructor() {
        this.clock = new GameClock(1, 1, 1, 1000);
        this.company = new Company('WWF', 4);
        this.freeAgents = new Roster();

        this.freeAgents.hire(new Talent("ricky-steamboat", "Ricky Steamboat", new TalentContract(10000, 80000)));
        this.freeAgents.hire(new Talent("arn-anderson", "Arn Anderson", new TalentContract(20000, 150000)));
        this.freeAgents.hire(new Talent("ric-flair", "Ric Flair", new TalentContract(100000, 250000)));
        this.freeAgents.hire(new Talent("sting", "Sting", new TalentContract(0, 40000)));
        this.freeAgents.hire(new Talent("tully-blanchard", "Tully Blanchard", new TalentContract(20000, 125000)));
        this.freeAgents.hire(new Talent("barry-windham", "Barry Windham", new TalentContract(40000, 70000)));
    }

    enter() {
        this.clock.start();
    }

    exit() {
        this.clock.stop();
    }
}
