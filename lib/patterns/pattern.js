'use strict';

let id = 0;
class Pattern {
    constructor() {
        this.id = id;
        id += 1;
    }
}

module.exports = Pattern;
