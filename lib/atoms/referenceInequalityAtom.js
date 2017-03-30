'use strict';

const ReferenceEqualityAtom = require('./referenceEqualityAtom');

class ReferenceInequalityAtom extends ReferenceEqualityAtom {
    constructor(constraint, options) {
        super(constraint, options);
        this.type = 'reference_inequality';
        this.op = 'neq';
    }
}

module.exports = ReferenceInequalityAtom;
