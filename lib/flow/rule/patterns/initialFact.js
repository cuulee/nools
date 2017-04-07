'use strict';

let id = 0;

class InitialFact {
    constructor() {
        this.id = id;
        this.recency = 0;
        id += 1;
    }
}

module.exports = InitialFact;
