'use strict';

const InitialFact = require('./initialFact');
const ObjectPattern = require('./objectPattern');

class InitialFactPattern extends ObjectPattern {
    constructor() {
        super(InitialFact, '__i__', [], {});
    }
}

module.exports = InitialFactPattern;
