export default class GameDate {
    static DaysPerWeek = 7;
    static WeeksPerMonth = 4;
    static MonthsPerYear = 12;

    constructor(year, month, week, day) {
        this._year = year;
        this._month = month;
        this._week = week;
        this._day = day;
    }

    compare(other) {
        if (this.year < other.year) {
            return -1;
        }
        else if (this.year > other.year) {
            return 1;
        }
        else {
            if (this.month < other.month) {
                return -1;
            }
            else if (this.month > other.month) {
                return 1;
            }
            else {
                if (this.week < other.week) {
                    return -1;
                }
                else if (this.week > other.week) {
                    return 1;
                }
                else {
                    if (this.day < other.day) {
                        return -1;
                    }
                    else if (this.day > other.day) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
        }
    }

    get label() {
        return `Y${this.year} M${this.month} W${this.week} D${this.day}`;
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
        this._day = d;
        this.normalize();
    }

    normalize() {
        while (this._day > GameDate.DaysPerWeek) {
            this._day -= GameDate.DaysPerWeek;
            this._week += 1;
        }
        while (this._day < 1) {
            this._day += GameDate.DaysPerWeek;
            this._week -= 1;
        }

        while (this._week > GameDate.WeeksPerMonth) {
            this._week -= GameDate.WeeksPerMonth;
            this._month += 1;
        }
        while (this._week < 1) {
            this._week += GameDate.WeeksPerMonth;
            this._month -= 1;
        }

        while (this._month > GameDate.MonthsPerYear) {
            this._month -= GameDate.MonthsPerYear;
            this._year += 1;
        }
        while (this._month < 1) {
            this._month += GameDate.MonthsPerYear;
            this._year -= 1;
        }
    }
}
