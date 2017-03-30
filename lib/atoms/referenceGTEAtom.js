'use strict';

const ReferenceEqualityAtom = require('./referenceEqualityAtom');

class ReferenceGTEAtom extends ReferenceEqualityAtom {
    constructor(constraint, options) {
        super(constraint, options);
        this.type = 'reference_gte';
        this.op = 'gte';
    }
}

module.exports = ReferenceGTEAtom;
