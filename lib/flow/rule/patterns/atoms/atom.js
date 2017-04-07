'use strict';

const extd = require('../../../../extended');

let constraintMatcher = null;
let id = 0;
class Atom {
    constructor(constraint) {
        if (!constraintMatcher) {
            // todo pull the atom creation into the atom module.
            constraintMatcher = require('../../../../constraintMatcher'); // eslint-disable-line
        }
        this._alias = null;
        this.constraintMatcher = constraintMatcher;
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
            extd.deepEqual(this.constraint, otherAtom.constraint);
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
