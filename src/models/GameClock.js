import GameDate from './GameDate'
import MessageHandler from './MessageHandler'

export default class GameClock {
    static DaysPerWeek = 7;
    static WeeksPerMonth = 4;
    static MonthsPerYear = 12;

    constructor(gameDate, dayDurationInMs) {
        this.gameDate = gameDate;
        this.dayDurationInMs = dayDurationInMs;
        this.timer = null;
    }

    start() {
        this.timer = setInterval(() => {
            let oldDate = new GameDate(this.gameDate.year, this.gameDate.month, this.gameDate.week, this.gameDate.day);
            this.gameDate.day++;

            MessageHandler.sendMessage('clock-datechange', {
                'oldDate': oldDate,
                'newDate': this.gameDate,
            });

        }, this.dayDurationInMs);
    }

    stop() {
        clearInterval(this.timer);
    }
}
