export default class Location {
    constructor(id, name, lat, long) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.long = long;
    }

    distanceTo(lat, long) {
        let latSq = (this.lat - lat) * (this.lat - lat);
        let longSq = (this.long - long) * (this.long - long);
        return Math.sqrt(latSq + longSq);
    }
}
