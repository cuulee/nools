'use strict';

const Atom = require('./atom');

class CustomAtom extends Atom {
    constructor(func, options) {
        super(func);
        this.type = 'custom';
        this.options = options;
    }

    equal(otherAtom) {
        return otherAtom instanceof this.constructor && this.constraint === otherAtom.constraint;
    }

    assert(fact, fh) {
        return this.constraint(fact, fh);
    }
}

module.exports = CustomAtom;
