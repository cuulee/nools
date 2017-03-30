'use strict';

const ObjectPattern = require('./objectPattern');
const atoms = require('../atoms');

class FromPattern extends ObjectPattern {
    constructor(type, alias, conditions, store, from, options) {
        super(type, alias, conditions, store, options);
        this.from = new atoms.FromAtom(from, options);
    }

    getSpecificity() {
        return super.getSpecificity() + 1;
    }

    hashCode() {
        return `${super.hashCode()}:${this.from.from}`;
    }

    toString() {
        return `${JSON.stringify(this.constraints)} from ${this.from.from}`;
    }
}

module.exports = FromPattern;
