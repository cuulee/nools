'use strict';

const EqualityAtom = require('./equalityAtom');

class InequalityAtom extends EqualityAtom {
    constructor(constraint, options) {
        super(constraint, options);
        this.type = 'inequality';
    }
}

module.exports = InequalityAtom;
