'use strict';

const ReferenceAtom = require('./referenceAtom');
const parser = require('../../../../parser');

class ReferenceEqualityAtom extends ReferenceAtom {
    constructor(constraint, options) {
        super(constraint, options);
        this.type = 'reference_equality';
        this.op = 'eq';
    }

    getIndexableProperties() {
        return parser.constraint.getIndexableProperties(this.constraint);
    }
}

module.exports = ReferenceEqualityAtom;
