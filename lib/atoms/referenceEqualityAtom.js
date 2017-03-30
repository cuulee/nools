'use strict';

const ReferenceAtom = require('./referenceAtom');

class ReferenceEqualityAtom extends ReferenceAtom {
    constructor(constraint, options) {
        super(constraint, options);
        this.type = 'reference_equality';
        this.op = 'eq';
    }

    getIndexableProperties() {
        return this.constraintMatcher.getIndexableProperties(this.constraint);
    }
}

module.exports = ReferenceEqualityAtom;
