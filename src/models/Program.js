export default class Program {
    constructor(teams, angle) {
        this.teams = teams;
        this.angle = angle;

        for (let team of teams) {
            for (let talent of team) {
                if (talent.program != null) {
                    talent.program.removeTalent(talent);
                }

                talent.program = this;
            }
        }
    }

    removeTalent(talent) {
        for (let team of teams) {
            let index = team.indexOf(talent);
            if (index !== -1) {
                talent.program = null;
                team.splice(index, 1);
            }
        }
    }

    cancelProgram() {
        for (let team of this.teams) {
            for (let talent of team) {
                talent.program = null;
            }
        }
    }

    teamLabel(index) {
        let label = '';

        for (let i = 0; i < this.teams[index].length; ++i) {
            label += this.teams[index][i].name;
            if (i + 1 < this.teams[index][i].length) {
                label += ', ';
            }
        }
        return label;
    }
}
