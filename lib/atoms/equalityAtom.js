'use strict';

const Atom = require('./atom');

class EqualityAtom extends Atom {
    constructor(constraint, options) {
        super(constraint);
        this.type = 'equality';
        const opts = options || {};
        this.pattern = opts.pattern;
        this._matcher = this.constraintMatcher.getMatcher(constraint, opts, true);
    }

    assert(values) {
        return this._matcher(values);
    }
}

module.exports = EqualityAtom;
