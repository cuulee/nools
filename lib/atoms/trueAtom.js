'use strict';

const Atom = require('./atom');

class TrueAtom extends Atom {
    constructor() {
        super([true]);
        this.type = 'equality';
    }

    assert() {
        return true;
    }
}

module.exports = TrueAtom;
