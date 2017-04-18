'use strict';

const _ = require('lodash');

let id = 0;
class Atom {
    constructor(constraint) {
        this._alias = null;
        this.id = id;
        this.type = null;
        this.constraint = constraint;
        id += 1;
        this.assert = this.assert.bind(this);
    }

    assert() {
        throw new Error('not implemented');
    }

    getIndexableProperties() {
        return [];
    }

    equal(otherAtom) {
        return otherAtom instanceof this.constructor &&
            this.alias === otherAtom.alias &&
            _.isEqual(this.constraint, otherAtom.constraint);
    }

    get variables() {
        return [this.alias];
    }

    get alias() {
        return this._alias;
    }

    set alias(alias) {
        this._alias = alias;
    }
}

module.exports = Atom;
