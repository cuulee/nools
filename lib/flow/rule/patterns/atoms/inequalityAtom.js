'use strict';

const ComparisonAtom = require('./comparisonAtom');

class InequalityAtom extends ComparisonAtom {
    constructor(constraint, options) {
        super(constraint, options);
        this.type = 'inequality';
    }
}

module.exports = InequalityAtom;
