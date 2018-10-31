import MessageHandler from './MessageHandler'

export default class GameClock {
    static WeeksPerMonth = 4;
    static MonthsPerYear = 12;

    constructor(year, month, week, weekDurationInMs) {
        this._year = year;
        this._month = month;
        this._week = week;
        this.weekDurationInMs = weekDurationInMs;
        this.timer = null;
    }

    start() {
        this.timer = setInterval(() => {
            this.week++;
        }, this.weekDurationInMs);
    }

    stop() {
        clearInterval(this.timer);
    }

    get year() {
        return this._year;
    }
    set year(y) {
        this._year = y;
        this.normalize();
    }

    get month() {
        return this._month;
    }
    set month(m) {
        this._month = m;
        this.normalize();
    }

    get week() {
        return this._week;
    }
    set week(w) {
        if (w != this._week) {
            let oldDate = this.asGameDate()

            this._week = w;
            this.normalize();

            let newDate = this.asGameDate();

            MessageHandler.sendMessage('clock-datechange', {
                'oldDate': oldDate,
                'newDate': newDate,
            });
        }
    }

    asGameDate() {
        return {
            year: this._year,
            month: this._month,
            week: this._week,
        };
    }

    normalize() {
        while (this._week > GameClock.WeeksPerMonth) {
            this._week -= GameClock.WeeksPerMonth;
            this._month += 1;
        }
        while (this._week < 1) {
            this._week += GameClock.WeeksPerMonth;
            this._month -= 1;
        }

        while (this._month > GameClock.MonthsPerYear) {
            this._month -= GameClock.MonthsPerYear;
            this._year += 1;
        }
        while (this._month < 1) {
            this._month += GameClock.MonthsPerYear;
            this._year -= 1;
        }
    }
}
