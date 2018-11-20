import MessageHandler from './MessageHandler'

export default class GameClock {
    static DaysPerWeek = 7;
    static WeeksPerMonth = 4;
    static MonthsPerYear = 12;

    constructor(year, month, week, day, dayDurationInMs) {
        this._year = year;
        this._month = month;
        this._week = week;
        this._day = day;
        this.dayDurationInMs = dayDurationInMs;
        this.timer = null;
    }

    start() {
        this.timer = setInterval(() => {
            this.day++;
        }, this.dayDurationInMs);
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
        this._week = w;
        this.normalize();
    }

    get day() {
        return this._day;
    }
    set day(d) {
        if (d != this._day) {
            let oldDate = this.asGameDate()

            this._day = d;
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
            day: this._day,
        };
    }

    normalize() {
        while (this._day > GameClock.DaysPerWeek) {
            this._day -= GameClock.DaysPerWeek;
            this._week += 1;
        }
        while (this._day < 1) {
            this._day += GameClock.DaysPerWeek;
            this._week -= 1;
        }

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
