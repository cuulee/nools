'use strict';

const ReferenceEqualityAtom = require('./referenceEqualityAtom');

class ReferenceGTAtom extends ReferenceEqualityAtom {
    constructor(constraint, options) {
        super(constraint, options);
        this.type = 'reference_gt';
        this.op = 'gt';
    }
}

module.exports = ReferenceGTAtom;
