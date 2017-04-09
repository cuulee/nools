'use strict';

const Atom = require('./atom');
const utils = require('./utils');

class FromAtom extends Atom {
    constructor(constraints, options) {
        super(constraints);
        this.type = 'from';
        const opts = options || {};
        this.constraint = utils.createSourceMatcher(constraints, this.alias, opts.scope, true);
    }

    assert(fact, fh) {
        return this.constraint(fact, fh);
    }

    get variables() {
        return this.constraint;
    }
}

module.exports = FromAtom;
