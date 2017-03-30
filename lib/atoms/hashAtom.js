'use strict';

const Atom = require('./atom');

class HashAtom extends Atom {
    constructor(constraint) {
        super(constraint);
        this.type = 'hash';
    }

    assert() {
        return true;
    }

    get variables() {
        return this.constraint;
    }
}

module.exports = HashAtom;
