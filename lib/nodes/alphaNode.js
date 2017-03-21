'use strict';

const Node = require('./node');

class AlphaNode extends Node {
    constructor(constraint) {
        super();
        this.constraint = constraint;
        this.constraintAssert = this.constraint.assert;
    }

    toString() {
        return `AlphaNode ${this.__count}`;
    }

    equal(constraint) {
        return this.constraint.equal(constraint.constraint);
    }
}

module.exports = AlphaNode;
