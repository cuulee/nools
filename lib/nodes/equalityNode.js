'use strict';

const AlphaNode = require('./alphaNode');

class EqualityNode extends AlphaNode {
    constructor(constraint) {
        super(constraint);
        this.memory = {};
        this.constraintAssert = this.constraint.assert;
    }

    assert(context) {
        const asserted = this.constraintAssert(context.factHash);
        this.memory[context.pathsHash] = asserted;
        if (asserted) {
            this.__propagate('assert', context);
        }
    }

    modify(context) {
        const memory = this.memory;
        const hashCode = context.pathsHash;
        const wasMatch = memory[hashCode];
        const asserted = this.constraintAssert(context.factHash);
        memory[hashCode] = asserted;
        if (asserted) {
            this.__propagate(wasMatch ? 'modify' : 'assert', context);
        } else if (wasMatch) {
            this.__propagate('retract', context);
        }
    }

    retract(context) {
        const hashCode = context.pathsHash;
        const memory = this.memory;
        if (memory[hashCode]) {
            this.__propagate('retract', context);
        }
        delete memory[hashCode];
    }

    toString() {
        return `EqualityNode${this.__count}`;
    }
}

module.exports = EqualityNode;
