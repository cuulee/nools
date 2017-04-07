'use strict';

const ReferenceEqualityAtom = require('./referenceEqualityAtom');

class ReferenceLTAtom extends ReferenceEqualityAtom {
    constructor(constraint, options) {
        super(constraint, options);
        this.type = 'reference_lt';
        this.op = 'lt';
    }
}

module.exports = ReferenceLTAtom;
