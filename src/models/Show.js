export default class Show {
    constructor(date, venue, programs) {
        this.date = date;
        this.venue = venue;
        this.programs = programs;
    }

    get label() {
        return `${this.date.label} - ${this.venue.label}`
    }
}
