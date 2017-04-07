'use strict';

const ReferenceEqualityAtom = require('./referenceEqualityAtom');

class ReferenceLTEAtom extends ReferenceEqualityAtom {
    constructor(constraint, options) {
        super(constraint, options);
        this.type = 'reference_lte';
        this.op = 'lte';
    }
}

module.exports = ReferenceLTEAtom;
