export default class YgoCard {
    constructor(id, name, numberOwned, race, type) {
        this.id = id;
        this.name = name
        this.numberOwned = numberOwned;
        this.race = race;        
        this.type = type;
    }

    toString() {
        return 'Card :[id:' + this.id
            + ' name:' + this.name
            + ' number owned:' + this.numberOwned
            + ' race:' + this.race + ']'
            + ' type:' + this.type;
    }


}