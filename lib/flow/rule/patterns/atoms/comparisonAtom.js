'use strict';

const EqualityAtom = require('./equalityAtom');

class ComparisonAtom extends EqualityAtom {
    constructor(constraint, options) {
        super(constraint, options);
        this.type = 'comparison';
    }
}

module.exports = ComparisonAtom;
