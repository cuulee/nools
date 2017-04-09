'use strict';

const Atom = require('./atom');
const utils = require('./utils');

class ComparisonAtom extends Atom {
    constructor(constraint, options) {
        super(constraint);
        this.type = 'comparison';
        const opts = options || {};
        this.pattern = opts.pattern;
        this._matcher = utils.createMatcher(constraint, this.alias, opts.scope, true);
    }

    assert(values) {
        return this._matcher(values);
    }
}

module.exports = ComparisonAtom;
