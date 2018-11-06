export default class Venue {
    constructor(id, name, location, eventCost) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.eventCost = eventCost;
    }

    get cost() {
        return this.eventCost;
    }
}
