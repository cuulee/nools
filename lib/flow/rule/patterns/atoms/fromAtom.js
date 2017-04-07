'use strict';

const Atom = require('./atom');

class FromAtom extends Atom {
    constructor(constraints, options) {
        super(constraints);
        this.type = 'from';
        const opts = options || {};
        this.constraint = this.constraintMatcher.getSourceMatcher(constraints, opts, true);
    }

    assert(fact, fh) {
        return this.constraint(fact, fh);
    }

    get variables() {
        return this.constraint;
    }
}

module.exports = FromAtom;
