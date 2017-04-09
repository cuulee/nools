'use strict';

const ComparisonAtom = require('./comparisonAtom');

class EqualityAtom extends ComparisonAtom {
    constructor(constraint, options) {
        super(constraint, options);
        this.type = 'equality';
    }
}

module.exports = EqualityAtom;
