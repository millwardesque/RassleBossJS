import GameClock from './GameClock'
import Roster from './Roster'

export default class InGameState {
    constructor() {
        this.clock = new GameClock(1, 1, 1, 1000);
        this.roster = new Roster(4);
        this.freeAgents = new Roster();

        this.freeAgents.hire({ id: "hulk-hogan", name: "Hulk Hogan" });
        this.freeAgents.hire({ id: "arn-anderson", name: "Arn Anderson" });
    }

    enter() {
        this.clock.start();
    }

    exit() {
        this.clock.stop();
    }
}
