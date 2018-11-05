import Company from './Company'
import GameClock from './GameClock'
import InterruptionQueue from './InterruptionQueue'
import Location from './Location'
import MessageHandler from './MessageHandler'
import Talent from './Talent'
import TalentContract from './TalentContract'

export default class InGameState {
    constructor() {
        this.clock = new GameClock(1, 1, 1, 1000);
        this.company = null;
        this.locations = [];
        this.rivalCompanies = [];
        this.talent = [];

        MessageHandler.addListener('clock-datechange', (name, data) => {
            this.onDateChange(name, data);
        });

        InterruptionQueue.clock = this.clock;

        this.loadData();
    }

    loadData() {
        // Load locations
        this.locations.push(new Location('toronto_ontario_canada', 'Toronto, ON, Canada', 43.6532, -79.3832));
        this.locations.push(new Location('london_ontario_canada', 'London, ON, Canada', 42.9849, -81.2453));
        this.locations.push(new Location('ottawa_ontario_canada', 'Ottawa, ON, Canada', 45.4215, 75.6972));
        this.locations.push(new Location('bixby_oklahoma_us', 'Bixby, OK, US', 35.9420, -95.8833));
        this.locations.push(new Location('minneapolis_minnesota_us', 'Minneapolis, MN, US', 44.9778, 93.2650))

        // Load talent
        this.talent.push(new Talent("ricky-steamboat", "Ricky Steamboat", new TalentContract(10000, 80000)));
        this.talent.push(new Talent("arn-anderson", "Arn Anderson", new TalentContract(20000, 150000)));
        this.talent.push(new Talent("ric-flair", "Ric Flair", new TalentContract(100000, 250000)));
        this.talent.push(new Talent("sting", "Sting", new TalentContract(0, 40000)));
        this.talent.push(new Talent("tully-blanchard", "Tully Blanchard", new TalentContract(20000, 125000)));
        this.talent.push(new Talent("barry-windham", "Barry Windham", new TalentContract(40000, 70000)));
        this.talent.push(new Talent("bret-hart", "Bret Hart", new TalentContract(20000, 50000)));
        this.talent.push(new Talent("ultimate-warrior", "The Ultimate Warrior", new TalentContract(70000, 100000)));
        this.talent.push(new Talent("curt-hennig", "Curt Hennig", new TalentContract(50000, 80000)));
        this.talent.push(new Talent("ted-dibiase", "Ted DiBiase", new TalentContract(60000, 60000)));

        // Load companies
        this.company = new Company('wwf', 'WWF', 4, 100000, this.locations[0]);
        this.company.hire(this.talent[0]);
        this.company.hire(this.talent[1]);
        this.company.accessibleLocations.push(this.locations[1]);
        this.company.accessibleLocations.push(this.locations[2]);

        let midSouth = new Company('midsouth', 'Mid-South Wrestling', 6, 1100000, this.locations[3]);
        this.rivalCompanies.push(midSouth);
        midSouth.hire(this.talent[2]);
        midSouth.hire(this.talent[3]);
        midSouth.hire(this.talent[4]);
        midSouth.hire(this.talent[5]);

        let awa = new Company('awa', 'AWA', 4, 500000, 4);
        this.rivalCompanies.push(awa);
        awa.hire(this.talent[6]);
        awa.hire(this.talent[7]);
        awa.hire(this.talent[8]);
        awa.hire(this.talent[9]);
    }

    get freeAgents() {
        return this.talent.filter((x) => {
            return x.company == null;
        });
    }

    get allCompanies() {
        return [...this.rivalCompanies, this.company];
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
